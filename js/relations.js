let miis;
let relations;

async function init(){

    miis =
    await (await fetch("data/miis.json")).json();

    relations =
    await (await fetch("data/relations.json")).json();

    buildTable();
    buildSelectors();
}

function buildTable(){

    const table =
    document.getElementById("relationTable");

    let html = "<tr><th></th>";

    miis.forEach(m=>{

        html += `<th>${m.prenom}</th>`;
    });

    html += "</tr>";

    miis.forEach(m1=>{

        html += `<tr><th>${m1.prenom}</th>`;

        miis.forEach(m2=>{

            let color = "#FFFFFF";
            let text = "";

            if(
                relations[m1.id] &&
                relations[m1.id][m2.id]
            ){
                color =
                relations[m1.id][m2.id].couleur;

                text =
                relations[m1.id][m2.id].description;
            }

            html += `
            <td
                style="background:${color};"
                title="${text}"
            >
            </td>`;
        });

        html += "</tr>";
    });

    table.innerHTML = html;
}

function buildSelectors(){

    const s1 =
    document.getElementById("mii1");

    const s2 =
    document.getElementById("mii2");

    miis.forEach(m=>{

        s1.innerHTML +=
        `<option value="${m.id}">
        ${m.prenom}
        </option>`;

        s2.innerHTML +=
        `<option value="${m.id}">
        ${m.prenom}
        </option>`;
    });
}

document
.getElementById("showRelation")
.addEventListener("click", ()=>{

    const id1 =
    document.getElementById("mii1").value;

    const id2 =
    document.getElementById("mii2").value;

    const relation =
    relations[id1]?.[id2];

    document.getElementById("result")
    .innerHTML = relation
    ? `
      <h3>${relation.description}</h3>
      <p>Niveau : ${relation.niveau}/100</p>
      `
    : "Aucune relation enregistrée";
});

init();
