import csv

cats = set()
try:
    with open('dastoor_desk_dataset.csv', 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader) # skip header
        for row in reader:
            if len(row) > 0:
                cats.add(row[0])
    print("Unique categories in CSV:", cats)
except FileNotFoundError:
    print("File not found")
except Exception as e:
    print(f"Error: {e}")
