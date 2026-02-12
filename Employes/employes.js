const modal = document.getElementById("employeeModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("employeeForm");
const table = document.getElementById("employeesTable");
const searchInput = document.getElementById("searchInput");
const companySelect = document.querySelectorAll("select");
let employeur = JSON.parse(localStorage.getItem("employers")) || [];


let employees =JSON.parse(localStorage.getItem("employees")) || [];
let id = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
console.log(employees);


openBtn.onclick = () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

closeBtn.onclick = () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

function renderEmployees(list = employees) {
  
  table.innerHTML = "";

  list.forEach((emp) => {
    table.innerHTML += `
    <tr class="border-t">
    <td class="p-3">${emp.id}</td>
        <td class="p-3">${emp.name}</td>
        <td class="p-3">${emp.company}</td>
        <td class="p-3">${emp.salary} MAD</td>
        </tr>
    `;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const company = document.getElementById("company").value;
  //select
  const companyId=document.getElementById("company")

  const selectOption=companyId.options[companyId.selectedIndex];
  const idCompany=Number(selectOption.dataset.id)

  
  console.log(idCompany);
  
  
  
  const salary = document.getElementById("salary").value;


  employees.push({
    id: id++,
    name,
    salary,
    company,
    employeurId:idCompany,
    
  });
  localStorage.setItem("employees",JSON.stringify(employees));
  renderEmployees(employees);
  
  form.reset();
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(value) ||
      emp.id.toString().includes(value),
    );
    
    renderEmployees(filtered);
  });




function loadEmployers() {
  companySelect.forEach((item)=>{
    employeur.forEach((emp) => {
      const option = document.createElement("option");
      option.value = emp.raisonSocial;
      option.textContent = emp.raisonSocial;
      option.dataset.id=emp.id
      item.appendChild(option);
    });
  })
}


companySelect[0].addEventListener("change", filterEmployees);

function filterEmployees() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCompany = companySelect[0].value; 
  const filtered = employees.filter((emp) => {
    const matchNameOrId =
      emp.name.toLowerCase().includes(searchValue) ||
      emp.id.toString().includes(searchValue);
      
      const matchCompany =
      selectedCompany === "Tous les employeurs" || emp.company === selectedCompany;
      
      return matchNameOrId && matchCompany;
  });

  renderEmployees(filtered);
}

loadEmployers();
renderEmployees()