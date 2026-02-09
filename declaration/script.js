// ===================== DATA =====================
const employeurs = [
  { id: 1, wh: "TechNova SARL", secteur: "Informatique" },
  { id: 2, wh: "Atlas Food", secteur: "Agroalimentaire" },
  { id: 3, wh: "Blue Transport", secteur: "Logistique" }
];

const assures = [
  { id: 101, nom: "Ahmed El Amrani", salaireMensuel: 3000, employeurId: 1 },
  { id: 102, nom: "Sara Benali", salaireMensuel: 4500, employeurId: 1 },
  { id: 103, nom: "Youssef Karim", salaireMensuel: 2800, employeurId: 2 },
  { id: 104, nom: "Imane Zahra", salaireMensuel: 5200, employeurId: 3 }
];
const form = document.getElementById("declarationForm");
const employeurSelect = document.getElementById("employeurSelect");
const moisInput = document.getElementById("moisSelect");
const anneeInput = document.getElementById("anneeSelect");
const declarationDateInput = document.getElementById("declarationDate");

const errorBox = document.getElementById("errorBox");
const resultBox = document.getElementById("resultBox");
const resultContent = document.getElementById("resultContent");

const STORAGE_KEY_DECLARATIONS = "esocial_declarations";

function getDeclarations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DECLARATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDeclarations(data) {
  localStorage.setItem(STORAGE_KEY_DECLARATIONS, JSON.stringify(data));
}

let declarations = getDeclarations();

// ===================== UI =====================
function fillEmployeurDropdown() {
  employeurs.forEach(emp => {
    const option = document.createElement("option");
    option.value = emp.id;
    option.textContent = emp.wh;
    employeurSelect.appendChild(option);
  });
}
fillEmployeurDropdown();

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function renderResult(result) {
  resultBox.classList.remove("hidden");
  resultContent.innerHTML = `
    <p><strong>Total cotisations:</strong> ${result.totalCotisations.toFixed(2)} DH</p>
    <p><strong>Retard (mois):</strong> ${result.delayMonths}</p>
    <p><strong>Pénalité:</strong> ${result.penalty.toFixed(2)} DH</p>
    <p class="mt-2 text-lg font-bold">
      Total à payer: ${result.totalFinal.toFixed(2)} DH
    </p>
  `;
}


function getAssuresByEmployeur(employeurId) {
  return assures.filter(a => a.employeurId === employeurId);
}

function validateDeclarationInputs({ employeurId, mois, annee }) {
  if (!employeurId) return "Employeur obligatoire";
  if (!mois || mois < 1 || mois > 12) return "Mois invalide";
  if (!annee || annee < 2000) return "Année invalide";
  return null;
}

function declarationExists(employeurId, mois, annee) {
  return declarations.some(d =>
    d.employeurId === employeurId &&
    d.mois === mois &&
    d.annee === annee
  );
}

function calculateCotisationForAssure(assure) {
  const PLAFOND = 6000;
  const TAUX_SALARIAL = 0.04;
  const TAUX_PATRONAL = 0.06;

  const base = Math.min(assure.salaireMensuel, PLAFOND);

  return {
    assureId: assure.id,
    nom: assure.nom,
    salaireDeclare: base,
    cotisationSalariale: base * TAUX_SALARIAL,
    cotisationPatronale: base * TAUX_PATRONAL,
    totalCotisation: base * (TAUX_SALARIAL + TAUX_PATRONAL)
  };
}

function calculateTotalCotisations(cotisations) {
  return cotisations.reduce((sum, c) => sum + c.totalCotisation, 0);
}

function getDeclarationDeadline(mois, annee) {
  return new Date(annee, mois - 1, 15); 
}

function calculateDelayInMonths(declarationDate, mois, annee) {
  const deadline = getDeclarationDeadline(mois, annee);
  if (declarationDate <= deadline) return 0;

  const diffDays = Math.ceil((declarationDate - deadline) / (1000 * 60 * 60 * 24));
  return Math.ceil(diffDays / 30);
}

function calculatePenalty(total, delayMonths) {
  return total * 0.01 * delayMonths;
}

function processDeclaration({ employeurId, mois, annee, declarationDate }) {
  const assuresList = getAssuresByEmployeur(employeurId);
  if (!assuresList.length) throw new Error("Aucun assuré pour cet employeur");

  const cotisations = assuresList.map(calculateCotisationForAssure);
  const totalCotisations = calculateTotalCotisations(cotisations);
  const delayMonths = calculateDelayInMonths(declarationDate, mois, annee);
  const penalty = calculatePenalty(totalCotisations, delayMonths);

  return {
    cotisations,
    totalCotisations,
    delayMonths,
    penalty,
    totalFinal: totalCotisations + penalty
  };
}

form.addEventListener("submit", e => {
  e.preventDefault();
  errorBox.classList.add("hidden");
  resultBox.classList.add("hidden");

  const inputs = {
    employeurId: Number(employeurSelect.value),
    mois: Number(moisInput.value),
    annee: Number(anneeInput.value),
    declarationDate: declarationDateInput.value
      ? new Date(declarationDateInput.value)
      : new Date()
  };

  const error = validateDeclarationInputs(inputs);
  if (error) return showError(error);

  if (declarationExists(inputs.employeurId, inputs.mois, inputs.annee)) {
    return showError("Déclaration déjà existante");
  }

  try {
    const result = processDeclaration(inputs);
    const employeur = employeurs.find(e => e.id === inputs.employeurId);

    declarations.push({
      id: Date.now(),
      employeurId: inputs.employeurId,
      employeurName: employeur.wh,
      mois: inputs.mois,
      annee: inputs.annee,
      dateDepot: inputs.declarationDate.toISOString(),
      createdAt: new Date().toISOString(),
      ...result
    });

    saveDeclarations(declarations);
    renderResult(result);

  } catch (err) {
    showError(err.message);
  }
});
