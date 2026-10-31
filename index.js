let savedLeads = [];
let favLeads = [];
const totalLeads = savedLeads + favLeads
let editId = null;
// render ids
const saveLead = document.getElementById("leadCard");
const favDbl = document.getElementById("leadCard2");

//inputs  ids
const addName = document.getElementById("add-input");
const addStatus = document.getElementById("add-status");
const addEmail = document.getElementById("add-email");
const addComen = document.getElementById("add-opinion-input");
const addDate = document.getElementById("add-date");
const inputValue = document.getElementById("search-input")
const saveBtn = document.getElementById("save-btn-input");

//buttons ids
const aboutBtn = document.getElementById("about-btn")
const contactBtn = document.getElementById("contact-btn")
const gitgubBtn = document.getElementById("github-btn")
const dashboardBtn = document.getElementById("dashboard-btn")
const dashboard = document.getElementById("dashboard");

//counts
const totalCountEl = document.getElementById("total-count");
const savedCountEl = document.getElementById("saved-count");
const favoriteCountEl = document.getElementById("favorite-count");



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

  if (
   addName.value.trim()=== "" ||
     addStatus.value.trim() === "" ||
  addEmail.value.trim() === "" ||
  addComen.value.trim() === "" ||
  addDate.value.trim() === ""
){
  
  alert("Please fill in all fields");
  return
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
                <p class ="saveds"><strong>Name:</strong> ${leads[i].name}</p>
                <p  class ="saveds"><strong>Status:</strong> ${leads[i].status}</p>
                <p  class ="saveds"><strong>Email:</strong> ${leads[i].email}</p>
                <p  class ="saveds"><strong>Comment:</strong> ${leads[i].coment}</p>
                <p  class ="saveds"><strong>Date of birth:</strong> ${leads[i].date}</p>
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
  console.log(child.children.length)
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


inputValue.addEventListener("input", function(){
  const searchLead = inputValue.value.trim().toLowerCase()
  
  const filterSaved = savedLeads.filter(function(lead){
  return lead.name.toLowerCase().includes(searchLead);

})
 const filterFav = favLeads.filter(function(lead){
  return lead.name.toLowerCase().includes(searchLead)

 })
  render(filterFav, favDbl)
  render(filterSaved, saveLead)
})

function updateDashboard() {
  const savedCount = savedLeads.length;
  const favoriteCount = favLeads.length;
  const totalCount = savedCount + favoriteCount;

  savedCountEl.textContent = savedCount;
  favoriteCountEl.textContent = favoriteCount;
  totalCountEl.textContent = totalCount;
}

dashboardBtn.addEventListener("click", function () {
  updateDashboard();

  dashboard.hidden = !dashboard.hidden;
  dashboardBtn.setAttribute("aria-expanded", String(!dashboard.hidden));
});