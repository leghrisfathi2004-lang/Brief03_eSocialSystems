// Buttons
const newEmpBtn = document.querySelector("#new-emp-btn");
const closeOverlay = document.querySelector("#close-overlay");
const closeOverlay2 = document.querySelector("#close-overlay-2");
const addEmpBtn = document.querySelector("#emp-btn");
const updateEmpBtn = document.querySelector("#update-btn");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

// form section
const form = document.querySelector("#form");
const updateForm = document.querySelector("#form-update");
const overlay = document.querySelector("#overlay");
const error = document.querySelector("#error");
const message = document.querySelector("#message");

// Inputs
const raisonSocial = document.querySelector("#raison-sociale");
const raisonSocial2 = document.querySelector("#raison-sociale-2");

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
let searchedEmployers = [];
let count = parseInt(localStorage.getItem("employerId")) || 1;
let currPage = 1;
const itemsPerPage = 3;
let isSearching = false;

const selectElement = document.querySelector("#select");

const selectElement2 = document.querySelector("#select-2");

secteurs.forEach((secteur) => {
  const option = document.createElement("option");
  option.value = secteur.value;
  option.textContent = secteur.label;
  selectElement.appendChild(option);
});
secteurs.forEach((secteur) => {
  const option = document.createElement("option");
  option.value = secteur.value;
  option.textContent = secteur.label;
  selectElement2.appendChild(option);
});

function showToast(message, color, time) {
  let msg = document.getElementById("toast");
  msg.textContent = message;
  setTimeout(() => {
    msg.classList.remove("-translate-x-full", "opacity-0");
    msg.classList.add("translate-x-0", "opacity-100", `bg-${color}-500/90`);
  });
  setTimeout(() => {
    msg.classList.remove("translate-x-0", "opacity-100");
    msg.classList.add("-translate-x-full", "opacity-0", `bg-${color}-500/90`);
  }, time);
}

// add new employer
function addNewEmployer(e) {
  e.preventDefault();
  if (!raisonSocial.value || !selectElement.value) {
    error.classList.remove("hide");
    return;
  }

  const newEmployer = {
    id: count++,
    raisonSocial: raisonSocial.value,
    sector: selectElement.value,
  };

  employers.push(newEmployer);
  localStorage.setItem("employerId", JSON.stringify(count));
  localStorage.setItem("employers", JSON.stringify(employers));
  error.classList.add("hide");
  clearInputs();
  showAllEmployers();
  showToast("Employeur ajouter avec succee", "green", 3000);
  form.classList.add("hide");
  overlay.classList.add("hide");

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

  const totalPages = Math.ceil(employers.length / itemsPerPage);
  if (currPage > totalPages && totalPages > 0) {
    currPage = totalPages;
    pagination.classList.add("hide");
  }

  showAllEmployers();
  showToast("Employeur suprimer avec succee", "green", 1000);
}

// update employer
let foundEmployer = {};
function editEmployer(id) {
  foundEmployer = employers.find((employer) => employer.id == id);

  if (foundEmployer) {
    raisonSocial2.value = foundEmployer.raisonSocial;
    selectElement2.value = foundEmployer.sector;
  }

  updateForm.classList.remove("hide");
  overlay.classList.remove("hide");
}

function updateEmployer(e) {
  e.preventDefault();
  employers = employers.map((employer) => {
    if (employer.id == foundEmployer.id) {
      return {
        ...employer,
        raisonSocial: raisonSocial2.value,
        sector: selectElement2.value,
      };
    }

    return employer;
  });

  localStorage.setItem("employers", JSON.stringify(employers));

  foundEmployer = {};
  raisonSocial2.value = "";
  selectElement2.value = "";
  showAllEmployers();
  showToast("Employeur modifier avec succee", "green", 3000);
  updateForm.classList.add("hide");
  overlay.classList.add("hide");
}
updateEmpBtn.addEventListener("click", updateEmployer);
// Pagination Logic

function getTotalPages() {
  if (isSearching) {
    return Math.ceil(searchedEmployers.length / itemsPerPage);
  } else {
    return Math.ceil(employers.length / itemsPerPage);
  }
}

function updatePagination() {
  const totalPages = getTotalPages();

  const arr = isSearching ? searchedEmployers : employers;

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

  if (arr.length === 0 || totalPages <= 1) {
    pagination.classList.add("hide");
  } else {
    pagination.classList.remove("hide");
  }
}

prevBtn.addEventListener("click", () => {
  if (currPage > 1) {
    currPage--;
    if (isSearching) {
      displaySearchedEmployers(searchedEmployers);
    } else {
      showAllEmployers();
    }
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = getTotalPages();
  if (currPage < totalPages) {
    currPage++;
    if (isSearching) {
      displaySearchedEmployers(searchedEmployers);
    } else {
      showAllEmployers();
    }
  }
});

// Filter By search
const searchFilter = document.querySelector("#search-filter");

searchFilter.addEventListener("input", (e) => {
  message.textContent = "";

  searchedEmployers = employers.filter(
    (employer) =>
      employer.raisonSocial
        .toLowerCase()
        .includes(e.target.value.toLowerCase()) ||
      employer.sector.toLowerCase().includes(e.target.value.toLowerCase()),
  );
  displaySearchedEmployers(searchedEmployers);
  isSearching = true;
  // console.log(searchedEmployers);
});

function displaySearchedEmployers(searchedEmployers) {
  tbody.innerHTML = "";
  message.textContent = "";

  if (!searchedEmployers.length) {
    message.textContent = "Aucune Employeurs";
    pagination.classList.add("hide");
  }

  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return searchedEmployers
    .slice(startIndex, endIndex)
    .forEach((employer, index) => {
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

// display/hide form
newEmpBtn.addEventListener("click", () => {
  form.classList.remove("hide");
  overlay.classList.remove("hide");
});
closeOverlay.addEventListener("click", () => {
  form.classList.add("hide");
  overlay.classList.add("hide");
});
closeOverlay2.addEventListener("click", () => {
  updateForm.classList.add("hide");
  overlay.classList.add("hide");
});

// Dark Mode
tailwind.config = {
  darkMode: "class",
};

const darkMode = localStorage.getItem("darkMode");

window.addEventListener("DOMContentLoaded", () => {
  const darkMode = localStorage.getItem("darkMode");

  if (darkMode === "enabled") {
    document.documentElement.classList.add("dark");
  }
});
const darkBtn = document.querySelector("#dark-btn");
darkBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  console.log(isDark);
  console.log(darkMode);
});
