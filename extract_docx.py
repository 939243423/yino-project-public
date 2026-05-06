import zipfile
import xml.etree.ElementTree as ET
import os

def get_docx_text(path):
    if not os.path.exists(path):
        return f"Error: File not found at {path}"
    try:
        document = zipfile.ZipFile(path)
        xml_content = document.read('word/document.xml')
        document.close()
        tree = ET.fromstring(xml_content)

        namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        paragraphs = []
        for paragraph in tree.findall('.//w:p', namespace):
            texts = [node.text for node in paragraph.findall('.//w:t', namespace) if node.text]
            if texts:
                paragraphs.append("".join(texts))

        return "\n".join(paragraphs)
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 2:
        text = get_docx_text(sys.argv[1])
        with open(sys.argv[2], 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Successfully wrote to {sys.argv[2]}")
    elif len(sys.argv) > 1:
        print(get_docx_text(sys.argv[1]))
