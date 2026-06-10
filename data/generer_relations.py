import json

noms = {
    "01": "Laurana",
    "02": "Sarah",
    "03": "Yann",
    "04": "Aloïsse",
    "05": "Anna",
    "06": "Esteban",
    "07": "Mélyssa",
    "08": "Oscar",
    "09": "Océane",
    "10": "Maxime",
    "11": "Héloïse",
    "12": "Nolann",
    "13": "Gwendall",
    "14": "Gwenola",
    "15": "Gab",
    "16": "Andy",
    "17": "Pauline",
    "18": "Mike",
    "19": "Vincent",
    "20": "Alexis",
    "21": "Malo",
    "22": "Erwan",
    "23": "Tristan"
}

relations = {}

for i in range(1, 24):

    id1 = str(i).zfill(2)
    relations[id1] = {}

    for j in range(1, 24):

        id2 = str(j).zfill(2)

        # relation avec soi-même
        if i == j:
            relations[id1][id2] = {
                "prenom": noms[id2],
                "couleur": "#c9c9c9",
                "description": "/"
            }

        # autres relations
        else:
            relations[id1][id2] = {
                "prenom": noms[id2],
                "couleur": "#B0E8C7",
                "description": ""
            }

# export JSON
with open("relations.json", "w", encoding="utf-8") as f:
    json.dump(relations, f, indent=2, ensure_ascii=False)

print("relations.json généré avec succès !")