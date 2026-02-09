const employeurs = [
    { id: 1, raisonSociale: "TechNova SARL", secteur: "Informatique" },
    { id: 2, raisonSociale: "Atlas Food", secteur: "Agroalimentaire" },
    { id: 3, raisonSociale: "Blue Transport", secteur: "Logistique" }
];
const assures = [
    { id: 101, nom: "Ahmed El Amrani", salaireMensuel: 3000, employeurId: 1 },
    { id: 102, nom: "Sara Benali", salaireMensuel: 4500, employeurId: 1 },
    { id: 103, nom: "Youssef Karim", salaireMensuel: 2800, employeurId: 2 },
    { id: 104, nom: "Imane Zahra", salaireMensuel: 5200, employeurId: 3 }
];


const declarations = [
    {
        id: 1,
        employeurId: 1,
        employeurName: "TechNova SARL",
        mois: 1,
        annee: 2025,
        declarationDate: new Date("2025-02-10"),

        cotisations: [
            {
                assureId: 101,
                nom: "Ahmed El Amrani",
                salaireDeclare: 3000,
                cotisationSalariale: 120,
                cotisationPatronale: 180,
                totalCotisation: 300
            },
            {
                assureId: 102,
                nom: "Sara Benali",
                salaireDeclare: 4500,
                cotisationSalariale: 180,
                cotisationPatronale: 270,
                totalCotisation: 450
            }
        ],

        totalCotisations: 750,
        delayMonths: 0,
        penalty: 0,
        totalFinal: 750
    },

    {
        id: 2,
        employeurId: 2,
        employeurName: "Atlas Food",
        mois: 12,
        annee: 2024,
        declarationDate: new Date("2025-02-25"),

        cotisations: [
            {
                assureId: 103,
                nom: "Youssef Karim",
                salaireDeclare: 2800,
                cotisationSalariale: 112,
                cotisationPatronale: 168,
                totalCotisation: 280
            }
        ],

        totalCotisations: 280,
        delayMonths: 1,
        penalty: 2.8,
        totalFinal: 282.8
    }
];

