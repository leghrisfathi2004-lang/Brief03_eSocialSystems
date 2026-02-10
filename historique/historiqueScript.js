
//forms ---------------------------------------
let list = document.getElementById('historique');
let filter = document.getElementById('filterDate');
//events listner-------------------------------
document.addEventListener('DOMContentLoaded', () =>{
    const tableau = JSON.parse(jsontext);
    console.log(tableau);
    HistoryShow(tableau);
});

filter.addEventListener('change', () =>{
    const tab = JSON.parse(jsontext);
    let mot = filter.value;
    //padStar check if it 2 digital, if it isnt add 0 infront or in satar

    let tab1 = tab.filter(el => {
        const date = `${el.annee}-${el.mois.toString().padStart(2, '0')}`;
        return mot == '' || mot == date;
    });
    HistoryShow(tab1);
});

//temporary data testing--------------------------------
const jsontext =`[
  {
    "id": 1770628012839,
    "employeurId": 2,
    "employeurName": "Atlas Food",
    "mois": 5,
    "annee": 2025,
    "dateDepot": "2026-02-04T00:00:00.000Z",
    "createdAt": "2026-02-09T09:06:52.839Z",
    "cotisations": [
      {
        "assureId": 103,
        "nom": "Youssef Karim",
        "salaireDeclare": 2800,
        "cotisationSalariale": 112,
        "cotisationPatronale": 168,
        "totalCotisation": 280
      }
    ],
    "totalCotisations": 280,
    "delayMonths": 9,
    "penalty": 25.200000000000003,
    "totalFinal": 305.2
  },
  {
    "id": 1770628220670,
    "employeurId": 1,
    "employeurName": "TechNova SARL",
    "mois": 5,
    "annee": 2025,
    "dateDepot": "2026-02-04T00:00:00.000Z",
    "createdAt": "2026-02-09T09:10:20.670Z",
    "cotisations": [
      {
        "assureId": 101,
        "nom": "Ahmed El Amrani",
        "salaireDeclare": 3000,
        "cotisationSalariale": 120,
        "cotisationPatronale": 180,
        "totalCotisation": 300
      },
      {
        "assureId": 102,
        "nom": "Sara Benali",
        "salaireDeclare": 4500,
        "cotisationSalariale": 180,
        "cotisationPatronale": 270,
        "totalCotisation": 450
      }
    ],
    "totalCotisations": 750,
    "delayMonths": 9,
    "penalty": 67.5,
    "totalFinal": 817.5
  },
  {
    "id": 1770628289588,
    "employeurId": 1,
    "employeurName": "TechNova SARL",
    "mois": 4,
    "annee": 2026,
    "dateDepot": "2026-02-12T00:00:00.000Z",
    "createdAt": "2026-02-09T09:11:29.588Z",
    "cotisations": [
      {
        "assureId": 101,
        "nom": "Ahmed El Amrani",
        "salaireDeclare": 3000,
        "cotisationSalariale": 120,
        "cotisationPatronale": 180,
        "totalCotisation": 300
      },
      {
        "assureId": 102,
        "nom": "Sara Benali",
        "salaireDeclare": 4500,
        "cotisationSalariale": 180,
        "cotisationPatronale": 270,
        "totalCotisation": 450
      }
    ],
    "totalCotisations": 750,
    "delayMonths": 0,
    "penalty": 0,
    "totalFinal": 750
  },
  {
    "id": 1770628356903,
    "employeurId": 2,
    "employeurName": "Atlas Food",
    "mois": 6,
    "annee": 2025,
    "dateDepot": "2026-02-17T00:00:00.000Z",
    "createdAt": "2026-02-09T09:12:36.903Z",
    "cotisations": [
      {
        "assureId": 103,
        "nom": "Youssef Karim",
        "salaireDeclare": 2800,
        "cotisationSalariale": 112,
        "cotisationPatronale": 168,
        "totalCotisation": 280
      }
    ],
    "totalCotisations": 280,
    "delayMonths": 9,
    "penalty": 25.200000000000003,
    "totalFinal": 305.2
  }
]`



//functions------------------------------------
function HistoryShow(tab){
    list.innerHTML = '';
    tab.forEach(el => {
        let date = MonthName(el.annee, el.mois);
        let newDiv = document.createElement('div');
        newDiv.className = "w-full";
        newDiv.innerHTML = `<div class="w-full bg-gray-200 rounded-t-xl p-5 flex justify-between">
                    <div class="flex flex-col gap-0.5">
                        <h1 class="text-xl font-bold text-slate-800 leading-tight">
                            ${el.employeurName}
                        </h1>
                        <p class="text-xs font-medium text-slate-400 uppercase tracking-wide">
                            ${date}
                        </p>
                    </div>
                    <div class="relative flex flex-wrap items-center">
                        <input id="btn"
                            class="relative h-6 w-12 cursor-pointer appearance-none rounded-xl ring-2 ring-slate-400 transition-colors ring-inset after:absolute after:top-0 after:left-0 after:h-6 after:w-6 after:rounded-full after:bg-white after:ring-2 after:ring-slate-600 after:transition-all after:ring-inset checked:bg-emerald-200 checked:ring-emerald-500 checked:after:left-6 checked:after:bg-green-700 checked:after:ring-emerald-500 hover:ring-slate-500 after:hover:ring-slate-600 checked:hover:bg-emerald-300 checked:hover:ring-emerald-600 checked:after:hover:ring-emerald-600 checked:focus:bg-emerald-400 checked:focus:ring-emerald-700 checked:after:focus:ring-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-200 disabled:after:ring-slate-300"
                            type="checkbox" onchange="ShowInfo(this)"/>
                    </div>
                </div>
                <div id="workers" class="hidden bg-white rounded-b-xl shadow-sm overflow-hidden border border-slate-200">
                </div>`;
                let tabWorkers = newDiv.querySelector('#workers');
                tabWorkers.appendChild(GetHistTab(el.cotisations, el.totalCotisations));
        list.appendChild(newDiv);
    });
}

function GetHistTab(tab, total){
    let table = document.createElement('table');
    table.className = 'w-full text-left border-collapse';
    table.innerHTML = `<thead class="bg-slate-100 border-b border-slate-200 text-slate-600 text-sm uppercase">
                            <tr>
                                <th class="p-4 font-semibold">ID</th>
                                <th class="p-4 font-semibold">Nom Complet</th>
                                <th class="p-4 font-semibold text-right">Salaire (DH)</th>
                                <th class="p-4 font-semibold text-right">Cot. Salariale</th>
                                <th class="p-4 font-semibold text-right">Cot. Patronale</th>
                                <th class="p-4 font-semibold text-right text-blue-600">Total</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-slate-100 text-slate-700">
                        </tbody>

                        <tfoot class="bg-slate-50 font-bold border-t-2 border-slate-200">
                            <tr>
                                <td colspan="5" class="p-4 text-right text-slate-600">Total Final à Payer:</td>
                                <td class="p-4 text-right text-xl text-blue-700">${total} DH</td>
                            </tr>
                        </tfoot>`;
    let rows = "";
    tab.forEach(e => {
        rows +=`<tr class="hover:bg-slate-50 transition-colors">
                                <td class="p-4 text-slate-400 font-mono text-xs">${e.assureId}</td>
                                <td class="p-4 font-medium">${e.nom}</td>
                                <td class="p-4 text-right">${e.salaireDeclare}</td>
                                <td class="p-4 text-right text-red-500">${e.cotisationSalariale}</td>
                                <td class="p-4 text-right text-red-500">${e.cotisationPatronale}</td>
                                <td class="p-4 text-right font-bold text-blue-600">${e.totalCotisation}</td>
                            </tr>`;
    });
    let tbody = table.querySelector('tbody')
    tbody.innerHTML = rows;
    return table;
}

function MonthName(annee, mois) {
    const date = new Date(annee, mois - 1);
    const dateM = date.toLocaleString('fr-FR', { month: 'long' });
    return dateM + " " + annee;
}

function ShowInfo(el){
    const el1 = el.parentElement;
    const parentDiv = el1.parentElement;
    const tab = parentDiv.nextElementSibling;
    tab.classList.toggle('hidden');
}

