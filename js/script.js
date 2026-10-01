const photos = [
  {
    file: "angulo_central.JPG",
    title: "Ângulo Central",
    category: "angulo",
    label: "Ângulo",
    technique: "Foto tirada em ângulo central com os objetos em foco, com cunho profissional"
  },
  {
    file: "angulo_diagonal_cima.JPG",
    title: "Ângulo Diagonal de Cima",
    category: "angulo",
    label: "Ângulo",
    technique: "Ângulo visto de cima diagonalmente, dando um senso dinâmico à foto"
  },
  {
    file: "angulo_diagonal_baixo.JPG",
    title: "Ângulo Diagonal de Baixo",
    category: "angulo",
    label: "Ângulo",
    technique: "Vista por baixo com um senso de movimento, dando foco ao vaso com flor"
  },
  {
    file: "enquadr_central.JPG",
    title: "Enquadramento Central",
    category: "enquadramento",
    label: "Enquadramento",
    technique: "Enquadramento central afastado, trazendo um foco menos instrusivo para a foto"
  },
  {
    file: "enquadr_esquerdo.JPG",
    title: "Enquadramento à Esquerda",
    category: "enquadramento",
    label: "Enquadramento",
    technique: "Enquadramento esquerdo com os objetos de lado"
  },
  {
    file: "enquadr_direito.JPG",
    title: "Enquadramento à Direita",
    category: "enquadramento",
    label: "Enquadramento",
    technique: "Enquadramento direito com os objetos virados para a luz"
  },
  {
    file: "vertical.JPG",
    title: "Composição Vertical",
    category: "regra_tercos",
    label: "Regra dos Terços",
    technique: "Objeto com senso de verticalidade por estar alinhado à segunda linha dos terços"
  },
  {
    file: "horizontal.JPG",
    title: "Composição Horizontal",
    category: "regra_tercos",
    label: "Regra dos Terços",
    technique: "Objeto ocupando o segundo terço horizontal"
  },
  {
    file: "quadrantes.JPG",
    title: "Divisão em Quadrantes",
    category: "regra_tercos",
    label: "Regra dos Terços",
    technique: "Objeto posicionado nos quatro quadrantes direitos mais baixos"
  },
  {
    file: "ponto_focal.JPG",
    title: "Ponto Focal",
    category: "regra_tercos",
    label: "Regra dos Terços",
    technique: "Uso de pontos focais (intersecções entre linhas dos terços) para dar foco ao rosto do objeto"
  },
  {
    file: "dupla expo ulisses.png",
    title: "Dupla Exposição",
    category: "dupla_exposicao",
    label: "Dupla Exposição",
    technique: "Técnica de dupla exposição com fotografia no PhotoShop"
  },
  {
    file: "espelhos1.jpg",
    title: "Espelhos e Paisagem 1",
    category: "espelhos",
    label: "Espelhos e paisagem",
    technique: "Fotografia utilizando espelhos de diferentes formatos"
  },
  {
    file: "espelhos2.jpg",
    title: "Espelhos e Paisagem 2",
    category: "espelhos",
    label: "Espelhos e paisagem",
    technique: "Fotografia utilizando espelhos de diferentes formatos"
  },
  {
    file: "espelhos3.jpg",
    title: "Espelhos e Paisagem 3",
    category: "espelhos",
    label: "Espelhos e paisagem",
    technique: "Fotografia utilizando espelhos de diferentes formatos"
  },
  {
    file: "lightpaint.jpg",
    title: "Light Paint",
    category: "lightpaint",
    label: "Light Paint",
    technique: "Foto com obturador lento usando flash do celular, criando efeito de pintar com a luz"
  },
  {
    file: "colagem.png",
    title: "Fotocolagem",
    category: "fotocolagem",
    label: "Fotocolagem",
    technique: "Edição em photoshop com foto centralizada"
  }
];

const galleryGrid = document.querySelector("#galleryGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const modal = document.querySelector("#photoModal");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalTechnique = document.querySelector("#modalTechnique");
const closeButtons = document.querySelectorAll("[data-close-modal]");

function createCard(photo, index) {
  const card = document.createElement("article");
  card.className = "photo-card";
  card.dataset.category = photo.category;

  card.innerHTML = `
    <button class="photo-button" type="button" aria-label="Ampliar ${photo.title}">
      <div class="photo-image-wrap">
        <img src="img/${photo.file}" alt="${photo.title}" loading="lazy">
        <span class="photo-number">${String(index + 1).padStart(2, "0")}</span>
      </div>
    </button>
    <div class="photo-info">
      <div class="photo-meta">
        <span>${photo.label}</span>
        <span>${String(index + 1).padStart(2, "0")}/${String(photos.length)}</span>
      </div>
      <h3 class="photo-title">${photo.title}</h3>
      <p class="photo-caption"><strong>Técnicas:</strong> ${photo.technique}</p>
    </div>
  `;

  card.querySelector(".photo-button").addEventListener("click", () => openModal(photo));
  return card;
}

function renderGallery(filter = "all") {
  galleryGrid.innerHTML = "";

  photos.forEach((photo, index) => {
    if (filter !== "all" && photo.category !== filter) return;
    galleryGrid.appendChild(createCard(photo, index));
  });
}

function openModal(photo) {
  modalImage.src = `img/${photo.file}`;
  modalImage.alt = photo.title;
  modalTitle.textContent = photo.title;
  modalCategory.textContent = `${photo.label} • fotografia`;
  modalTechnique.textContent = `Técnicas: ${photo.technique}`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderGallery(button.dataset.filter);
  });
});

closeButtons.forEach((button) => button.addEventListener("click", closeModal));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});

renderGallery();
