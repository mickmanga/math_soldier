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

    // Create AnswerSet
    const myAnswerSet = new Answers({
      true: ["2024 is this year"],
      false: ["2024 is not this year"],
    });
    await myAnswerSet.save();

    // Create Calculus Challenge
    const calculusChallenge = new Challenge({
      name: "Calculus exam level A-C, Montana, 2016",
      answers: myAnswerSet._id,
      grade: "D",
      topGrade: "D",
    });
    await calculusChallenge.save();

    // KnowledgeBlock Data
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
            <li>\(f(3) = 3 + 2 = 5\)</li>
            <li>\(f(7) = 7 + 2 = 9\)</li>
          </ul>
        `,
      },
      {
        title: "1.2 Notation et Représentation des Fonctions",
        content: `
          <ul>
            <li><strong>Notation fonctionnelle :</strong> \(f(x)\) signifie la fonction \(f\) évaluée en \(x\).</li>
            <li><strong>Variable indépendante :</strong> \(x\) (l'entrée).</li>
            <li><strong>Variable dépendante :</strong> \(y = f(x)\) (la sortie).</li>
          </ul>
          <p>Les fonctions peuvent être représentées graphiquement en traçant des points \((x, y)\) sur un plan cartésien. Cela permet de visualiser comment la fonction se comporte.</p>
        `,
      },
      {
        title: "1.3.1 Fonctions Linéaires",
        content: `
          <p><strong>Définition :</strong> Une fonction linéaire est une fonction de la forme :</p>
          <p>\(f(x) = mx + b\)</p>
          <ul>
            <li>\(m\) est le <strong>coefficient directeur</strong> ou pente de la droite.</li>
            <li>\(b\) est l'<strong>ordonnée à l'origine</strong>, c'est-à-dire le point où la droite coupe l'axe des ordonnées (\(y\)).</li>
          </ul>
          <h3>Caractéristiques :</h3>
          <ul>
            <li>Le graphique d'une fonction linéaire est une droite.</li>
            <li>Si \(m > 0\), la droite est croissante (monte de la gauche vers la droite).</li>
            <li>Si \(m < 0\), la droite est décroissante (descend de la gauche vers la droite).</li>
            <li>Si \(m = 0\), la fonction est constante et la droite est horizontale.</li>
          </ul>
        `,
      },
      {
        title: "1.3.2 Fonctions Quadratiques",
        content: `
          <p><strong>Définition :</strong> Une fonction quadratique est une fonction de la forme :</p>
          <p>\(f(x) = ax^2 + bx + c\)</p>
          <ul>
            <li>\(a, b,\) et \(c\) sont des constantes réelles.</li>
            <li>\(a \neq 0\) pour assurer que le terme en \(x^2\) est présent.</li>
          </ul>
          <h3>Caractéristiques :</h3>
          <ul>
            <li>Le graphique d'une fonction quadratique est une parabole.</li>
            <li>Si \(a > 0\), la parabole s'ouvre vers le haut.</li>
            <li>Si \(a < 0\), la parabole s'ouvre vers le bas.</li>
            <li>Le sommet de la parabole est le point où la fonction atteint son maximum ou minimum.</li>
          </ul>
        `,
      },
      // Repeat for 1.3.3 to 1.3.10
    ];

    // Create KnowledgeBlocks for each section
    const knowledgeBlocks = [];
    for (const section of sections) {
      const knowledgeBlock = new KnowledgeDataContainer({
        data: `<h1>${section.title}</h1>${section.content}`,
        challenge: calculusChallenge._id,
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

    console.log('Database setup complete!');
    process.exit(0); // Exit the process
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1); // Exit with an error code
  }
}

// Run the setup script
setupDB();
