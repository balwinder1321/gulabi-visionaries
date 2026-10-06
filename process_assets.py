import os
import json
import fitz
from PIL import Image

output_members_dir = r"c:\Users\balwi\Desktop\gulabi\public\members"
output_assets_dir = r"c:\Users\balwi\Desktop\gulabi\public\assets"
os.makedirs(output_members_dir, exist_ok=True)
os.makedirs(output_assets_dir, exist_ok=True)

# Members extracted mapping from directory pages
members_raw = [
    {
        "id": "1",
        "name": "Aarti Maheshwari",
        "company": "Choc&mate",
        "category": "Homemade Chocolates",
        "email": "aarti.boob1@gmail.com",
        "phone": "9828070470",
        "group": "Diary Emerald",
        "page": 2,
        "img_xref": 514
    },
    {
        "id": "2",
        "name": "Anjana Badera",
        "company": "Vastra Collection",
        "category": "Lingerie Reseller",
        "email": "anjanabadera@gmail.com",
        "phone": "8890171743",
        "group": "Diary Emerald",
        "page": 3,
        "img_xref": 529
    },
    {
        "id": "3",
        "name": "Arkaja Sethi",
        "company": "Art by Arkaja",
        "category": "Resin Artist",
        "email": "arkajalife@gmail.com",
        "phone": "9653606783",
        "group": "Diary Emerald",
        "page": 4,
        "img_xref": 547
    },
    {
        "id": "4",
        "name": "Asha Choudhary",
        "company": "Aadishakti Home Decor",
        "category": "Lifestyle Home Furnishing Reseller",
        "email": "ashachoudhary161@gmail.com",
        "phone": "9351405704",
        "group": "Diary Emerald",
        "page": 5,
        "img_xref": 560
    },
    {
        "id": "5",
        "name": "Deepika Lakhotia",
        "company": "Prisha house of hampers",
        "category": "Gift packing and Trousseau",
        "email": "drathi210@gmail.com",
        "phone": "9716171079",
        "group": "Diary Emerald",
        "page": 6,
        "img_xref": 575
    },
    {
        "id": "6",
        "name": "Devanshi Brij",
        "company": "Pure Prong",
        "category": "Silver Jewellery Manufacturer",
        "email": "devanshi.brij@gmail.com",
        "phone": "9023984389",
        "group": "Diary Emerald",
        "page": 7,
        "img_xref": 591
    },
    {
        "id": "7",
        "name": "Deepti Singhvi",
        "company": "Home Delicacies by Deepti",
        "category": "Home cooked Food",
        "email": "deeptisinghvi84@gmail.com",
        "phone": "9549111117",
        "group": "Diary Emerald",
        "page": 8,
        "img_xref": 605
    },
    {
        "id": "8",
        "name": "Nirmala Laddha",
        "company": "Masi ke Masale",
        "category": "Home made Masala Maker",
        "email": "nirmalabharadia12@gmail.com",
        "phone": "7737706551",
        "group": "Diary Emerald",
        "page": 9,
        "img_xref": 618
    },
    {
        "id": "9",
        "name": "Shagun Dalvi",
        "company": "Natural Flower Honey",
        "category": "Organic Honey",
        "email": "shagundalvi10@gmail.com",
        "phone": "9829044837",
        "group": "Diary Emerald",
        "page": 10,
        "img_xref": 633
    },
    {
        "id": "10",
        "name": "Shivani Gupta",
        "company": "Stocknfund",
        "category": "Financial Advisor",
        "email": "shivani.gupta2000@gmail.com",
        "phone": "9024192111",
        "group": "Diary Emerald",
        "page": 11,
        "img_xref": 649
    },
    {
        "id": "11",
        "name": "Namita Sharma",
        "company": "Saanvikaa",
        "category": "Cotton coord sets and Suits",
        "email": "saanvikaa.bu@gmail.com",
        "phone": "9587736000",
        "group": "Diary Pearl",
        "page": 13,
        "img_xref": 681
    },
    {
        "id": "12",
        "name": "Nikkita Agarwal",
        "company": "Gopala Poshak Bhandar",
        "category": "Pooja Items",
        "email": "nikka.as05@gmail.com",
        "phone": "7357000456",
        "group": "Diary Pearl",
        "page": 14,
        "img_xref": 695
    },
    {
        "id": "13",
        "name": "Soumyashree Jena",
        "company": "Crochet Detox",
        "category": "Cotton coord sets and Suits",
        "email": "soumyashreej@gmail.com",
        "phone": "9766999258",
        "group": "Diary Pearl",
        "page": 15,
        "img_xref": 711
    },
    {
        "id": "14",
        "name": "Shilpa Agarwal",
        "company": "Tara Creations",
        "category": "Bed Linens",
        "email": "shilpaagarwal2010@gmail.com",
        "phone": "9829292036",
        "group": "Diary Pearl",
        "page": 16,
        "img_xref": 725
    },
    {
        "id": "15",
        "name": "Surabhi Saxena",
        "company": "Choco Retreat By Surabhi",
        "category": "Baker",
        "email": "rshk71@gmail.com",
        "phone": "9001952444",
        "group": "Diary Pearl",
        "page": 17,
        "img_xref": 740
    },
    {
        "id": "16",
        "name": "Uma Agarwal",
        "company": "Choco Retreat By Surabhi",
        "category": "Baker",
        "email": "umagrwal@gmail.com",
        "phone": "9929773573",
        "group": "Diary Pearl",
        "page": 18,
        "img_xref": 756
    },
    {
        "id": "17",
        "name": "Pratibha Chaturvedi",
        "company": "Devik Organics",
        "category": "Skincare products and Candles",
        "email": "pratibhaojha26@gmail.com",
        "phone": "8209574757",
        "group": "Founders",
        "page": 20,
        "img_xref": 788
    },
    {
        "id": "18",
        "name": "Deepika Saboo",
        "company": "Deepika Saboo’s Nutrition Center",
        "category": "Nutritionist",
        "email": "dips_0203@yahoo.co.in",
        "phone": "9001299931",
        "group": "Founders",
        "page": 21,
        "img_xref": 802
    },
    {
        "id": "19",
        "name": "Prachi Agrawal",
        "company": "Gulabi Microgreens and Learning Cubs",
        "category": "Microgreens and Activity Center",
        "email": "prachimansinghka@gmail.com",
        "phone": "7742459585",
        "group": "Founders",
        "page": 22,
        "img_xref": 817
    }
]

doc = fitz.open(r"c:\Users\balwi\Desktop\gulabi\Gulabi Visionaries directory_20261005_061440_0000.pdf")

final_members = []

for m in members_raw:
    xref = m["img_xref"]
    try:
        base_img = doc.extract_image(xref)
        image_bytes = base_img["image"]
        ext = base_img["ext"]
        filename = f"member_{m['id']}_{m['name'].lower().replace(' ', '_')}.{ext}"
        filepath = os.path.join(output_members_dir, filename)
        
        with open(filepath, "wb") as f:
            f.write(image_bytes)
        
        rel_photo_path = f"/members/{filename}"
    except Exception as e:
        print(f"Error extracting photo for {m['name']}: {e}")
        rel_photo_path = "/members/default.jpg"
    
    final_members.append({
        "id": m["id"],
        "name": m["name"],
        "company": m["company"],
        "designation": f"{m['category']} | {m['company']}",
        "category": m["category"],
        "email": m["email"],
        "phone": m["phone"],
        "group": m["group"],
        "photo": rel_photo_path,
        "bio": f"Experienced entrepreneur in {m['category']}. Active member of Gulabi Visionaries ({m['group']}).",
        "social": {
            "whatsapp": f"https://wa.me/91{m['phone']}",
            "email": f"mailto:{m['email']}"
        }
    })

with open(r"c:\Users\balwi\Desktop\gulabi\public\members_data.json", "w", encoding="utf-8") as f:
    json.dump(final_members, f, indent=2, ensure_ascii=False)

print(f"Processed {len(final_members)} members cleanly!")
