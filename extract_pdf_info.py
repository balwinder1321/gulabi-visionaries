import fitz  # PyMuPDF
import os
import json

pdfs = [
    r"c:\Users\balwi\Desktop\gulabi\Gulabi Visionaries directory_20261005_061440_0000.pdf",
    r"c:\Users\balwi\Desktop\gulabi\Gulabi Visionaries Vision_20261005_061922_0000.pdf",
    r"c:\Users\balwi\Desktop\gulabi\Untitled design_20260727_165025_0000.pdf"
]

output_img_dir = r"c:\Users\balwi\Desktop\gulabi\extracted_assets"
os.makedirs(output_img_dir, exist_ok=True)

extracted_data = {}

for pdf_path in pdfs:
    pdf_name = os.path.basename(pdf_path)
    print(f"--- Processing {pdf_name} ---")
    doc = fitz.open(pdf_path)
    pdf_info = {"pages_count": len(doc), "pages": []}
    
    for page_idx, page in enumerate(doc):
        text = page.get_text("text")
        image_list = page.get_images(full=True)
        
        extracted_images = []
        for img_idx, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            img_filename = f"{pdf_name}_p{page_idx+1}_img{img_idx+1}.{image_ext}"
            img_filepath = os.path.join(output_img_dir, img_filename)
            
            with open(img_filepath, "wb") as f:
                f.write(image_bytes)
            
            extracted_images.append(img_filename)
            
        pdf_info["pages"].append({
            "page_number": page_idx + 1,
            "text": text,
            "images": extracted_images
        })
    
    extracted_data[pdf_name] = pdf_info

with open(r"c:\Users\balwi\Desktop\gulabi\extracted_data.json", "w", encoding="utf-8") as f:
    json.dump(extracted_data, f, indent=2, ensure_ascii=False)

print("Extraction complete! Saved to extracted_data.json and extracted_assets/")
