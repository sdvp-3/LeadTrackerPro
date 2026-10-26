let savedLeads = [];

const obj = {};

const saveLead = document.getElementById("leadCard");
const addName = document.getElementById("add-input");
const addStatus = document.getElementById("add-status");
const addEmail = document.getElementById("add-email");
const addComen = document.getElementById("add-opinion-input");
const addDate = document.getElementById("add-date");

const saveBtn = document.getElementById("save-btn-input");

saveBtn.addEventListener("click", function () {
  const obj = {
    name: addName.value.trim(),
    status: addStatus.value.trim(),
    email: addEmail.value.trim(),
    coment: addComen.value.trim(),
    date: addDate.value,
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
   <div class="lead-card">
                <p class ="saveds"><strong>Ism:</strong> ${leads[i].name}</p>
                <p  class ="saveds"><strong>Holat:</strong> ${leads[i].status}</p>
                <p  class ="saveds"><strong>Email:</strong> ${leads[i].email}</p>
                <p  class ="saveds"><strong>Izoh:</strong> ${leads[i].coment}</p>
                <p  class ="saveds"><strong>Sana:</strong> ${leads[i].date}</p>
                
            </div>
    `;
  }
  element.innerHTML = leadsItem;
}
