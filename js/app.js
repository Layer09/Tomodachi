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

async function loadNews() {

    const miis = await loadMiis();

    const response = await fetch("data/news/news.json");

    if (!response.ok) {
        throw new Error(
            `Impossible de charger news.json (${response.status})`
        );
    }

    const news = await response.json();

    news.sort((a, b) => {

        const dateA = Date.parse(a.datetime);
        const dateB = Date.parse(b.datetime);

        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;

        return dateB - dateA;
    });

    news.forEach(item => {
        displayNews(item, miis);
    });
}

function getMii(id, miis){

    return miis.find(m=>m.id===id);
}

function displayNews(news, miis) {

    const card = document.createElement("div");
    card.className = "news-card";

    // -------------------------
    // MEDIA
    // -------------------------
    let mediaHTML = "";

    news.media.forEach(file => {

        const path = `data/news/medias/${file}`;

        if (file.endsWith(".mp4")) {

            mediaHTML += `
                <video controls>
                    <source src="${path}">
                </video>
            `;
        } else {

            mediaHTML += `
                <img src="${path}">
            `;
        }
    });

    // -------------------------
    // PRINCIPAUX
    // -------------------------
    const principauxHTML = news.principaux
        .filter(id => id !== "00")
        .map(id => {

            const mii = getMii(id, miis);
            if (!mii) return "";

            return `
                <div class="person">
                    <img src="${mii.icone}">
                    ${mii.prenom}
                </div>
            `;
        })
        .join("");

    // -------------------------
    // SECONDAIRES
    // -------------------------
    const secondairesHTML = news.secondaires
        .filter(id => id !== "00")
        .map(id => {

            const mii = getMii(id, miis);
            if (!mii) return "";

            return `
                <div class="person">
                    <img src="${mii.icone}">
                    ${mii.prenom}
                </div>
            `;
        })
        .join("");

    // -------------------------
    // HTML FINAL
    // -------------------------
    card.innerHTML = `
        <div class="news-date">
            ${formatDate(news.datetime)}
        </div>

        <h3>${news.interaction}</h3>

        <p>${news.commentaire}</p>

        ${principauxHTML.trim() !== "" ? `
            <h4>Personnes principales</h4>
            <div class="people">
                ${principauxHTML}
            </div>
        ` : ""}

        ${secondairesHTML.trim() !== "" ? `
            <h4>Personnes secondaires</h4>
            <div class="people">
                ${secondairesHTML}
            </div>
        ` : ""}

        <div class="gallery">
            ${mediaHTML}
        </div>
    `;

    container.appendChild(card);
}
loadNews();
