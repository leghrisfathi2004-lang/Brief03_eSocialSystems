// Buttons
const newEmpBtn = document.querySelector("#new-emp-btn");
const closeOverlay = document.querySelector("#close-overlay");
const addEmpBtn = document.querySelector("#emp-btn");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

// form section
const form = document.querySelector("#form");
const overlay = document.querySelector("#overlay");
const error = document.querySelector("#error");
const message = document.querySelector("#message");

// Inputs
const raisonSocial = document.querySelector("#raison-sociale");

// table section
const tbody = document.querySelector("#tbody");
const pagination = document.querySelector("#pagination");
const page = document.querySelector("#page");

// seceurs
const secteurs = [
  { value: "informatique", label: "Informatique" },
  { value: "logistique", label: "Logistique" },
  { value: "construction", label: "Construction et BTP" },
  { value: "agriculture", label: "Agriculture" },
  { value: "industrie", label: "Industrie" },
  { value: "commerce", label: "Commerce et Distribution" },
  { value: "restauration", label: "Restauration et Hôtellerie" },
  { value: "sante", label: "Santé" },
  { value: "education", label: "Éducation et Formation" },
  { value: "transport", label: "Transport" },
  { value: "textile", label: "Textile et Habillement" },
  { value: "banque", label: "Banque et Finance" },
  { value: "assurance", label: "Assurance" },
  { value: "immobilier", label: "Immobilier" },
  { value: "tourisme", label: "Tourisme" },
  { value: "telecommunication", label: "Télécommunication" },
  { value: "energie", label: "Énergie" },
  { value: "medias", label: "Médias et Communication" },
  { value: "securite", label: "Sécurité" },
  { value: "nettoyage", label: "Nettoyage" },
  { value: "automobile", label: "Automobile" },
  { value: "pharmacie", label: "Pharmacie" },
  { value: "artisanat", label: "Artisanat" },
  { value: "juridique", label: "Services Juridiques" },
  { value: "autre", label: "Autre" },
];

let employers = JSON.parse(localStorage.getItem("employers")) || [];
let count = 1;
let currPage = 1;
const itemsPerPage = 3;

const selectElement = document.querySelector("#select");

secteurs.forEach((secteur) => {
  const option = document.createElement("option");
  option.value = secteur.value;
  option.textContent = secteur.label;
  selectElement.appendChild(option);
});

// add new employer
function addNewEmployer(e) {
  e.preventDefault();
  if (!raisonSocial.value || !selectElement.value) {
    error.classList.remove("hide");
    return;
  }

  const newEmployer = {
    id: crypto.randomUUID(),
    raisonSocial: raisonSocial.value,
    sector: selectElement.value,
    employees: [],
  };

  employers.push(newEmployer);
  localStorage.setItem("employers", JSON.stringify(employers));
  error.classList.add("hide");
  clearInputs();
  showAllEmployers();
  // localStorage.clear();
}

console.log(employers);
addEmpBtn.addEventListener("click", addNewEmployer);

// clear inputs after add a new employer
function clearInputs() {
  raisonSocial.value = "";
  selectElement.value = "";
}

// show all employers
function showAllEmployers() {
  tbody.innerHTML = "";
  message.textContent = "";
  if (!employers.length) {
    message.textContent = "Aucune Employeurs";
  }

  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return employers.slice(startIndex, endIndex).forEach((employer, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td
                class="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 dark:stroke-slate-800"
                  >
                  ${employer.id}  
            </td>
            <td
                class="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 dark:stroke-slate-800"
                  >
                  ${employer.raisonSocial}  
            </td>
            <td
                class="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 dark:stroke-slate-800"
                  >
                  ${employer.sector}  
            </td>
            <td
                class="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 dark:stroke-slate-800 flex items-center gap-5"
                >
                <i class="fa-solid fa-user-pen cursor-pointer" onclick="editEmployer(${employer.id})"></i> 
                  <i class="fa-solid fa-trash cursor-pointer" onclick="deleteEmployer(${index})"></i>
                  </td>
        `;

    tbody.appendChild(tr);
    pagination.classList.remove("hide");
    updatePagination();
  });
}

showAllEmployers();

// delete employer
function deleteEmployer(id) {
  employers.splice(id, 1);
  // employers = employers.filter((employer) => employer.id !== id);

  localStorage.setItem("employers", JSON.stringify(employers));
  showAllEmployers();
}

// update employer
function updateEmployer(id) {
  employers = employers.map((employer) => {
    if (employer.id == id) {
      return {
        ...employer,
        raisonSocial: raisonSocial.value,
        sector: selectElement.value,
      };
    }
  });
}

function editEmployer(id) {
  const employer = employers.find((employer) => employer.id == id);

  if (employer) {
    raisonSocial.value = employer.raisonSocial;
    selectElement.value = employer.sector;
  }

  addEmpBtn.textContent = "Mettre a jour";
  form.classList.remove("hide");
  overlay.classList.remove("hide");
}

// Pagination Logic

function getTotalPages() {
  return Math.ceil(employers.length / itemsPerPage);
}

function updatePagination() {
  const totalPages = getTotalPages();

  page.textContent = currPage;

  if (currPage === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }

  if (currPage === totalPages || totalPages === 0) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }

  if (employers.length === 0 || totalPages <= 1) {
    pagination.classList.add("hide");
  } else {
    pagination.classList.remove("hide");
  }
}

prevBtn.addEventListener("click", () => {
  if (currPage > 1) {
    currPage--;
    showAllEmployers();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = getTotalPages();
  if (currPage < totalPages) {
    currPage++;
    showAllEmployers();
  }
});

// display/hide form
newEmpBtn.addEventListener("click", () => {
  form.classList.remove("hide");
  overlay.classList.remove("hide");
});
closeOverlay.addEventListener("click", () => {
  form.classList.add("hide");
  overlay.classList.add("hide");
});
