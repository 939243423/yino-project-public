import sqlite3
import os

db_path = os.path.join('backend', 'data', 'yino.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# 1. Hide old categories
print("Hiding old banners (services, products)...")
cursor.execute("UPDATE banners SET is_active = 0 WHERE category IN ('services', 'products')")

# 2. Add new banners (placeholders) if they don't exist
new_banners = [
    ('财富管理', '/wealth-management', 'wealth-management'),
    ('资产管理', '/asset-management', 'asset-management'),
    ('家族办公室', '/family-office', 'family-office')
]

for title, link, category in new_banners:
    # Check if exists
    cursor.execute("SELECT id FROM banners WHERE category = ? AND title = ?", (category, title))
    if not cursor.fetchone():
        print(f"Adding placeholder for {title}...")
        # Using a dummy image path that they can replace
        cursor.execute(
            "INSERT INTO banners (title, image_url, link, category, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)",
            (title, '/uploads/placeholder.jpg', link, category, 0, 0) # Deactivated by default
        )

conn.commit()
print("Database update complete.")
conn.close()
