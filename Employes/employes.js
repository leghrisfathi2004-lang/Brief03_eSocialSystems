  const modal = document.getElementById("employeeModal");
      const openBtn = document.getElementById("openModal");
      const closeBtn = document.getElementById("closeModal");
      const form = document.getElementById("employeeForm");
      const table = document.getElementById("employeesTable");

      let id = 1;

      openBtn.onclick = () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      };

      closeBtn.onclick = () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      };

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const company = document.getElementById("company").value;
        const salary = document.getElementById("salary").value;

        const row = `
          <tr class="border-t">
            <td class="p-3">${id++}</td>
            <td class="p-3">${name}</td>
            <td class="p-3">${company}</td>
            <td class="p-3">${salary} MAD</td>
          </tr>
        `;

        table.innerHTML += row;

        form.reset();
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      });
      const input = []
      function getEmpl() {
         
        
      }