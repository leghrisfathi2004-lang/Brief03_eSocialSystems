
//forms ---------------------------------------
let list = document.getElementById('historique');
let filter = document.getElementById('filterDate');
//events listner-------------------------------
document.addEventListener('DOMContentLoaded', () =>{
    const dark = localStorage.getItem('darkMode');
    if(dark == "enabled")
        document.documentElement.classList.add('dark');
    else
        document.documentElement.classList.remove('dark');

    const tableau = JSON.parse(localStorage.getItem('esocial_declarations'));
    HistoryShow(tableau);
});

filter.addEventListener('change', () =>{
    const tab = JSON.parse(localStorage.getItem('esocial_declarations'));
    let mot = filter.value;
    //padStar check if it 2 digital, if it isnt add 0 infront or in satar

    let tab1 = tab.filter(el => {
        const date = `${el.annee}-${el.mois.toString().padStart(2, '0')}`;
        return mot == '' || mot == date;
    });
    HistoryShow(tab1);
});

document.getElementById('btn').addEventListener('click', ()=>{
    let dark = localStorage.getItem('darkMode');
    dark = (dark === "enabled") ? "disabled" : "enabled";
    localStorage.setItem('darkMode', dark);
    document.documentElement.classList.toggle('dark')
})

//functions------------------------------------
function HistoryShow(tab){
    list.innerHTML = '';
    tab.forEach(el => {
        let date = MonthName(el.annee, el.mois);
        let newDiv = document.createElement('div');
        newDiv.className = "w-full";
        newDiv.innerHTML = `<div id="histo" class="w-full bg-gray-200 rounded-t-xl p-5 flex justify-between">
                    <div class="flex flex-col gap-0.5">
                        <h1 class="text-xl font-bold text-slate-800 leading-tight">
                            ${el.employeurName}
                        </h1>
                        <p class="text-xs font-medium text-slate-400 uppercase tracking-wide">
                            ${date}
                        </p>
                    </div>
                    <div class="relative flex flex-wrap items-center">
                        <input
                            class="relative h-6 w-12 cursor-pointer appearance-none rounded-xl ring-2 ring-slate-400 transition-colors ring-inset after:absolute after:top-0 after:left-0 after:h-6 after:w-6 after:rounded-full after:bg-white after:ring-2 after:ring-slate-600 after:transition-all after:ring-inset checked:bg-emerald-200 checked:ring-emerald-500 checked:after:left-6 checked:after:bg-green-700 checked:after:ring-emerald-500 hover:ring-slate-500 after:hover:ring-slate-600 checked:hover:bg-emerald-300 checked:hover:ring-emerald-600 checked:after:hover:ring-emerald-600 checked:focus:bg-emerald-400 checked:focus:ring-emerald-700 checked:after:focus:ring-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-200 disabled:after:ring-slate-300"
                            type="checkbox" onchange="ShowInfo(this)"/>
                    </div>
                </div>
                <div id="workers" class="hidden bg-white dark:bg-[var(--color-dark-surface)] rounded-b-xl shadow-sm overflow-hidden border border-slate-200 dark:border-[var(--color-border)]">
                </div>`;
                let tabWorkers = newDiv.querySelector('#workers');
                tabWorkers.appendChild(GetHistTab(el.cotisations, el.totalCotisations));
        list.appendChild(newDiv);
    });
}

function GetHistTab(tab, total){
    let table = document.createElement('table');
    table.className = 'w-full text-left border-collapse';
    table.innerHTML = `<thead class="bg-slate-100 dark:divide-[var(--color-border)] border-b border-slate-200 dark:border-[var(--color-border)] text-slate-600 dark:text-[var(--color-text-secondary)] text-sm uppercase">
                            <tr>
                                <th class="p-4 font-semibold">ID</th>
                                <th class="p-4 font-semibold">Nom Complet</th>
                                <th class="p-4 font-semibold text-right">Salaire (DH)</th>
                                <th class="p-4 font-semibold text-right">Cot. Salariale</th>
                                <th class="p-4 font-semibold text-right">Cot. Patronale</th>
                                <th class="p-4 font-semibold text-right text-blue-600">Total</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-slate-100 dark:bg-[var(--color-dark-hover)] text-slate-700 dark:text-[var(--color-text-secondary)]">
                        </tbody>

                        <tfoot class="bg-slate-50 dark:bg-[var(--color-dark-hover)] font-bold border-t-2 border-slate-200 dark:border-[var(--color-border)]">
                            <tr>
                                <td colspan="5" class="p-4 text-right text-slate-600">Total Final à Payer:</td>
                                <td class="p-4 text-right text-xl text-blue-700">${total} DH</td>
                            </tr>
                        </tfoot>`;
    let rows = "";
    tab.forEach(e => {
        rows +=`<tr class="hover:bg-slate-50 transition-colors">
                                <td class="p-4 text-slate-400 font-mono text-xs">${e.assureId}</td>
                                <td class="p-4 font-medium">${e.name}</td>
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