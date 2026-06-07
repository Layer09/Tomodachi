const container = document.getElementById("news-container");

function formatDate(dateString){

    const d = new Date(dateString);

    return d.toLocaleString("fr-FR", {
        day:"2-digit",
        month:"2-digit",
        year:"numeric",
        hour:"2-digit",
        minute:"2-digit"
    });
}

async function loadMiis(){

    const response = await fetch("data/miis.json");

    return await response.json();
}

async function loadNews(){

    const miis = await loadMiis();

    const folders = [
        "2026-05-06","2026-05-07","2026-05-08"//,"2026-05-06","2026-05-06","2026-05-06","2026-05-06","2026-05-06","2026-05-06","2026-05-06","2026-05-06",
    ];

    for(const folder of folders){

        const response =
        await fetch(`data/news/${folder}/news.json`);

        const news = await response.json();

        for(const item of news){

            displayNews(item, folder, miis);
        }
    }
}

function getMii(id, miis){

    return miis.find(m=>m.id===id);
}

function displayNews(news, folder, miis){

    const card = document.createElement("div");

    card.className = "news-card";

    let mediaHTML = "";

    news.media.forEach(file=>{

        const path =
        `data/news/${folder}/${file}`;

        if(file.endsWith(".mp4")){

            mediaHTML += `
            <video controls>
                <source src="${path}">
            </video>`;
        }

        else{

            mediaHTML += `
            <img src="${path}">
            `;
        }
    });

    card.innerHTML = `
    <div class="news-date">
        ${formatDate(news.datetime)}
    </div>

    <h3>${news.interaction}</h3>

    <p>${news.commentaire}</p>

    <h4>Principaux</h4>

    <div class="people">
        ${news.principaux.map(id=>{

            const mii = getMii(id,miis);

            return `
            <div class="person">
                <img src="${mii.icone}">
                ${mii.prenom}
            </div>`;
        }).join("")}
    </div>

    <h4>Secondaires</h4>

    <div class="people">
        ${news.secondaires.map(id=>{

            const mii = getMii(id,miis);

            return `
            <div class="person">
                <img src="${mii.icone}">
                ${mii.prenom}
            </div>`;
        }).join("")}
    </div>

    <div class="gallery">
        ${mediaHTML}
    </div>
    `;

    container.prepend(card);
}

loadNews();
