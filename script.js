async function fetchDigimons() {
    const response = await fetch('https://digimon-api.vercel.app/api/digimon');
    const data = await response.json();
    return data;
}

async function renderDigimons(digimons) {
    const digimonList = document.getElementById('digimon-list');
    digimonList.innerHTML = ''; // Limpa a lista antes de renderizar os digimons

    digimons.forEach(digimon => {
        const digimonCard = document.createElement('div');
        digimonCard.classList.add('digimon-card');

        const digimonName = document.createElement('h2');
        digimonName.textContent = digimon.name;

        const digimonImageContainer = document.createElement('div');
        digimonImageContainer.classList.add('digimon-image');

        const digimonImage = document.createElement('img');
        digimonImage.src = digimon.img;

        const digimonLevel = document.createElement('p');
        digimonLevel.textContent = `Level: ${digimon.level}`;

        digimonImageContainer.appendChild(digimonImage);
        digimonCard.appendChild(digimonName);
        digimonCard.appendChild(digimonImageContainer);
        digimonCard.appendChild(digimonLevel);

        digimonList.appendChild(digimonCard);
    });
}

async function searchDigimon() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const digimons = await fetchDigimons();
    const filteredDigimons = digimons.filter(digimon => digimon.name.toLowerCase().includes(searchTerm));
    renderDigimons(filteredDigimons);
}

// Renderiza todos os Digimons ao carregar a página
fetchDigimons().then(renderDigimons);
