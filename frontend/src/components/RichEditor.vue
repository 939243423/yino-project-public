<template>
  <div class="rich-editor">
    <Editor
      v-model="content"
      :init="editorConfig"
      tinymce-script-src="/libs/tinymce/tinymce.min.js"
      @init="onEditorInit"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import { dialog } from '../utils/ui'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容...'
  }
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue)

// Helper to count images in html string
const countImages = (html) => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.getElementsByTagName('img').length
}

const isMobile = window.innerWidth < 768

const editorConfig = {
  height: isMobile ? 300 : 400,
  menubar: false,
  language: 'zh_CN',
  base_url: '/libs/tinymce',
  suffix: '.min',
  promotion: false, 
  branding: false,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount'
  ],
  toolbar: isMobile 
    ? 'undo redo | bold italic | blocks | bullist numlist | image link | fullscreen'
    : 'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | image link table | code fullscreen help',
  toolbar_mode: 'sliding',
  content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px }',
  placeholder: props.placeholder,
  paste_data_images: true,
  automatic_uploads: false, // Prevent immediate upload
  images_upload_handler: async (blobInfo) => {
    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())
    
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('yino_admin_token')}`
        }
      }
      // Note: baseURL is handled by vite proxy or axios global config
      const res = await axios.post('/api/admin/upload', formData, config)
      return res.data.url
    } catch (err) {
      if (err.response && (err.response.status === 413 || (err.response.status === 500 && err.response.data?.message?.includes('File too large')))) {
        dialog.toast('文件过大请压缩再上传', 'error')
      } else {
        dialog.toast('图片上传失败', 'error')
      }
      throw { message: 'Upload failed', remove: true }
    }
  },
  setup: (editor) => {
    // Prevent dragging/dropping more images if limit reached
    editor.on('BeforeSetContent', (e) => {
      if (e.content && e.content.includes('<img')) {
        const incomingCount = (e.content.match(/<img/g) || []).length
        const currentCount = countImages(editor.getContent())
        if (currentCount + incomingCount > 10) {
          dialog.toast('图片数量超出限制（最多10张）', 'error')
          e.preventDefault()
        }
      }
    })
  }
}

// Expose method to be called by parent on save
const processImages = async () => {
  // tinymce-vue doesn't expose the internal editor directly easily in some versions
  // but we can use the ref or find a way. 
  // Actually, the easiest is to use the editor instance if we can get it.
}

// Re-implementing setup to capture editor instance
const editorRef = ref(null)
const internalEditor = ref(null)

const onEditorInit = (evt, editor) => {
  internalEditor.value = editor
}

const uploadAndGetContent = async () => {
  if (!internalEditor.value) return content.value
  
  // Trigger upload of all local images
  await internalEditor.value.uploadImages()
  
  // Return the processed content
  return internalEditor.value.getContent()
}

defineExpose({
  uploadAndGetContent,
  countImages: () => countImages(content.value)
})

watch(() => props.modelValue, (newVal) => {
  if (newVal !== content.value) {
    content.value = newVal
  }
})

watch(content, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
.rich-editor {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}
:deep(.tox-tinymce) {
  border: none !important;
}
</style>
