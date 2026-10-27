let savedLeads = [];
let favLeads = [];

const saveLead = document.getElementById("leadCard");

const favDbl = document.getElementById("leadCard2");
const addName = document.getElementById("add-input");
const addStatus = document.getElementById("add-status");
const addEmail = document.getElementById("add-email");
const addComen = document.getElementById("add-opinion-input");
const addDate = document.getElementById("add-date");

const saveBtn = document.getElementById("save-btn-input");

saveBtn.addEventListener("click", function () {
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
  addName.value = "";
  addStatus.value = "";
  addEmail.value = "";
  addComen.value = "";
  addDate.value = "";
  render(savedLeads, saveLead);
});

function render(leads, element) {
  let leadsItem = "";
  for (let i = 0; i < leads.length; i++) {
    leadsItem += `
   <div class="lead-card" data-index = "${i}">
                <p class ="saveds"><strong>Ism:</strong> ${leads[i].name}</p>
                <p  class ="saveds"><strong>Holat:</strong> ${leads[i].status}</p>
                <p  class ="saveds"><strong>Email:</strong> ${leads[i].email}</p>
                <p  class ="saveds"><strong>Izoh:</strong> ${leads[i].coment}</p>
                <p  class ="saveds"><strong>Sana:</strong> ${leads[i].date}</p>
                
            </div>
    `;
  }
  element.innerHTML = leadsItem;
  element.scrollTop = 0;
}

saveLead.addEventListener("dblclick", function (event) {
  const card = event.target.closest(".lead-card");

  if (!card) return;

  const index = Number(card.dataset.index);
  const selectedLead = savedLeads[index];

  if (!selectedLead) return;

  const alreadyFavorite = favLeads.some((lead) => lead.id === selectedLead.id);

  if (alreadyFavorite) return;

  selectedLead.isFavorite = true; 
  favLeads.push(selectedLead);


  savedLeads.splice(index, 1);

  render(savedLeads, saveLead);
  render(favLeads, favDbl);

});
