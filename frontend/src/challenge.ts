import {store} from "./redux/index";
import { addAnswer, ChallengeAnswerData, clearAnswers, incrementAnswerIndex, resetAnswerIndex, setFoundAtIndex } from "./redux/slices/challengeSlice";

enum GAME_MODES {
  discovery,
  challenge
}

let gameMode: GAME_MODES = GAME_MODES.discovery;



const gameMap = {
  startIndex: 0,
  endIndex: 1,
  elements: 
  [
    {
      type: 'form',
      animations: []
    },
    null,
    {
      type: 'challenge',
      animations: []
    },
  ]

};

const goBackToMountain = (event: Event) => {
  window.location.href = `/discovery${hardMode ? "?started=true" : ""}`;
};

const getUrlParameter = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

const MAPS: HTMLElement[] = [];
const MAP_SETS: MapSet[] = [];

const heroContainer = document.getElementById("hero_container")!;
const heroImage = document.getElementById("heroImg")! as HTMLImageElement;

const swordSlashImg = document.getElementById(
  "sword_slash"
)! as HTMLImageElement;

const scoreContainer = document.getElementById("score_value")!;

const answerDataContainer = document.getElementById("answer_data_container")!;
const answerDataValue = document.getElementById("answer_data_value")!;

const scoreMalusContainer = document.getElementById("score_malus_container")!;
const scoreMalusDetail = document.getElementById("score_malus_detail")!;

const scoreRewardContainer = document.getElementById("score_reward_container")!;

const scoreRewardDetail = document.getElementById("score_reward_detail")!;

const specialMoveIndicator = document.getElementById("special_move_indicator")!;

const ANIMATION_HERO_RUN_DURATION_BETWEEN_FRAMES_IN_MS = 80;
const ANIMATION_HERO_RUN_SUPER_SPEED_DURATION_BETWEEN_FRAMES_IN_MS = 66;
const CAMERA_SUPER_SPEED_MULTIPLICATOR = 4;

const heroContactPointContainerRatio = 0.3;

let heroInTheRedZone = false;

let idleTimerValue = 5;

let lastStopInMs: null | number = null;

const idleTimeoutContainer = document.getElementById("idle_timeout_container")!;

// Utility function to get query parameters from the URL
const getQueryParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

let answers = null;

// Fetch a challenge by ID from the backend
const fetchChallengeById = async (challengeId: string): Promise<void> => {
  try {
      const response = await fetch(`http://localhost:3000/api/challenges/${challengeId}`);
      if (!response.ok) {
          throw new Error(`Error fetching challenge: ${response.statusText}`);
      }

      answers = response;

      const challengeData = await response.json();

      sortAndStoreAnswers(challengeData.answers);

  } catch (error) {
      console.error('Error:', error);
  }
};

// On page load, get the challengeId from the URL and fetch the challenge
const initializeChallengePage = async () => {
  const challengeId = getQueryParam('challengeId');
  if (challengeId) {
    const challenge = await fetchChallengeById(challengeId);

  } else {
      console.error('No challengeId provided in the URL.');
  }
};

document.addEventListener('DOMContentLoaded', initializeChallengePage);

const getHeroLeft = () => {

  if(!heroContainer){
    console.log("we cant get the hero left, the hero container was not initialized yet");
  }

 return heroContainer.getBoundingClientRect().left * (1 + heroContactPointContainerRatio);
}

const enemyViewPoint = document.getElementsByClassName(
  "enemyViewPoint"
)[0]! as HTMLElement;

const enemyViewPointLogo = document.getElementById(
  "enemyViewPointLogo"
)! as HTMLImageElement;
const enemyViewPointTile1 = document.getElementById(
  "enemyViewPointTile1"
)! as HTMLElement;

const enemyViewPointTile2 = document.getElementById(
  "enemyViewPointTile2"
)! as HTMLElement;
const enemyViewPointTile3 = document.getElementById(
  "enemyViewPointTile3"
)! as HTMLElement;
const enemyViewPointTile4 = document.getElementById(
  "enemyViewPointTile4"
)! as HTMLElement;

const viewPointTiles = [
  enemyViewPointTile1,
  enemyViewPointTile2,
  enemyViewPointTile3,
  enemyViewPointTile4,
];

const updateEnemyViewPointDisplay = () => {
  viewPointTiles.forEach(
    (tile) =>
      (tile.style.background = heroInTheRedZone
        ? "rgba(204, 40, 40, 0.514)"
        : "rgba(40, 108, 204, 0.514)")
  );

  enemyViewPointLogo.src = `assets/challenge/millescaneous/${
    heroInTheRedZone ? "careful" : "vision"
  }.png`;
};

const runAudio = document.getElementById("run_audio")! as HTMLAudioElement;
const swordAudio = document.getElementById("sword_audio")! as HTMLAudioElement;
const laserdAudio = document.getElementById("laser_audio")! as HTMLAudioElement;
let epicAudio = document.getElementById(
  getUrlParameter("mode") === "hard" ? "hard_epic_audio" : "epic_audio"
)! as HTMLAudioElement;
const bassAudio = document.getElementById("bass_audio")! as HTMLAudioElement;
const fireBackgroundAudio = document.getElementById(
  "fire_background_audio"
)! as HTMLAudioElement;
const electricityAudio = document.getElementById(
  "electricity_audio"
)! as HTMLAudioElement;
const transformationScreamAudio = document.getElementById(
  "transformation_scream_audio"
)! as HTMLAudioElement;

const hurtAudio = document.getElementById(
  "hero_hurt_audio"
)! as HTMLAudioElement;

const transformedEpicAudio = document.getElementById(
  "transformed_epic_audio"
)! as HTMLAudioElement;

const transformationOffAudio = document.getElementById(
  "transformation_off_audio"
) as HTMLAudioElement;

const progressBar = document.getElementsByClassName(
  "progress"
)[0]! as HTMLElement;

const bombAudio = document.getElementById("bomb_audio")! as HTMLAudioElement;

const setInitialGameVolume = () => {
  
  swordAudio.volume = 0.65;
  bombAudio.volume = 0.12;
  electricityAudio.volume = 0.7;
  transformationScreamAudio.volume = 0.25;
  hurtAudio.volume = 0.025;
  runAudio.volume = 0;

}


let currentSubject: Subject | null = null;

let currentSubjectTotal = 0;

let swordReach = window.innerWidth * 0.6;

let gameLaunched = false;

const TRANSFORMED_BONUS_RATIO = 1;
const REWARD_UNIT = 1;

let transformedAlready = false;

const REWARD_TIMEOUT_DURATION = 5;
const KILLED_ENEMY_REWARD = 30;

let rewardStreak = 1;

let hardMode: boolean | null = false;

let TRANSFORMATION_THRESHOLD = hardMode ? 100000000 : 20;

let preTransformed = false;

let gameFinished = false;

let runStopped = false;

let score = 0;

let heroHurt = false;

let heroIsAlive = true;

const lifePoints = { max: 4, value: 4 };
let INVISIBILITY_DURATION_IN_MILLISECONDS = 2000;

let invisible = false;

const ennemiesOnScreen: Enemy[] = [];

let enemiesComingTimeout: ReturnType<typeof setTimeout> | null = null;

let transformed = false;

let currentMalusContainerTimeout: ReturnType<typeof setTimeout> | null = null;
let currentRewardContainerTimeout: ReturnType<typeof setTimeout> | null = null;
let currentTransformationRewardContainerTimeout: ReturnType<
  typeof setTimeout
> | null = null;

class Answer {
  data: string;
  good: boolean;

  constructor(data: string, good: boolean) {
    this.data = data;
    this.good = good;
  }
}

interface EnemyInterface {
  character: CharacterInterface;
  answer: ChallengeAnswerData;
  collideable:boolean;
}

class Enemy implements EnemyInterface {
  character: CharacterInterface;
  answer: ChallengeAnswerData;
  collideable = true;

  constructor(character: CharacterInterface, answer: ChallengeAnswerData) {
    this.character = character;
    this.answer = answer;
  }
}

enum TimeoutId {
  HERO,
  ENEMY,
}

declare global {
  interface Window {
    launchAttack: (event: Event) => void;
    launchInvisibilityToggle: (event: Event) => void;
  }
}

type GameTimeouts = {
  [TimeoutId.HERO]: ReturnType<typeof setTimeout>[];
  [TimeoutId.ENEMY]: ReturnType<typeof setTimeout>[];
};

const GAME_TIMEOUTS: GameTimeouts = {
  [TimeoutId.HERO]: [],
  [TimeoutId.ENEMY]: [],
};

type Subject = {
  title: string;
  good: Array<Answer>;
  bad: Array<Answer>;
};

const STATS = {
  title: "statistics",
  good: [
    new Answer(
      "L'étendue est obtenue en soustrayant la valeur minimale de la valeur maximale dans un jeu de données.",
      true
    ),
    new Answer(
      "Dans un ensemble de données, le mode est la valeur la plus fréquente.",
      true
    ),
    new Answer(
      "La variance montre la dispersion des valeurs autour de la moyenne d'un ensemble de données.",
      true
    ),
    new Answer("L'écart type est défini comme la racine carrée de la variance.", true),
    new Answer(
      "Les statistiques descriptives servent à résumer et à présenter les données de manière compréhensible.",
      true
    ),
    new Answer(
      "Les statistiques inférentielles permettent de tirer des conclusions et de faire des prévisions sur une population entière à partir d'un échantillon.",
      true
    ),
    new Answer(
      "Un ensemble de données peut contenir un ou plusieurs modes, en fonction de sa distribution.",
      true
    ),
    new Answer("Un jeu de données peut ne présenter aucun mode.", true),
    new Answer(
      "Les statistiques sont souvent divisées en statistiques descriptives et inférentielles.",
      true
    ),
    new Answer(
      "Le mode peut être utile pour identifier les valeurs dominantes dans des données catégorielles.",
      true
    ),
    new Answer(
      "La médiane d'un ensemble de données est la valeur centrale lorsqu'elles sont triées par ordre croissant ou décroissant.",
      true
    ),
    new Answer(
      "La moyenne arithmétique est obtenue en additionnant toutes les valeurs et en divisant par le nombre de données.",
      true
    ),
    new Answer(
      "Les quartiles divisent un ensemble de données en quatre parts égales.",
      true
    ),
    new Answer(
      "L'écart interquartile est la différence entre le troisième et le premier quartile, mesurant la dispersion des valeurs.",
      true
    ),
  ],
  bad: [
    new Answer("L'étendue est simplement la valeur minimale d'un ensemble de données.", false),
    new Answer(
      "Le mode est la valeur la moins fréquente dans un ensemble de données.",
      false
    ),
    new Answer(
      "La variance est le simple écart entre deux valeurs choisies au hasard.",
      false
    ),
    new Answer(
      "L'écart type est la différence entre la première et la dernière valeur d'un jeu de données.",
      false
    ),
    new Answer(
      "Les statistiques cumulatives sont une des deux catégories principales des statistiques.",
      false
    ),
    new Answer(
      "Les statistiques descriptives n'existent pas dans la classification statistique.",
      false
    ),
    new Answer(
      "Les statistiques inférentielles décrivent simplement les caractéristiques d'un ensemble de données.",
      false
    ),
    new Answer(
      "La médiane est toujours identique au mode pour un ensemble de données.",
      false
    ),
    new Answer("Un ensemble de données ne peut avoir qu'un seul mode.", false),
    new Answer("Un jeu de données ne peut pas avoir de quartiles.", false),
    new Answer(
      "La moyenne arithmétique et la médiane sont toujours égales pour tout ensemble de données.",
      false
    ),
  ],
};

const TYPES_DE_FONCTIONS_COURANTES = {
  title: "Types de Fonctions Courantes",
  good: [
    new Answer("Une fonction linéaire a la forme f(x) = m x + b.", true),
    new Answer("Le graphique d'une fonction linéaire est une droite.", true),
    new Answer("Dans une fonction linéaire, m représente la pente de la droite.", true),
    new Answer("Si m > 0, la droite monte de la gauche vers la droite.", true),
    new Answer("Une fonction quadratique a la forme f(x) = a x² + b x + c.", true),
    new Answer("Le graphique d'une fonction quadratique est une parabole.", true),
    new Answer("Si a > 0 dans une fonction quadratique, la parabole s'ouvre vers le haut.", true),
    new Answer("Le sommet d'une parabole est le point où la fonction atteint son maximum ou minimum.", true),
    new Answer("Une fonction exponentielle a la forme f(x) = a^x avec a > 0 et a ≠ 1.", true),
    new Answer("Si a > 1, la fonction exponentielle est croissante.", true),
    new Answer("Les fonctions exponentielles passent par le point (0, 1) car a^0 = 1.", true),
    new Answer("Une fonction logarithmique est la fonction inverse d'une fonction exponentielle.", true),
    new Answer("Une fonction logarithmique a la forme f(x) = log_a x avec x > 0.", true),
    new Answer("Les fonctions logarithmiques passent par le point (1, 0) puisque log_a 1 = 0.", true),
    new Answer("Les fonctions trigonométriques comme sin(x) et cos(x) sont périodiques.", true),
    new Answer("La fonction sin(x) a une période de 2π.", true),
    new Answer("La fonction valeur absolue est définie par f(x) = |x|.", true),
    new Answer("Le graphique de la fonction valeur absolue a la forme d'un 'V'.", true),
    new Answer("Une fonction racine carrée est définie par f(x) = √x avec x ≥ 0.", true),
    new Answer("Les fonctions racines carrées commencent à x = 0 et augmentent lentement.", true),
    new Answer("Une fonction polynomiale est une somme de termes de la forme a_n x^n.", true),
    new Answer("Le degré d'un polynôme est le plus grand exposant de x avec un coefficient non nul.", true),
    new Answer("Une fonction rationnelle est le quotient de deux polynômes.", true),
    new Answer("Les fonctions rationnelles peuvent avoir des asymptotes verticales là où le dénominateur est zéro.", true),
    new Answer("Les fonctions racines cubiques sont définies pour tout x.", true),
    new Answer("La fonction racine cubique f(x) = ∛x est symétrique par rapport à l'origine.", true),
    new Answer("Les fonctions réciproques 'annulent' l'effet d'une autre fonction.", true),
    new Answer("Si f(x) est bijective, sa réciproque f⁻¹(x) satisfait f⁻¹(f(x)) = x.", true),
    new Answer("La fonction exponentielle f(x) = e^x a pour réciproque la fonction logarithme naturel f⁻¹(x) = ln x.", true),
    new Answer("La fonction carré f(x) = x² pour x ≥ 0 a pour réciproque la fonction racine carrée f⁻¹(x) = √x.", true),
  ],
  bad: [
    new Answer("Le graphique d'une fonction linéaire est toujours une parabole.", false),
    new Answer("Dans une fonction linéaire, b représente la pente de la droite.", false),
    new Answer("Si m = 0 dans une fonction linéaire, la droite est verticale.", false),
    new Answer("Une fonction quadratique a toujours la forme f(x) = ax + b.", false),
    new Answer("Le graphique d'une fonction quadratique est une droite.", false),
    new Answer("Si a < 0 dans une fonction quadratique, la parabole s'ouvre vers le haut.", false),
    new Answer("Le sommet d'une parabole est toujours à l'origine (0,0).", false),
    new Answer("Une fonction exponentielle peut être écrite comme f(x) = x^a.", false),
    new Answer("Les fonctions exponentielles passent toujours par le point (1, 0).", false),
    new Answer("Une fonction logarithmique est définie pour tous les nombres réels x.", false),
    new Answer("Les fonctions logarithmiques ne sont jamais l'inverse des fonctions exponentielles.", false),
    new Answer("Les fonctions trigonométriques comme sin(x) sont des droites.", false),
    new Answer("La fonction valeur absolue f(x) = |x| est toujours négative.", false),
    new Answer("Une fonction racine carrée est définie pour tous les x, y compris les négatifs.", false),
    new Answer("Les fonctions polynomiales ne contiennent jamais de termes avec x^n.", false),
    new Answer("Une fonction rationnelle est toujours un polynôme.", false),
    new Answer("Les fonctions racines cubiques ne sont jamais définies pour x négatif.", false),
    new Answer("Les fonctions réciproques n'existent pas pour les fonctions bijectives.", false),
    new Answer("La fonction exponentielle f(x) = e^x n'a pas de fonction réciproque.", false),
    new Answer("Le graphique de la fonction f(x) = |x| est une courbe lisse sans angles.", false),
    new Answer("Les fonctions racines carrées diminuent à mesure que x augmente.", false),
    new Answer("Le degré d'un polynôme est toujours égal à 1.", false),
    new Answer("Les fonctions rationnelles n'ont jamais d'asymptotes.", false),
    new Answer("La fonction sin(x) a une période de π.", false),
    new Answer("Les fonctions exponentielles sont toujours décroissantes.", false),
    new Answer("Les fonctions logarithmiques passent toujours par le point (0, 0).", false),
  ],
};

const FONCTIONS_LINÉAIRES = {
  title: "Fonctions Linéaires",
  good: [
    new Answer("Une fonction linéaire est une fonction de la forme f(x) = m x + b.", true),
    new Answer("Le graphique d'une fonction linéaire est une droite.", true),
    new Answer("Le coefficient m dans une fonction linéaire représente la pente de la droite.", true),
    new Answer("Si m > 0, la droite est croissante et monte de la gauche vers la droite.", true),
    new Answer("Si m < 0, la droite est décroissante et descend de la gauche vers la droite.", true),
  ],
  bad: [
    new Answer("Le graphique d'une fonction linéaire est une courbe non linéaire.", false),
    new Answer("Dans une fonction linéaire, le coefficient m n'affecte pas l'inclinaison de la droite.", false),
    new Answer("Une fonction linéaire ne peut pas être constante.", false),
    new Answer("Si m = 0, la droite est verticale.", false),
    new Answer("Le terme b dans une fonction linéaire est appelé coefficient directeur.", false),
  ],
};

const FONCTIONS_QUADRATIQUES = {
  title: "Fonctions Quadratiques",
  good: [
    new Answer("Une fonction quadratique est de la forme f(x) = a x² + b x + c avec a ≠ 0.", true),
    new Answer("Le graphique d'une fonction quadratique est une parabole.", true),
    new Answer("Si a > 0, la parabole d'une fonction quadratique s'ouvre vers le haut.", true),
    new Answer("Le sommet d'une parabole est le point où la fonction atteint son maximum ou minimum.", true),
    new Answer("Dans l'exemple f(x) = x² - 4x + 3, le sommet est au point (2, -1).", true),
  ],
  bad: [
    new Answer("Une fonction quadratique est de la forme f(x) = a x + b.", false),
    new Answer("Le graphique d'une fonction quadratique est toujours une droite.", false),
    new Answer("Si a > 0, la parabole s'ouvre vers le bas.", false),
    new Answer("Le sommet d'une parabole est toujours à l'origine (0, 0).", false),
    new Answer("Dans l'exemple f(x) = x² - 4x + 3, le sommet est au point (0, 3).", false),
  ],
};


const VECTORS = {
  title: "Additions",
  good: [
    new Answer("un vecteur est noté AB -> ou u ->", true),
    new Answer(
      "La norme d'un vecteur, notée ||AB->|| est la longueur du vecteur AB -> autrement dit, la distance entre les points A et B.",
      true
    ),
    new Answer(
      "Le point d'origine du vecteur AB -> (ici le point A) est le point de départ qui en caractérise le sens",
      true
    ),
    new Answer(
      "Le point d'extrémité de AB -> est le point d'arrivée  (ici le point B) qui en caractérise le sens",
      true
    ),
    new Answer("Le vecteur opposé du vecteur AB > est BA -> ou -AB -> ", true),

    new Answer(
      "lorsque deux points AB sont confondus, on dit que AB -> est un vecteur nul",
      true
    ),
  ],
  bad: [
    new Answer(
      "Sens, et direction sont synonymes lorsqu'on parle de vecteurs",
      false
    ),
    new Answer(
      "Le point d'extremité est toujours égal au point d'arrivée d'un vecteur",
      false
    ),
    new Answer(
      "Le point d'extremité represente le point de départ du vecteur",
      false
    ),
    new Answer(
      "Un vecteur ne peut pas être nul, sinon ce n'est pas un vecteur",
      false
    ),
  ],
};

const charlotte_memories = {
  title: "Arithmetic",
  good: [
    new Answer("(27/07) j'ai été au marché", true),
    new Answer("(27/07) ,  mon oncle m'a déposé en voiture", true),
    new Answer("(samedi 27/07) j'ai souhaité bon anniversaire à Michael", true),
    new Answer("(samedi 27/07) Je suis sorti me faire coiffer", true),
    new Answer("(samedi 27/07) Je suis sorti à une réunion", true),
    new Answer("(samedi 27/07) Je suis rentrée à 3h du matin", true),
    new Answer("(samedi 27/07) J'ai bu un peu de champagne", true),
    new Answer("(samedi 27/07) j'ai mangé un peu d'ekoki/poisson", true),
    new Answer(
      "(samedi 27/07) J'étais habillée en pantalon bleu/blanc, sac bleu",
      true
    ),
    new Answer("(27/07) Mon oncle m'a déposée en voiture", true),
  ],
  bad: [
    new Answer("(27/07) Je suis allé au restaurant chez Julie", false),
    new Answer("(samedi 27/07) Maxime est venu à la maison", false),
    new Answer("(samedi 27/07) Je suis allé voir ma soeur ", false),
    new Answer("(samedi 27/07) J'ai regardé un reportage sur Poutine", false),
    new Answer("(samedi 27/07) j'ai mangé des myrtilles", false),
    new Answer("(samedi 27/07) J'ai bu du whisky avec du coca", false),
    new Answer(
      "(samedi 27/07) Des ouvriers sont venus changer les vitres",
      false
    ),
  ],
};

const Mike_memory = {
  title: "Arithmetic",
  good: [
    new Answer(
      "(26/07) Tu as regardé une interview de l'adjoint de Pierre Sage",
      true
    ),
    new Answer("(26/07) Tu as pris un café dans une tasse blanche", true),
    new Answer("(26/07) Tu as flippé sur ta peau oendant des heures", true),
    new Answer("(26/07) Tu as trouvé une bouteille de spray", true),
    new Answer("(26/07) Tu as changé tes draps", true),
    new Answer("(26/07) Tu as nettoyé le sol de la cuisine", true),
    new Answer(
      "(26/07) Tu as regardé une interview de l'adjoint de Pierre Sage",
      true
    ),
    new Answer("(26/07) Tu t'es fait retirer les fils la veille", true),
    new Answer("(26/07) Tu as lu un mail d'AMELI", true),
  ],
  bad: [
    new Answer(
      "(26/07) Tu as regardé une interview de l'adjoint de Pierre Sage",
      false
    ),
    new Answer("(26/07) Tu as pris un thé", false),
    new Answer("(26/07) Tu as mangé mcdo", false),
    new Answer("(26/07) Tu as bu du whisky", false),
    new Answer("(26/07) Tu as regardé l'interview de Moussa Niakhaté", false),
    new Answer("(26/07) Tu as appelé max", false),
    new Answer("(26/07) Tu n'es pas allé sur twitter", false),
    new Answer("(26/07) Tu t'es fait retirer les fils il y'a 2 jours", false),
  ],
};

const ALGEBRA_INTRO = {
  title: "Algebra Introduction",
  good: [
    new Answer("The equation 3x + 2 = 11 can be solved by first subtracting 2 from both sides to get 3x = 9, and then dividing by 3 to find that x = 3.", true),
    new Answer("The factorization of the quadratic equation x^2 - 5x + 6 is (x - 2)(x - 3), because multiplying these factors back out gives the original expression.", true),
    new Answer("To solve 2x + 5 = 17, first subtract 5 from both sides to get 2x = 12, and then divide both sides by 2 to get x = 6.", true),
    new Answer("If x - 4 = 9, you can solve for x by adding 4 to both sides, which gives you the solution x = 13.", true),
    new Answer("The equation 2x - 1 = 7 can be solved by adding 1 to both sides to get 2x = 8, then dividing by 2 to find that x = 4.", true),
    new Answer("The degree of the polynomial 4x^3 + 2x is 3 because the highest exponent of the variable x is 3, making this a cubic polynomial.", true),
    new Answer("The linear function f(x) = 2x + 3 has a slope of 2 and a y-intercept of 3, which means its graph is a straight line with a constant rate of change.", true),
    new Answer("Using the distributive property, we know that (a + b)^2 expands to a^2 + 2ab + b^2, which can be verified by multiplying (a + b)(a + b).", true),
    new Answer("When you add 5x and 3x, you combine the like terms to get 8x, because both terms have the same variable raised to the same power.", true),
    new Answer("The expression (x + 4)(x - 4) is an example of the difference of squares, which simplifies to x^2 - 16 according to the formula a^2 - b^2 = (a + b)(a - b).", true),
    new Answer("The quadratic expression x^2 - 9 is a difference of squares, which factors into (x + 3)(x - 3) because the square root of 9 is 3.", true),
    new Answer("To solve the equation 2x + 4 = 10, first subtract 4 from both sides to get 2x = 6, then divide by 2 to find that x = 3.", true),
    new Answer("A polynomial of degree 3, such as 4x^3 - 3x + 2, is called a cubic polynomial because the highest power of the variable x is 3.", true),
    new Answer("In the linear equation y = mx + b, the value of m represents the slope of the line, which is the rate at which y changes with respect to x.", true),
    new Answer("A quadratic function, such as f(x) = x^2, graphs as a parabola and is defined by having the highest power of x being 2.", true),
    new Answer("The quadratic expression x^2 + 2x + 1 can be factored as (x + 1)^2 because it represents a perfect square trinomial.", true),
    new Answer("The greatest common factor (GCF) of 12x and 8 is 4, because 4 is the largest number that divides evenly into both 12 and 8.", true),
    new Answer("To solve the system of equations 2x + 3y = 12 and x - y = 2, you can use substitution or elimination to find that x = 4 and y = 2.", true),
    new Answer("The function f(x) = 3x + 5 is linear, meaning that as x increases by 1, f(x) increases by 3. The graph of this function is a straight line with a slope of 3.", true),
    new Answer("The solution to the equation 5x = 15 is x = 3, which is found by dividing both sides of the equation by 5 to isolate x.", true),
    new Answer("When solving for x in the equation (x + 2)(x - 5) = 0, the solutions are x = -2 and x = 5, because these values make each factor equal to zero.", true)
  ],
  bad: [
    new Answer("The equation 3x + 2 = 11 can be solved by dividing both sides by 3 first, then subtracting 2 to get x = 2.", false),
    new Answer("The factorization of x^2 - 5x + 6 is (x + 2)(x + 3), because adding 2 and 3 gives 5.", false),
    new Answer("If x - 4 = 9, the solution is x = 5 because 9 minus 4 equals 5.", false),
    new Answer("In the polynomial 4x^3 + 2x, the degree is 2 because the highest variable term is 2x.", false),
    new Answer("The linear function f(x) = 2x + 3 has a slope of 3 and y-intercept of 2, which means the slope is always the second number.", false),
    new Answer("(a + b)^2 equals a^2 + b^2 because you simply square each term inside the parentheses individually.", false),
    new Answer("When you add 5x and 3x, you get 5x + 3x, because they are different terms that cannot be combined.", false),
    new Answer("The expression (x + 4)(x - 4) simplifies to x^2 + 16 because you add the terms together.", false),
    new Answer("The solution to the equation 2x + 4 = 10 is x = 8, because dividing by 2 gives you 8.", false),
    new Answer("In the equation y = mx + b, b represents the slope of the line because it comes after the x term.", false),
    new Answer("A quadratic function like f(x) = x^2 has no slope, because it is a horizontal line.", false),
    new Answer("The greatest common factor of 12x and 8 is 2, because 2 divides both 12 and 8 evenly.", false),
    new Answer("The system of equations 2x + 3y = 12 and x - y = 2 can be solved by adding both equations to get x + y = 14.", false),
    new Answer("The solution to 5x = 15 is x = 5, because dividing 15 by 5 gives you 5.", false),
    new Answer("When solving (x + 2)(x - 5) = 0, there is only one solution, x = 0, because multiplying them gives zero.", false),
    new Answer("In the equation x^2 - 9 = 0, there are no solutions because there is no number that makes x^2 equal to 9.", false),
    new Answer("To solve the equation 3x + 5 = 20, you can subtract 5 from 20 to get x = 15.", false),
    new Answer("The function f(x) = 2x + 3 is not linear because it involves adding 3 to the x term.", false),
    new Answer("In a quadratic function like f(x) = x^2 + 3x, the graph is always a straight line because it contains only one variable.", false)
  ]
};

const AUTHOR_INFO = {
  title: "About the Author - David C. Lay",
  good: [
    new Answer("David C. Lay holds a B.A. from Aurora University and an M.A. and Ph.D. from UCLA.", true),
    new Answer("David Lay has been an educator and research mathematician since 1966.", true),
    new Answer("He has published more than 30 research articles on functional analysis and linear algebra.", true),
    new Answer("David Lay is a founding member of the NSF-sponsored Linear Algebra Curriculum Study Group.", true),
    new Answer("He received the title of Distinguished Scholar–Teacher of the University of Maryland in 1996.", true),
    new Answer("In 1994, he was awarded for Distinguished College or University Teaching of Mathematics by the Mathematical Association of America.", true),
    new Answer("David Lay has served as a visiting professor at the University of Kaiserslautern, Germany.", true),
    new Answer("He is a member of the American Mathematical Society and the International Linear Algebra Society.", true),
    new Answer("David Lay has co-authored several mathematics texts, including 'Introduction to Functional Analysis.'", true),
    new Answer("He has contributed to modernizing the linear algebra curriculum.", true),
    new Answer("David Lay has been an educator mostly at the University of Maryland, College Park.", true),
    new Answer("He has also worked at the Free University in Amsterdam.", true),
    new Answer("David Lay has been involved in the Association of Christians in the Mathematical Sciences since 1992.", true),
    new Answer("He has received four university awards for teaching excellence.", true),
    new Answer("David Lay has served on the national board of the Association of Christians in the Mathematical Sciences.", true)
  ],
  bad: [
    new Answer("David C. Lay holds a B.A. from Yale University and an M.A. from Harvard University.", false),
    new Answer("He has published over 100 research articles on number theory.", false),
    new Answer("David Lay has never been a professor at any university.", false),
    new Answer("He was awarded the title of Distinguished Scholar–Teacher of Harvard University in 1996.", false),
    new Answer("David Lay has no involvement with any mathematics societies.", false),
    new Answer("He has only taught mathematics since 1990.", false),
    new Answer("David Lay is known for his work exclusively in geometry.", false),
    new Answer("He received the Outstanding Alumnus award from Stanford University.", false),
    new Answer("David Lay is a founding member of the National Mathematics Society.", false),
    new Answer("He has never published any research articles on linear algebra.", false),
    new Answer("David Lay has only worked in the field of applied mathematics.", false),
    new Answer("He has not been recognized for his teaching excellence at any institution.", false),
    new Answer("David Lay served as a visiting professor in the United Kingdom only.", false),
    new Answer("He has authored a textbook solely on calculus.", false),
    new Answer("David Lay's contributions are limited to the field of statistics.", false)
  ]
};

const LINEAR_ALGEBRA_CHAPTER_1 = {
  title: "Understanding Vectors",
  good: [
    new Answer("A vector is a mathematical entity with direction and magnitude (or length).", true),
    new Answer("Vectors can represent elements like the speed of an object or the direction in which it moves.", true),
    new Answer("In two-dimensional space, a vector can be written as (x, y), where x and y are its components.", true),
    new Answer("The x component of a vector represents distance traveled horizontally, and the y component represents distance vertically.", true),
    new Answer("Vectors can be visualized as arrows on a graph, where the arrow's length represents the vector’s magnitude.", true),
    new Answer("Adding vectors allows us to combine different directions and lengths.", true),
    new Answer("For example, if a boat moves north and then east, the final direction can be found by adding the two vector movements.", true),
    new Answer("Vectors are commonly used in algebra to represent both magnitude and direction in two-dimensional or three-dimensional space.", true),
  ],
  bad: [
    new Answer("A vector is just a single number with no direction.", false),
    new Answer("The components of a vector don't indicate direction or distance.", false),
    new Answer("Adding vectors has no practical application.", false),
    new Answer("A vector is always a single point without length or direction.", false),
    new Answer("A vector in two-dimensional space is represented by only one component.", false),
    new Answer("The x and y components of a vector have no specific meaning or relation to direction.", false),
    new Answer("Vectors cannot be visualized on a graph.", false),
    new Answer("The length of a vector tells you nothing about its direction.", false),
  ],
};

const LINEAR_ALGEBRA_BASICS = {
  title: "Understanding Lines and Intercepts",
  good: [
    new Answer("The y-intercept is where a line crosses the vertical axis (the y-axis).", true),
    new Answer("The slope tells you how steep a line is, describing how much it rises or falls as you move along the x-axis.", true),
    new Answer("A two-variable equation creates a straight line when graphed.", true),
    new Answer("To find the y-intercept, set the x-variable to 0 and see where the line meets the y-axis.", true),
    new Answer("In slope-intercept form, the y-intercept is the number at the end (without an x).", true),
    new Answer("The slope is the number in front of x and shows how the line rises or falls as you move to the right.", true),
    new Answer("A slope of 0 means the line is flat and doesn’t rise or fall.", true),
    new Answer("If the y-intercept is positive, the line crosses above the origin.", true),
    new Answer("A negative slope means the line falls as you move to the right.", true),
    new Answer("When x is zero, the value of y gives you the y-intercept.", true),
    new Answer("Linear equations describe straight lines because the variables have no exponents.", true),
    new Answer("The slope can be thought of as rise over run, describing how much y changes for each change in x.", true),
    new Answer("A slope of 1 means the line rises one unit for each unit you move to the right.", true),
    new Answer("The y-intercept is the point (0, b) in the equation y = mx + b.", true),
    new Answer("The slope can be found by picking two points on the line and dividing the change in y by the change in x.", true),
  ],
  bad: [
    new Answer("The y-intercept is where the line crosses the x-axis.", false),
    new Answer("A two-variable equation always creates a curve, like a parabola.", false),
    new Answer("The slope only tells you where the line starts, not how it moves.", false),
    new Answer("The y-intercept can only be found by solving for x, not by looking at the equation.", false),
    new Answer("The slope is always 1, and all lines are equally steep.", false),
    new Answer("In slope-intercept form, the y-intercept is always the number attached to x.", false),
    new Answer("A negative y-intercept means the line never crosses the y-axis.", false),
    new Answer("The y-intercept changes based on where the line crosses the x-axis.", false),
    new Answer("A slope of zero means the line falls straight down.", false),
    new Answer("The y-intercept cannot be found from a graph.", false),
    new Answer("The slope is measured by how high the line starts.", false),
    new Answer("If the slope is negative, the line doesn’t cross the y-axis.", false),
    new Answer("The y-intercept is always a positive number.", false),
    new Answer("All lines have the same y-intercept, regardless of the equation.", false),
    new Answer("The slope only matters for vertical lines, not diagonal ones.", false),
    new Answer("A two-variable equation can describe any shape, even circles and triangles.", false),
  ],
};

const FUNCTION_BASICS = {
  title: "Understanding Functions",
  good: [
    new Answer("A function connects each input to exactly one output.", true),
    new Answer("In a function, each x value gives only one y value.", true),
    new Answer("You can think of a function like a machine: put in a number, get a result.", true),
    new Answer("When we write f(x), it means the output from the function f when you use x as input.", true),
    new Answer("Changing the input (x) in a function changes the output (y).", true),
  ],
  bad: [
    new Answer("A function can have multiple outputs for the same input.", false),
    new Answer("A function’s output doesn’t depend on its input.", false),
    new Answer("Writing f(x) just shows the input x, not the output.", false),
    new Answer("A function always gives the same output, no matter the input.", false),
    new Answer("A function allows each input to have more than one output.", false),
  ],
};

const NOTATION_ET_REPRESENTATION_DES_FONCTIONS = {
  title: "Notation et Représentation des Fonctions",
  good: [
    new Answer("La notation f(x) signifie la fonction f évaluée en x.", true),
    new Answer("Dans une fonction, x est la variable indépendante (l'entrée) et y = f(x) est la variable dépendante (la sortie).", true),
    new Answer("Les fonctions peuvent être représentées graphiquement en traçant des points (x, y) sur un plan cartésien.", true),
    new Answer("Représenter une fonction sur un graphique nous permet de visualiser comment la fonction se comporte.", true),
    new Answer("Pour la fonction f(x) = x², on peut tracer les points (-2, 4), (0, 0) et (2, 4).", true),
  ],
  bad: [
    new Answer("La notation f(x) signifie qu'on multiplie f par x.", false),
    new Answer("Dans une fonction, y est la variable indépendante et x est la variable dépendante.", false),
    new Answer("Les fonctions ne peuvent pas être représentées graphiquement.", false),
    new Answer("Tracer des points (x, y) sur un plan cartésien ne nous aide pas à visualiser le comportement de la fonction.", false),
    new Answer("Pour la fonction f(x) = x², les points (-2, 4), (0, 0) et (2, 4) ne sont pas sur son graphe.", false),
  ],
};

const MATHS_ARITHMETIC = {
  title: "Intermediate Arithmetic Challenge",
  good: [
    new Answer("12 + 8 = 20", true),
    new Answer("15 - 6 = 9", true),
    new Answer("9 + 7 = 16", true),
    new Answer("18 - 11 = 7", true),
    new Answer("14 + 6 = 20", true),
    new Answer("21 - 13 = 8", true),
    new Answer("16 + 5 = 21", true),
    new Answer("24 - 10 = 14", true),
    new Answer("13 + 8 = 21", true),
    new Answer("20 - 12 = 8", true),
  ],
  bad: [
    new Answer("12 + 8 = 22", false),
    new Answer("15 - 6 = 8", false),
    new Answer("9 + 7 = 15", false),
    new Answer("18 - 11 = 6", false),
    new Answer("14 + 6 = 22", false),
    new Answer("21 - 13 = 10", false),
    new Answer("16 + 5 = 22", false),
    new Answer("24 - 10 = 15", false),
    new Answer("13 + 8 = 20", false),
    new Answer("20 - 12 = 10", false),
  ],
};

const sortAndStoreAnswers = (challengeData: Array<ChallengeAnswerData>) => {

  const shuffle = (array: Array<ChallengeAnswerData>) => {

    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and randomIndex
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  let randomlySortedChallengeArray = shuffle(challengeData);


  randomlySortedChallengeArray.forEach(
    (challenge) => {
       store.dispatch(addAnswer({
        data: challenge,
        found: null
       }))
    }
  )



}


const findNextAnswer = () => {

  const challenge = store.getState().challenge;
  const currentAnswerIndex = challenge.currentAnswerIndex;
  const answers = challenge.answers;

  if(currentAnswerIndex >= answers.length){
        
    return "done";
  }

  const data = answers[store.getState().challenge.currentAnswerIndex].data;

  store.dispatch(incrementAnswerIndex());

  return data;

}


const getNextAnswer = () => {
  const randVal = Math.random() > 0.5;

  if (!currentSubject) {
    defineCurrentSubject(hardMode ? MATHS_ARITHMETIC : MATHS_ARITHMETIC);
  }

  const getAndRemoveSubject: any = (index: number, list: Array<any>) => {
    let foundElement = null;
    for (let elementIndex = 0; elementIndex < list.length; elementIndex++) {
      let element = list[elementIndex];
      if (elementIndex === index) {
        list.splice(elementIndex, 1);
        foundElement = element;
        break;
      }
    }
    if (foundElement === null) {
      console.log("error => we couldnt find an element in the answers list");
    }

    return foundElement;
  };

  if (randVal) {
    return currentSubject?.good.length
      ? getAndRemoveSubject(
          Math.round(Math.random() * (currentSubject.good.length - 1)),
          currentSubject.good
        )
      : currentSubject?.bad.length
      ? getAndRemoveSubject(
          Math.round(Math.random() * (currentSubject.bad.length - 1)),
          currentSubject.bad
        )
      : "done";
  } else {
    return currentSubject?.bad.length
      ? getAndRemoveSubject(
          Math.round(Math.random() * (currentSubject.bad.length - 1)),
          currentSubject.bad
        )
      : currentSubject?.good.length
      ? getAndRemoveSubject(
          Math.round(Math.random() * (currentSubject.good.length - 1)),
          currentSubject.good
        )
      : "done";
  }
};

const Grades = {
  D: [0, 1, 2, 3, 4, 5],
  C: [6, 7, 8, 9, 10],
  B: [11, 12, 13, 14],
  A: [15, 16, 17],
  S: [18, 19, 20],
};

/*

const getChallengeGrade = () => {
  return Grades.D.includes(score)
    ? "D"
    : Grades.C.includes(score)
    ? "C"
    : Grades.B.includes(score)
    ? "B"
    : Grades.A.includes(score)
    ? "A"
    : "S";
};

*/

const getChallengeGrade = () => {
  if (!currentSubject) {
    return;
  }

  const grade = Math.round((score / currentSubjectTotal) * 20);

  return Grades.D.includes(grade)
    ? "D"
    : Grades.C.includes(grade)
    ? "C"
    : Grades.B.includes(grade)
    ? "B"
    : Grades.A.includes(grade)
    ? "A"
    : "S";
};

const updateLifePointsDisplay = () => {
  for (let i = 1; i <= lifePoints.max; i++) {
    const lifePointOpacity = i <= lifePoints.value ? "1" : "0.3";

    document.getElementById(`lifePointContainer_${i}`)!.style.opacity =
      lifePointOpacity;
  }
};

const setHeroClass = () => {
  heroContainer.classList.add(
    hardMode ? "hero_container_hard" : "hero_container_easy"
  );
};

const buildEnemyElement = () => {
  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add(
    hardMode ? "hard_enemy_container" : "enemy_container"
  );
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = hardMode
    ? "assets/challenge/characters/enemies/hard/attack/1.png"
    : "assets/challenge/characters/enemies/black_spirit/run/1.png";

  newOpponentContainer.append(newEnnemyImg);

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  return newOpponentContainer;
};

const buildEnemy = (answer: ChallengeAnswerData) => {


 const enemyCreationCallbacks = [
  createKingCharacter,
 ];
 

 const enemyIndex = Math.floor(Math.random() * (enemyCreationCallbacks.length - 1))

 const enemyCharacter = enemyCreationCallbacks[enemyIndex]();

  if (!enemyCharacter) {
    return;
  }

  document.getElementsByTagName("body")[0].append();

  const enemy = new Enemy(enemyCharacter, answer);

  ennemiesOnScreen.push(enemy);

  return enemy;
};

const buildAndLaunchEnemy = (answer: ChallengeAnswerData) => {
  const enemy = buildEnemy(answer);

  if (!enemy) {
    return;
  }

  lightUpAnswerDataContainer();

  answerDataValue.innerHTML = enemy.answer.text;

  launchOpponent(enemy);
};

const triggerOpponentsApparition = () => {
  const newAnswer = findNextAnswer();
  enemiesComingTimeout = setTimeout(
    () => {
      if (newAnswer && newAnswer !== "done") {
        buildAndLaunchEnemy(newAnswer);
      } else {
        launchEndOfChallenge();
      }
    },
    Math.random() > 0.5 ? 10 : 50
  );
};

const launchEndOfChallenge = () => {

  window.location.href = "http://localhost:3001/dead_hard";

  return; 

  gameFinished = true;
  document.getElementById("endOfGameInterface")!.style.display = "flex";
  clearGameTimeouts();
  initAllAnimations();
  heroImage.src = "assets/challenge/characters/hero/run/1.png";
  document.getElementById("transformation_background")!.style.display = "none";

  const grade = getChallengeGrade();

  const levelUpAudio = document.getElementById(
    "levelup_audio"
  )! as HTMLAudioElement;
  const endOfChallengeButton = document.getElementById(
    "challengesuccessButton"
  )!;

  const displayEndOfGameButton = () => {
    if (grade === "A" || grade === "S") {
      endOfChallengeButton.style.display = "flex";
      levelUpAudio.play();
    }
  };

  setTimeout(() => {
    if (!grade) {
      return;
    }
    killAllAudios();

    document.getElementById("endOfGameInterfaceScore")!.innerHTML = grade;
    document.getElementById("endOfGameInterfaceScore")!.style.display = "flex";
    const stampAudio = document.getElementById(
      "stamp_audio"
    )! as HTMLAudioElement;
    stampAudio.play();

    setTimeout(() => {
      displayEndOfGameButton();
    }, 2000);
  }, 1000);
};

export enum ANIMATION_ID {
  hero_attack,
  hero_run,
  hero_run_right,
  hero_run_left,
  hero_walk_right,
  hero_walk_left,
  hero_hurt,
  hero_death,
  hero_idle,
  hero_second_idle,
  hero_special_attack,
  stop,
  stop_time,
  cancel_stop_time,
  ghost_opponent_idle,
  ghost_opponent_run,
  ghost_opponent_attack,
  ghost_opponent_death,
  ghost_opponent_move,
  hammer_opponent_idle,
  hammer_opponent_run,
  hammer_opponent_attack,
  hammer_opponent_death,
  hammer_opponent_move,
  golem_opponent_idle,
  golem_opponent_run,
  golem_opponent_attack,
  golem_opponent_death,
  golem_opponent_move,
  king_opponent_idle,
  king_opponent_run,
  king_opponent_attack,
  king_opponent_death,
  king_opponent_move,
  witch_opponent_idle,
  witch_opponent_run,
  witch_opponent_attack,
  witch_opponent_death,
  witch_opponent_move,
  orc_opponent_idle,
  orc_opponent_run,
  orc_opponent_attack,
  orc_opponent_death,
  orc_opponent_move,
  dwarf_opponent_idle,
  dwarf_opponent_run,
  dwarf_opponent_attack,
  dwarf_opponent_death,
  dwarf_opponent_move,
  camera_left_to_right,
  camera_right_to_left,
  character_left_to_right_move,
  hero_sword_slash,
  hero_transformation_pre_run,
  hero_transformation_run,
  hero_transformation_hurt,
  hero_transformation_attack,
  boss_idle,
  boss_attack,
  lightning
}

export const ANIMATION_RUNNING_VALUES = {
  [ANIMATION_ID.hero_attack]: 0,
  [ANIMATION_ID.hero_run]: 0,
  [ANIMATION_ID.hero_run_right]: 0,  
  [ANIMATION_ID.hero_run_left]: 0,  
  [ANIMATION_ID.hero_walk_right]: 0,
  [ANIMATION_ID.hero_walk_left]: 0,
  [ANIMATION_ID.hero_death]: 0,
  [ANIMATION_ID.hero_hurt]: 0,
  [ANIMATION_ID.hero_idle]: 0,
  [ANIMATION_ID.hero_second_idle]: 0,
  [ANIMATION_ID.hero_special_attack]: 0,
  [ANIMATION_ID.stop_time]: 0,
  [ANIMATION_ID.stop]: 0,
  [ANIMATION_ID.cancel_stop_time]: 0,
  [ANIMATION_ID.ghost_opponent_idle]: 0,
  [ANIMATION_ID.ghost_opponent_run]: 0,
  [ANIMATION_ID.ghost_opponent_attack]: 0,
  [ANIMATION_ID.ghost_opponent_death]: 0,
  [ANIMATION_ID.ghost_opponent_move]: 0,
  [ANIMATION_ID.hammer_opponent_idle]: 0, 
  [ANIMATION_ID.hammer_opponent_run]: 0,
  [ANIMATION_ID.hammer_opponent_attack]: 0,
  [ANIMATION_ID.hammer_opponent_death]: 0,
  [ANIMATION_ID.hammer_opponent_move]: 0,
  [ANIMATION_ID.orc_opponent_idle]:0,
  [ANIMATION_ID.orc_opponent_run]:0,
  [ANIMATION_ID.orc_opponent_attack]:0,
  [ANIMATION_ID.orc_opponent_death]:0,
  [ANIMATION_ID.orc_opponent_move]:0,
  [ANIMATION_ID.dwarf_opponent_idle]:0,
  [ANIMATION_ID.dwarf_opponent_run]:0,
  [ANIMATION_ID.dwarf_opponent_attack]:0,
  [ANIMATION_ID.dwarf_opponent_death]:0,
  [ANIMATION_ID.dwarf_opponent_move]:0,
  [ANIMATION_ID.golem_opponent_idle]:0,
  [ANIMATION_ID.golem_opponent_run]:0,
  [ANIMATION_ID.golem_opponent_attack]:0,
  [ANIMATION_ID.golem_opponent_death]:0,
  [ANIMATION_ID.golem_opponent_move]:0,
  [ANIMATION_ID.king_opponent_idle]:0,
  [ANIMATION_ID.king_opponent_run]:0,
  [ANIMATION_ID.king_opponent_attack]:0,
  [ANIMATION_ID.king_opponent_death]:0,
  [ANIMATION_ID.king_opponent_move]:0,
  [ANIMATION_ID.witch_opponent_idle]:0,
  [ANIMATION_ID.witch_opponent_run]:0,
  [ANIMATION_ID.witch_opponent_attack]:0,
  [ANIMATION_ID.witch_opponent_death]:0,
  [ANIMATION_ID.witch_opponent_move]:0,  
  [ANIMATION_ID.camera_left_to_right]: 0,
  [ANIMATION_ID.camera_right_to_left]: 0,
  [ANIMATION_ID.character_left_to_right_move]: 0,
  [ANIMATION_ID.hero_sword_slash]: 0,
  [ANIMATION_ID.hero_transformation_pre_run]: 0,
  [ANIMATION_ID.hero_transformation_run]: 0,
  [ANIMATION_ID.hero_transformation_hurt]: 0,
  [ANIMATION_ID.hero_transformation_attack]: 0,
  [ANIMATION_ID.boss_idle]: 0,
  [ANIMATION_ID.boss_attack]: 0,
  [ANIMATION_ID.lightning]: 0,

};

export const THROTTLE_NUMS = {
  [ANIMATION_ID.hero_attack]: 0,
  [ANIMATION_ID.hero_run]: 5,
  [ANIMATION_ID.hero_run_right]: 0,  
  [ANIMATION_ID.hero_run_left]: 0,  
  [ANIMATION_ID.hero_walk_right]: 0,
  [ANIMATION_ID.hero_walk_left]: 0,
  [ANIMATION_ID.hero_death]: 5,
  [ANIMATION_ID.hero_hurt]: 0,
  [ANIMATION_ID.hero_idle]: 20,
  [ANIMATION_ID.hero_second_idle]: 0,
  [ANIMATION_ID.hero_special_attack]: 0,
  [ANIMATION_ID.stop_time]: 5,
  [ANIMATION_ID.stop]: 0,
  [ANIMATION_ID.cancel_stop_time]: 5,
  [ANIMATION_ID.ghost_opponent_idle]: 5,
  [ANIMATION_ID.ghost_opponent_run]: 5,
  [ANIMATION_ID.ghost_opponent_attack]: 0,
  [ANIMATION_ID.ghost_opponent_death]: 0,
  [ANIMATION_ID.ghost_opponent_move]: 1,
  [ANIMATION_ID.hammer_opponent_idle]: 0, 
  [ANIMATION_ID.hammer_opponent_run]: 0,
  [ANIMATION_ID.hammer_opponent_attack]: 0,
  [ANIMATION_ID.hammer_opponent_death]: 0,
  [ANIMATION_ID.hammer_opponent_move]: 0,
  [ANIMATION_ID.orc_opponent_idle]:0,
  [ANIMATION_ID.orc_opponent_run]:0,
  [ANIMATION_ID.orc_opponent_attack]:0,
  [ANIMATION_ID.orc_opponent_death]:0,
  [ANIMATION_ID.orc_opponent_move]:0,
  [ANIMATION_ID.dwarf_opponent_idle]:0,
  [ANIMATION_ID.dwarf_opponent_run]:0,
  [ANIMATION_ID.dwarf_opponent_attack]:0,
  [ANIMATION_ID.dwarf_opponent_death]:0,
  [ANIMATION_ID.dwarf_opponent_move]:0,
  [ANIMATION_ID.golem_opponent_idle]:0,
  [ANIMATION_ID.golem_opponent_run]:0,
  [ANIMATION_ID.golem_opponent_attack]:0,
  [ANIMATION_ID.golem_opponent_death]:0,
  [ANIMATION_ID.golem_opponent_move]:0,
  [ANIMATION_ID.king_opponent_idle]:0,
  [ANIMATION_ID.king_opponent_run]:0,
  [ANIMATION_ID.king_opponent_attack]:0,
  [ANIMATION_ID.king_opponent_death]:0,
  [ANIMATION_ID.king_opponent_move]:0,
  [ANIMATION_ID.witch_opponent_idle]:0,
  [ANIMATION_ID.witch_opponent_run]:0,
  [ANIMATION_ID.witch_opponent_attack]:0,
  [ANIMATION_ID.witch_opponent_death]:0,
  [ANIMATION_ID.witch_opponent_move]:0,  
  [ANIMATION_ID.camera_left_to_right]: 0,
  [ANIMATION_ID.camera_right_to_left]: 0,
  [ANIMATION_ID.hero_sword_slash]: 0,
  [ANIMATION_ID.character_left_to_right_move]: 5,
  [ANIMATION_ID.hero_transformation_pre_run]: 5,
  [ANIMATION_ID.hero_transformation_run]: 5,
  [ANIMATION_ID.hero_transformation_hurt]: 0,
  [ANIMATION_ID.hero_transformation_attack]: 0,
  [ANIMATION_ID.boss_idle]: 15,
  [ANIMATION_ID.boss_attack]: 10,
  [ANIMATION_ID.lightning]: 0,
};

const APP_IDS = {
  hero: "hero_container",
  enemy: "enemy_container",
  red_hammer_enemy: "red_hammer_enemy",
  orc_enemy: "orc_enemy",
  dwarf_enemy: "dwarf_enemy",
  golem_enemy: "golem_enemy",
  king_enemy: "king_enemy",
  witch_enemy: "witch_enemy"
};

class AnimationRequest {
  animation: ANIMATION_ID;
  callBack: () => void;

  constructor(animation: ANIMATION_ID, callBack: () => void) {
    this.animation = animation;
    this.callBack = callBack;
  }
}

// Define the type for the structure of each element in APP_ELEMENTS_ANIMATION_QUEUE
type AppElementAnimationQueue = {
  request_queue: AnimationRequest[];
  current_animation: ANIMATION_ID | null;
  associated_animations: ANIMATION_ID[];
};

// Define the type for the entire APP_ELEMENTS_ANIMATION_QUEUE object
type AppElementsAnimationQueue = {
  [key in keyof typeof APP_IDS]: AppElementAnimationQueue;
};

// The APP_ELEMENTS_ANIMATION_QUEUE object
const APP_ELEMENTS_ANIMATION_QUEUE: AppElementsAnimationQueue = {
  hero: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.hero_run,
      ANIMATION_ID.hero_attack,
      ANIMATION_ID.hero_hurt,
      ANIMATION_ID.hero_death,
      ANIMATION_ID.hero_special_attack,
      ANIMATION_ID.stop,
      ANIMATION_ID.stop_time,
      ANIMATION_ID.hero_transformation_hurt,
      ANIMATION_ID.hero_transformation_pre_run,
      ANIMATION_ID.hero_transformation_run,
      ANIMATION_ID.hero_transformation_attack,
      ANIMATION_ID.hero_idle
    ],
  },
  enemy: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.ghost_opponent_attack,
      ANIMATION_ID.ghost_opponent_run,
      ANIMATION_ID.ghost_opponent_death,
      ANIMATION_ID.ghost_opponent_move,
    ],
  },
  red_hammer_enemy: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.hammer_opponent_idle,
      ANIMATION_ID.hammer_opponent_run,
      ANIMATION_ID.hammer_opponent_attack,
      ANIMATION_ID.hammer_opponent_death   
    ]
  },
  orc_enemy: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.orc_opponent_idle,
      ANIMATION_ID.orc_opponent_run,
      ANIMATION_ID.orc_opponent_attack,
      ANIMATION_ID.orc_opponent_death   
    ]
  },
  dwarf_enemy: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.dwarf_opponent_idle,
      ANIMATION_ID.dwarf_opponent_run,
      ANIMATION_ID.dwarf_opponent_attack,
      ANIMATION_ID.dwarf_opponent_death   
    ]
  },
  golem_enemy: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.golem_opponent_idle,
      ANIMATION_ID.golem_opponent_run,
      ANIMATION_ID.golem_opponent_attack,
      ANIMATION_ID.golem_opponent_death  
    ]
  },
  king_enemy: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.king_opponent_idle,
      ANIMATION_ID.king_opponent_run,
      ANIMATION_ID.king_opponent_attack,
      ANIMATION_ID.king_opponent_death  
    ]
  },
  witch_enemy: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.witch_opponent_idle,
      ANIMATION_ID.witch_opponent_attack,
      ANIMATION_ID.witch_opponent_run,
      ANIMATION_ID.witch_opponent_death  
    ]
  }
};

const getAppIdByAnimationId = (
  animationId: ANIMATION_ID
): keyof AppElementsAnimationQueue | false => {
  for (const appId in APP_ELEMENTS_ANIMATION_QUEUE) {
    if (APP_ELEMENTS_ANIMATION_QUEUE.hasOwnProperty(appId)) {
      const element =
        APP_ELEMENTS_ANIMATION_QUEUE[appId as keyof AppElementsAnimationQueue];
      if (element.associated_animations.includes(animationId)) {
        return appId as keyof AppElementsAnimationQueue;
      }
    }
  }
  return false;
};

let fullScreen = false;

const timeManipulationToggle = () => {
  if (!fullScreen) {
    document.getElementsByTagName("body")[0].requestFullscreen();
    fullScreen = true;
  }
  if (!gameLaunched || window.innerWidth > 1000 || !hardMode) return;

  if (runStopped) {
    resumeRun();
  } else {
    stopRun();
  }
};

class MapSet {
  imagePath: string;
  velocity: number;
  maps: HTMLElement[]

  constructor(imagePath: string, velocity: number, zIndex: string){
    this.imagePath = imagePath;
    this.velocity = velocity;
    this.maps = [createMapBlock(0, imagePath, zIndex), createMapBlock(window.innerWidth * 0.98, imagePath, zIndex) ]
  }
}

const createMapSet = (imagePath: string, velocity: number, zIndex = "1") => {
  MAP_SETS.push(new MapSet(imagePath, velocity, zIndex));
}

const createMapBlock = (left: number, imagePath: string, zIndex = "1") => {
  const block = document.createElement("div");
  block.classList.add("mapBlock");
  block.style.zIndex = zIndex;
  const backgroundImage = document.createElement("img");
  backgroundImage.src = imagePath;

  block.append(backgroundImage);
  block.style.position = "absolute";
  block.style.left = `${left}px`;
  block.onclick = (event: Event) => timeManipulationToggle();

  document.getElementsByTagName("body")[0].append(block);

  const newElement = document.createElement("div");

  const newElementContent = gameMap.elements[gameMap.endIndex];

  newElement.innerHTML = newElementContent? newElementContent.type : "nothing";

  return block;
};

const slowTime = (multiplicator: number) => {
  const runMultiplicatorBase = THROTTLE_NUMS[ANIMATION_ID.hero_run]
    ? THROTTLE_NUMS[ANIMATION_ID.hero_run]
    : 1;
  THROTTLE_NUMS[ANIMATION_ID.hero_run] =
    runMultiplicatorBase * multiplicator * 1.5 * 1.5;

  const cameraMoveMultiplicatorBase = THROTTLE_NUMS[
    ANIMATION_ID.camera_left_to_right
  ]
    ? THROTTLE_NUMS[ANIMATION_ID.camera_left_to_right]
    : 1;
  THROTTLE_NUMS[ANIMATION_ID.camera_left_to_right] =
    cameraMoveMultiplicatorBase * multiplicator * 1.5;

  const opponentRunMultiplicatorBase = THROTTLE_NUMS[ANIMATION_ID.ghost_opponent_run]
    ? THROTTLE_NUMS[ANIMATION_ID.ghost_opponent_run]
    : 1;
  THROTTLE_NUMS[ANIMATION_ID.ghost_opponent_run] =
    opponentRunMultiplicatorBase * multiplicator;

  const opponentMoveMultiplicatorBase = THROTTLE_NUMS[
    ANIMATION_ID.ghost_opponent_move
  ]
    ? THROTTLE_NUMS[ANIMATION_ID.ghost_opponent_move]
    : 1;
  THROTTLE_NUMS[ANIMATION_ID.ghost_opponent_move] =
    opponentMoveMultiplicatorBase * multiplicator * 2;
};

const moveCamera = (
  direction: ANIMATION_ID,
  previousFrameTimestamp: number,
  mapSetIndex: number,
  cameraSpeed: number
): any => {
  if (
    ANIMATION_RUNNING_VALUES[direction] === 0 ||
    ANIMATION_RUNNING_VALUES[direction] > 1
  ) {
    return;
  }


  const currentFrameTimeStamp = Date.now();

  const diff = currentFrameTimeStamp - previousFrameTimestamp;

  const mapSet = MAP_SETS[mapSetIndex];

    mapSet.maps.forEach(
      (map) =>
        (map.style.left = `${
          map.offsetLeft +
          Math.floor((direction === ANIMATION_ID.camera_left_to_right ? -1 : 1) * cameraSpeed * diff * ((mapSet.velocity)/20) * (superSpeedOn? CAMERA_SUPER_SPEED_MULTIPLICATOR : 0.8) ) / 3
       }px`)
     );

  requestAnimationFrame(() => moveCamera(direction, currentFrameTimeStamp, mapSetIndex, cameraSpeed));
};
const ALGEBRA_INTRO_2 = {
  title: "Algebra Basics",
  good: [
    new Answer("A variable is a symbol for an unknown value", true),
    new Answer("The graph of a quadratic function is a parabola", true),
    new Answer("A constant is a number that doesn’t change", true),
    new Answer("A coefficient is a number multiplying a variable", true),
    new Answer("An equation shows two expressions are equal", true),
    new Answer("A term is a part of an expression separated by + or -", true),
    new Answer("Like terms have the same variable and power", true),
    new Answer("A polynomial is made of terms combined by + or -", true),
    new Answer("A monomial has one term", true),
    new Answer("A binomial has two terms", true),
    new Answer("A trinomial has three terms", true),
    new Answer("The degree of a polynomial is the highest exponent", true),
    new Answer("Factoring is rewriting an expression as products", true),
    new Answer("Linear equations have the form ax + b = c", true),
    new Answer("A function relates each input to one output", true),
    new Answer("Quadratic equations have the form ax^2 + bx + c = 0", true),
    new Answer("Distributive property: a(b + c) = ab + ac", true),
    new Answer("The zero-product property: if ab = 0, then a = 0 or b = 0", true),
    new Answer("An inequality compares two expressions", true),
    new Answer("An exponent tells how many times to multiply a number by itself", true),
    new Answer("A solution is a value that makes an equation true", true),
    new Answer("A system of equations has more than one equation", true),
    new Answer("The slope of a line is rise over run", true),
    new Answer("Parallel lines have the same slope", true),
  ],
  bad: [
    new Answer("A variable is a constant number", false),
    new Answer("The graph of a linear expression is V shaped", false),
    new Answer("A constant can change", false),
    new Answer("A coefficient divides a variable", false),
    new Answer("An equation only has one side", false),
    new Answer("A term has to include two variables", false),
    new Answer("Like terms have different variables", false),
    new Answer("A polynomial has only one term", false),
    new Answer("A monomial has two terms", false),
    new Answer("A binomial has three terms", false),
    new Answer("A trinomial has four terms", false),
    new Answer("The degree of a polynomial is the number of terms", false),
    new Answer("Factoring adds terms together", false),
    new Answer("Linear equations always have a squared variable", false),
    new Answer("A function can have multiple outputs for one input", false),
    new Answer("Quadratic equations have no exponents", false),
    new Answer("Distributive property is about dividing terms", false),
    new Answer("Zero-product property applies to addition", false),
    new Answer("An inequality always has an equal sign", false),
    new Answer("An exponent decreases a number", false),
    new Answer("A solution is any random number", false),
    new Answer("A system of equations only has one equation", false),
    new Answer("The slope of a line is horizontal distance", false),
    new Answer("Parallel lines intersect at one point", false),
  ]
};


export const launchAnimationAndDeclareItLaunched = (
  gameElement: HTMLImageElement,
  throttleNum: number,
  extension: string,
  spriteBase: string,
  spriteIndex: number,
  max: number,
  min: number,
  loop: boolean,
  animationId: ANIMATION_ID,
  endOfAnimationCallback?: () => void
) => {
  if (ANIMATION_RUNNING_VALUES[animationId] >= 1) {
    return;
  }

  ANIMATION_RUNNING_VALUES[animationId]++;

  const animationCallback = () => {
    launchCharacterAnimation(
      gameElement,
      throttleNum,
      extension,
      spriteBase,
      spriteIndex,
      max,
      min,
      loop,
      animationId
    );
  };

  const elementAssociatedWithThisAnimation = getAppIdByAnimationId(animationId);

  if (elementAssociatedWithThisAnimation) {
    const animationRequestCallback = () => {
      if (
        APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation]
          .current_animation
      ) {
        requestAnimationFrame(animationRequestCallback);
        return;
      }

      APP_ELEMENTS_ANIMATION_QUEUE[
        elementAssociatedWithThisAnimation
      ].current_animation = animationId;

      animationCallback();
    };
    if (
      APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation]
        .current_animation
    ) {
      APP_ELEMENTS_ANIMATION_QUEUE[
        elementAssociatedWithThisAnimation
      ].request_queue.unshift(
        new AnimationRequest(animationId, animationRequestCallback)
      );

      return;
    }

    APP_ELEMENTS_ANIMATION_QUEUE[
      elementAssociatedWithThisAnimation
    ].current_animation = animationId;
  }

  animationCallback();
};

const launchCharacterAnimation = (
  characterElement: HTMLImageElement,
  throttleNum: number,
  extension: string,
  spriteBase: string,
  spriteIndex: number,
  max: number,
  min: number,
  loop: boolean,
  animationId: ANIMATION_ID,
  endOfAnimationCallback?: () => void,
  lastExecutionTimeStamp?: number
): any => {
  if (gameFinished) {
    return;
  }

  if (
    !ANIMATION_RUNNING_VALUES[animationId] ||
    ANIMATION_RUNNING_VALUES[animationId] > 1
  ) {
    return;
  }


  const elementAssociatedWithThisAnimation = getAppIdByAnimationId(animationId);

  if (elementAssociatedWithThisAnimation) {
    if (
      APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation]
        .current_animation !== animationId
    ) {
      return;
    }

    const requestQueue =
      APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation]
        .request_queue;

    if (requestQueue.length) {
      APP_ELEMENTS_ANIMATION_QUEUE[
        elementAssociatedWithThisAnimation
      ].current_animation = null;

      initAnimation(animationId);

      const firstQueueElement = requestQueue.pop();

      firstQueueElement?.callBack();
    }
  }

  if (throttleNum < THROTTLE_NUMS[animationId]) {
    throttleNum++;
    return requestAnimationFrame(() =>
      launchCharacterAnimation(
        characterElement,
        throttleNum,
        extension,
        spriteBase,
        spriteIndex,
        max,
        min,
        loop,
        animationId,
        () => {},
        lastExecutionTimeStamp
      )
    );
  }

  const newExecutionTimeStamp = Date.now();

  if (
    (animationId === ANIMATION_ID.hero_run || animationId === ANIMATION_ID.hero_walk_left || animationId === ANIMATION_ID.hero_walk_right || animationId === ANIMATION_ID.hero_run_left || animationId === ANIMATION_ID.hero_idle || animationId === ANIMATION_ID.hero_second_idle || animationId === ANIMATION_ID.lightning ||
      animationId === ANIMATION_ID.hammer_opponent_idle || animationId === ANIMATION_ID.hammer_opponent_death || animationId === ANIMATION_ID.witch_opponent_death || animationId === ANIMATION_ID.hammer_opponent_attack ||  animationId === ANIMATION_ID.orc_opponent_idle || animationId === ANIMATION_ID.orc_opponent_attack ||   animationId === ANIMATION_ID.dwarf_opponent_idle || animationId === ANIMATION_ID.dwarf_opponent_attack || animationId === ANIMATION_ID.golem_opponent_idle || animationId === ANIMATION_ID.golem_opponent_attack || animationId === ANIMATION_ID.king_opponent_idle || animationId === ANIMATION_ID.king_opponent_attack || animationId === ANIMATION_ID.witch_opponent_idle || animationId === ANIMATION_ID.witch_opponent_attack) &&
    lastExecutionTimeStamp
  ) {
    const diff = newExecutionTimeStamp - lastExecutionTimeStamp;

    const minimumTimeInMsBetweenFrames = animationId === ANIMATION_ID.hero_run && superSpeedOn ? ANIMATION_HERO_RUN_SUPER_SPEED_DURATION_BETWEEN_FRAMES_IN_MS : animationId === ANIMATION_ID.hero_run_left ? 150 : animationId === ANIMATION_ID.hero_walk_right ? 150 : animationId === ANIMATION_ID.hero_idle ? 225 :  animationId === ANIMATION_ID.hero_second_idle ? 400 : animationId === ANIMATION_ID.hammer_opponent_death ? 17 : animationId === ANIMATION_ID.witch_opponent_death ? 17 : animationId === ANIMATION_ID.hammer_opponent_idle ? 115 : animationId === ANIMATION_ID.orc_opponent_idle ? 115 : animationId === ANIMATION_ID.golem_opponent_idle ? 115 : animationId === ANIMATION_ID.witch_opponent_idle ? 120 : animationId === ANIMATION_ID.witch_opponent_attack ? 120 : animationId === ANIMATION_ID.king_opponent_idle ? 115 :  animationId === ANIMATION_ID.king_opponent_attack ? 120 : animationId === ANIMATION_ID.dwarf_opponent_idle ? 80 : animationId === ANIMATION_ID.hammer_opponent_attack ? 100 : ANIMATION_HERO_RUN_DURATION_BETWEEN_FRAMES_IN_MS;

    if (diff < minimumTimeInMsBetweenFrames) {

      return requestAnimationFrame(() =>
        launchCharacterAnimation(
          characterElement,
          throttleNum,
          extension,
          spriteBase,
          spriteIndex,
          max,
          min,
          loop,
          animationId,
          () => {},
          lastExecutionTimeStamp
        )
      );
    }
  }

  throttleNum = 0;

  if (spriteIndex === max) {
    if (loop === false) {
      ANIMATION_RUNNING_VALUES[animationId] = 0;
      const elementAssociatedWithThisAnimation =
        getAppIdByAnimationId(animationId);

      if (elementAssociatedWithThisAnimation) {
        if (
          APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation]
            .current_animation !== animationId
        ) {
          return;
        }

        APP_ELEMENTS_ANIMATION_QUEUE[
          elementAssociatedWithThisAnimation
        ].current_animation = null;
      }
      if (endOfAnimationCallback) {
        endOfAnimationCallback();
      }
      return;
    }

    spriteIndex = min;
  } else {
    spriteIndex++;
  }

  if (!characterElement) {
    return;
  }
  characterElement.src = `${spriteBase}/${spriteIndex}.${extension}`;

  requestAnimationFrame(() =>
    launchCharacterAnimation(
      characterElement,
      throttleNum,
      extension,
      spriteBase,
      spriteIndex,
      max,
      min,
      loop,
      animationId,
      () => {},
      newExecutionTimeStamp
    )
  );
};

const initAnimation = (animationId: ANIMATION_ID) => {
  ANIMATION_RUNNING_VALUES[animationId] = 0;
};

const initAllAnimations = () => {
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_attack] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_death] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_hurt] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_idle] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.ghost_opponent_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.ghost_opponent_death] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.ghost_opponent_move] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.camera_left_to_right] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.camera_right_to_left] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.character_left_to_right_move] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_transformation_pre_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_transformation_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_transformation_hurt] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.boss_idle] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.boss_attack] = 0;
};

const turnHeroTransformationOff = () => {
  transformed = false;
  runAudio.playbackRate = 1;
  transformationOffAudio.play();

  progressBar.style.display = "flex";

  transformedEpicAudio.pause();
  transformedEpicAudio.currentTime = 0;

  electricityAudio.currentTime = 0;

  epicAudio.currentTime = 0;

  setTimeout(() => {
    electricityAudio.volume = 0;
  }, 1000);

  setTimeout(() => {
    epicAudio.play();
  }, 4000);

  launchHeroRunAnimation();
};

const launchAttack = (special = false) => {
  if (invisible || !heroIsAlive || runStopped) {
    return;
  }
  if (transformed) {
    laserdAudio.play();
    laserdAudio.currentTime = 0;
  } else if (!special) {
    swordAudio.play();
    swordAudio.currentTime = 0;
  }

  if(!special){
    launchSwordSlash();
    launchAnimation(heroCharacter, AnimationType.attack, false);
  } else {
     launchAnimation(heroCharacter, AnimationType.specialAttack, false);
     specialMoveIndicator.style.display = "none";
  }
 
  const enemyCanBeHit = (enemy: EnemyInterface) => {

    const enemyContainer = enemy.character.element.parentElement!;

    const enemyLeft = hardMode
      ? getHardModeEnemyRealLeft(enemy)! * 1.2
      : enemyContainer.getBoundingClientRect().left;
    return (
      enemyLeft >
      getHeroLeft() &&
      enemyLeft <
      getHeroLeft() +
          swordReach
    );
  };

  ennemiesOnScreen.forEach((enemy) => {
    if (!enemyCanBeHit(enemy)) {
      return;
    }
    if (!enemy.answer.true) {
      killWrongEnemy(enemy);
    } else {
      killRightEnemyAndUpdateScore(enemy);
    }
  });

  if (preTransformed || !heroIsAlive) {
    return;
  }

  clearTimeoutAndLaunchNewOne(
    TimeoutId.HERO,
    setTimeout(() => {
      launchHeroRunAnimation();
    }, 200)
  );
};

window.launchAttack = (event: Event) => {
  if (!gameLaunched) {
    launchGame();
    return;
  }
  launchAttack();
};


const clearTimeoutAndLaunchNewOne = (
  timeoutId: TimeoutId,
  timeout: ReturnType<typeof setTimeout>
) => {
  GAME_TIMEOUTS[timeoutId].forEach((gameTimout) => clearTimeout(gameTimout));

  GAME_TIMEOUTS[timeoutId] = [timeout];
};

enum EnemyId {
  redHammer
}

const interruptOpponentRun = (enemy: Enemy) => {
  interruptAnimation(getCharacterAnimationAccordingToType(enemy.character, AnimationType.idle)!.id);
}

const launchOpponent = (enemy: EnemyInterface) => {
  APP_ELEMENTS_ANIMATION_QUEUE.enemy.current_animation = null;
  interruptOpponentRun(enemy);

  const enemyMovementAnimation = getCharacterAnimationAccordingToType(enemy.character, AnimationType.movement)!;
  ANIMATION_RUNNING_VALUES[enemyMovementAnimation.id]++;

  launchAnimation(enemy.character, AnimationType.idle);

  moveEnemy(enemy, 0, Date.now());
};

interface ElementInterface extends HTMLImageElement {};

enum Direction {
  LEFT_TO_RIGHT,
  RIGHT_TO_LEFT
}

type ElementVelocity = number;

const moveElement = (element: ElementInterface, animation: ANIMATION_ID, velocityPerMs: ElementVelocity, direction: Direction) => {

  if(ANIMATION_RUNNING_VALUES[animation] !== 1){
    return;
  }

  const directionalValue = direction === Direction.LEFT_TO_RIGHT ? 1 : 0;

  element.style.left = `${Math.round(
    element.getBoundingClientRect().left + (directionalValue *  velocityPerMs)
  )}px`;

   requestAnimationFrame( () => moveElement(element, animation, velocityPerMs, direction));
}


const moveEnemy = (
  enemy: Enemy,
  throttleNum = 0,
  previousTimeStamp: number
): any => {

  const enemyAnimation = getCharacterAnimationAccordingToType(enemy.character, AnimationType.movement)!; 

  if (ANIMATION_RUNNING_VALUES[enemyAnimation.id] !== 1) {
    return;
  }

  const currentTimeStamp = Date.now();

  const diff = currentTimeStamp - previousTimeStamp;

  if (throttleNum < THROTTLE_NUMS[ANIMATION_ID.ghost_opponent_move]) {
    throttleNum++;
    return requestAnimationFrame(() => {
      moveEnemy(enemy, throttleNum, currentTimeStamp);
    });
  }

  let hardEnemyMoveRatio = 1;

  throttleNum = 0;

  const enemyContainer = enemy.character.element.parentElement!;

  enemyContainer.style.left = `${Math.round(
    enemyContainer.getBoundingClientRect().left -
      diff * (hardMode ? 0.7 * hardEnemyMoveRatio : 1.5) * (superSpeedOn? CAMERA_SUPER_SPEED_MULTIPLICATOR : 1)
  )}px`;

  if (hardMode) {
    enemyViewPoint.style.left = `${Math.round(
      enemyViewPoint.getBoundingClientRect().left - diff * (hardMode ? 0.7 : 1) * (superSpeedOn? CAMERA_SUPER_SPEED_MULTIPLICATOR : 1)
    )}px`;
  }

  requestAnimationFrame(() => moveEnemy(enemy, throttleNum, currentTimeStamp));
};

const transformIfRequired = () => {
  if (rewardStreak >= TRANSFORMATION_THRESHOLD && !transformed) {
    rewardStreak = 0;
    updateTransformationProgressBarDisplay();
    if(hardMode){
      launchTransformation();
    }
  }
};

const killRightEnemyAndUpdateScore = (enemy: EnemyInterface) => {
  killEnemy(enemy);

  rewardHero();
  transformIfRequired();
};

const rewardHero = () => {
  const bonus_ratio = transformed ? TRANSFORMED_BONUS_RATIO : 1;

  store.dispatch(setFoundAtIndex({index: store.getState().challenge.currentAnswerIndex - 1, found: true}))

  if (!transformed) {
    rewardStreak++;
    updateTransformationProgressBarDisplay();

    if(rewardStreak === 5 ||  rewardStreak === 10){
      specialMoveIndicator.style.display = "flex";
    }
  }

  score += bonus_ratio * REWARD_UNIT;
  updateScoreDisplay();

  displayReward("Congrats! You destroyed a good answer!");

  if (transformed) {
    displayTransformationKillReward(
      `Transformation bonus reward! X${TRANSFORMED_BONUS_RATIO}`
    );
  }
};

const updateScoreDisplay = () => {
  scoreContainer.innerHTML = (score * KILLED_ENEMY_REWARD).toString();
};

const killWrongEnemy = (enemy: EnemyInterface) => {
  scoreMalusContainer.style.display = "flex";

  store.dispatch(setFoundAtIndex({index: store.getState().challenge.currentAnswerIndex - 1, found: false}))

  lifePoints.value--;
  checkForHerosDeath();

  updateLifePointsDisplay();

  rewardStreak = 0;
  specialMoveIndicator.style.display = "none";
  updateTransformationProgressBarDisplay();

  killEnemy(enemy);

  displayMalus("MALUS! Wrong enemy killed!");
};

const displayMalus = (content: string) => {
  if (currentMalusContainerTimeout) {
    clearTimeout(currentMalusContainerTimeout);
    currentMalusContainerTimeout = null;
  }

  // scoreMalusDetail.innerHTML = content;
  scoreMalusContainer.style.display = "flex";

  currentMalusContainerTimeout = setTimeout(() => {
    scoreMalusDetail.innerHTML = "";
    scoreMalusContainer.style.display = "none";
  }, 2000);
};

const hideMalus = () => {
  hideReward();
  if (currentMalusContainerTimeout) {
    clearTimeout(currentMalusContainerTimeout);
    currentMalusContainerTimeout = null;
  }

  scoreMalusDetail.innerHTML = "";
  scoreMalusContainer.style.display = "none";
};

const displayReward = (content: string) => {
  hideMalus();
  if (currentRewardContainerTimeout) {
    clearTimeout(currentRewardContainerTimeout);
    currentRewardContainerTimeout = null;
  }

  //  scoreRewardDetail.innerHTML = content;
  scoreRewardContainer.style.display = "flex";

  displaySoundEffectImage();

  currentRewardContainerTimeout = setTimeout(() => {
    scoreRewardDetail.innerHTML = "";
    scoreRewardContainer.style.display = "none";
  }, 2000);
};

const displayTransformationKillReward = (content: string) => {
  const transformationRewardContainer = document.getElementById(
    "transformed_hero_bonus_reward_container"
  )!;
  transformationRewardContainer.style.display = "flex";

  if (currentTransformationRewardContainerTimeout) {
    clearTimeout(currentTransformationRewardContainerTimeout);
    currentTransformationRewardContainerTimeout = null;
  }

  currentRewardContainerTimeout = setTimeout(() => {
    transformationRewardContainer.style.display = "none";
  }, REWARD_TIMEOUT_DURATION);
};

const hideReward = () => {};

const killEnemy = (enemy: EnemyInterface) => {
  const launchExplosion = () => {
    bombAudio.play();
    bombAudio.currentTime = 0;

    const deathAnimation = getCharacterAnimationAccordingToType(enemy.character, AnimationType.death)!;

    launchAnimationAndDeclareItLaunched(
      enemy.character.element,
      0,
      "png",
      deathAnimation.sprite.path,
      1,
      deathAnimation.sprite.length,
      1,
      false,
      deathAnimation.id,
    );
  };

  launchExplosion();

  destroyEnemyAndLaunchNewOne(enemy);
};

const getHardModeEnemyRealLeft = (enemy: EnemyInterface) => {
  const enemyContainer = enemy.character.element.parentElement;

  if(!enemyContainer){

    console.log("sorry, we did not find the html container of your enemy")

    return;
  }

  return (
    enemyContainer.getBoundingClientRect().left +
    enemyContainer.getBoundingClientRect().width * 0.3
  );
};

const clearEnemy = (enemy: EnemyInterface) => {
  interruptAnimation(ANIMATION_ID.ghost_opponent_run);
  interruptAnimation(ANIMATION_ID.ghost_opponent_attack);

  destroyEnemy(enemy, false);
};

const destroyEnemy = (enemy: EnemyInterface, delay = true) => {
  
  clearAndHideAnswerDataContainer();
  heroInTheRedZone = false;
  resetViewPoint();

  const enemyDestructionAndRevivalCallback = () => {
    enemy.character.element.remove();
    if (!preTransformed) {
      triggerOpponentsApparition();
    }
  }

  if(delay){
    setTimeout(enemyDestructionAndRevivalCallback, Math.random() > 0.4? 600 : 300);
  } else {
    enemyDestructionAndRevivalCallback();
  }

  ennemiesOnScreen.forEach((enemyOnScreen, index) => {
    if (enemy === enemyOnScreen) {
      ennemiesOnScreen.splice(index, 1);
      interruptAnimation(getCharacterAnimationAccordingToType(enemy.character, AnimationType.movement)!.id);
    }
  });
};

const destroyEnemyAndLaunchNewOne = (enemy: EnemyInterface) => {
  destroyEnemy(enemy);
};

const hurtHero = () => {
  if (!heroIsAlive) {
    return;
  }
  runAudio.volume = 0;

  rewardStreak = 0;
  updateTransformationProgressBarDisplay();

  heroHurt = true;
  lifePoints.value--;
  checkForHerosDeath();

  //  hurtAudio.play();
  // hurtAudio.currentTime = 0;

  updateLifePointsDisplay();
  launchHeroHurtAnimation();

  displayMalus("Malus! You were hurt!");
};

const checkForHerosDeath = () => {
  if (lifePoints.value === 0) {
    killHero();
  }
};

const killHero = () => {
  runAudio.volume = 0;
  heroIsAlive = false;
  launchDeathAnimation();
};

let viewPointOnScreen = false;
let enemyViewPointThresholdCrossed = false;

let hardModeAttackOn = false;

const detectCollision = () => {
  ennemiesOnScreen.forEach((enemyOnScreen) => {
    const enemyContainer = enemyOnScreen.character.element.parentElement!;
    const enemyLeft = hardMode
      ? getHardModeEnemyRealLeft(enemyOnScreen)!
      : enemyContainer.getBoundingClientRect().left;

    if (hardMode && !viewPointOnScreen && enemyLeft < window.innerWidth) {
      viewPointOnScreen = true;
      enemyViewPoint.style.display = "flex";
    }

    if (
      hardMode &&
      !heroInTheRedZone &&
      enemyViewPoint.getBoundingClientRect().left +
        enemyViewPoint.getBoundingClientRect().width <
        getHeroLeft()
    ) {

      const attackAnimation = getCharacterAnimationAccordingToType(enemyOnScreen.character, AnimationType.attack)!;

      heroInTheRedZone = true;

      updateEnemyViewPointDisplay();
      launchAnimation(enemyOnScreen.character, AnimationType.attack);
    }

    if (
      hardMode &&
      !enemyViewPointThresholdCrossed &&
      enemyLeft < window.innerWidth
    ) {
      enemyViewPointThresholdCrossed = true;
    }

    if (
      getHeroLeft() >
        enemyLeft &&
      enemyOnScreen.collideable
    ) {
      enemyOnScreen.collideable = false;

      if (!invisible || enemyOnScreen.answer.good) {
        hurtHero();
      } else if (invisible && !enemyOnScreen.answer.good) {
        rewardHero();
        transformIfRequired();
      }
    }
  });

  requestAnimationFrame(detectCollision);
};

const checkForScreenUpdateFromLeftToRight = (throttleNum: number): any => {
  throttleNum = 0;

  MAP_SETS.forEach(

  (mapSet, index) => {
      
  const firstMapDomElement = mapSet.maps[0];

  if (firstMapDomElement.offsetLeft < -window.innerWidth) {
    gameMap.startIndex++;
    firstMapDomElement.remove();
    mapSet.maps.shift();
  }

  const lastMapDomElement = mapSet.maps[mapSet.maps.length - 1];

    if (
      lastMapDomElement &&
      lastMapDomElement.offsetLeft <= window.innerWidth / 10
    ) {

     gameMap.endIndex++;
     mapSet.maps.push(
       createMapBlock(
         lastMapDomElement.offsetLeft + lastMapDomElement.offsetWidth - 10, mapSet.imagePath, `${index}`
        )
      );
      } 
    }
  )

  requestAnimationFrame(() => checkForScreenUpdateFromLeftToRight(throttleNum));
};

/*

const checkForScreenUpdateFromRightToLeft = (throttleNum: number): any => {

  //creation

  //pick first map block

  const firstMapDomElement = MAPS[0];

  if (
    firstMapDomElement &&
    firstMapDomElement.offsetLeft > window.innerWidth
  ) {
    MAPS.unshift(
      createMapBlock(
        firstMapDomElement.offsetLeft - firstMapDomElement.offsetWidth
      )
    );
  }

  const lastMapDomElement = MAPS[MAPS.length - 1];

  if (lastMapDomElement && lastMapDomElement.offsetLeft > window.innerWidth) {
    lastMapDomElement.remove();
    MAPS.pop();
  }

  requestAnimationFrame(() => checkForScreenUpdateFromRightToLeft(throttleNum));
};

*/

const checkForScreenUpdateFromRightToLeft = (throttleNum: number): any => {

  MAP_SETS.forEach(

  (mapSet, index) => {
      
  const firstMapDomElement = mapSet.maps[0];

  if (firstMapDomElement.getBoundingClientRect().left > -window.innerWidth) {
    mapSet.maps.unshift(
      createMapBlock(
        firstMapDomElement.offsetLeft - firstMapDomElement.offsetWidth, mapSet.imagePath, `${index}`
       )
    );
  }

  const lastMapDomElement = mapSet.maps[mapSet.maps.length - 1];

    if (
      lastMapDomElement &&
      lastMapDomElement.getBoundingClientRect().left > window.innerWidth
    ) {
         lastMapDomElement.remove();
         mapSet.maps.pop();
      } 
    }
  )

  requestAnimationFrame(() => checkForScreenUpdateFromRightToLeft(throttleNum));
};

type Animation = {
   id: ANIMATION_ID,
   sprite: AnimationPath,
}

const getCharacterAnimationAccordingToType = (character: CharacterInterface, animationType: AnimationType): Animation | null => {

   for(let i = 0; i < character.animations.length; i++){

    const characterAnimation = character.animations[i];

    if(characterAnimation.animationType !== animationType){
      continue;
    }

    for(let animationBlockIndex = 0; animationBlockIndex < characterAnimation.animationsStatesBlocks.length; animationBlockIndex++) {

      const animationBlock = characterAnimation.animationsStatesBlocks[animationBlockIndex];

      for(let animationBlockStateIndex = 0; animationBlockStateIndex < animationBlock.states.length; animationBlockStateIndex++ ){
        
       const animationStateBlock = animationBlock.states[animationBlockStateIndex];

        if(animationStateBlock === character.state){
          return animationBlock.animation;
         }
      }
     }
   }

   return null;
}

const launchAnimation = (character: CharacterInterface, animationType: AnimationType, loop=true) => {

  const characterAnimation = getCharacterAnimationAccordingToType(character, animationType);

  if(!characterAnimation){
    console.log("sorry, we could not find the path associated with the current character state");
    return;
  }

  launchAnimationAndDeclareItLaunched(
    character.element,
    0,
    "png",
    characterAnimation.sprite.path,
    1,
    characterAnimation.sprite.length,
    1,
    loop,
    characterAnimation.id
  );
}

const launchHeroWalkAnimation = (direction: ANIMATION_ID) => {

  if (!heroIsAlive) {
    return;
  }

  runAudio.volume = 0.7;

  launchAnimation(heroCharacter, direction === ANIMATION_ID.hero_run_left ? AnimationType.run_left : AnimationType.run_right);

}

const launchHeroRunAnimation = (direction = Direction.LEFT_TO_RIGHT) => {

  if (!heroIsAlive) {
    return;
  }

  runAudio.volume = 0.7;

  launchAnimation(heroCharacter, direction === Direction.LEFT_TO_RIGHT ? AnimationType.run : AnimationType.run_left);

}

/*
const  () => {
  if (!heroIsAlive) {
    return;
  }

  runAudio.volume = 0.7;

  launchAnimationAndDeclareItLaunched(
    heroImage,
    0,
    "png",
    `assets/challenge/characters/${
      transformed ? "transformed_hero" : "hero"
    }/run`,
    1,
    transformed ? 6 : 8,
    1,
    true,
    transformed ? ANIMATION_ID.hero_transformation_run : ANIMATION_ID.hero_run
  );
};

*/

type CharacterAsset = {
  id: string,
  length: number,
  directoryPath: string 
}

type AnimationPath = {
  path : string;
  length: number;
}

type AnimationId = number;

enum AnimationType {
  attack,
  specialAttack,
  run,
  run_left,
  run_right,
  walk,
  walk_right,
  walk_left,
  hurt,
  death,
  idle,
  secondIdle,
  movement,
}

const ALL_STATES = "ALL_STATES";

type CharacterAnimations = Array<
  {
    animationType: AnimationType,
    animationsStatesBlocks: Array<{
        states: Array<CharacterStates> ,
        animation: Animation;
    }>
  }
>;

interface CharacterInterface {
  element: HTMLImageElement;
  state: CharacterStates;
  animations: CharacterAnimations;
}

interface MovingElementInterface {
  velocity: number;
}

interface MovingCharacterInterface extends CharacterInterface, MovingElementInterface {}

class DefaultCharacter {
   element: HTMLImageElement;
   state: CharacterStates;
   animations: CharacterAnimations;
   
   constructor(element: HTMLImageElement, state: CharacterStates, animations: CharacterAnimations){
    this.element = element;
    this.state = state;
    this.animations = animations;
   }
}


type CharacterStates = HeroCharacterStates | RedHammerEnemyCharacterStates | OrcEnemyCharacterStates | DwarfEnemyCharacterStates | GolemEnemyCharacterStates | KingEnemyCharacterStates | WitchEnemyCharacterStates;




//Characters 


//Hero


enum HeroCharacterStates {
  idle,
  running,
  attacking,
  dead,
  transformed_idle,
  transformed_running,
  transformed_attacking,
  transformed_dead,
}


enum RedHammerEnemyCharacterStates {
  idle,
  running,
  attacking,
  dead,
}

enum OrcEnemyCharacterStates {
  idle,
  running,
  attacking,
  dead,
}

enum DwarfEnemyCharacterStates {
  idle,
  running,
  attacking,
  dead,
}

enum GolemEnemyCharacterStates {
  idle,
  running,
  attacking,
  dead,
}

enum KingEnemyCharacterStates {
  idle,
  running,
  attacking,
  dead,
}

enum WitchEnemyCharacterStates {
  idle,
  running,
  attacking,
  dead,
}



const ALL_HERO_STATES = [HeroCharacterStates.idle, HeroCharacterStates.attacking, HeroCharacterStates.dead, HeroCharacterStates.running];
const ALL_TRANSFORMED_HERO_STATES = [HeroCharacterStates.transformed_idle, HeroCharacterStates.transformed_attacking, HeroCharacterStates.transformed_running, HeroCharacterStates.transformed_dead, ];
const ALL_RED_HAMMER_ENEMY_STATES = [RedHammerEnemyCharacterStates.idle, RedHammerEnemyCharacterStates.running, RedHammerEnemyCharacterStates.attacking, RedHammerEnemyCharacterStates.dead]
const ALL_ORC_ENEMY_STATES = [OrcEnemyCharacterStates.idle, OrcEnemyCharacterStates.running, OrcEnemyCharacterStates.attacking, OrcEnemyCharacterStates.dead];
const ALL_DWARF_ENEMY_STATES = [DwarfEnemyCharacterStates.idle, DwarfEnemyCharacterStates.running, DwarfEnemyCharacterStates.attacking, DwarfEnemyCharacterStates.dead];
const ALL_GOLEM_ENEMY_STATES = [GolemEnemyCharacterStates.idle, GolemEnemyCharacterStates.running, GolemEnemyCharacterStates.attacking, GolemEnemyCharacterStates.dead];
const ALL_KING_ENEMY_STATES = [KingEnemyCharacterStates.idle, KingEnemyCharacterStates.running, KingEnemyCharacterStates.attacking, KingEnemyCharacterStates.dead];
const ALL_WITCH_ENEMY_STATES = [WitchEnemyCharacterStates.idle, WitchEnemyCharacterStates.running, WitchEnemyCharacterStates.attacking, WitchEnemyCharacterStates.dead];


const heroAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: ALL_TRANSFORMED_HERO_STATES,
      animation: 
      {
        id: ANIMATION_ID.hero_transformation_pre_run ,
        sprite:    {
          path: "assets/challenge/characters/transformed_hero/pre_run",
          length: 9
      }
      }
     },
    {
      states: ALL_HERO_STATES,
      animation: 
      {
        id: ANIMATION_ID.hero_idle ,
        sprite:    {
          path: "assets/challenge/characters/hero/idle",
          length: 7
      }
      }
     }
   ]
  },
  {
    animationType: AnimationType.attack,
    animationsStatesBlocks: [
      {
        states: ALL_HERO_STATES,
        animation: 
        {
          id: ANIMATION_ID.hero_attack ,
          sprite:    {
            path: "assets/challenge/characters/hero/attack",
            length: 4
        }
        }
       },
       {
        states: ALL_TRANSFORMED_HERO_STATES,
        animation: 
        {
          id:ANIMATION_ID.hero_transformation_attack,
          sprite:    {
            path: "assets/challenge/characters/transformed_hero/attack",
            length: 12
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.specialAttack,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: 
          {
            id: ANIMATION_ID.hero_special_attack ,
            sprite:    {
              path: "assets/challenge/characters/hero/flames/new",
              length: 22
          }
          }
         }
       ]
      },
      {
        animationType: AnimationType.walk_right,
        animationsStatesBlocks: [
          {
            states: ALL_HERO_STATES,
            animation: 
            {
              id: ANIMATION_ID.hero_walk_right,
              sprite:    {
                path: "assets/challenge/characters/hero/walk",
                length: 6
            }
            }
           }
         ]
      },
    {
      animationType: AnimationType.run,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: 
          {
            id: ANIMATION_ID.hero_run,
            sprite:    {
              path: "assets/challenge/characters/hero/run",
              length: 8
          }
          }
         },
         {
          states: ALL_TRANSFORMED_HERO_STATES,
          animation: 
          {
            id: ANIMATION_ID.hero_transformation_run,
            sprite:    {
              path: "assets/challenge/characters/transformed_hero/run",
              length: 6
          }
          }
         }
       ]
      },
      {
        animationType: AnimationType.run_left,
        animationsStatesBlocks: [
          {
            states: ALL_HERO_STATES,
            animation: 
            {
              id: ANIMATION_ID.hero_run_left,
              sprite:    {
                path: "assets/challenge/characters/hero/walk_left",
                length: 6
            }
            }
           },
           {
            states: ALL_TRANSFORMED_HERO_STATES,
            animation: 
            {
              id: ANIMATION_ID.hero_transformation_run,
              sprite:    {
                path: "assets/challenge/characters/transformed_hero/run",
                length: 6
            }
            }
           }
         ]
        },
      {
        animationType: AnimationType.secondIdle,
        animationsStatesBlocks: [
          {
            states: ALL_HERO_STATES,
            animation: 
            {
              id: ANIMATION_ID.hero_second_idle,
              sprite:    {
                path: "assets/challenge/characters/hero/second_idle",
                length: 6
            }
            }
           }
         ]
        },
        {
          animationType: AnimationType.death,
          animationsStatesBlocks: [
            {
             states: ALL_HERO_STATES,
             animation: 
              {
               id: ANIMATION_ID.hero_death,
               sprite:    {
                path: "assets/challenge/characters/hero/death",
                length: 6
              }
            }
           }
         ]
        },
];

const redHammerAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: ALL_RED_HAMMER_ENEMY_STATES,
      animation: 
      {
        id: ANIMATION_ID.hammer_opponent_idle,
        sprite:    {
          path: "assets/challenge/characters/enemies/hard/idle",
          length: 16
      }
      }
     }
   ]
  },
  {
    animationType: AnimationType.attack,
    animationsStatesBlocks: [
      {
        states: ALL_RED_HAMMER_ENEMY_STATES,
        animation: 
        {
          id: ANIMATION_ID.hammer_opponent_attack,
          sprite:    {
            path: "assets/challenge/characters/enemies/hard/attack",
            length: 30
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.death,
      animationsStatesBlocks: [
        {
          states: ALL_RED_HAMMER_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.hammer_opponent_death,
            sprite:    {
              path: "assets/challenge/explosion",
              length: 10
          }
          }
         }
       ]
      },
    {
      animationType: AnimationType.movement,
      animationsStatesBlocks: [
        {
          states: ALL_RED_HAMMER_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.hammer_opponent_move,
            sprite:    {
              path: "",
              length: 0
          }
          }
         }
       ]
      },
];

const orcAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: ALL_ORC_ENEMY_STATES,
      animation: 
      {
        id: ANIMATION_ID.orc_opponent_idle,
        sprite:    {
          path: "assets/challenge/characters/enemies/orc/idle",
          length: 42
      }
      }
     }
   ]
  },
  {
    animationType: AnimationType.attack,
    animationsStatesBlocks: [
      {
        states: ALL_ORC_ENEMY_STATES,
        animation: 
        {
          id: ANIMATION_ID.orc_opponent_attack,
          sprite:    {
            path: "assets/challenge/characters/enemies/orc/attack",
            length: 50
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.death,
      animationsStatesBlocks: [
        {
          states: ALL_ORC_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.hammer_opponent_death,
            sprite:    {
              path: "assets/challenge/explosion",
              length: 10
          }
          }
         }
       ]
      },
    {
      animationType: AnimationType.movement,
      animationsStatesBlocks: [
        {
          states: ALL_ORC_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.orc_opponent_move,
            sprite:    {
              path: "",
              length: 0
          }
          }
         }
       ]
      },
];

const dwarfAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: ALL_DWARF_ENEMY_STATES,
      animation: 
      {
        id: ANIMATION_ID.dwarf_opponent_idle,
        sprite:    {
          path: "assets/challenge/characters/enemies/dwarf/idle",
          length: 57
      }
      }
     }
   ]
  },
  {
    animationType: AnimationType.attack,
    animationsStatesBlocks: [
      {
        states: ALL_DWARF_ENEMY_STATES,
        animation: 
        {
          id: ANIMATION_ID.dwarf_opponent_attack,
          sprite:    {
            path: "assets/challenge/characters/enemies/dwarf/attack",
            length: 38
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.death,
      animationsStatesBlocks: [
        {
          states: ALL_DWARF_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.dwarf_opponent_death,
            sprite:    {
              path: "assets/challenge/explosion",
              length: 10
          }
          }
         }
       ]
      },
    {
      animationType: AnimationType.movement,
      animationsStatesBlocks: [
        {
          states: ALL_DWARF_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.dwarf_opponent_move,
            sprite:    {
              path: "",
              length: 0
          }
          }
         }
       ]
      },
];


const witchAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: ALL_WITCH_ENEMY_STATES,
      animation: 
      {
        id: ANIMATION_ID.witch_opponent_idle,
        sprite:    {
          path: "assets/challenge/characters/enemies/wolf/idle",
          length: 8
      }
      }
     }
   ]
  },
  {
    animationType: AnimationType.attack,
    animationsStatesBlocks: [
      {
        states: ALL_WITCH_ENEMY_STATES,
        animation: 
        {
          id: ANIMATION_ID.witch_opponent_attack,
          sprite:    {
            path: "assets/challenge/characters/enemies/wolf/attack",
            length: 15
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.death,
      animationsStatesBlocks: [
        {
          states: ALL_WITCH_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.witch_opponent_attack,
            sprite:    {
              path: "assets/challenge/explosion",
              length: 10
          }
          }
         }
       ]
      },
    {
      animationType: AnimationType.movement,
      animationsStatesBlocks: [
        {
          states: ALL_WITCH_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.witch_opponent_attack,
            sprite:    {
              path: "",
              length: 0
          }
          }
         }
       ]
      },
];



const golemAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: ALL_GOLEM_ENEMY_STATES,
      animation: 
      {
        id: ANIMATION_ID.golem_opponent_idle,
        sprite:    {
          path: "assets/challenge/characters/enemies/golem/idle",
          length: 12
      }
      }
     }
   ]
  },
  {
    animationType: AnimationType.attack,
    animationsStatesBlocks: [
      {
        states: ALL_GOLEM_ENEMY_STATES,
        animation: 
        {
          id: ANIMATION_ID.golem_opponent_attack,
          sprite:    {
            path: "assets/challenge/characters/enemies/golem/attack",
            length: 16
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.death,
      animationsStatesBlocks: [
        {
          states: ALL_GOLEM_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.golem_opponent_death,
            sprite:    {
              path: "assets/challenge/explosion",
              length: 10
          }
          }
         }
       ]
      },
    {
      animationType: AnimationType.movement,
      animationsStatesBlocks: [
        {
          states: ALL_GOLEM_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.golem_opponent_move,
            sprite:    {
              path: "",
              length: 0
          }
          }
         }
       ]
      },
];


const kingAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: ALL_KING_ENEMY_STATES,
      animation: 
      {
        id: ANIMATION_ID.king_opponent_idle,
        sprite:    {
          path: "assets/challenge/characters/enemies/king/idle",
          length: 18
      }
      }
     }
   ]
  },
  {
    animationType: AnimationType.attack,
    animationsStatesBlocks: [
      {
        states: ALL_KING_ENEMY_STATES,
        animation: 
        {
          id: ANIMATION_ID.dwarf_opponent_attack,
          sprite:    {
            path: "assets/challenge/characters/enemies/king/attack",
            length: 58
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.death,
      animationsStatesBlocks: [
        {
          states: ALL_KING_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.king_opponent_death,
            sprite:    {
              path: "assets/challenge/explosion",
              length: 10
          }
          }
         }
       ]
      },
    {
      animationType: AnimationType.movement,
      animationsStatesBlocks: [
        {
          states: ALL_KING_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.king_opponent_move,
            sprite:    {
              path: "",
              length: 0
          }
          }
         }
       ]
      },
];


const heroCharacter = new DefaultCharacter(heroImage, HeroCharacterStates.idle, heroAnimations);

const resetViewPoint = () => {
  enemyViewPoint.style.left = "105vw";
  enemyViewPoint.style.display = "flex";
  updateEnemyViewPointDisplay();
}
const createRedHammerCharacter = (): DefaultCharacter => {

    const newOpponentContainer = document.createElement("div");
    newOpponentContainer.classList.add("hard_enemy_container");
    const newEnnemyImg = document.createElement("img") as HTMLImageElement;
    newEnnemyImg.src = "assets/challenge/characters/enemies/hard/idle/1.png";  
    newOpponentContainer.append(newEnnemyImg);

    document.getElementsByTagName("body")[0].append(newOpponentContainer);

    //init view point

    resetViewPoint();

 return new DefaultCharacter(newEnnemyImg, RedHammerEnemyCharacterStates.idle, redHammerAnimations);
}

const createGolemCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = "assets/challenge/characters/enemies/golem/idle/1.png";  
  newOpponentContainer.append(newEnnemyImg);

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  //init view point

  resetViewPoint();

 return new DefaultCharacter(newEnnemyImg, GolemEnemyCharacterStates.idle, golemAnimations);
 
}


const createKingCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = "assets/challenge/characters/enemies/king/idle/1.png";  
  newOpponentContainer.append(newEnnemyImg);

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  //init view point

  resetViewPoint();

 return new DefaultCharacter(newEnnemyImg, KingEnemyCharacterStates.idle, kingAnimations);
 
}


const createWitchCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = "assets/challenge/characters/enemies/wolf/idle/1.png";  
  newOpponentContainer.append(newEnnemyImg);

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  //init view point

  resetViewPoint();

 return new DefaultCharacter(newEnnemyImg, WitchEnemyCharacterStates.idle, witchAnimations);
 
}



const createExplosionElement = (hostEnemy: EnemyInterface) => {
   const explosionContainer = document.getElementById("div")!;
   explosionContainer.classList.add("explosion_container");

   hostEnemy.character.element.append(explosionContainer);

}

const createOrcCharacter = (): DefaultCharacter => {

    const newOpponentContainer = document.createElement("div");
    newOpponentContainer.classList.add("hard_enemy_container");
    const newEnnemyImg = document.createElement("img") as HTMLImageElement;
    newEnnemyImg.src = "assets/challenge/characters/enemies/orc/idle/1.png";  
    newOpponentContainer.append(newEnnemyImg);

    document.getElementsByTagName("body")[0].append(newOpponentContainer);

    //init view point

    enemyViewPoint.style.left = "105vw";
    enemyViewPoint.style.display = "flex";

 return new DefaultCharacter(newEnnemyImg, OrcEnemyCharacterStates.idle, orcAnimations)
}

const createDwarfCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = "assets/challenge/characters/enemies/dwarf/idle/1.png";  
  newOpponentContainer.append(newEnnemyImg);

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  //init view point

  enemyViewPoint.style.left = "110vw";
  enemyViewPoint.style.display = "flex";

  return new DefaultCharacter(newEnnemyImg, DwarfEnemyCharacterStates.idle, dwarfAnimations);

}

const moveBackground = (direction: ANIMATION_ID) => {

  if (ANIMATION_RUNNING_VALUES[direction] === 0) {
    startCamera(direction);
    for(let i=0; i < 5 ; i++){
      moveCamera(direction, Date.now(), i, 1);
    }
  }
}

const launchHeroWalk = (direction = ANIMATION_ID.camera_right_to_left) => {
  runStopped = false;
  interuptIdleTimer();
  moveBackground(direction);
  if(direction === ANIMATION_ID.camera_right_to_left){
    launchHeroWalkAnimation(ANIMATION_ID.hero_run_left);
  }
};

const launchHeroRun = (direction = ANIMATION_ID.camera_left_to_right) => {
  interuptIdleTimer();
  moveBackground(direction);
  launchHeroRunAnimation(direction);
};

const checkForOpponentAttack = () => {
  ennemiesOnScreen.forEach((enemy) => {
    const enemyContainer = enemy.character.element.parentElement!;
    if (
      enemyContainer.getBoundingClientRect().left <
      getHeroLeft()
    ) {
      ANIMATION_RUNNING_VALUES[ANIMATION_ID.ghost_opponent_run] = 0;

      launchAnimationAndDeclareItLaunched(
        heroImage,
        0,
        "png",
        "assets/challenge/characters/hero/stop_time",
        1,
        4,
        1,
        false,
        ANIMATION_ID.ghost_opponent_run
      );
    }
  });
};

const heroInitialTop = heroContainer.getBoundingClientRect().top;


let superSpeedOn = false;


enum MovementType {
  WALK,
  RUN  
}

const moveHero = (type: MovementType, direction: Direction) => {

  launchAnimation(heroCharacter, AnimationType.walk_right);
  //moveCamera depending on the direction
}

const executeSuperSpeedToggle = () => {  
  superSpeedOn = !superSpeedOn;
}

document.addEventListener("keyup", (event) => {

  if(event.key === "d"){
    interruptAnimation(ANIMATION_ID.hero_walk_right);
  }

  
  if(event.key === "q"){
    interruptAnimation(ANIMATION_ID.hero_run_left);
    stopCameraMovingToLeft();
  }

})

document.addEventListener("keydown", (event) => {
  if (event.key === "d") {

    if(gameMode === GAME_MODES.discovery){
      moveHero(MovementType.WALK, Direction.LEFT_TO_RIGHT);
      return;
    }

    if (!gameLaunched) {
      launchGame();
    } else if (ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_run] === 0) {
      resumeRun();
    }
  }
  
  if(event.key === "q"){
    gameLaunched = true;
    launchHeroWalk();
  }

  if (!gameLaunched || preTransformed || heroHurt) {
    return;
  }

  if (event.key === " " && !invisible) {
    if(rewardStreak === 5 ||  rewardStreak === 10){
      launchHeroLightningSpeedAnimation();
      return;
    }
    launchInvisibilityToggle();
  }
  if (event.key === "m") {
    if(rewardStreak === 5 ||  rewardStreak === 10){
      launchAttack(true);

      const lightningImg = document.getElementById('lightning_img') as HTMLImageElement;

      lightningImg.style.display = "none";

      setTimeout(
        () => lightningImg.style.display = "block", 2000
      )

      return;
    }
    launchAttack();
  }

  if (event.key === "v") {
    slowTime(10);
  }

  if (event.key === "y") {
    launchDeathAnimation();
  }

  if (event.key === "s" && hardMode) {
    if (runStopped) return;
    stopRun();
  }

  if(event.key === "z"){
    executeSuperSpeedToggle();
  }

});

const clearGameTimeouts = () => {
  GAME_TIMEOUTS[TimeoutId.HERO].forEach((timeout) => {
    clearTimeout(timeout);
  });
  GAME_TIMEOUTS[TimeoutId.HERO] = [];

  GAME_TIMEOUTS[TimeoutId.ENEMY].forEach((timeout) => clearTimeout(timeout));
  GAME_TIMEOUTS[TimeoutId.ENEMY] = [];
};

const stopSuperSpeed = () => {
  superSpeedOn = false;
}


const stopRun = () => {
  if (heroInTheRedZone) {
    return;
  }
  
  const currentTime = Date.now();

  ennemiesOnScreen.forEach(
    enemy => {
      enemy.character.element.style.opacity = '1'
    }
  )

  if(lastStopInMs && (currentTime - lastStopInMs ) < 1000){
    return;
  }

  runStopped = true;

  launchIdleTimeout();

  runAudio.volume = 0;

  lastStopInMs = currentTime;

  stopSuperSpeed();


  if (enemiesComingTimeout) {
    clearTimeout(enemiesComingTimeout);
    enemiesComingTimeout = null;
  }

  ennemiesOnScreen.forEach(
    (enemy) => {
      ANIMATION_RUNNING_VALUES[getCharacterAnimationAccordingToType(enemy.character, AnimationType.movement)!.id] = 0;
    }
  )

  interruptAnimation(ANIMATION_ID.camera_left_to_right);
  interruptAnimation(ANIMATION_ID.camera_right_to_left);


  heroImage.src = "assets/challenge/characters/hero/idle/1.png";

  addAnimationCallbackToQueue(ANIMATION_ID.stop, launchIdleLoop);
  //launchAnimation(heroCharacter, AnimationType.idle);
};

const addAnimationCallbackToQueue = (
  animation: ANIMATION_ID,
  callBack: () => void
) => {
  const appElementId = getAppIdByAnimationId(animation);
  if (!appElementId) {
    return;
  }
  APP_ELEMENTS_ANIMATION_QUEUE[appElementId].request_queue.unshift(
    new AnimationRequest(animation, callBack)
  );
};

const interruptAnimation = (animation: ANIMATION_ID) => {
  ANIMATION_RUNNING_VALUES[animation] = 0;

  if(animation === ANIMATION_ID.camera_right_to_left){
    console.log("camera to left interrupted");
  }

  const appElementId = getAppIdByAnimationId(animation);
  if (!appElementId) {
    return;
  }

  if (!APP_ELEMENTS_ANIMATION_QUEUE[appElementId].current_animation === null) {
    APP_ELEMENTS_ANIMATION_QUEUE[appElementId].current_animation = null;
  }
};

/*
const stopTime = () => {
  runAudio.volume = 0;

  runStopped = true;

  clearGameTimeouts();

  if (enemiesComingTimeout) {
    clearTimeout(enemiesComingTimeout);
  }

  ANIMATION_RUNNING_VALUES[ANIMATION_ID.ghost_opponent_run] = 0;
  APP_ELEMENTS_ANIMATION_QUEUE.enemy.current_animation = null;

  ANIMATION_RUNNING_VALUES[ANIMATION_ID.ghost_opponent_move] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.camera_left_to_right] = 0;

  launchAnimationAndDeclareItLaunched(
    heroImage,
    0,
    "png",
    "assets/challenge/characters/hero/stop_time",
    1,
    4,
    1,
    false,
    ANIMATION_ID.stop_time
  );
};

*/

const stopAndResetIdleTimer = () => {
  idleTimeoutContainer.style.display = "none";
  idleTimerValue = 5;
}

const resumeRun = () => {
  runStopped = false;
  stopAndResetIdleTimer();

  launchHeroRun();
  ennemiesOnScreen.forEach((enemy) => {
    const enemyMovementAnimation = getCharacterAnimationAccordingToType(enemy.character, AnimationType.movement)!;
    ANIMATION_RUNNING_VALUES[enemyMovementAnimation.id]++;
    moveEnemy(enemy, 0, Date.now());
  });

  if (!ennemiesOnScreen.length) {
    triggerOpponentsApparition();
  }
};

const checkForOpponentsClearance = () => {
  ennemiesOnScreen.forEach((enemyOnScreen) => {
    const enemyLeft = hardMode
      ? getHardModeEnemyRealLeft(enemyOnScreen)!
      : enemyOnScreen.character.element.getBoundingClientRect().left;

    if (enemyLeft < 0 - window.innerWidth * 0.05) {
      clearEnemy(enemyOnScreen);
    }
  });

  requestAnimationFrame(checkForOpponentsClearance);
};

const launchInvisibilityToggle = () => {
  invisible = !invisible;

  heroContainer.style.opacity = invisible ? "0.3" : "1";

  if (invisible) {
    const teleportAudio = document.getElementById(
      "teleport_audio"
    )! as HTMLAudioElement;
    teleportAudio.volume = 0.15;
    teleportAudio.play().then((val) => (teleportAudio.currentTime = 0));
  }

  if (!invisible) {
    return;
  }

  setTimeout(launchInvisibilityToggle, INVISIBILITY_DURATION_IN_MILLISECONDS);
};

window.launchInvisibilityToggle = launchInvisibilityToggle;

const launchTransformation = () => {
  if (runStopped || hardMode) {
    return;
  }
  runAudio.volume = 0;
  swordAudio.volume = 0;
  bombAudio.volume = 0;
  epicAudio.pause();

  if (transformedAlready) {
    electricityAudio.volume = 0.7;

    transformationScreamAudio.volume = 0.1;

    transformationScreamAudio.play();

    setTimeout(() => transformedEpicAudio.play(), 1000);

    setTimeout(() => electricityAudio.play(), 200);

    document.getElementById("transformation_background")!.style.display =
      "none";

    clearGameTimeouts();

    transformed = true;

    launchAnimationAndDeclareItLaunched(
      heroImage,
      0,
      "png",
      "assets/challenge/characters/transformed_hero/run",
      1,
      6,
      1,
      true,
      ANIMATION_ID.hero_transformation_run
    );

    setTimeout(turnHeroTransformationOff, 20000);
    return;
  }

  document.getElementById("transformation_background")!.style.display = "flex";

  preTransformed = true;

  clearEnemiesInstantly();

  bassAudio.play();

  setTimeout(() => electricityAudio.play(), 200);

  clearTimeoutAndLaunchNewOne(
    TimeoutId.HERO,
    setTimeout(() => {
      launchAnimationAndDeclareItLaunched(
        heroImage,
        0,
        "png",
        "assets/challenge/characters/transformed_hero/pre_run",
        1,
        9,
        1,
        true,
        ANIMATION_ID.hero_transformation_pre_run
      );

      if (enemiesComingTimeout) {
        clearTimeout(enemiesComingTimeout);
      }

      clearTimeoutAndLaunchNewOne(
        TimeoutId.HERO,
        setTimeout(() => {
          triggerOpponentsApparition();

          document.getElementById("transformation_background")!.style.display =
            "none";

          transformationScreamAudio.play();

          setTimeout(() => transformedEpicAudio.play(), 1000);

          electricityAudio.volume = 0.2;

          transformed = true;

          preTransformed = false;

          runAudio.volume = 0.7;
          swordAudio.volume = 0.65;
          bombAudio.volume = 0.12;

          progressBar.style.display = "none";

          launchAnimationAndDeclareItLaunched(
            heroImage,
            0,
            "png",
            "assets/challenge/characters/transformed_hero/run",
            1,
            6,
            1,
            true,
            ANIMATION_ID.hero_transformation_run
          );

          setTimeout(turnHeroTransformationOff, 15000);
        }, 5000)
      );
    }, 500)
  );
};

const clearEnemiesInstantly = () => {
  ennemiesOnScreen.forEach((enemy, index) => {
    enemy.character.element.remove();
    ennemiesOnScreen.splice(index, 1);
    interruptAnimation(ANIMATION_ID.ghost_opponent_move);
  });
};

const lightUpAnswerDataContainer = () => {
  answerDataContainer.style.opacity = "1";
};

const clearAndHideAnswerDataContainer = () => {
  answerDataContainer.style.opacity = "1";
  answerDataValue.innerHTML = "";
};

const launchSwordSlash = () => {
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_sword_slash]++;
  if (
    ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_sword_slash] !== 1 ||
    transformed
  ) {
    return;
  }
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_sword_slash]++;

  swordSlashImg.style.display = "flex";

  setTimeout(() => {
   swordSlashImg.style.display = "none";
    ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_sword_slash] = 0;
  }, 75);
};

const updateIdleTimerInterface = () => {
  idleTimeoutContainer.innerHTML = idleTimerValue.toString();
}

const interuptIdleTimer = () => {
  idleTimerValue = 1000;
  updateIdleTimerInterface();
  idleTimeoutContainer.style.display = "none";
}

const launchIdleTimeout = () => {

  idleTimeoutContainer.style.display = "flex";

  const tryToUpdateTimerValue = () => {
    if(!runStopped){
      return;
    }

    if(idleTimerValue === 0){
      resumeRun();
      return;
    }
 
    idleTimeoutContainer.innerHTML = idleTimerValue.toString();
    idleTimerValue--;
    
    setTimeout(
      tryToUpdateTimerValue,
      1000
    )
  }

  tryToUpdateTimerValue();

}

const launchDeathAnimation = () => {
  initHeroAnimations();
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.camera_left_to_right] = 0;
  
  APP_ELEMENTS_ANIMATION_QUEUE.hero.current_animation = null;
  APP_ELEMENTS_ANIMATION_QUEUE.hero.request_queue = [];

  const killHero = () => {
    launchAnimationAndDeclareItLaunched(
      heroImage,
      0,
      "png",
      "assets/challenge/characters/hero/death",
      1,
      6,
      1,
      false,
      ANIMATION_ID.hero_death
    );

    clearGameTimeouts();

    setTimeout(
      () =>
        (window.location.href = hardMode
          ? "http://localhost:3001/dead_hard"
          : "http://localhost:3001/dead"),
      1000
    );
  };

  if (transformed) {
    transformed = false;
  }

  heroImage.src = "assets/challenge/characters/hero/death/1.png";

  setTimeout(killHero, 1000);
};

const launchHeroHurtAnimation = () => {
 // superSpeedOn = false;
  launchAnimationAndDeclareItLaunched(
    heroImage,
    0,
    "png",
    transformed
      ? "assets/challenge/characters/transformed_hero/hurt"
      : "assets/challenge/characters/hero/hurt",
    1,
    transformed ? 5 : 3,
    1,
    false,
    transformed ? ANIMATION_ID.hero_transformation_hurt : ANIMATION_ID.hero_hurt
  );

  if (!hardMode) {
    stopCameraMovingToRight();
  }

  clearTimeoutAndLaunchNewOne(
    TimeoutId.HERO,
    setTimeout(() => {
      heroHurt = false;
      if (heroIsAlive && ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_run] === 0) {
        launchHeroRun()
      }
    }, 500)
  );
};

const stopCameraMovingToRight = () => {
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.camera_left_to_right] = 0;
};

const stopCameraMovingToLeft = () => {
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.camera_right_to_left] = 0;
};




const startCamera = (direction: ANIMATION_ID) => {
  if (ANIMATION_RUNNING_VALUES[direction] > 0) {
    return;
  }
  ANIMATION_RUNNING_VALUES[direction]++;
};

const initHeroAnimations = () => {
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_transformation_pre_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_transformation_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_hurt] = 0;
};

const animateLightning = () => {

  const lightningImg = document.getElementById('lightning_img') as HTMLImageElement;

  lightningImg.style.display = "block";

  launchAnimationAndDeclareItLaunched(
    lightningImg,
    0,
    "png",
    `assets/challenge/items/lightning`,
    1,
    17,
    1,
    true,
    ANIMATION_ID.lightning,
    () => {
      lightningImg.style.display = "none"
    }
  );

}

 const launchIdleLoop = (loopIndex = 0) => {

   const MAX_LOOP = 0;

   return;

   if(ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_run] !== 0){
    return;
   }

   if(loopIndex > MAX_LOOP){
     loopIndex = 0;
   }

   const loops = [
    () => launchAnimation(heroCharacter, AnimationType.idle, false),
   ]   

   loops[loopIndex]();

    setTimeout(
      () => launchIdleLoop(loopIndex+1), loopIndex === 0 ? 8000 : 5000
    );
 }

 const createMapSets = () => {

    for(let i=1; i <= 5; i++){

      const velocity = i * i;
      createMapSet( `assets/challenge/maps/snow/${i}.png` , velocity, `${i}`);

    } 

 }

window.onload = () => {
  setupListeners();
  setInitialGameVolume();
  launchHardModeToggle();
  setHeroClass();
  createMapSets();
  createGameAccordingToMode();
  updateLifePointsDisplay();
  updateScoreDisplay();
  detectCollision();
  checkForScreenUpdateFromLeftToRight(10);
  checkForScreenUpdateFromRightToLeft(10);
  checkForOpponentsClearance();
  defineCurrentSubject(hardMode ? MATHS_ARITHMETIC : MATHS_ARITHMETIC);
  defineSwordReach();
  updateTransformationProgressBarDisplay();
  animateLightning();
  launchIdleLoop();
  
  if (hardMode) {
    epicAudio.play();
  } else {
    fireBackgroundAudio.play();
  }
};

const setupListeners = () => {
  document
    .getElementById("playAgainLink")
    ?.addEventListener("click", (event: Event) => window.location.reload());

  document
    .getElementById("backToStormGradButton")
    ?.addEventListener("click", goBackToMountain);
};

const createGameAccordingToMode = () => {
  progressBar.style.display = "flex";

  if (hardMode) {
    return;
  }
  epicAudio = document.getElementById(
    hardMode ? "hard_epic_audio" : "epic_audio"
  )! as HTMLAudioElement;

  epicAudio.volume = hardMode ? 1 : 1;
};

const launchHardModeToggle = () => {
  const modeParameter = getUrlParameter("mode");

  if (!modeParameter) {
    console.log("there is no mode parameter");

    return;
  }

  hardMode = modeParameter === "hard";
};

const getTransformationProgressValue = () => {
  return Math.floor((rewardStreak / TRANSFORMATION_THRESHOLD) * 100);
};

const updateTransformationProgressBarDisplay = () => {
  const progress = document.querySelector(".progress")! as HTMLElement;
  progress.style.setProperty(
    "--progress",
    `${getTransformationProgressValue()}%`
  );
};

const defineSwordReach = () => {
//  swordReach = window.innerWidth * (window.innerWidth > 1000 ? 0.15 : 0.35);
 swordReach = heroImage.getBoundingClientRect().height * 2;
};

const launchGame = () => {
  
  runAudio.play();
  epicAudio.play();
  
  gameLaunched = true;
  launchHeroRun();
  triggerOpponentsApparition();
};

const defineCurrentSubject = (subject: Subject) => {
  currentSubject = subject;
  currentSubjectTotal = currentSubject.good.length + currentSubject.bad.length;
};

const killAllAudios = () => {
  runAudio.pause();
  epicAudio.pause();
  transformedEpicAudio.pause();
};

const soundEffectImage = document.getElementById("sound_effect_img_container")!;

const displaySoundEffectImage = () => {

  soundEffectImage.style.display = "flex";

  setTimeout(
    () => soundEffectImage.style.display = "none", 1000 
  );

}

const launchHeroLightningSpeedAnimation = () => {
  superSpeedOn = true;
  animateLightning();
  heroImage.style.display = 'none';
  specialMoveIndicator.style.display = "none";

  launchInvisibilityToggle();
  setTimeout(() =>{
    superSpeedOn = false;
    heroImage.style.display = 'flex';
  }, INVISIBILITY_DURATION_IN_MILLISECONDS/CAMERA_SUPER_SPEED_MULTIPLICATOR);

}