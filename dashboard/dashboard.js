document.addEventListener("DOMContentLoaded", the_switcher);

function the_switcher() {
  let reswitch = document.querySelector("#mois");
  let switch_button = document.querySelector("#switch_button");
  const ctx = document.querySelector(".mychart").getContext("2d");

  const cotisationsData = [
    {id:1770628012839, employeurId:2, mois:1, annee:2025, totalCotisations:280},
    {id:1770628220670, employeurId:1, mois:5, annee:2025, totalCotisations:750},
    {id:1770628289588, employeurId:1, mois:4, annee:2026, totalCotisations:750},
    {id:1770628356903, employeurId:2, mois:6, annee:2025, totalCotisations:280}
  ];
  function prepareMonthlyData(year = 2025) {
    const monthlyData = Array(12).fill(0);
    
    cotisationsData
      .filter(item => item.annee === year)
      .forEach(item => {
        monthlyData[item.mois - 1] += item.totalCotisations;
      });
    
    return monthlyData;
  }
  function prepareYearlyData() {
    const years = {};
    
    cotisationsData.forEach(item => {
      if (!years[item.annee]) {
        years[item.annee] = 0;
      }
      years[item.annee] += item.totalCotisations;
    });
    
    return {
      labels: Object.keys(years).sort(),
      data: Object.keys(years).sort().map(year => years[year])
    };
  }

  const config_mois = {
    type: "bar",
    data: {
      labels: [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ],
      datasets: [{
        label: "Cotisations (MAD)",
        data: prepareMonthlyData(2025),
        backgroundColor: "#6f03fc",
      }]
    },
    options: { 
      responsive: true, 
      scales: { 
        y: { beginAtZero: true } 
      } 
    }
  };

  let myChart = new Chart(ctx, config_mois);

  switch_button.addEventListener("click", () => {
    myChart.destroy();
    
    const yearlyData = prepareYearlyData();
    
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: yearlyData.labels,
        datasets: [{
          label: "Cotisations (MAD)",
          data: yearlyData.data,
          backgroundColor: "#eb4f34",
        }]
      },
      options: { 
        responsive: true, 
        scales: { 
          y: { beginAtZero: true } 
        } 
      }
    });
  });

  reswitch.addEventListener("click", () => {
    myChart.destroy();
    myChart = new Chart(ctx, config_mois);
  });
}
//////////////////
function prepareChartData(cotisationsData) {
  
  const monthlyData = Array(12).fill(0); 
  
  cotisationsData.forEach(item => {
    const monthIndex = item.mois - 1; 
    monthlyData[monthIndex] += item.totalCotisations;
  });
  
  return monthlyData;
}

function prepareYearlyData(cotisationsData) {
  const yearlyData = {};
  
  cotisationsData.forEach(item => {
    if (!yearlyData[item.annee]) {
      yearlyData[item.annee] = 0;
    }
    yearlyData[item.annee] += item.totalCotisations;
  });
  
  return yearlyData;
}

//finalisation ----------------------------------
document.addEventListener('DOMContentLoaded', ()=>{
  let tc = document.getElementById('totalCollecte');
  let sm = document.getElementById('SalaireM');
  let tab = JSON.parse(localStorage.getItem('esocial_declarations'));
  let total = tab.reduce((sum, cur) => sum + cur.totalFinal, 0);
  tc.textContent = total;
  let salires = 0;
  let count = 0;
  tab.forEach(el =>{
    salires = el.cotisations.reduce((sum, cur) => sum + cur.salaireDeclare, 0);
    count+= el.cotisations.length;
  });
  sm.textContent = Math.floor(salires/count);
});