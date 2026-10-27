let savedLeads = [];
let favLeads = [];
let editId = null;

const saveLead = document.getElementById("leadCard");
const favDbl = document.getElementById("leadCard2");
const addName = document.getElementById("add-input");
const addStatus = document.getElementById("add-status");
const addEmail = document.getElementById("add-email");
const addComen = document.getElementById("add-opinion-input");
const addDate = document.getElementById("add-date");

const saveBtn = document.getElementById("save-btn-input");

saveBtn.addEventListener("click", function () {
  if (editId !== null) {
    const lead =
      savedLeads.find((item) => item.id === editId) ||
      favLeads.find((item) => item.id === editId);

    if (lead) {
      lead.name = addName.value.trim();
      lead.status = addStatus.value.trim();
      lead.email = addEmail.value.trim();
      lead.coment = addComen.value.trim();
      lead.date = addDate.value;
    }

    editId = null;
    clearInputs();
    saveLeadsToStorage();
    render(savedLeads, saveLead);
    render(favLeads, favDbl);
    return;
  }

  const obj = {
    id: Date.now(),
    name: addName.value.trim(),
    status: addStatus.value.trim(),
    email: addEmail.value.trim(),
    coment: addComen.value.trim(),
    date: addDate.value,
    isFavorite: false,
  };
  savedLeads.push(obj);
  console.log(savedLeads);
  clearInputs();
  saveLeadsToStorage();
  render(savedLeads, saveLead);
});

function clearInputs() {
  addName.value = "";
  addStatus.value = "";
  addEmail.value = "";
  addComen.value = "";
  addDate.value = "";
}

function saveLeadsToStorage() {
  localStorage.setItem("savedLeads", JSON.stringify(savedLeads));
  localStorage.setItem("favLeads", JSON.stringify(favLeads));
}

function loadLeadsFromStorage() {
  const savedLeadsData = localStorage.getItem("savedLeads");
  const favLeadsData = localStorage.getItem("favLeads");

  if (savedLeadsData) {
    savedLeads = JSON.parse(savedLeadsData);
  }

  if (favLeadsData) {
    favLeads = JSON.parse(favLeadsData);
  }
}

function render(leads, element) {
  let leadsItem = "";
  for (let i = 0; i < leads.length; i++) {
    leadsItem += `
   <div class="lead-card" data-index = "${i}"  data-id="${leads[i].id}">
                <p class ="saveds"><strong>Ism:</strong> ${leads[i].name}</p>
                <p  class ="saveds"><strong>Holat:</strong> ${leads[i].status}</p>
                <p  class ="saveds"><strong>Email:</strong> ${leads[i].email}</p>
                <p  class ="saveds"><strong>Izoh:</strong> ${leads[i].coment}</p>
                <p  class ="saveds"><strong>Sana:</strong> ${leads[i].date}</p>
              <div class="child">
                <button class="trash-btn" type="button" aria-label="Lead options">
                  <img class="trash-icon" src="image/3dots.svg" alt="">
                </button>
              </div>
            </div>
            

    `;
  }
  element.innerHTML = leadsItem;
  element.scrollTop = 0;
}

saveLead.addEventListener("dblclick", function (event) {
  const card = event.target.closest(".lead-card");

  const index = Number(card.dataset.index);
  const selectedLead = savedLeads[index];

  if (!selectedLead) return;

  const alreadyFavorite = favLeads.some((lead) => lead.id === selectedLead.id);

  if (alreadyFavorite) return;

  selectedLead.isFavorite = true;
  favLeads.push(selectedLead);

  savedLeads.splice(index, 1);

  saveLeadsToStorage();

  render(savedLeads, saveLead);
  render(favLeads, favDbl);
});

function toggleCardMenu(event) {
  const optionsButton = event.target.closest(".trash-btn");

  if (!optionsButton) return;

  const child = optionsButton.closest(".child");
  if (!child) return;

  const existingMenu = child.querySelector(".card-menu");
  if (existingMenu) {
    existingMenu.remove();
    return;
  }

  const menu = document.createElement("div");
  menu.className = "card-menu";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "card-menu-item";
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "card-menu-item";
  deleteButton.textContent = "Delete";

  editButton.addEventListener("click", function () {
    const card = optionsButton.closest(".lead-card");
    const leadId = Number(card.dataset.id);
    const lead =
      savedLeads.find((item) => item.id === leadId) ||
      favLeads.find((item) => item.id === leadId);

    if (!lead) return;

    editId = lead.id;
    addName.value = lead.name;
    addStatus.value = lead.status;
    addEmail.value = lead.email;
    addComen.value = lead.coment;
    addDate.value = lead.date;
    menu.remove();
  });

  deleteButton.addEventListener("click", function () {
    const card = optionsButton.closest(".lead-card");
    const leadId = Number(card.dataset.id);

    savedLeads = savedLeads.filter((item) => item.id !== leadId);
    favLeads = favLeads.filter((item) => item.id !== leadId);

    saveLeadsToStorage();
    render(savedLeads, saveLead);
    render(favLeads, favDbl);
  });

  menu.append(editButton, deleteButton);
  child.append(menu);


  
}

saveLead.addEventListener("click", toggleCardMenu);
favDbl.addEventListener("click", toggleCardMenu);

loadLeadsFromStorage();
render(savedLeads, saveLead);
render(favLeads, favDbl);
