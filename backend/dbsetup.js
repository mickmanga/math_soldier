
// dbsetup.js

const mongoose = require('mongoose');
const Subject = require('./models/subject');
const { KnowledgeDataContainer, KnowledgeDataChapter } = require('./models/knowledge');
const { Challenge } = require('./models/challenge');
const Answer = require('./models/answer');

const { Map, Form } = require('./models/map');


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

    let challenges = [];

    const sections = [
      {
        title: "1.1 Qu'est-ce qu'une Fonction ?",
        content: `
          <p>Une <strong>fonction</strong> est une relation qui associe à chaque valeur d'entrée
          (appelée variable indépendante) une seule valeur de sortie (appelée variable dépendante).
          Pensez à une fonction comme une machine qui prend un ingrédient (l'entrée) et produit un produit (la sortie).</p>
      
          <p>En termes simples, une fonction peut être vue comme une règle qui applique une opération spécifique sur les valeurs d'entrée pour produire une sortie unique.</p>
      
          <h3>Exemple : Une règle simple</h3>
          <ul>
            <li>Si on entre 3, la machine sort 5.</li>
            <li>Si on entre 7, la machine sort 9.</li>
          </ul>
      
          <p>Dans cet exemple, la règle est : <em>ajouter 2 à l'entrée</em>.</p>
      
          <h3>Mathématiquement :</h3>
          <ul>
            <li>f(3) = 3 + 2 = 5</li>
            <li>f(7) = 7 + 2 = 9</li>
          </ul>
      
          <h3>Exemple : Une règle plus complexe</h3>
          <p>Considérons une autre fonction :</p>
          <ul>
            <li>Règle : multiplier par 2, puis ajouter 1.</li>
            <li>f(x) = 2x + 1</li>
          </ul>
          <p>Calculons :</p>
          <ul>
            <li>f(2) = 2 × 2 + 1 = 5</li>
            <li>f(4) = 2 × 4 + 1 = 9</li>
          </ul>
      
          <h3>Points importants :</h3>
          <ul>
            <li>Chaque valeur d'entrée a une seule et unique valeur de sortie.</li>
            <li>Une fonction peut être définie par une règle simple ou complexe.</li>
          </ul>
      
          <h3>Ce que n'est pas une fonction :</h3>
          <ul>
            <li>Si une valeur d'entrée est associée à plusieurs sorties, ce n'est pas une fonction.</li>
            <li>Exemple : Si 3 donne à la fois 5 et 7, ce n'est pas une fonction.</li>
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
          {
            text: "Une fonction est définie par une règle qui produit une sortie unique.",
            explanation: "Elle est vraie, car c'est la définition même d'une fonction.",
            true: true,
          },
          {
            text: "Si une valeur d'entrée est associée à plusieurs valeurs de sortie, il s'agit bien d'une fonction.",
            explanation: "Elle est fausse, car cela viole la définition de fonction.",
            true: false,
          },
          {
            text: "La règle d'une fonction peut être simple ou complexe.",
            explanation: "Elle est vraie, car une fonction peut inclure des calculs simples ou avancés.",
            true: true,
          },
          {
            text: "Un exemple de fonction est f(x) = 2x + 1.",
            explanation: "Elle est vraie, car cette règle associe une seule sortie à chaque entrée.",
            true: true,
          }
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
      
          <h3>Comprendre le coefficient directeur (m) :</h3>
          <ul>
            <li>Si \( m > 0 \), la droite est croissante (elle monte de gauche à droite).</li>
            <li>Si \( m < 0 \), la droite est décroissante (elle descend de gauche à droite).</li>
            <li>Si \( m = 0 \), la droite est horizontale (constante).</li>
          </ul>
          <p>Le coefficient directeur représente la variation de \( y \) lorsque \( x \) augmente d'une unité.</p>
      
          <h3>Comprendre l'ordonnée à l'origine (b) :</h3>
          <p>L'ordonnée à l'origine est la valeur de \( y \) lorsque \( x = 0 \). Cela correspond au point où la droite coupe l'axe des ordonnées.</p>
      
          <h3>Exemple pratique :</h3>
          <ul>
            <li>Si \( f(x) = 2x + 3 \) :
              <ul>
                <li>La pente \( m = 2 \) signifie que la droite monte de 2 unités pour chaque unité de \( x \).</li>
                <li>L'ordonnée à l'origine \( b = 3 \) signifie que la droite coupe l'axe des ordonnées à \( y = 3 \).</li>
              </ul>
            </li>
          </ul>
      
          <h3>Caractéristiques des fonctions linéaires :</h3>
          <ul>
            <li>Le graphique d'une fonction linéaire est une droite.</li>
            <li>Si \( m > 0 \), la droite est croissante.</li>
            <li>Si \( m < 0 \), la droite est décroissante.</li>
            <li>Si \( m = 0 \), la fonction est constante et la droite est horizontale.</li>
            <li>Les fonctions linéaires ont toujours un domaine et une image qui couvrent tous les nombres réels.</li>
          </ul>
      
          <h3>Cas particuliers :</h3>
          <ul>
            <li>Lorsque \( b = 0 \), la droite passe par l'origine (\( 0, 0 \)).</li>
            <li>Une fonction linéaire avec \( m = 0 \) est une constante, comme \( f(x) = 4 \), où la droite est horizontale à \( y = 4 \).</li>
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
          {
            text: "Une fonction linéaire peut avoir un coefficient directeur négatif.",
            explanation: "Elle est vraie, car \( m \) peut être inférieur à 0, ce qui rend la droite décroissante.",
            true: true,
          },
          {
            text: "L'ordonnée à l'origine est la valeur de x lorsque y = 0.",
            explanation: "Elle est fausse, car l'ordonnée à l'origine est la valeur de y lorsque x = 0.",
            true: false,
          },
          {
            text: "Une fonction linéaire passe toujours par l'origine.",
            explanation: "Elle est fausse, car cela n'est vrai que si \( b = 0 \).",
            true: false,
          },
          {
            text: "Une pente nulle signifie que la fonction linéaire est constante.",
            explanation: "Elle est vraie, car si \( m = 0 \), \( f(x) \) devient une constante.",
            true: true,
          },
          {
            text: "Une fonction linéaire a toujours un domaine couvrant tous les nombres réels.",
            explanation: "Elle est vraie, car les fonctions linéaires sont définies sur tous les réels.",
            true: true,
          },
          {
            text: "Le coefficient directeur m détermine si une droite est croissante ou décroissante.",
            explanation: "Elle est vraie, car \( m > 0 \) implique une pente montante, tandis que \( m < 0 \) implique une pente descendante.",
            true: true,
          },
          {
            text: "La pente d'une fonction linéaire est constante sur tout son domaine.",
            explanation: "Elle est vraie, car une fonction linéaire a une pente fixe partout.",
            true: true,
          }
        ],
      },
      {
        title: "1.3.2 Fonctions Quadratiques",
        content: `
          <p><strong>Définition :</strong> Une fonction quadratique est une fonction de la forme :</p>
          <p>f(x) = ax² + bx + c</p>
          <ul>
            <li>a, b, et c sont des constantes réelles.</li>
            <li>a ≠ 0 pour assurer la présence du terme en x², sinon ce serait une fonction linéaire.</li>
          </ul>
      
          <h3>Comprendre les coefficients :</h3>
          <ul>
            <li><strong>a</strong> détermine l'orientation et l'étirement de la parabole :
              <ul>
                <li>Si \( a > 0 \), la parabole s'ouvre vers le haut.</li>
                <li>Si \( a < 0 \), la parabole s'ouvre vers le bas.</li>
                <li>Plus \( |a| \) est grand, plus la parabole est étroite.</li>
                <li>Plus \( |a| \) est petit, plus la parabole est large.</li>
              </ul>
            </li>
            <li><strong>b</strong> influence la position horizontale de la parabole et son inclinaison.</li>
            <li><strong>c</strong> représente l'ordonnée à l'origine, c'est-à-dire le point où la parabole coupe l'axe des ordonnées (y).</li>
          </ul>
      
          <h3>Caractéristiques :</h3>
          <ul>
            <li>Le graphique d'une fonction quadratique est une parabole.</li>
            <li>Le sommet de la parabole est le point où la fonction atteint son maximum (si \( a < 0 \)) ou son minimum (si \( a > 0 \)).</li>
            <li>L'axe de symétrie passe par le sommet, et toutes les parties de la parabole sont symétriques par rapport à cet axe.</li>
          </ul>
      
          <h3>Formule pour le sommet :</h3>
          <p>Le sommet se trouve à :
            <ul>
              <li>Coordonnée x : \( x = -\\frac{b}{2a} \).</li>
              <li>Coordonnée y : Remplacer \( x \) dans l'équation pour trouver \( f(x) \).</li>
            </ul>
          </p>
      
          <h3>Exemple pratique :</h3>
          <p>Considérons \( f(x) = 2x² - 4x + 1 \) :</p>
          <ul>
            <li>Coefficient \( a = 2 \) : La parabole s'ouvre vers le haut et est relativement étroite.</li>
            <li>Coordonnée x du sommet : \( x = -\\frac{-4}{2 \\cdot 2} = 1 \).</li>
            <li>Coordonnée y du sommet : \( f(1) = 2(1)² - 4(1) + 1 = -1 \).</li>
            <li>Le sommet est donc \( (1, -1) \).</li>
          </ul>
      
          <h3>Représentation graphique :</h3>
          <p>Pour tracer le graphique :
            <ul>
              <li>Calculez quelques points en remplaçant \( x \) dans l'équation.</li>
              <li>Identifiez le sommet et tracez l'axe de symétrie.</li>
              <li>Reliez les points pour former une parabole.</li>
            </ul>
          </p>
      
          <h3>Cas particuliers :</h3>
          <ul>
            <li>Si \( b = 0 \), la parabole est symétrique par rapport à l'axe y.</li>
            <li>Si \( c = 0 \), la parabole passe par l'origine (0, 0).</li>
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
            text: "Si a = 0, la fonction reste quadratique.",
            explanation: "Elle est fausse, car si a = 0, la fonction devient linéaire.",
            true: false,
          },
          {
            text: "L'axe de symétrie d'une parabole passe toujours par son sommet.",
            explanation: "Elle est vraie, car c'est une propriété fondamentale des paraboles.",
            true: true,
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
          {
            text: "Une parabole peut être ouverte vers le haut ou vers le bas selon le signe de a.",
            explanation: "Elle est vraie, car c'est le coefficient a qui détermine l'orientation.",
            true: true,
          },
          {
            text: "Si c = 0, la parabole passe par l'origine.",
            explanation: "Elle est vraie, car c est l'ordonnée à l'origine.",
            true: true,
          },
          {
            text: "Plus la valeur absolue de a est grande, plus la parabole est large.",
            explanation: "Elle est fausse, car une grande valeur absolue de a rend la parabole plus étroite.",
            true: false,
          },
          {
            text: "Le sommet d'une parabole est toujours à (0, 0).",
            explanation: "Elle est fausse, car les coordonnées du sommet dépendent de a, b et c.",
            true: false,
          },
          {
            text: "L'ordonnée à l'origine d'une fonction quadratique est donnée par le coefficient c.",
            explanation: "Elle est vraie, car c est la valeur de f(x) lorsque x = 0.",
            true: true,
          },
          {
            text: "Une fonction quadratique peut avoir un ou deux points d'intersection avec l'axe x.",
            explanation: "Elle est vraie, car cela dépend des racines de l'équation \( ax² + bx + c = 0 \).",
            true: true,
          },
          {
            text: "Si b = 0, la parabole est symétrique par rapport à l'axe y.",
            explanation: "Elle est vraie, car l'absence du terme linéaire rend la courbe symétrique.",
            true: true,
          },
          {
            text: "Le sommet d'une parabole est un point d'inflexion.",
            explanation: "Elle est fausse, car un point d'inflexion est une caractéristique de courbes non quadratiques.",
            true: false,
          }
        ],
      },
      {
        title: "1.3.3 Fonctions Exponentielles",
        content: `
          <p><strong>Définition :</strong> Une fonction exponentielle est une fonction de la forme :</p>
          <p>f(x) = a^x</p>
          <ul>
            <li>a est une constante positive différente de 1 (a > 0 et a ≠ 1).</li>
            <li>x est l'exposant et représente la variable indépendante.</li>
          </ul>
      
          <h3>Caractéristiques :</h3>
          <ul>
            <li>Si \( a > 1 \), la fonction est croissante. Cela signifie que plus \( x \) augmente, plus \( f(x) \) devient grand.</li>
            <li>Si \( 0 < a < 1 \), la fonction est décroissante. Plus \( x \) augmente, plus \( f(x) \) se rapproche de 0.</li>
            <li>Le graphique d'une fonction exponentielle passe toujours par le point (0, 1), car \( a^0 = 1 \), quelle que soit la base \( a \).</li>
          </ul>
      
          <h3>Exemples pratiques :</h3>
          <ul>
            <li>Si \( a = 2 \), alors \( f(x) = 2^x \):
              <ul>
                <li>f(1) = \( 2^1 = 2 \).</li>
                <li>f(2) = \( 2^2 = 4 \).</li>
              </ul>
            </li>
            <li>Si \( a = \\frac{1}{2} \), alors \( f(x) = (\\frac{1}{2})^x \):
              <ul>
                <li>f(1) = \( (\\frac{1}{2})^1 = \\frac{1}{2} \).</li>
                <li>f(2) = \( (\\frac{1}{2})^2 = \\frac{1}{4} \).</li>
              </ul>
            </li>
          </ul>
      
          <h3>Propriétés supplémentaires :</h3>
          <ul>
            <li>Les fonctions exponentielles n'atteignent jamais 0. Elles s'en approchent (asymptote horizontale) mais ne la touchent jamais.</li>
            <li>Elles sont définies pour tous les nombres réels, y compris les négatifs.</li>
            <li>Si \( x < 0 \), \( a^x \) devient une fraction (exemple : \( 2^{-2} = \\frac{1}{2^2} = \\frac{1}{4} \)).</li>
          </ul>
        `,
        answers: [
          {
            text: "Une fonction exponentielle est de la forme f(x) = a^x.",
            explanation: "Elle est vraie, car c'est la définition d'une fonction exponentielle.",
            true: true,
          },
          {
            text: "Si a > 1, la fonction exponentielle est croissante.",
            explanation: "Elle est vraie, car une base supérieure à 1 rend la fonction croissante.",
            true: true,
          },
          {
            text: "Si 0 < a < 1, la fonction exponentielle est décroissante.",
            explanation: "Elle est vraie, car une base fractionnaire rend la fonction décroissante.",
            true: true,
          },
          {
            text: "Le graphique d'une fonction exponentielle passe toujours par le point (0, 1).",
            explanation: "Elle est vraie, car \( a^0 = 1 \), quelle que soit la base \( a \).",
            true: true,
          },
          {
            text: "Les fonctions exponentielles sont toujours décroissantes.",
            explanation: "Elle est fausse, car elles peuvent être croissantes si \( a > 1 \).",
            true: false,
          },
          {
            text: "Le graphique d'une fonction exponentielle peut atteindre 0.",
            explanation: "Elle est fausse, car une fonction exponentielle ne touche jamais l'axe des x.",
            true: false,
          },
          {
            text: "Si x < 0, alors a^x est toujours un entier positif.",
            explanation: "Elle est fausse, car pour \( x < 0 \), a^x devient une fraction.",
            true: false,
          },
          {
            text: "Les fonctions exponentielles sont définies pour tous les nombres réels.",
            explanation: "Elle est vraie, car la base \( a^x \) accepte toutes les valeurs de \( x \).",
            true: true,
          },
          {
            text: "Une base fractionnaire (comme 0.5) rend la fonction croissante.",
            explanation: "Elle est fausse, car une base fractionnaire produit une fonction décroissante.",
            true: false,
          },
          {
            text: "Les fonctions exponentielles ont une asymptote horizontale.",
            explanation: "Elle est vraie, car elles ne touchent jamais l'axe des x.",
            true: true,
          },
          {
            text: "La fonction exponentielle \( 2^x \) croît deux fois plus vite que \( x \).",
            explanation: "Elle est fausse, car \( 2^x \) croît de manière exponentielle, bien plus vite que \( x \).",
            true: false,
          },
          {
            text: "Toutes les fonctions exponentielles passent par l'origine (0, 0).",
            explanation: "Elle est fausse, car elles passent par le point (0, 1), sauf si elles sont décalées.",
            true: false,
          },
          {
            text: "Les fonctions exponentielles peuvent modéliser la croissance démographique.",
            explanation: "Elle est vraie, car elles représentent bien les croissances rapides.",
            true: true,
          },
          {
            text: "Si \( a = 1 \), alors \( f(x) = 1 \) pour toutes les valeurs de \( x \).",
            explanation: "Elle est vraie, car \( 1^x = 1 \), quelle que soit la valeur de \( x \).",
            true: true,
          },
          {
            text: "Le comportement asymptotique d'une fonction exponentielle dépend de la base \( a \).",
            explanation: "Elle est vraie, car la base influence la rapidité de rapprochement vers 0 ou l'infini.",
            true: true,
          },
          {
            text: "Pour \( a > 1 \), \( f(x) \) tend vers 0 lorsque \( x \) tend vers -∞.",
            explanation: "Elle est vraie, car \( a^x \) diminue pour \( x < 0 \).",
            true: true,
          }
        ],
      },      
      {
        title: "1.3.4 Fonctions Logarithmiques",
        content: `
          <p><strong>Définition :</strong> Une fonction logarithmique est la fonction inverse d'une fonction exponentielle, de la forme :</p>
          <p>f(x) = log_a(x)</p>
          <ul>
            <li><strong>a</strong> est la base du logarithme (a > 0 et a ≠ 1).</li>
            <li>La fonction est définie uniquement pour x > 0.</li>
          </ul>
      
          <h3>Caractéristiques :</h3>
          <ul>
            <li>Si \( a > 1 \), la fonction logarithmique est croissante.</li>
            <li>Si \( 0 < a < 1 \), la fonction logarithmique est décroissante.</li>
            <li>Le graphique passe toujours par le point (1, 0), car \( log_a(1) = 0 \) quelle que soit la base \( a \).</li>
            <li>Le logarithme est défini uniquement pour les entrées positives, il n'existe pas pour \( x ≤ 0 \).</li>
          </ul>
      
          <h3>Relation avec les exponentielles :</h3>
          <p>Les logarithmes et les exponentielles sont des fonctions inverses :</p>
          <ul>
            <li>\( a^{log_a(x)} = x \).</li>
            <li>\( log_a(a^y) = y \).</li>
          </ul>
      
          <h3>Exemples pratiques :</h3>
          <ul>
            <li>Si \( a = 10 \) (logarithme décimal) :
              <ul>
                <li>\( log_{10}(100) = 2 \), car \( 10^2 = 100 \).</li>
                <li>\( log_{10}(0.01) = -2 \), car \( 10^{-2} = 0.01 \).</li>
              </ul>
            </li>
            <li>Si \( a = e \) (logarithme naturel) :
              <ul>
                <li>\( log_e(e^3) = 3 \).</li>
                <li>\( log_e(1) = 0 \).</li>
              </ul>
            </li>
          </ul>
      
          <h3>Propriétés des logarithmes :</h3>
          <ul>
            <li>\( log_a(x \cdot y) = log_a(x) + log_a(y) \) (propriété de multiplication).</li>
            <li>\( log_a(\\frac{x}{y}) = log_a(x) - log_a(y) \) (propriété de division).</li>
            <li>\( log_a(x^n) = n \\cdot log_a(x) \) (propriété de puissance).</li>
          </ul>
      
          <h3>Applications :</h3>
          <ul>
            <li>Les logarithmes sont utilisés pour mesurer des phénomènes exponentiels, comme la magnitude des tremblements de terre, le pH en chimie, ou encore la croissance économique.</li>
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
            text: "Le graphique passe toujours par le point (1, 0).",
            explanation: "Elle est vraie, car \( log_a(1) = 0 \) quelle que soit la base \( a \).",
            true: true,
          },
          {
            text: "Une fonction logarithmique est définie pour x < 0.",
            explanation: "Elle est fausse, car les logarithmes ne sont définis que pour x > 0.",
            true: false,
          },
          {
            text: "Si a > 1, la fonction logarithmique est décroissante.",
            explanation: "Elle est fausse, car une base supérieure à 1 rend la fonction croissante.",
            true: false,
          },
          {
            text: "Le logarithme de 1 est toujours 0.",
            explanation: "Elle est vraie, car \( log_a(1) = 0 \) quelle que soit la base.",
            true: true,
          },
          {
            text: "Les logarithmes et exponentielles sont des fonctions inverses.",
            explanation: "Elle est vraie, car c'est leur relation fondamentale.",
            true: true,
          },
          {
            text: "Le logarithme d'un nombre négatif est défini dans les nombres réels.",
            explanation: "Elle est fausse, car les logarithmes ne sont pas définis pour des nombres négatifs dans les réels.",
            true: false,
          },
          {
            text: "Le logarithme naturel utilise e comme base.",
            explanation: "Elle est vraie, car c'est la définition du logarithme naturel.",
            true: true,
          },
          {
            text: "La propriété \( log_a(x \cdot y) = log_a(x) + log_a(y) \) est correcte.",
            explanation: "Elle est vraie, car c'est une propriété fondamentale des logarithmes.",
            true: true,
          },
          {
            text: "Les logarithmes sont définis pour tous les nombres réels.",
            explanation: "Elle est fausse, car ils ne sont définis que pour \( x > 0 \).",
            true: false,
          },
          {
            text: "Un logarithme peut être utilisé pour mesurer des phénomènes exponentiels.",
            explanation: "Elle est vraie, car les logarithmes modélisent souvent ces relations.",
            true: true,
          },
          {
            text: "Le logarithme décimal a pour base 2.",
            explanation: "Elle est fausse, car il a pour base 10.",
            true: false,
          },
          {
            text: "Le logarithme est une fonction qui peut être décroissante ou croissante selon la base.",
            explanation: "Elle est vraie, car cela dépend si \( a > 1 \) ou \( 0 < a < 1 \).",
            true: true,
          },
          {
            text: "Si \( log_a(x) = y \), alors \( x = a^y \).",
            explanation: "Elle est vraie, car c'est la définition inverse du logarithme.",
            true: true,
          },
          {
            text: "La base du logarithme ne peut jamais être 1.",
            explanation: "Elle est vraie, car \( log_1(x) \) est indéfini.",
            true: true,
          }
        ],
      }
      ,
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

      const answers = [];

      for( const answer of section.answers){

        const answerModel = await new Answer(answer).save();

        answers.push(answerModel._id);
      }

      // Create Challenge
      const challenge = new Challenge({
        name: `Challenge for ${section.title}`,
        answers: answers,
        grade: "D",
        topGrade: "D",
      });
      await challenge.save();

      challenges.push(challenge);

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

    

    // Connexion à MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Vérifier les modèles enregistrés
    console.log("Registered models:", mongoose.modelNames());

    // Création d'un document "Form"
  

    const mapElements = [];

    console.log("Challenge size =>");
    console.log(challenges.length);

     for(let i = 0; i < challenges.length ; i++ ){

      const challenge = challenges[i];

        mapElements.push(
          {
            type: "challenge",
            ref: challenge._id
          }
        );

        const form = await new Form({
          elementType: "form",
          formBlocks: [
            {
              question: "combien fait" + Math.floor(Math.random() * 10) + "+" + Math.floor(Math.random() * 10),
              answer: Math.floor(Math.random() * 5),
              validated: false
            }
          ]
        }).save();

       const formElement = { type: 'Form', ref: form._id };// Vérifiez que "type" correspond bien au modèle "Form"

       mapElements.push(formElement);

    

     }
    

    // Création d'un document "Map" avec des références mixtes

    const map = await new Map({
      background: "background.png",
      elements: [
        ...mapElements,
      ]
    }).save();

    console.log('Map saved:', map);
  
    console.log('Database setup complete with new Answer model!');
    process.exit(0); // Exit the process
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1); // Exit with an error code
  }

}

// Run the setup script
setupDB();
