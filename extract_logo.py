import os
from PIL import Image

output_assets_dir = r"c:\Users\balwi\Desktop\gulabi\public\assets"
os.makedirs(output_assets_dir, exist_ok=True)

# Let's inspect rendered pages and extracted images to find logo and banner assets
img1 = r"c:\Users\balwi\Desktop\gulabi\extracted_assets\Gulabi Visionaries Vision_20261005_061922_0000.pdf_p3_img1.png"
banner1 = r"c:\Users\balwi\Desktop\gulabi\rendered_pages\untitled_p1.png"
banner2 = r"c:\Users\balwi\Desktop\gulabi\rendered_pages\untitled_p2.png"
banner3 = r"c:\Users\balwi\Desktop\gulabi\rendered_pages\untitled_p3.png"

if os.path.exists(img1):
    im = Image.open(img1)
    im.save(os.path.join(output_assets_dir, "logo_extracted.png"))

if os.path.exists(banner1):
    im = Image.open(banner1)
    im.save(os.path.join(output_assets_dir, "event_banner_1.png"))

if os.path.exists(banner2):
    im = Image.open(banner2)
    im.save(os.path.join(output_assets_dir, "event_banner_2.png"))

if os.path.exists(banner3):
    im = Image.open(banner3)
    im.save(os.path.join(output_assets_dir, "event_banner_3.png"))

print("Extracted logo and event banners copied to public/assets!")
