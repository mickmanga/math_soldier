
// dbsetup.js

const mongoose = require('mongoose');
const User = require('./models/user');
const Subject = require('./models/subject');
const { KnowledgeDataContainer, KnowledgeDataChapter } = require('./models/knowledge');
const { Challenge } = require('./models/challenge');

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
        answers: [
          {
            text: "Une fonction est une relation qui associe chaque entrée à une seule sortie.",
            explanation: "Elle est vraie, car une fonction donne une sortie unique pour chaque entrée.",
            true: true,
          },
          {
            text: "Une fonction peut être vue comme une machine avec une entrée et une sortie.",
            explanation: "Elle est vraie, car cette métaphore illustre la relation entre entrée et sortie.",
            true: true,
          },
          {
            text: "Une fonction associe une entrée à plusieurs sorties.",
            explanation: "Elle est fausse, car une fonction ne peut avoir qu'une seule sortie par entrée.",
            true: false,
          },
          {
            text: "Une fonction n'a pas de relation avec les mathématiques.",
            explanation: "Elle est fausse, car les fonctions sont fondamentales en mathématiques.",
            true: false,
          },
        ],
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
        answers: [
          {
            text: "La notation fonctionnelle f(x) signifie que f est une fonction appliquée à x.",
            explanation: "Elle est vraie, car c'est la définition standard de la notation fonctionnelle.",
            true: true,
          },
          {
            text: "Dans f(x), x est l'entrée de la fonction.",
            explanation: "Elle est vraie, car x représente toujours la variable indépendante.",
            true: true,
          },
          {
            text: "La notation fonctionnelle f(x) indique toujours une addition.",
            explanation: "Elle est fausse, car f(x) peut représenter n'importe quelle opération définie par la fonction.",
            true: false,
          },
          {
            text: "Dans f(x), x est toujours un nombre négatif.",
            explanation: "Elle est fausse, car x peut être n'importe quelle valeur dans le domaine de la fonction.",
            true: false,
          },
        ],
      },
      {
        title: "1.3.1 Fonctions Linéaires",
        content: `
          <p><strong>Définition :</strong> Une fonction linéaire est une fonction de la forme :</p>
          <p>f(x) = mx + b</p>
          <ul>
            <li>m est le coefficient directeur ou pente de la droite.</li>
            <li>b est l'ordonnée à l'origine, le point où la droite coupe l'axe des ordonnées (y).</li>
          </ul>
          <h3>Caractéristiques :</h3>
          <ul>
            <li>Le graphique d'une fonction linéaire est une droite.</li>
            <li>Si m > 0, la droite est croissante.</li>
            <li>Si m < 0, la droite est décroissante.</li>
            <li>Si m = 0, la fonction est constante et la droite est horizontale.</li>
          </ul>
        `,
        answers: [
          {
            text: "Une fonction linéaire est une fonction de la forme f(x) = mx + b.",
            explanation: "Elle est vraie, car c'est la définition standard d'une fonction linéaire.",
            true: true,
          },
          {
            text: "Le graphique d'une fonction linéaire est une droite.",
            explanation: "Elle est vraie, car le degré du polynôme est 1, ce qui donne une droite.",
            true: true,
          },
          {
            text: "Si m > 0, la droite est croissante.",
            explanation: "Elle est vraie, car une pente positive fait monter la droite de gauche à droite.",
            true: true,
          },
          {
            text: "Si m = 0, la droite est horizontale.",
            explanation: "Elle est vraie, car une pente nulle implique aucune inclinaison.",
            true: true,
          },
          {
            text: "Le graphique d'une fonction linéaire est une courbe non linéaire.",
            explanation: "Elle est fausse, car une fonction linéaire produit toujours une droite.",
            true: false,
          },
          {
            text: "Une fonction linéaire ne peut jamais être constante.",
            explanation: "Elle est fausse, car si m = 0, la fonction est constante.",
            true: false,
          },
          {
            text: "Si m < 0, la droite est horizontale.",
            explanation: "Elle est fausse, car une pente négative rend la droite décroissante.",
            true: false,
          },
          {
            text: "Les fonctions linéaires n'ont pas de lien avec les graphes.",
            explanation: "Elle est fausse, car les fonctions linéaires sont représentées par des droites.",
            true: false,
          },
        ],
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
        answers: [
          {
            text: "Une fonction quadratique est de la forme f(x) = ax² + bx + c.",
            explanation: "Elle est vraie, car c'est la forme générale d'une fonction quadratique.",
            true: true,
          },
          {
            text: "Le graphique d'une fonction quadratique est une parabole.",
            explanation: "Elle est vraie, car un terme en x² produit une courbe parabolique.",
            true: true,
          },
          {
            text: "Si a > 0, la parabole s'ouvre vers le haut.",
            explanation: "Elle est vraie, car un coefficient positif rend la courbe ascendante.",
            true: true,
          },
          {
            text: "Si a < 0, la parabole s'ouvre vers le bas.",
            explanation: "Elle est vraie, car un coefficient négatif rend la courbe descendante.",
            true: true,
          },
          {
            text: "Le graphique d'une fonction quadratique est une droite.",
            explanation: "Elle est fausse, car une fonction quadratique produit une parabole, pas une droite.",
            true: false,
          },
          {
            text: "Si a > 0, la parabole s'ouvre vers le bas.",
            explanation: "Elle est fausse, car un coefficient positif rend la courbe ascendante.",
            true: false,
          },
          {
            text: "Les fonctions quadratiques n'ont pas de sommet.",
            explanation: "Elle est fausse, car le sommet est une caractéristique clé des paraboles.",
            true: false,
          },
          {
            text: "Les termes b et c déterminent si la parabole s'ouvre vers le haut ou le bas.",
            explanation: "Elle est fausse, car c'est le signe de a qui détermine l'orientation de la parabole.",
            true: false,
          },
        ],
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
        answers: [
          {
            text: "Une fonction exponentielle est de la forme f(x) = a^x.",
            explanation: "Elle est vraie, car c'est la définition d'une exponentielle.",
            true: true,
          },
          {
            text: "Si a > 1, la fonction est croissante.",
            explanation: "Elle est vraie, car une base supérieure à 1 rend la fonction croissante.",
            true: true,
          },
          {
            text: "Si 0 < a < 1, la fonction est décroissante.",
            explanation: "Elle est vraie, car une base fractionnaire rend la fonction décroissante.",
            true: true,
          },
          {
            text: "Le graphique passe toujours par le point (0, 1).",
            explanation: "Elle est vraie, car a⁰ = 1 quelle que soit la base a.",
            true: true,
          },
          {
            text: "Les fonctions exponentielles sont toujours décroissantes.",
            explanation: "Elle est fausse, car elles peuvent être croissantes si a > 1.",
            true: false,
          },
          {
            text: "Si a > 1, la fonction est décroissante.",
            explanation: "Elle est fausse, car une base supérieure à 1 rend la fonction croissante.",
            true: false,
          },
          {
            text: "Le graphique passe toujours par l'origine (0, 0).",
            explanation: "Elle est fausse, car il passe par (0, 1).",
            true: false,
          },
          {
            text: "Les fonctions exponentielles n'ont pas de point commun défini.",
            explanation: "Elle est fausse, car elles passent toutes par (0, 1).",
            true: false,
          },
        ],
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
        answers: [
          {
            text: "Une fonction logarithmique est de la forme f(x) = log_a(x).",
            explanation: "Elle est vraie, car c'est la définition de la fonction logarithmique.",
            true: true,
          },
          {
            text: "Si a > 1, la fonction logarithmique est croissante.",
            explanation: "Elle est vraie, car une base supérieure à 1 rend la fonction croissante.",
            true: true,
          },
          {
            text: "Le graphique passe par le point (1, 0).",
            explanation: "Elle est vraie, car log_a(1) = 0 quelle que soit la base a.",
            true: true,
          },
          {
            text: "Une fonction logarithmique est définie pour x < 0.",
            explanation: "Elle est fausse, car les logarithmes sont uniquement définis pour x > 0.",
            true: false,
          },
          {
            text: "Si a > 1, la fonction logarithmique est décroissante.",
            explanation: "Elle est fausse, car une base supérieure à 1 rend la fonction croissante.",
            true: false,
          },
          {
            text: "Le graphique logarithmique est toujours une droite.",
            explanation: "Elle est fausse, car une fonction logarithmique produit une courbe.",
            true: false,
          },
        ],
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
        answers: [
          {
            text: "Les fonctions trigonométriques incluent le sinus, le cosinus et la tangente.",
            explanation: "Elle est vraie, car ce sont les fonctions de base en trigonométrie.",
            true: true,
          },
          {
            text: "La fonction sinus a une période de 2π.",
            explanation: "Elle est vraie, car le sinus est périodique avec cette période.",
            true: true,
          },
          {
            text: "La fonction tangente a des asymptotes verticales là où cos(x) = 0.",
            explanation: "Elle est vraie, car la tangente n'est pas définie lorsque cos(x) = 0.",
            true: true,
          },
          {
            text: "La fonction sinus est toujours croissante.",
            explanation: "Elle est fausse, car elle oscille entre -1 et 1.",
            true: false,
          },
          {
            text: "Les fonctions trigonométriques ne sont pas périodiques.",
            explanation: "Elle est fausse, car elles sont toutes périodiques.",
            true: false,
          },
          {
            text: "La tangente n'a pas d'asymptotes verticales.",
            explanation: "Elle est fausse, car elle en a là où cos(x) = 0.",
            true: false,
          },
        ],
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
        answers: [
          {
            text: "Une fonction réciproque est définie par f⁻¹(f(x)) = x.",
            explanation: "Elle est vraie, car c'est la propriété fondamentale des fonctions réciproques.",
            true: true,
          },
          {
            text: "La fonction exponentielle f(x) = e^x a pour réciproque f⁻¹(x) = ln(x).",
            explanation: "Elle est vraie, car le logarithme naturel est l'inverse de l'exponentielle.",
            true: true,
          },
          {
            text: "La fonction racine carrée est la réciproque de f(x) = x² pour x ≥ 0.",
            explanation: "Elle est vraie, car √x 'annule' x² dans ce domaine.",
            true: true,
          },
          {
            text: "La fonction réciproque de f(x) = e^x est f⁻¹(x) = x².",
            explanation: "Elle est fausse, car la réciproque de l'exponentielle est le logarithme.",
            true: false,
          },
          {
            text: "Les fonctions réciproques sont toujours identiques à leur fonction d'origine.",
            explanation: "Elle est fausse, car une réciproque inverse la fonction initiale.",
            true: false,
          },
          {
            text: "Une fonction réciproque n'est pas définie mathématiquement.",
            explanation: "Elle est fausse, car les réciproques sont fondamentales en mathématiques.",
            true: false,
          },
        ],
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
        answers: [
          {
            text: "La fonction valeur absolue est définie comme f(x) = |x|.",
            explanation: "Elle est vraie, car c'est la définition standard de la valeur absolue.",
            true: true,
          },
          {
            text: "Le graphique de la fonction valeur absolue a une forme de 'V'.",
            explanation: "Elle est vraie, car la valeur absolue reflète les parties négatives vers le haut.",
            true: true,
          },
          {
            text: "La valeur absolue d'un nombre est toujours positive ou nulle.",
            explanation: "Elle est vraie, car elle mesure la distance à zéro, sans signe négatif.",
            true: true,
          },
          {
            text: "La fonction valeur absolue est toujours négative.",
            explanation: "Elle est fausse, car la valeur absolue est toujours positive ou nulle.",
            true: false,
          },
          {
            text: "Le graphique de la valeur absolue est une ligne droite.",
            explanation: "Elle est fausse, car son graphique forme un 'V'.",
            true: false,
          },
          {
            text: "La valeur absolue n'est pas définie pour les nombres négatifs.",
            explanation: "Elle est fausse, car elle est définie pour tous les nombres réels.",
            true: false,
          },
        ],
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
        answers: [
          {
            text: "Une fonction racine associe à un nombre sa racine, comme f(x) = √x.",
            explanation: "Elle est vraie, car c'est la définition des fonctions racines.",
            true: true,
          },
          {
            text: "La racine carrée est définie pour x ≥ 0.",
            explanation: "Elle est vraie, car les racines carrées des nombres négatifs ne sont pas réelles.",
            true: true,
          },
          {
            text: "Le graphique de la racine cubique est symétrique par rapport à l'origine.",
            explanation: "Elle est vraie, car la racine cubique est définie pour tout x, positif ou négatif.",
            true: true,
          },
          {
            text: "La racine carrée est définie pour x ≤ 0.",
            explanation: "Elle est fausse, car la racine carrée n'est pas définie pour les nombres négatifs.",
            true: false,
          },
          {
            text: "Le graphique de la racine cubique est toujours décroissant.",
            explanation: "Elle est fausse, car il est symétrique et peut être croissant ou décroissant.",
            true: false,
          },
          {
            text: "Les fonctions racines ne sont pas définies mathématiquement.",
            explanation: "Elle est fausse, car les racines sont des concepts fondamentaux en mathématiques.",
            true: false,
          },
        ],
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
        answers: [
          {
            text: "Une fonction rationnelle est de la forme P(x) / Q(x).",
            explanation: "Elle est vraie, car c'est la définition d'une fonction rationnelle.",
            true: true,
          },
          {
            text: "Les asymptotes verticales se produisent là où Q(x) = 0.",
            explanation: "Elle est vraie, car la fonction n'est pas définie lorsque le dénominateur est nul.",
            true: true,
          },
          {
            text: "Les asymptotes horizontales dépendent des degrés de P(x) et Q(x).",
            explanation: "Elle est vraie, car le comportement à l'infini est gouverné par ces degrés.",
            true: true,
          },
          {
            text: "Une fonction rationnelle est toujours une parabole.",
            explanation: "Elle est fausse, car les fonctions rationnelles incluent des asymptotes et des courbes variées.",
            true: false,
          },
          {
            text: "Les fonctions rationnelles n'ont pas d'asymptotes.",
            explanation: "Elle est fausse, car elles peuvent avoir des asymptotes verticales et horizontales.",
            true: false,
          },
          {
            text: "Les fonctions rationnelles sont définies même si Q(x) = 0.",
            explanation: "Elle est fausse, car la division par zéro n'est pas définie.",
            true: false,
          },
        ],
      },
    ];
    
    // Iterate through sections and create KnowledgeBlocks, Answers, and Challenges
    const knowledgeBlocks = [];
    for (const section of sections) {

      // Create Challenge
      const challenge = new Challenge({
        name: `Challenge for ${section.title}`,
        answers: section.answers,
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

    console.log('Database setup complete with new Answer model!');
    process.exit(0); // Exit the process
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1); // Exit with an error code
  }
}

// Run the setup script
setupDB();
