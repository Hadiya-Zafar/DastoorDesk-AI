import csv

found = False
with open('dastoor_desk_dataset.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        if len(row) > 3:
            text = row[3].lower()
            if "social media" in text or "unauthorized" in text or "hack" in text or "section" in text:
                if row[0] == 'PECA':
                    print(f"[{row[0]}] {row[1]}: {row[3][:150]}...")
                    found = True
if not found:
    print("Nothing found in PECA.")
