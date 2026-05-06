import sqlite3
import os

db_path = os.path.join('backend', 'data', 'yino.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print("Current Banners:")
cursor.execute("SELECT id, title, image_url, category, is_active FROM banners")
rows = cursor.fetchall()
for row in rows:
    print(f"ID: {row[0]}, Title: '{row[1]}', URL: {row[2]}, Cat: {row[3]}, Active: {row[4]}")

conn.close()
