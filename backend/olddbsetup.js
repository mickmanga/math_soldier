
// dbsetup.js

const mongoose = require('mongoose');
const User = require('./models/user');
const Subject = require('./models/subject');
const { KnowledgeDataContainer, KnowledgeDataChapter } = require('./models/knowledge');
const { Challenge, Answers } = require('./models/challenge');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/memory_soldier'; // Change if needed

async function setupDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Full KnowledgeBlock Data
    const sections = [
      {
        title: "1.1 Qu'est-ce qu'une Fonction ?",
        content: `
          <p>Une <strong>fonction</strong> est une relation qui associe à chaque valeur d'entrée
          (appelée variable indépendante) une seule valeur de sortie (appelée variable dépendante).
          Pensez à une fonction comme une machine qui prend un ingrédient (l'entrée) et produit un produit (la sortie).</p>
          <h3>Exemple :</h3>
          <ul>
            <li>Si on entre 3, la machine sort 5.</li>
            <li>Si on entre 7, la machine sort 9.</li>
          </ul>
          <h3>Mathématiquement :</h3>
          <ul>
            <li>f(3) = 3 + 2 = 5</li>
            <li>f(7) = 7 + 2 = 9</li>
          </ul>
        `,
        answers: {
          good: [
            "Une fonction est une relation qui associe chaque entrée à une seule sortie.",
            "Une fonction peut être vue comme une machine avec une entrée et une sortie.",
            "Les fonctions permettent de modéliser des relations mathématiques.",
            "Les fonctions ont une sortie unique pour chaque entrée donnée.",
            "Une fonction est définie par une règle qui associe une entrée à une sortie.",
            "Les fonctions peuvent être représentées sous forme graphique, algébrique ou verbale.",
          ],
          bad: [
            "Une fonction associe une entrée à plusieurs sorties.",
            "Une fonction n'a pas de relation avec les mathématiques.",
            "Les fonctions sont toujours représentées par des nombres négatifs.",
            "Une fonction est un processus aléatoire sans règle définie.",
            "Les fonctions n'ont pas de lien avec les représentations graphiques.",
            "Une fonction est toujours croissante.",
          ],
        },
      },
      {
        title: "1.2 Notation et Représentation des Fonctions",
        content: `
          <ul>
            <li><strong>Notation fonctionnelle :</strong> f(x) signifie la fonction f évaluée en x.</li>
            <li><strong>Variable indépendante :</strong> x (l'entrée).</li>
            <li><strong>Variable dépendante :</strong> y = f(x) (la sortie).</li>
          </ul>
          <p>Les fonctions peuvent être représentées graphiquement en traçant des points (x, y) sur un plan cartésien. Cela permet de visualiser comment la fonction se comporte.</p>
        `,
        answers: {
          good: [
            "La notation fonctionnelle f(x) signifie que f est une fonction appliquée à x.",
            "Dans f(x), x est l'entrée de la fonction.",
            "Le graphe d'une fonction est une représentation de ses paires (x, y).",
            "Les fonctions sont souvent représentées sur un plan cartésien.",
            "La notation f(x) est utilisée pour montrer une fonction dépendant de x.",
            "f(x) donne la valeur de la fonction lorsque x est l'entrée.",
          ],
          bad: [
            "La notation fonctionnelle f(x) indique toujours une addition.",
            "Dans f(x), x est toujours un nombre négatif.",
            "Le graphe d'une fonction est toujours un cercle.",
            "f(x) représente une multiplication aléatoire entre x et une constante.",
            "La représentation graphique est inutile pour les fonctions.",
            "f(x) est toujours égal à x.",
          ],
        },
      },
      {
        title: "1.3.2 Fonctions Quadratiques",
        content: `
      <p><strong>Définition :</strong> Une fonction quadratique est une fonction de la forme :</p>
      <p>f(x) = ax² + bx + c</p>
      <ul>
        <li>a, b, et c sont des constantes réelles.</li>
        <li>a ≠ 0 pour assurer la présence du terme en x².</li>
      </ul>
      <h3>Caractéristiques :</h3>
      <ul>
        <li>Le graphique d'une fonction quadratique est une parabole.</li>
        <li>Si a > 0, la parabole s'ouvre vers le haut.</li>
        <li>Si a < 0, la parabole s'ouvre vers le bas.</li>
        <li>Le sommet est le point où la fonction atteint son maximum ou minimum.</li>
      </ul>
    `,
        answers: {
            good: ['Une fonction quadratique est de la forme f(x) = ax² + bx + c.', "Le graphique d'une fonction quadratique est une parabole.", "Si a > 0, la parabole s'ouvre vers le haut.", "Si a < 0, la parabole s'ouvre vers le bas.", 'Le sommet est le point où la fonction atteint son maximum ou minimum.', "Le coefficient a détermine l'orientation de la parabole."],
            bad: ["Le graphique d'une fonction quadratique est une droite.", "Si a > 0, la parabole s'ouvre vers le bas.", "Le sommet d'une parabole est toujours à l'origine.", "Les fonctions quadratiques n'ont pas de sommet.", "Le terme a dans f(x) = ax² n'a aucun effet sur le graphique."]
        }
    },
    
    {
        title: "1.3.3 Fonctions Exponentielles",
        content: `
      <p><strong>Définition :</strong> Une fonction exponentielle est une fonction de la forme :</p>
      <p>f(x) = a^x</p>
      <ul>
        <li>a est une constante positive différente de 1 (a > 0 et a ≠ 1).</li>
        <li>x est l'exposant.</li>
      </ul>
      <h3>Caractéristiques :</h3>
      <ul>
        <li>Si a > 1, la fonction est croissante.</li>
        <li>Si 0 < a < 1, la fonction est décroissante.</li>
        <li>Le graphique passe toujours par le point (0, 1) puisque a⁰ = 1.</li>
      </ul>
    `,
        answers: {
            good: ['Une fonction exponentielle est de la forme f(x) = a^x.', 'Si a > 1, la fonction est croissante.', 'Si 0 < a < 1, la fonction est décroissante.', 'Le graphique passe toujours par le point (0, 1).', 'Les fonctions exponentielles modélisent une croissance rapide.'],
            bad: ['Les fonctions exponentielles sont toujours décroissantes.', 'Si a > 1, la fonction est décroissante.', "Les fonctions exponentielles n'ont pas de point commun défini.", 'f(x) = a^x représente une multiplication linéaire.']
        }
    },
        
    {
      title: "1.3.4 Fonctions Logarithmiques",
      content: `
    <p><strong>Définition :</strong> Une fonction logarithmique est la fonction inverse d'une fonction exponentielle, de la forme :</p>
    <p>f(x) = log_a(x)</p>
    <ul>
      <li>a est la base du logarithme (a > 0 et a ≠ 1).</li>
      <li>La fonction est définie pour x > 0.</li>
    </ul>
    <h3>Caractéristiques :</h3>
    <ul>
      <li>Si a > 1, la fonction est croissante.</li>
      <li>Si 0 < a < 1, la fonction est décroissante.</li>
      <li>Le graphique passe par le point (1, 0) puisque log_a(1) = 0.</li>
    </ul>
  `,
      answers: {
          good: ['Une fonction logarithmique est de la forme f(x) = log_a(x).', 'Si a > 1, la fonction logarithmique est croissante.', 'Le graphique passe par le point (1, 0).', 'La fonction logarithmique est définie pour x > 0.', "Les logarithmes sont l'inverse des exponentielles."],
          bad: ['Une fonction logarithmique est définie pour x < 0.', 'Si a > 1, la fonction logarithmique est décroissante.', "Le logarithme n'a aucun lien avec les fonctions exponentielles.", 'Le graphique logarithmique est toujours une droite.']
      }
  },

  {
    title: "1.3.5 Fonctions Trigonométriques",
    content: `
  <p><strong>Définition :</strong> Les fonctions trigonométriques sont liées aux angles et aux triangles, notamment dans le cercle unité.</p>
  <ul>
    <li>Sinus : f(x) = sin(x)</li>
    <li>Cosinus : f(x) = cos(x)</li>
    <li>Tangente : f(x) = tan(x)</li>
  </ul>
  <h3>Caractéristiques :</h3>
  <ul>
    <li>Les fonctions sinus et cosinus sont périodiques avec une période de 2π.</li>
    <li>Les valeurs de sin(x) et cos(x) sont comprises entre -1 et 1.</li>
    <li>La fonction tangente a des asymptotes verticales là où cos(x) = 0.</li>
  </ul>
`,
    answers: {
        good: ['Les fonctions trigonométriques incluent le sinus, le cosinus et la tangente.', 'La fonction sinus a une période de 2π.', 'La fonction tangente a des asymptotes verticales là où cos(x) = 0.', 'Les valeurs de sin(x) sont toujours comprises entre -1 et 1.'],
        bad: ['La fonction sinus est toujours croissante.', 'Les fonctions trigonométriques ne sont pas périodiques.', "La tangente n'a pas d'asymptotes verticales.", 'La valeur maximale de cos(x) est 2.']
    }
},

{
  title: "1.3.6 Fonctions Réciproques",
  content: `
    <p><strong>Définition :</strong> Une fonction réciproque est une fonction qui "annule" l'effet d'une autre fonction. Si f est une fonction bijective, alors sa réciproque f⁻¹ est définie par :</p>
    <p>f⁻¹(f(x)) = x</p>
    <h3>Exemples :</h3>
    <ul>
      <li>La fonction exponentielle f(x) = e^x a pour réciproque la fonction logarithme naturel f⁻¹(x) = ln(x).</li>
      <li>La fonction carré f(x) = x² (pour x ≥ 0) a pour réciproque la fonction racine carrée f⁻¹(x) = √x.</li>
    </ul>
  `,
  answers: {
    good: [
      "Une fonction réciproque est définie par f⁻¹(f(x)) = x.",
      "La fonction exponentielle f(x) = e^x a pour réciproque f⁻¹(x) = ln(x).",
      "La fonction racine carrée est la réciproque de f(x) = x² pour x ≥ 0."
    ],
    bad: [
      "La fonction réciproque de f(x) = e^x est f⁻¹(x) = x².",
      "Les fonctions réciproques sont toujours identiques à leur fonction d'origine.",
      "Une fonction réciproque n'est pas définie mathématiquement."
    ]
  }
},
{
  title: "1.3.7 Fonctions Absolues",
  content: `
    <p><strong>Définition :</strong> La fonction valeur absolue est définie par :</p>
    <p>f(x) = |x| = 
      <span style="white-space: nowrap;">{
        x, si x ≥ 0
      }</span>
      <span style="white-space: nowrap;">{
        -x, si x < 0
      }</span>
    </p>
    <h3>Caractéristiques :</h3>
    <ul>
      <li>Le graphique est en forme de "V".</li>
      <li>La fonction est toujours positive ou nulle.</li>
      <li>Elle est continue sur l'ensemble des nombres réels.</li>
    </ul>
  `,
  answers: {
    good: [
      "La fonction valeur absolue est définie comme f(x) = |x|.",
      "Le graphique de la fonction valeur absolue a une forme de 'V'.",
      "La valeur absolue d'un nombre est toujours positive ou nulle."
    ],
    bad: [
      "La fonction valeur absolue est toujours négative.",
      "Le graphique de la valeur absolue est une ligne droite.",
      "La valeur absolue n'est pas définie pour les nombres négatifs."
    ]
  }
},
{
  title: "1.3.8 Fonctions Racines",
  content: `
    <p><strong>Définition :</strong> Une fonction racine associe à un nombre sa racine. Exemples :</p>
    <ul>
      <li>Racine carrée : f(x) = √x, définie pour x ≥ 0.</li>
      <li>Racine cubique : f(x) = ∛x, définie pour tout x.</li>
    </ul>
    <h3>Caractéristiques :</h3>
    <ul>
      <li>Racine carrée : Le graphique commence à x = 0 et augmente lentement.</li>
      <li>Racine cubique : Le graphique est symétrique par rapport à l'origine.</li>
    </ul>
  `,
  answers: {
    good: [
      "Une fonction racine associe à un nombre sa racine, comme f(x) = √x.",
      "La racine carrée est définie pour x ≥ 0.",
      "Le graphique de la racine cubique est symétrique par rapport à l'origine."
    ],
    bad: [
      "La racine carrée est définie pour x ≤ 0.",
      "Le graphique de la racine cubique est toujours décroissant.",
      "Les fonctions racines ne sont pas définies mathématiquement."
    ]
    }
   },
   {
    title: "1.3.9 Fonctions Rationnelles",
    content: `
      <p><strong>Définition :</strong> Une fonction rationnelle est le quotient de deux polynômes :</p>
      <p>f(x) = P(x) / Q(x)</p>
      <ul>
        <li>P(x) et Q(x) sont des polynômes.</li>
        <li>La fonction n'est pas définie là où Q(x) = 0.</li>
      </ul>
      <h3>Caractéristiques :</h3>
      <ul>
        <li>Asymptotes verticales : Là où Q(x) = 0.</li>
        <li>Asymptotes horizontales : Déterminées par les degrés de P(x) et Q(x).</li>
      </ul>
    `,
    answers: {
        good: [
            "Une fonction rationnelle est de la forme P(x) / Q(x).",
            "Les asymptotes verticales se produisent là où Q(x) = 0.",
            "Les asymptotes horizontales dépendent des degrés de P(x) et Q(x)."
        ],
        bad: [
            "Une fonction rationnelle est toujours une parabole.",
            "Les fonctions rationnelles n'ont pas d'asymptotes.",
            "Les fonctions rationnelles sont définies même si Q(x) = 0."
        ]
       }
     }
    ];

    // Iterate through sections and create KnowledgeBlocks, AnswerSets, and Challenges
    const knowledgeBlocks = [];
    for (const section of sections) {
      // Create AnswerSet
      const answerSet = new Answers({
        true: section.answers.good,
        false: section.answers.bad,
      });
      await answerSet.save();

      // Create Challenge
      const challenge = new Challenge({
        name: `Challenge for ${section.title}`,
        answers: answerSet._id,
        grade: "D",
        topGrade: "D",
      });
      await challenge.save();

      // Create KnowledgeBlock
      const knowledgeBlock = new KnowledgeDataContainer({
        data: `<h1>${section.title}</h1>${section.content}`,
        challenge: challenge._id,
      });
      await knowledgeBlock.save();

      knowledgeBlocks.push(knowledgeBlock._id);
    }

    // Create Chapter (calculusChapter1) with all KnowledgeBlocks
    const calculusChapter1 = new KnowledgeDataChapter({
      name: "calculus_Chapter1",
      chaptersOrData: knowledgeBlocks,
      unlocked: true,
    });
    await calculusChapter1.save();

    // Create Subject (Calculus_subject)
    const calculusSubject = new Subject({
      name: "calculus",
      chaptersOrData: [calculusChapter1._id],
    });
    await calculusSubject.save();

    console.log('Database setup complete with Challenges and AnswerSets!');
    process.exit(0); // Exit the process
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1); // Exit with an error code
  }
}

// Run the setup script
setupDB();
