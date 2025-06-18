import { addAnswer, ChallengeAnswerData, incrementAnswerIndex, setFoundAtIndex } from "./redux/slices/challengeSlice";
import {addElementOnScreen, decreaseEndIndex, decreaseStartIndex, GOLEM_IDS, increaseEndIndex, increaseQuestionIndex, increaseStartIndex, removeElementFromElementsOnScreen, setEndIndex, setHeroMode, setStartIndex, updateCurrentIndex} from "./redux/slices/persisted_mapSlice";
import {store } from "./redux/index";
import { CHARACTER_ELEMENTS_NAMES, CharacterElement, ELEMENT_TYPE, FormBlock, FormElement, HERO_MODES, MapElement } from "./types/map";
import { setCurrentlyFinishingChallenge } from "./redux/slices/unpersisted_mapSlice";

enum GAME_MODES {
  discovery,
  challenge
}

let gameMode: GAME_MODES = GAME_MODES.discovery;

enum ENEMIES_ON_SCREEN {
  MOUNTAIN_GOD,
  RED_GOLEM
}


enum CINEMATIC_MODES {
  NONE,
  FIRST,
  SECOND
}

let currentCinematicMode: CINEMATIC_MODES = CINEMATIC_MODES.NONE;

let currentFormIndex = 0;

let gateOpened = false;

let enemyCurrentlyOnScreen: ENEMIES_ON_SCREEN = ENEMIES_ON_SCREEN.MOUNTAIN_GOD;
let mountainGodHurt = true;
let currentMapBlockHeightAndWidthComparedToScreen = 1;

const flameThrowerAudio = document.getElementById("flame_thrower") as HTMLAudioElement;

const windAudio = document.getElementById("wind_audio")! as HTMLAudioElement;

const MAPS: HTMLElement[] = [];
const MAP_SETS: MapSet[] = [];

const heroContainer = document.getElementById("hero_container")!;
const heroImage = document.getElementById("heroImg")! as HTMLImageElement;
const deadInterfaceContainer = document.getElementById("interface_container")!;

const swordSlashImg = document.getElementById(
  "sword_slash"
)! as HTMLImageElement;

const scoreContainer = document.getElementById("score")!;
const scoreValue = document.getElementById("score_value")!;
const topScoreContainer = document.getElementById("top_score_value")!;
const answerDataContainer = document.getElementById("answer_data_container")!;
const answerDataValue = document.getElementById("answer_data_value")!;
const scoreMalusContainer = document.getElementById("score_malus_container")!;
const scoreMalusDetail = document.getElementById("score_malus_detail")!;
const scoreRewardContainer = document.getElementById("score_reward_container")!;
const scoreRewardDetail = document.getElementById("score_reward_detail")!;
const specialMoveIndicator = document.getElementById("special_move_indicator")!;
const specialMoveTimer = document.getElementById("special_move_timer");
const extendedFormContainer = document.getElementById("extended_form_container")!;

const lightningImg = document.getElementById('lightning_img') as HTMLImageElement;

const ANIMATION_HERO_RUN_DURATION_BETWEEN_FRAMES_IN_MS = 80;
const ANIMATION_HERO_RUN_SUPER_SPEED_DURATION_BETWEEN_FRAMES_IN_MS = 66;
const CAMERA_SUPER_SPEED_MULTIPLICATOR = 4;

const heroContactPointContainerRatio = 0.3;
let heroInTheRedZone = false;
let idleTimerValue = 3;
let lastStopInMs: null | number = null;
let heroRunning = false;

const idleTimeoutContainer = document.getElementById("idle_timeout_container")!;

const SPECIAL_MODE_MAX_VALUE = 10;

const calculateElementOnScreenSizeBasedOnCurrentMapBlockWidth = (width: number) => {
  return width * currentMapBlockHeightAndWidthComparedToScreen;
}

const calculateHeroLeft = () => {
  const HERO_DISTANCE_FROM_MAP_BLOCK_LEFT_IN_VW = 20;
  heroContainer.style.left = `${HERO_DISTANCE_FROM_MAP_BLOCK_LEFT_IN_VW * currentMapBlockHeightAndWidthComparedToScreen}vw`;
}

const updateElementsSizesOnScreenBasedOnCurrentMapBlockWidth = () => {
  //loop on ennemy container
}

const getElementsRight = (element: HTMLElement) => {
  return element.getBoundingClientRect().left + element.getBoundingClientRect().width;
}

const handleHeroAndEnemyContact = (enemy: Enemy) => {
  enemy.collideable = false;

  if (!superSpeedOn || enemy.answer.true) {
    hurtHero();
  } else if (superSpeedOn && !enemy.answer.true) {
    rewardHero();
    transformIfRequired();
  }
}

export const ASSETS_PATH_BASE = "assets/challenge";

let currentChallengeLength = 0;

let answers = null;

const getHeroMode = () => {
 return store.getState().persistedMap.heroMode;
}

const createGolem = () => {
  
  /*

    const golemCharacter = createGolemCharacter();

    golemOnScreen = true;

    const checkForGolemMeetingPoint = () => {
         if(heroContainer.left {
            // launchGolem character transformaton animation once // sound timing to insert
            
            //When it's done : launch animation idle => //maybe adjustments

            //launch conversation

            // ok, on insère la ligne

            //

         }

         requestAnimationFrame(golemCharartcter);
    }


  */   

}

const goBackToMountain = (event: Event) => {
  window.location.href = `/discovery${hardMode ? "?started=true" : ""}`;
};

const getUrlParameter = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

const getCurrentAnswers = () => {

}

//document.addEventListener('DOMContentLoaded', initializeChallengePage);

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

};

const runAudio = document.getElementById("run_audio")! as HTMLAudioElement;
const dragonAudio = document.getElementById("dragon_audio")! as HTMLAudioElement;

const getEnemyRealRight = (enemyContainer: HTMLElement) => {
  return enemyContainer.getBoundingClientRect().left + (enemyContainer.getBoundingClientRect().width - (enemyContainer.getBoundingClientRect().width * 0.3))
};

const getEnemyRight = (enemyContainer: HTMLElement) => {
  return enemyContainer.getBoundingClientRect().right - enemyContainer.getBoundingClientRect().width * ( enemyCurrentlyOnScreen === ENEMIES_ON_SCREEN.MOUNTAIN_GOD ? 63/170 : 16/64 )
}

const stepsInSwow = document.getElementById(
  "snow_steps_audio"
)! as HTMLAudioElement;

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

const CURRENT_MAP_BLOCK_WIDTH = window.innerWidth;

const setInitialGameVolume = () => {
  levelUpAudio.volume = 1;
  swordAudio.volume = 0.65;
  bombAudio.volume = 0.12;
  electricityAudio.volume = 0.7;
  transformationScreamAudio.volume = 0.25;
  hurtAudio.volume = 0.1;
  runAudio.volume = 0;
  stepsInSwow.volume = 0.7;
  stepsInSwow.playbackRate = 1.2;
}

const initAndLaunchFootStepsAudio = () => {
  stepsInSwow.currentTime = 0;
  stepsInSwow.play();
};

let swordReach = window.innerWidth * 0.6;

let gameLaunched = false;

const TRANSFORMED_BONUS_RATIO = 1;
const REWARD_UNIT = 1;

let transformedAlready = false;

const REWARD_TIMEOUT_DURATION = 5;
const KILLED_ENEMY_REWARD = 30;

let rewardStreak = 1;

let hardMode: boolean | null = false;

let TRANSFORMATION_THRESHOLD = 20;

let preTransformed = false;

let gameFinished = false;

let runStopped = false;

let score = 0;

let heroHurt = false;

let heroIsAlive = true;

const lifePoints = { max: 10, value: 10 };
let INVISIBILITY_DURATION_IN_MILLISECONDS = 300;

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
  hurt: boolean;
}

class Enemy implements EnemyInterface {
  character: CharacterInterface;
  answer: ChallengeAnswerData;
  collideable = true;
  hurt = false;

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
    openMap: (event: Event) => void;
    tryAgain: (event: Event) => void;
    closeForm: (event: Event) => void;
    goFullScreen: (event: Event) => void;
    launchHeroMovement: (event: Event) => void;
    validateQuestion: (event: Event) => void;
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


const extendForm = (id: string) => {
  extendedFormContainer.style.display = "flex";
}

const closeForm = (event: Event) => {
  extendedFormContainer.style.display = "none";
};

window.closeForm = closeForm;


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

const resetBlackGolem = (element: HTMLImageElement) => {

  element.src = ""; //GOLEM IMG 2

  //launchAnimation2

  /*

   dirty

  */
}

// Define the shape of each entry
type AnswerItem = {
  value: string;
  true: boolean;
};

// Define that we have numeric keys, each key maps to an array of ArithmeticItem
interface AnswersInterface {
  [level: number]: AnswerItem[];
}

let statsIntroAnswers: AnswersInterface = {
  1: [
    { value: "La moyenne de 2, 2, 2 est 2", true: true },
    { value: "La médiane de 1, 3, 5 est 3", true: true },
    { value: "La médiane de 2, 4, 6 est 5", true: false },
    { value: "50% de 50 est 25", true: true },
    { value: "50% de 50 est 20", true: false },
  ],
  2: [
    { value: "La moyenne de 10, 10, 10 est 10", true: true },
    { value: "La médiane de 2, 5, 9 est 5", true: true },
    { value: "La médiane de 3, 5, 7, 9 est 6", true: false },
    { value: "20% de 100 est 20", true: true },
    { value: "20% de 80 est 10", true: false },
    { value: "La mode de 1, 3, 3, 3, 4 est 3", true: true },
    { value: "La mode de 2, 2, 3, 3 est 2 et 3", true: true },
    { value: "L'étendue de 4, 6, 6 est 2", true: true },
    { value: "L'étendue de 5, 7, 9 est 3", true: false },
    { value: "La moyenne de 2, 2, 6, 6 est 4", true: true },
    { value: "La moyenne de 3, 3, 3, 9 est 5", true: false },
    { value: "La médiane de 11, 13, 15 est 13", true: true },
    { value: "La médiane de 2, 2, 5, 5 est 3.5", true: true },
    { value: "25% de 40 est 8", true: true },
    { value: "30% de 50 est 20", true: false },
    { value: "La mode de 7, 7, 8, 9 est 8", true: false },
    { value: "L'étendue de 10, 10, 10 est 0", true: true },
    { value: "La moyenne de 1, 2, 3, 4 est 2.5", true: false },
    { value: "La médiane de 2, 3, 4, 5 est 3.5", true: true },
    { value: "50% de 200 est 100", true: true }
  ],
  3: [
    { value: "La moyenne de 4, 6, 8, 10 est 7", true: true },
    { value: "La médiane de 10, 12, 14 est 12", true: true },
    { value: "L'étendue de 5, 5, 10, 10 est 5", true: true },
    { value: "La mode de 1, 2, 2, 2, 3 est 2", true: true },
    { value: "La mode de 2, 3, 4, 4, 4 est 3", true: false },
    { value: "40% de 100 est 60", true: false },
    { value: "33% de 300 est 99", true: true },
    { value: "La moyenne de 2, 2, 2, 2, 10 est 4", true: false },
    { value: "La médiane de 3, 5, 7, 9, 11 est 7", true: true },
    { value: "L'étendue de 2, 6, 10 est 8", true: true },
    { value: "L'étendue de 8, 8, 8 est 8", true: false },
    { value: "La mode de 5, 5, 5, 6 est 5", true: true },
    { value: "La médiane de 2, 3, 4, 5, 6 est 4", true: true },
    { value: "60% de 100 est 60", true: true },
    { value: "60% de 100 est 50", true: false },
    { value: "La moyenne de 6, 6, 6, 9 est 6.75", true: true },
    { value: "La médiane de 1, 1, 5, 9, 9 est 5", true: true },
    { value: "La mode de 4, 4, 4, 5, 5, 6 est 4 et 5", true: false },
    { value: "L'étendue de 3, 10 est 7", true: false },
    { value: "20% de 400 est 80", true: true }
  ],
  4: [
    { value: "La moyenne de 3, 6, 9, 12 est 7.5", true: false },
    { value: "La moyenne de 5, 6, 7, 8 est 6.5", true: true },
    { value: "La médiane de 4, 4, 6, 8, 10 est 6", true: true },
    { value: "L'étendue de 2, 4, 6, 8 est 6", true: true },
    { value: "La mode de 2, 2, 3, 3, 3 est 3", true: true },
    { value: "La mode de 5, 5, 7, 7 est 5 et 7", true: true },
    { value: "45% de 200 est 90", true: true },
    { value: "10% de 60 est 10", true: false },
    { value: "La médiane de 2, 2, 2, 3, 4 est 2", true: true },
    { value: "La moyenne de 8, 8, 8, 10 est 8.5", true: true },
    { value: "La moyenne de 10, 10, 10 est 9", true: false },
    { value: "La mode de 3, 4, 4, 4, 4 est 4", true: true },
    { value: "L'étendue de 10, 15, 20 est 10", true: false },
    { value: "La médiane de 1, 2, 3, 4, 5 est 3", true: true },
    { value: "25% de 100 est 30", true: false },
    { value: "50% de 300 est 150", true: true },
    { value: "La mode de 6, 6, 7, 7, 7 est 7", true: true },
    { value: "La médiane de 2, 4, 6, 8 est 5", true: false },
    { value: "L'étendue de 1, 3, 8 est 7", true: true },
    { value: "La moyenne de 9, 9, 9, 9 est 9", true: true }
  ],
  5: [
    { value: "La médiane de 3, 3, 4, 5, 10 est 4", true: true },
    { value: "L'étendue de 5, 10, 15, 20 est 15", true: true },
    { value: "La moyenne de 5, 5, 15, 15 est 10", true: true },
    { value: "La mode de 2, 2, 2, 2, 5 est 5", true: false },
    { value: "75% de 100 est 25", true: false },
    { value: "75% de 100 est 75", true: true },
    { value: "La médiane de 2, 2, 3, 9, 10 est 3", true: false },
    { value: "La mode de 6, 7, 7, 7, 9 est 7", true: true },
    { value: "L'étendue de 3, 3, 3 est 0", true: true },
    { value: "La moyenne de 4, 8, 12, 16 est 10", true: false },
    { value: "La médiane de 4, 6, 7, 8, 9 est 7", true: true },
    { value: "10% de 50 est 5", true: true },
    { value: "10% de 80 est 10", true: false },
    { value: "La mode de 1, 2, 3, 3, 4, 4 est 3 et 4", true: true },
    { value: "La moyenne de 10, 10, 10, 10, 10 est 10", true: true },
    { value: "50% de 400 est 150", true: false },
    { value: "L'étendue de 4, 4, 4, 5 est 1", true: true },
    { value: "La médiane de 6, 6, 7, 7, 8 est 7", true: true },
    { value: "La mode de 2, 2, 2, 3, 3 est 2", true: true },
    { value: "La moyenne de 2, 4, 6 est 4", true: true }
  ],
  6: [
    { value: "La moyenne de 10, 15, 20 est 15", true: true },
    { value: "L'étendue de 10, 10, 10 est 0", true: true },
    { value: "La médiane de 10, 10, 10, 10 est 10", true: true },
    { value: "80% de 50 est 40", true: true },
    { value: "80% de 50 est 30", true: false },
    { value: "La mode de 5, 7, 7, 7, 7, 9 est 7", true: true },
    { value: "L'étendue de 2, 8, 12, 12 est 10", true: true },
    { value: "La médiane de 4, 5, 9, 10, 11 est 9", true: false },
    { value: "La moyenne de 4, 6, 10, 12 est 8", true: true },
    { value: "La mode de 2, 2, 3, 3 est 2 et 3", true: true },
    { value: "25% de 200 est 30", true: false },
    { value: "25% de 200 est 50", true: true },
    { value: "La médiane de 10, 12, 14, 16 est 13", true: false },
    { value: "La moyenne de 8, 8, 8, 12 est 9", true: false },
    { value: "L'étendue de 5, 10, 15 est 10", true: false },
    { value: "La médiane de 1, 2, 3, 4, 5 est 3", true: true },
    { value: "La mode de 8, 8, 9, 9, 9 est 9", true: true },
    { value: "90% de 100 est 90", true: true },
    { value: "La moyenne de 2, 2, 10 est 5", true: false },
    { value: "La médiane de 2, 3, 3, 4, 5 est 3", true: true }
  ],
  7: [
    { value: "La moyenne de 10, 10, 20, 20 est 15", true: true },
    { value: "La médiane de 8, 9, 10, 11, 12 est 10", true: true },
    { value: "L'étendue de 10, 15, 20, 25 est 15", true: true },
    { value: "La mode de 3, 5, 5, 5, 5 est 3", true: false },
    { value: "40% de 250 est 100", true: true },
    { value: "La médiane de 3, 3, 5, 7, 7 est 5", true: true },
    { value: "La moyenne de 6, 6, 6, 6, 10 est 6.8", true: false },
    { value: "L'étendue de 10, 10, 15, 20 est 10", true: false },
    { value: "La mode de 9, 9, 9, 9 est 9", true: true },
    { value: "70% de 100 est 70", true: true },
    { value: "70% de 100 est 60", true: false },
    { value: "La médiane de 12, 13, 14, 15, 16 est 14", true: true },
    { value: "La moyenne de 5, 5, 10, 20 est 10", true: true },
    { value: "La mode de 2, 2, 3, 3, 3 est 3", true: true },
    { value: "L'étendue de 3, 9 est 6", true: false },
    { value: "La médiane de 2, 2, 4, 4, 6 est 4", true: false },
    { value: "La moyenne de 3, 3, 3, 9 est 4.5", true: false },
    { value: "La mode de 1, 2, 2, 2 est 1", true: false },
    { value: "L'étendue de 5, 8, 11 est 6", true: false },
    { value: "La moyenne de 2, 6, 10, 10 est 7", true: true }
  ],
  8: [
    { value: "La moyenne de 10, 12, 14, 16, 18 est 14", true: true },
    { value: "L'étendue de 10, 12, 18 est 8", true: true },
    { value: "La médiane de 10, 11, 11, 12, 14 est 11", true: false },
    { value: "La mode de 7, 7, 8, 8, 8 est 7", true: false },
    { value: "20% de 500 est 100", true: true },
    { value: "30% de 200 est 70", true: false },
    { value: "La moyenne de 2, 4, 6, 8, 10 est 6", true: true },
    { value: "La médiane de 5, 6, 7, 8, 9 est 7", true: true },
    { value: "90% de 50 est 45", true: true },
    { value: "90% de 50 est 40", true: false },
    { value: "La mode de 2, 2, 3, 4, 4 est 2 et 4", true: true },
    { value: "L'étendue de 2, 5, 11 est 9", true: false },
    { value: "La moyenne de 8, 8, 8, 8 est 8", true: true },
    { value: "La médiane de 2, 4, 6, 8 est 5", true: false },
    { value: "La mode de 10, 10, 10, 12, 12 est 10", true: true },
    { value: "75% de 200 est 150", true: true },
    { value: "La médiane de 1, 2, 3, 4, 5 est 3", true: true },
    { value: "L'étendue de 3, 3, 5, 9 est 6", true: true },
    { value: "La moyenne de 6, 6, 8, 8, 8 est 7.2", true: true },
    { value: "La mode de 4, 4, 4, 5, 5 est 5", true: false }
  ],
  9: [
    { value: "La moyenne de 10, 10, 10, 30 est 15", true: true },
    { value: "La médiane de 10, 10, 11, 12, 15 est 11", true: true },
    { value: "L'étendue de 20, 25, 25, 25 est 5", true: true },
    { value: "60% de 300 est 150", true: false },
    { value: "La mode de 5, 6, 6, 7, 7, 7 est 6", true: false },
    { value: "La moyenne de 2, 4, 8, 8, 8 est 6", true: false },
    { value: "La médiane de 2, 4, 6, 8, 10 est 6", true: true },
    { value: "L'étendue de 1, 2, 10 est 9", true: true },
    { value: "La mode de 4, 4, 4, 4, 5 est 4", true: true },
    { value: "75% de 400 est 300", true: false },
    { value: "La moyenne de 10, 12, 14, 14, 16 est 13.2", true: true },
    { value: "La médiane de 3, 3, 4, 5, 5 est 4", true: true },
    { value: "L'étendue de 5, 10, 15, 20 est 15", true: true },
    { value: "La mode de 2, 2, 2, 3, 3 est 3", true: false },
    { value: "La moyenne de 10, 10, 10, 10 est 10", true: true },
    { value: "La médiane de 2, 3, 4, 5, 6 est 4", true: true },
    { value: "La moyenne de 6, 6, 7, 7, 8 est 6.8", true: true },
    { value: "50% de 200 est 100", true: true },
    { value: "La médiane de 10, 10, 10, 15 est 10", true: false },
    { value: "La mode de 8, 8, 8, 8, 9 est 8", true: true }
  ],
  10: [
    { value: "La moyenne de 10, 10, 10, 10, 50 est 18", true: false },
    { value: "La moyenne de 10, 20, 30, 40 est 25", true: true },
    { value: "La médiane de 10, 15, 15, 20, 20 est 15", true: true },
    { value: "L'étendue de 10, 10, 10, 25 est 15", true: true },
    { value: "La mode de 2, 2, 2, 3, 3, 3 est 2 et 3", true: true },
    { value: "85% de 200 est 170", true: false },
    { value: "90% de 200 est 180", true: true },
    { value: "La médiane de 2, 4, 6, 8, 10 est 6", true: true },
    { value: "L'étendue de 3, 3, 10 est 7", true: false },
    { value: "La moyenne de 5, 10, 15, 25 est 13.75", true: false },
    { value: "La mode de 7, 7, 8, 8, 8 est 8", true: true },
    { value: "70% de 100 est 70", true: true },
    { value: "La médiane de 4, 5, 5, 6, 7 est 5", true: false },
    { value: "L'étendue de 10, 10, 10, 10 est 0", true: true },
    { value: "La moyenne de 6, 6, 6, 10, 12 est 8", true: false },
    { value: "La médiane de 6, 7, 8, 9, 10 est 8", true: true },
    { value: "La mode de 1, 1, 1, 2, 2 est 1", true: true },
    { value: "95% de 200 est 190", true: true },
    { value: "La moyenne de 8, 8, 8, 8 est 8", true: true },
    { value: "L'étendue de 2, 4, 10 est 8", true: true }
  ]
};
let arithmeticAnswers = {
  1: [
    { value: "Naturels (ℕ) = Nombres positifs et zéro", true: true },
    { value: "Naturels (ℕ) = Nombres positifs et négatifs", true: false },
  
  ],
  2: [
    { value: "ℕ contient 3, 4, 5", true: true },
    { value: "ℕ contient des fractions", true: false },
    { value: "ℕ contient le nombre 0", true: true },
    { value: "ℕ commence toujours à 1", true: false },
    { value: "ℕ est utilisé pour compter et numéroter", true: true },
    { value: "–1 ∈ ℕ", true: false },
    { value: "ℕ est un ensemble infini", true: true },
    { value: "ℕ contient 0.5", true: false }
  ],
  3: [
    
    { value: "Entiers (ℤ) = positifs, négatifs et zéro", true: true },

  ],
  4: [
     { value: "ℤ contient tous les nombres naturels", true: true },
    { value: "ℤ contient des nombres décimaux", true: false },
    { value: "ℤ contient –3, 0 et 2", true: true },
    { value: "ℤ est utilisé pour représenter des dettes", true: true },
    { value: "ℤ contient les nombres complexes", true: false },
    { value: "ℤ exclut le 0", true: false },
    { value: "ℤ contient 2.5", true: false },
    { value: "ℤ est utilisé pour exprimer des températures négatives", true: true },
    { value: "ℤ = ℕ", true: false }

  ],
  5: [
        { value: "Rationnels (ℚ) = fractions de deux entiers", true: true },
    { value: "ℚ contient tous les entiers", true: true },
    { value: "ℚ contient –3/4 et 1/2", true: true },
    { value: "ℚ contient 0.25", true: true },
    { value: "ℚ contient 0.333... (périodique)", true: true },
    { value: "ℚ contient des irrationnels", true: false },
    { value: "ℚ est utilisé pour mesurer précisément (ex: 0,75 litre)", true: true },
    { value: "3 = 3/1 ∈ ℚ", true: true },
    { value: "L’écriture décimale d’un rationnel est finie ou périodique", true: true },
    { value: "√2 ∈ ℚ", true: false }

  ],
  6: [
    
    { value: "Réels (ℝ) = rationnels et irrationnels", true: true },


  ], 
  7: [
        { value: "ℝ contient π, √2, –2", true: true },
    { value: "ℝ contient tous les rationnels", true: true },
    { value: "ℝ contient des nombres imaginaires", true: false },
    { value: "Les irrationnels ne peuvent pas s’écrire en fractions", true: true },
    { value: "ℝ peut représenter une longueur exacte", true: true },
    { value: "ℝ = ℚ", true: false },
    { value: "ℝ contient e et √2", true: true },
    { value: "ℝ contient tous les nombres qu’on peut placer sur une droite", true: true },
    { value: "ℝ contient uniquement des décimaux finis", true: false }
    


  ],
  8: [
        { value: "Complexes (ℂ) = a + bi, avec a et b réels", true: true },
  ], 

  9: [
    { value: "i² = –1", true: true },
    { value: "2 + 0i ∈ ℝ", true: true },
    { value: "ℝ ⊂ ℂ", true: true },
    { value: "ℂ contient tous les réels", true: true },
    { value: "ℂ ne contient pas les réels", true: false },
    { value: "Les complexes permettent de résoudre x² + 1 = 0", true: true },
    { value: "4 = 4 + 0i ∈ ℂ", true: true },
    { value: "Les complexes sont utilisés en physique", true: true },
    { value: "Tous les complexes ont une partie imaginaire non nulle", true: false }
  ]
};


const findNextAnswer = (): ChallengeAnswerData | "done" => {

  /*

  const challenge = store.getState().challenge;
  const currentAnswerIndex = challenge.currentAnswerIndex;
  const answers = challenge.answers;

  if(currentAnswerIndex >= answers.length){
    return "done";
  }

  if(currentAnswerIndex === answers.length - 1){
    endOfChallengeContainer.style.opacity = "1";
    endOfChallengeContainer.innerHTML = "Dernier ennemi...";
    setTimeout(() => {
      endOfChallengeContainer.style.opacity = "0";
      endOfChallengeContainer.innerHTML = "";
    }, 1000);
  }
  
  if(currentAnswerIndex === answers.length - 3){
    endOfChallengeContainer.style.opacity = "1";
    endOfChallengeContainer.innerHTML = "3 derniers ennemis...";
    setTimeout(() => {
      endOfChallengeContainer.style.opacity = "0";
      endOfChallengeContainer.innerHTML = "";
    }, 1000);
  }

  const data = answers[store.getState().challenge.currentAnswerIndex].data;
  store.dispatch(incrementAnswerIndex());

  */

   if(arithmeticAnswers[currentChallengeLevel].length === 0){
      if(currentChallengeLevel === 10){
        return("done");
      }
      currentChallengeLevel++;
   }

  const answerIndex = Math.floor(Math.random() * arithmeticAnswers[1].length);
  const data = arithmeticAnswers[currentChallengeLevel][answerIndex];


  arithmeticAnswers[currentChallengeLevel].splice(answerIndex,1);

  return data;

}

const Grades = {
  D: [0, 1, 2, 3, 4, 5],
  C: [6, 7, 8, 9, 10],
  B: [11, 12, 13, 14],
  A: [15, 16, 17],
  S: [18, 19, 20],
};

const getChallengeGrade = () => {
  
  return score * 100;
};

const updateLifePointsDisplay = () => {
  for (let i = 1; i <= lifePoints.max; i++) {
    const lifePointOpacity = i <= lifePoints.value ? "1" : "0.3";

    document.getElementById(`lifePointContainer_${i}`)!.style.opacity =
      lifePointOpacity;
  }
};

const buildEnemyElement = () => {
  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add(
    hardMode ? "hard_enemy_container" : "enemy_container"
  );
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = hardMode
    ? ASSETS_PATH_BASE + "/characters/enemies/hard/attack/1.png"
    : ASSETS_PATH_BASE + "/characters/enemies/black_spirit/run/1.png";

  newOpponentContainer.append(newEnnemyImg);

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  return newOpponentContainer;
};

let lastEnemyIndex = 0;

const buildEnemy = (answer: ChallengeAnswerData) => {

 enemyLaunchedAttack = false;

 const enemyCreationCallbacks = [
  enemyCurrentlyOnScreen === ENEMIES_ON_SCREEN.MOUNTAIN_GOD ?
  createAndInjectRedHammerImgInDomAndGetCharacter : createGolemCharacter
 ];

 const enemyCharacter = enemyCreationCallbacks[lastEnemyIndex]();

 lastEnemyIndex++;
 
 if(lastEnemyIndex === enemyCreationCallbacks.length){
  lastEnemyIndex = 0;
 }
 

  if (!enemyCharacter) {
    return;
  }

  document.getElementsByTagName("body")[0].append();
  const enemy = new Enemy(enemyCharacter, answer);
  ennemiesOnScreen.push(enemy);

  return enemy;
};

const initEnemyAnimations = (enemy: Enemy) => {

  const enemyAnimations = enemy.character.animations;
  
  enemyAnimations.forEach(
    (animation) => {
      animation.animationsStatesBlocks.forEach(
        animationBlock => {
          ANIMATION_RUNNING_VALUES[animationBlock.animation.id] = 0;
        }
      )
    }
  );
   const appElementId = getAppIdByAnimationId(enemy.character.animations[0].animationsStatesBlocks[0].animation.id);
     if (!appElementId) {
      return;
      }
      APP_ELEMENTS_ANIMATION_QUEUE[appElementId].current_animation = null;
}

const buildAndLaunchEnemy = (answer: ChallengeAnswerData) => {
  const enemy = buildEnemy(answer)!;

  initEnemyAnimations(enemy);

  if (!enemy) {
    return;
  }

  lightUpAnswerDataContainer();
  answerDataValue.innerHTML = enemy.answer.value;

  enemyOnScreen = true;
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

const endOfChallengeContainer = document.getElementById("end_of_challenge_container")!;

const transitionAudio = document.getElementById("transition_audio")! as HTMLAudioElement;

const levelUpAudio = document.getElementById(
  "levelup_audio"
)! as HTMLAudioElement;

const breathAudio = document.getElementById("breath_audio")! as HTMLAudioElement;

const tryAgain = () => {
  window.location.replace(window.location.href);
}

const launchEndOfChallenge = () => {
  endOfChallengeContainer.style.opacity = "1";
  endOfChallengeContainer.innerHTML = "Arrivée à la porte gelée...";
  hideChallengeDisplay();

    setTimeout(
    () => {
      endOfChallengeContainer.style.opacity = "0";
      store.dispatch(setCurrentlyFinishingChallenge(true));
      deadInterfaceContainer.style.display = "flex";
      if(heroIsAlive){ 
       setTimeout(
         stopRun,
         3000
       )
      }
    }, 3000
  )

  runAudio.pause();
  stepsInSwow.pause();
  //transitionAudio.play();
  
  setTimeout( () => {
   // levelUpAudio.play();
   transitionAudio.play();
    endOfChallengeContainer.style.opacity = "1";
    endOfChallengeContainer.innerHTML = "Note : D, accèse refusé...";
  }
    , 4000);

  return;

  gameFinished = true;
  document.getElementById("endOfGameInterface")!.style.display = "flex";
  clearGameTimeouts();
  initAllAnimations();
  heroImage.src = ASSETS_PATH_BASE + "/characters/hero/run/1.png";
  document.getElementById("transformation_background")!.style.display = "none";

  const grade = getChallengeGrade();

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
  hero_teleportation,
  learning_god_walk_left,
  learning_god_idle,
  learning_god_open_course,
  mountain_god_attack,
  mountain_god_hurt,
  mountain_god_hurt_from_special_attack,
  mountain_god_teleportation,
  mountain_god_run,
  mountain_god_idle,
  mountain_god_move,
  male_orc_idle,
  female_orc_idle,
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
  hammer_opponent_special_attack,
  hammer_opponent_special_attack2,
  hammer_opponent_death,
  hammer_opponent_death_from_special_attack,
  hammer_opponent_move,
  hammer_opponent_taunt,
  golem_opponent_idle,
  golem_opponent_run,
  golem_opponent_attack,
  golem_opponent_death,
  golem_opponent_death_from_special_attack,
  golem_opponent_move,
  golem_master_transformation,
  golem_master_idle,
  pnj1_transformation,
  pnj1_transformation2,
  pnj2_idle,
  king_opponent_idle,
  king_opponent_run,
  king_opponent_attack,
  king_opponent_death,
  king_opponent_move,
  witch_opponent_idle,
  witch_opponent_run,
  witch_opponent_attack,
  witch_opponent_death,
  witch_opponent_death_from_special_attack,
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
  pike_man_idle,
  pike_man_open_gate,
  dragon_fly_right,
  dragon_fly_left,
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
  lightning,
  mountain_pillar_activated
}

export const ANIMATION_RUNNING_VALUES = {
  [ANIMATION_ID.hero_attack]: 0,
  [ANIMATION_ID.hero_run]: 0,
  [ANIMATION_ID.hero_run_right]: 0,
  [ANIMATION_ID.hero_run_left]: 0,
  [ANIMATION_ID.hero_walk_left]: 0,  
  [ANIMATION_ID.hero_walk_right]: 0,
  [ANIMATION_ID.hero_death]: 0,
  [ANIMATION_ID.hero_hurt]: 0,
  [ANIMATION_ID.hero_idle]: 0,
  [ANIMATION_ID.hero_teleportation]: 0,
  [ANIMATION_ID.hero_second_idle]: 0,
  [ANIMATION_ID.hero_special_attack]: 0,
  [ANIMATION_ID.learning_god_walk_left]: 0,
  [ANIMATION_ID.learning_god_idle]: 0,
  [ANIMATION_ID.learning_god_open_course]: 0,
  [ANIMATION_ID.mountain_god_attack]: 0,
  [ANIMATION_ID.mountain_god_run]: 0,
  [ANIMATION_ID.mountain_god_idle]: 0,
  [ANIMATION_ID.mountain_god_hurt]: 0,
  [ANIMATION_ID.mountain_god_move]: 0,
  [ANIMATION_ID.male_orc_idle]: 0,
  [ANIMATION_ID.female_orc_idle]: 0,
  [ANIMATION_ID.mountain_god_hurt_from_special_attack]: 0,
  [ANIMATION_ID.mountain_god_teleportation]: 0,
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
  [ANIMATION_ID.hammer_opponent_special_attack]: 0,
  [ANIMATION_ID.hammer_opponent_special_attack2]: 0,
  [ANIMATION_ID.hammer_opponent_death]: 0,
  [ANIMATION_ID.hammer_opponent_move]: 0,
  [ANIMATION_ID.hammer_opponent_taunt]: 0,
  [ANIMATION_ID.hammer_opponent_death_from_special_attack]:0,
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
  [ANIMATION_ID.dragon_fly_right]:0,
  [ANIMATION_ID.dragon_fly_left]:0,
  [ANIMATION_ID.golem_opponent_idle]:0,
  [ANIMATION_ID.golem_opponent_run]:0,
  [ANIMATION_ID.golem_opponent_attack]:0,
  [ANIMATION_ID.golem_opponent_death]:0,
  [ANIMATION_ID.golem_opponent_death_from_special_attack]:0,
  [ANIMATION_ID.golem_opponent_move]:0,
  [ANIMATION_ID.golem_master_transformation]:0,
  [ANIMATION_ID.golem_master_idle]:0,
  [ANIMATION_ID.pnj1_transformation]: 0,
  [ANIMATION_ID.pnj1_transformation2]: 0,
  [ANIMATION_ID.pnj2_idle]: 0,
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
  [ANIMATION_ID.pike_man_open_gate]: 0,
  [ANIMATION_ID.pike_man_idle]: 0,
  [ANIMATION_ID.boss_idle]: 0,
  [ANIMATION_ID.boss_attack]: 0,
  [ANIMATION_ID.lightning]: 0,
  [ANIMATION_ID.mountain_pillar_activated]: 0
};

const APP_IDS = {
  hero: "hero_container",
  enemy: "enemy_container",
  red_hammer_enemy: "red_hammer_enemy",
  orc_enemy: "orc_enemy",
  dwarf_enemy: "dwarf_enemy",
  golem_enemy: "golem_enemy",
  king_enemy: "king_enemy",
  witch_enemy: "witch_enemy",
  learning_god: "learning_god",
  master: "master",
  mountainGod: "mountainGod",
  pnj1: "pnj1",
  pnj2: "pnj1",
  pike_man: "pike_man",
  male_orc: "male_orc",
  female_orc: "female_orc"
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
      ANIMATION_ID.hero_walk_left,
      ANIMATION_ID.hero_walk_right,
      ANIMATION_ID.hero_run,
      ANIMATION_ID.hero_attack,
      ANIMATION_ID.hero_hurt,
      ANIMATION_ID.hero_death,
      ANIMATION_ID.hero_special_attack,
      ANIMATION_ID.hero_idle,
      ANIMATION_ID.hero_teleportation,
      ANIMATION_ID.stop,
      ANIMATION_ID.stop_time,
      ANIMATION_ID.hero_transformation_hurt,
      ANIMATION_ID.hero_transformation_pre_run,
      ANIMATION_ID.hero_transformation_run,
      ANIMATION_ID.hero_transformation_attack,
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
      ANIMATION_ID.hammer_opponent_taunt,
      ANIMATION_ID.hammer_opponent_run,
      ANIMATION_ID.hammer_opponent_attack,
      ANIMATION_ID.hammer_opponent_special_attack,
      ANIMATION_ID.hammer_opponent_special_attack2,
      ANIMATION_ID.hammer_opponent_death,
      ANIMATION_ID.hammer_opponent_death_from_special_attack,
      ANIMATION_ID.mountain_god_teleportation
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
      ANIMATION_ID.golem_opponent_death,
      ANIMATION_ID.golem_opponent_death_from_special_attack
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
      ANIMATION_ID.witch_opponent_death,
      ANIMATION_ID.witch_opponent_death_from_special_attack
    ]
  },
  learning_god: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.learning_god_idle,
      ANIMATION_ID.learning_god_walk_left,
      ANIMATION_ID.learning_god_open_course,
    ]
  },
  master: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.golem_master_idle,
      ANIMATION_ID.golem_master_transformation
    ]
  },
  mountainGod: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.mountain_god_idle,
      ANIMATION_ID.mountain_god_attack,
      ANIMATION_ID.mountain_god_idle,
      ANIMATION_ID.mountain_god_move,
      ANIMATION_ID.mountain_god_run,
      ANIMATION_ID.mountain_god_hurt
    ]
  },
  pnj1: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.pnj1_transformation,
      ANIMATION_ID.pnj1_transformation2
    ]
  },
  pnj2: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.pnj2_idle
    ]
  },
  pike_man: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.pike_man_idle,
      ANIMATION_ID.pike_man_open_gate
    ]
  },
  male_orc: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.male_orc_idle,
    ]
  },
  female_orc: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.female_orc_idle
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

  constructor(imagePath: string, velocity: number, zIndex: string, lastSet: boolean){
    this.imagePath = imagePath;
    this.velocity = velocity;
    this.maps = [lastSet ? createElementMapBlockCenter(0, imagePath, zIndex) : createMapBlock(0, imagePath, zIndex) ];
  }
}

let lastElementUpdated: null | MapElement = null;

const getElementIndexFromId = (elementId:string) => {
  const elements = store.getState().persistedMap.elements;

  for(let i=0; i < elements.length; i++){
     const loopedOnElement = elements[i];

     if(loopedOnElement.id === elementId){
       return i;
     }
  }

  return null;
}

const checkForCurrentMapElementUpdate = () => {
  const heroLeft = getHeroLeft();

  const mapElementsOnScreen = store.getState().persistedMap.elementsOnScreen;

  mapElementsOnScreen.forEach(
    element => {
      const elementId = element.id;
      const foundElement = document.getElementById(`${elementId}`);

      if(foundElement){
        const foundElementLeft = foundElement.getBoundingClientRect().left;
        if(foundElementLeft > heroLeft && foundElementLeft < ( heroLeft + (window.innerWidth * 0.1) ) && element !== lastElementUpdated){

          const elementIndex = getElementIndexFromId(foundElement.id);
                    
          if(elementIndex){
            store.dispatch(updateCurrentIndex(elementIndex));
          }

          lastElementUpdated = element;
        } 
      }
    }
  )

  requestAnimationFrame(checkForCurrentMapElementUpdate);
}

const createMapSet = (imagePath: string, velocity: number, zIndex = "1", lastSet: boolean) => {
  MAP_SETS.push(new MapSet(imagePath, velocity, zIndex, lastSet));
}

const createElementMapBlockCenter = (left:number, imagePath: string, zIndex: string) => {
  const currentIndex = store.getState().persistedMap.currentIndex;
  store.dispatch(addElementOnScreen(currentIndex));
  const element = store.getState().persistedMap.elements[currentIndex];
  if(element){
   const elementDiv = createMapElement(element);
   return createMapBlock(0, imagePath, zIndex, elementDiv);
  } else {
    return createMapBlock(0, imagePath, zIndex);
  }
};

type ChallengeEnd = {type: "ChallengeEnd"};

type ExtendedMapElement = MapElement | ChallengeEnd;

const createMapElement = (element: MapElement) => {
  return element.type === ELEMENT_TYPE.form ? createFormElement(element) : element.type === ELEMENT_TYPE.challenge ? createChallengPilar(element) : createCharacterElement(element as CharacterElement);
}

const createPikeCharacterAndPrepareAnimations = () => {
  
  //specifyAndLaunchCinematic(CINEMATIC_MODES.FIRST);

  const pikeContainer = document.createElement("div");
  pikeContainer.classList.add("pike_man_container");
  pikeContainer.style.bottom = '-20.75vh';

  const pikeImg = document.createElement("img");
  pikeImg.src= ASSETS_PATH_BASE + "/characters/neutral/pike_man/idle/1.png"; 

  pikeContainer.append(pikeImg);

//  checkForPikeManCloseToLeftBorder();

  createPikeManCharacter(pikeImg);

  return pikeContainer;
}

const createElveCharactersAndPrepareAnimations = () => {
  const elvesVillage = createElvesVillage();
  return elvesVillage;
}

const createElvesAndDragonsCharactersAndPrepareAnimations = () => {
  const elvesAndDragonsCharacters = createElvesVillage();
  return elvesAndDragonsCharacters;
}

const createCharacterElement = (element: CharacterElement) => {
   return element.name === CHARACTER_ELEMENTS_NAMES.golem_master ? createMasterCharacterElementAndPrepareAnimations() : element.name === CHARACTER_ELEMENTS_NAMES.pike_man ? createPikeCharacterAndPrepareAnimations() : element.name === CHARACTER_ELEMENTS_NAMES.elves ? createElveCharactersAndPrepareAnimations() : element.name === CHARACTER_ELEMENTS_NAMES.elves_and_dragon ? createElvesAndDragonsCharactersAndPrepareAnimations() : createMountainGodCharacterAndPrepareAnimations();
}

const createMountainGodCharacterAndPrepareAnimations = () => {
  specifyAndLaunchCinematic(CINEMATIC_MODES.SECOND);
  const mountainGodPillar = createMoutainGodPilar();
  prepareMountainGodAnimations(mountainGodPillar.firstChild as HTMLImageElement);

  return mountainGodPillar;
}

const prepareMountainGodAnimations = (element: HTMLImageElement) => {

  enemyCurrentlyOnScreen = ENEMIES_ON_SCREEN.MOUNTAIN_GOD;

  const pillarElement = new DefaultCharacter(element, CharacterDefaultStates.default, mountainPillarAnimations);

  const checkForHeroMeeting = () => {
    if(element.parentElement!.getBoundingClientRect().left - getHeroLeft() < window.innerWidth * 0.01){

      //setTimeout(
        //() => {
          //launchAnimation(pillarElement, AnimationType.transformation);
           // setTimeout(
           //      launchMountainGodCinematic, 5000
         //    )
       // }, 1000
     // );

     quitCinematic();
     launchChallenge("123");
   
      return;
    }

      requestAnimationFrame(
      checkForHeroMeeting
    )
  }

  checkForHeroMeeting();
}

const createMoutainGodPilar = () => {
  const pilarImg = document.createElement("img")! as HTMLImageElement;

  const pilarContainer = document.createElement("div");
  pilarContainer.classList.add("mountain_obelisk_container");
  pilarContainer.classList.add("mountain_obelisk_container_cinematic");
  pilarContainer.id="obelisk";

  pilarImg.src = ASSETS_PATH_BASE + '/items/god_obelisk/1.png';
  pilarContainer.append(pilarImg);

  return pilarContainer;
}

const createElvesVillage = () => {
  const elvesHouse = document.createElement("img")! as HTMLImageElement;
  elvesHouse.id = "elves_habitation";

  const elveMage = document.createElement("img")! as HTMLImageElement;
  elveMage.id = "elve_1";

  const elvesVillageContainer = document.createElement("div");
  elvesVillageContainer.classList.add("elves_village_container");
  
  elveMage.src =  ASSETS_PATH_BASE + '/characters/neutral/elves/1/1.png';
  elvesHouse.src = ASSETS_PATH_BASE + '/items/habitations/orc_habitation_1.png';

  elvesVillageContainer.append(elvesHouse);


  return elvesVillageContainer;
}

const createMountainGodCharacter = () => {
   
  
}

const launchGolemApparitionProcess = () => {
    /*
       D'abord, on retourne un élément créé via une fonction particulière. Cet element est attaché à des valeurs
    */
}

const createElementMapBlockStart = (left:number, imagePath: string, zIndex: string)  => {
   store.dispatch(decreaseStartIndex());
   const startIndex = store.getState().persistedMap.startIndex;
   store.dispatch(addElementOnScreen(startIndex));

   const element = store.getState().persistedMap.elements[startIndex];
   if(element){
     const elementDiv = createMapElement(element);
     return createMapBlock(left, imagePath, zIndex, elementDiv);
   } else {
    return createMapBlock(left, imagePath, zIndex);
   }
};

const createElementMapBlockEnd = (left:number, imagePath: string, zIndex: string) => {
  store.dispatch(increaseEndIndex());
  const endIndex = store.getState().persistedMap.endIndex;
  store.dispatch(addElementOnScreen(endIndex));
  const element = store.getState().persistedMap.elements[endIndex];

  if(element){
    const elementDiv = createMapElement(element);
    return createMapBlock(left, imagePath, zIndex, elementDiv);
  } else {
    return createMapBlock(left, imagePath, zIndex);
  }

};

let lastBlockId = 0

const createMapBlock = (left: number, imagePath: string, zIndex = "1", element?: HTMLElement) => {

  lastBlockId++;

  const block = document.createElement("div");
  block.classList.add("mapBlock");
  if(currentCinematicMode === CINEMATIC_MODES.FIRST){
    block.classList.add("cinematicMapBlock1");
  } else if(currentCinematicMode === CINEMATIC_MODES.SECOND){
    block.classList.add("cinematicMapBlock2");
  }

  block.style.zIndex = zIndex;
  const backgroundImage = document.createElement("img");
  backgroundImage.src = imagePath;

  block.append(backgroundImage);
  block.style.position = "absolute";
  block.style.left = `${left}px`;
  block.onclick = (event: Event) => timeManipulationToggle();
  block.id=`${lastBlockId}`;

  document.getElementsByTagName("body")[0].append(block);

  if(element){
    block.append(element);
  }

  return block;
};



const moveCamera = (
  direction: Direction,
  previousFrameTimestamp: number,
  mapSetIndex: number,
  cameraSpeed: number
): any => {

  const cameraAnimation = direction === Direction.LEFT_TO_RIGHT ? ANIMATION_ID.camera_left_to_right : ANIMATION_ID.camera_right_to_left;
  if (
    ANIMATION_RUNNING_VALUES[cameraAnimation] === 0 ||
    ANIMATION_RUNNING_VALUES[cameraAnimation] > 1
  ) {
    return;
  }

  const currentFrameTimeStamp = Date.now();
  const diff = currentFrameTimeStamp - previousFrameTimestamp;
  const mapSet = MAP_SETS[mapSetIndex];

  let multiplicator = mapSetIndex*6;

  for (let i = 0; i < mapSet.maps.length; i++) {
    const map = mapSet.maps[i];
  
    const addedPixels =  Math.floor(
      ((direction === Direction.LEFT_TO_RIGHT ? -1 : 1) *
        cameraSpeed *
        multiplicator *
        diff *
        ((mapSet.velocity * (mapSetIndex === 4 && heroRunning ? 1.33 : 1)) / (heroRunning ? 400 : 500)) *
        (superSpeedOn ? CAMERA_SUPER_SPEED_MULTIPLICATOR : 0.8)) / 4
    );
  
    /*

    let addedPixels = - (mapSetIndex/ 100) * (heroRunning ? 1.33 : 1) * multiplicator;

    */

    /*

    intro

    
    const addedPixels =  Math.floor(
      ((direction === Direction.LEFT_TO_RIGHT ? -1 : 1) *
        cameraSpeed *
        multiplicator *
        diff *
        ((mapSet.velocity * (mapSetIndex === 4 && heroRunning ? 1.33 : 1)) / (heroRunning ? 400 : 500)) *
        (superSpeedOn ? CAMERA_SUPER_SPEED_MULTIPLICATOR : 0.8)) / 8
    );

    */

    map.style.left = `${
      map.getBoundingClientRect().left + addedPixels
    }px`;

  }

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
  
  const newExecutionTimeStamp = Date.now();

  if (
    (animationId === ANIMATION_ID.hero_run || animationId === ANIMATION_ID.hero_walk_left || animationId === ANIMATION_ID.hero_walk_right || animationId === ANIMATION_ID.hero_idle || animationId === ANIMATION_ID.hero_teleportation || animationId === ANIMATION_ID.hero_special_attack || animationId === ANIMATION_ID.hero_second_idle || animationId === ANIMATION_ID.hero_death || animationId === ANIMATION_ID.lightning ||
      animationId === ANIMATION_ID.hammer_opponent_idle || animationId === ANIMATION_ID.hammer_opponent_death || animationId === ANIMATION_ID.witch_opponent_death || animationId === ANIMATION_ID.witch_opponent_death_from_special_attack || animationId === ANIMATION_ID.hammer_opponent_attack || animationId === ANIMATION_ID.hammer_opponent_special_attack || animationId === ANIMATION_ID.hammer_opponent_special_attack2 || animationId === ANIMATION_ID.orc_opponent_idle || animationId === ANIMATION_ID.orc_opponent_attack ||   animationId === ANIMATION_ID.dwarf_opponent_idle || animationId === ANIMATION_ID.dwarf_opponent_attack || animationId === ANIMATION_ID.golem_opponent_idle || animationId === ANIMATION_ID.golem_opponent_attack || animationId === ANIMATION_ID.golem_opponent_death || animationId === ANIMATION_ID.orc_opponent_death || animationId === ANIMATION_ID.dwarf_opponent_death || animationId === ANIMATION_ID.golem_opponent_death_from_special_attack || animationId === ANIMATION_ID.golem_opponent_run || animationId === ANIMATION_ID.witch_opponent_run  || animationId === ANIMATION_ID.hammer_opponent_run || animationId === ANIMATION_ID.hammer_opponent_taunt || animationId === ANIMATION_ID.hammer_opponent_death_from_special_attack || animationId === ANIMATION_ID.king_opponent_idle || animationId === ANIMATION_ID.king_opponent_attack || animationId === ANIMATION_ID.witch_opponent_idle || animationId === ANIMATION_ID.witch_opponent_attack ||  animationId === ANIMATION_ID.dragon_fly_right || animationId === ANIMATION_ID.dragon_fly_left || animationId === ANIMATION_ID.learning_god_idle || animationId === ANIMATION_ID.learning_god_open_course || animationId === ANIMATION_ID.learning_god_walk_left || animationId === ANIMATION_ID.mountain_god_attack || animationId === ANIMATION_ID.mountain_god_idle || animationId === ANIMATION_ID.mountain_god_teleportation || animationId === ANIMATION_ID.mountain_god_run || animationId === ANIMATION_ID.mountain_god_hurt || animationId === ANIMATION_ID.mountain_god_hurt_from_special_attack || animationId === ANIMATION_ID.golem_master_transformation ||  animationId === ANIMATION_ID.golem_master_idle || animationId === ANIMATION_ID.mountain_pillar_activated || animationId === ANIMATION_ID.pnj1_transformation || animationId === ANIMATION_ID.pnj1_transformation2 || animationId === ANIMATION_ID.pnj2_idle || animationId === ANIMATION_ID.pike_man_idle || animationId === ANIMATION_ID.pike_man_open_gate || animationId === ANIMATION_ID.hero_transformation_pre_run || animationId === ANIMATION_ID.hero_transformation_run || animationId === ANIMATION_ID.hero_transformation_hurt || animationId === ANIMATION_ID.hero_transformation_attack || animationId === ANIMATION_ID.male_orc_idle || animationId === ANIMATION_ID.female_orc_idle) &&
    lastExecutionTimeStamp
  ) {
    const diff = newExecutionTimeStamp - lastExecutionTimeStamp;

    const minimumTimeInMsBetweenFrames = animationId === ANIMATION_ID.hero_run && superSpeedOn ? ANIMATION_HERO_RUN_SUPER_SPEED_DURATION_BETWEEN_FRAMES_IN_MS : animationId === ANIMATION_ID.hero_walk_left ? 150 : animationId === ANIMATION_ID.lightning ? 125 : animationId === ANIMATION_ID.hero_walk_right ? 150 : animationId === ANIMATION_ID.hero_idle ? 225 : animationId === ANIMATION_ID.hero_teleportation ? 120 : animationId === ANIMATION_ID.hero_death ? 70 : animationId ===  ANIMATION_ID.hero_special_attack ? 30 :  animationId === ANIMATION_ID.hero_second_idle ? 400 : animationId === ANIMATION_ID.hammer_opponent_death ? 100 : animationId === ANIMATION_ID.golem_opponent_death ? 80 : animationId === ANIMATION_ID.witch_opponent_death ? 100 : animationId === ANIMATION_ID.witch_opponent_death_from_special_attack ? 40 : animationId === ANIMATION_ID.hammer_opponent_death_from_special_attack ? 40 : animationId === ANIMATION_ID.golem_opponent_death_from_special_attack ? 40 : animationId === ANIMATION_ID.hammer_opponent_idle ?  130 : animationId === ANIMATION_ID.hammer_opponent_taunt ? 100 : animationId === ANIMATION_ID.orc_opponent_idle ? 80 : animationId === ANIMATION_ID.golem_opponent_idle ? 80 : animationId === ANIMATION_ID.golem_opponent_attack ? 120 : animationId === ANIMATION_ID.golem_opponent_run ? 150 : animationId === ANIMATION_ID.witch_opponent_run ? 150 : animationId === ANIMATION_ID.hammer_opponent_run ? 50 : animationId === ANIMATION_ID.witch_opponent_idle ? 90 : animationId === ANIMATION_ID.witch_opponent_attack ? 120 : animationId === ANIMATION_ID.king_opponent_idle ? 115 :  animationId === ANIMATION_ID.king_opponent_attack ? 50 : animationId === ANIMATION_ID.dwarf_opponent_idle ? 80 : animationId === ANIMATION_ID.hammer_opponent_attack ? 100/(enemyOnScreenAttackIndex === 2 ? CAMERA_SUPER_SPEED_MULTIPLICATOR: 1) : animationId === ANIMATION_ID.hammer_opponent_special_attack ? 100 : animationId === ANIMATION_ID.hammer_opponent_special_attack2 ? 100 : animationId === ANIMATION_ID.dragon_fly_left ? 150 : animationId === ANIMATION_ID.dragon_fly_right ? 150 : animationId === ANIMATION_ID.learning_god_idle ? 90 : animationId === ANIMATION_ID.learning_god_open_course ? 100 : animationId === ANIMATION_ID.learning_god_walk_left ? 100 : animationId === ANIMATION_ID.mountain_god_run ? 70 : animationId === ANIMATION_ID.mountain_god_attack ? 100 : animationId === ANIMATION_ID.golem_master_idle ? 120 : animationId === ANIMATION_ID.golem_master_transformation ? 120 : animationId === ANIMATION_ID.mountain_pillar_activated ? 100 : animationId === ANIMATION_ID.mountain_god_idle ? 140 : animationId === ANIMATION_ID.mountain_god_hurt ? 100 : animationId === ANIMATION_ID.mountain_god_hurt_from_special_attack ? 60 : animationId === ANIMATION_ID.mountain_god_teleportation ? 60 : animationId === ANIMATION_ID.pnj1_transformation ? 200 : animationId === ANIMATION_ID.pnj1_transformation2 ? 250 : animationId === ANIMATION_ID.pnj2_idle ? 130 : animationId === ANIMATION_ID.pike_man_idle ? 100 : animationId === ANIMATION_ID.pike_man_open_gate ? 100 : animationId === ANIMATION_ID.hero_transformation_pre_run ? 100 : animationId === ANIMATION_ID.hero_transformation_run ? 80 : animationId === ANIMATION_ID.hero_transformation_attack ? 14 : animationId === ANIMATION_ID.hero_transformation_hurt ? 30 : animationId === ANIMATION_ID.male_orc_idle ? 80 : animationId === ANIMATION_ID.female_orc_idle ? 80 : ANIMATION_HERO_RUN_DURATION_BETWEEN_FRAMES_IN_MS;

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
    interruptAnimation(animationId);
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
  } else if (special) {
    flameThrowerAudio.play();
    flameThrowerAudio.currentTime = 0;
  } else {
       swordAudio.play();
    swordAudio.currentTime = 0;
  }

  if(!special){
    if(transformed){
      launchAnimation(heroCharacter, AnimationType.transformed_attack, false);

    } else {
      launchSwordSlash();
      launchAnimation(heroCharacter, AnimationType.attack, false);
    }
  
  } else {
     launchAnimation(heroCharacter, AnimationType.specialAttack, false);
     specialMoveIndicator.style.display = "none";

     lightningImg.style.opacity = "0.6";

     setTimeout(
      () => {
        lightningImg.style.opacity = "1";
      }, 660
     )
  }
 
  const enemyCanBeHit = (enemy: EnemyInterface) => {

  const enemyLeft = getMountainGodRealLeft(enemy)! * (special ? 1.1: 1.2);

    return (
      getEnemyRealRight(enemy.character.element.parentElement!) > getHeroLeft() &&
      enemyLeft <
      getHeroLeft() +
          swordReach
    )
  };

  ennemiesOnScreen.forEach((enemy) => {
    if (!enemyCanBeHit(enemy)) {
      return;
    }
    enemy.hurt = true;
    if (!enemy.answer.true) {
      killWrongEnemy(enemy, special);
    } else {
      killRightEnemyAndUpdateScore(enemy, special);
    }
  });

  if (preTransformed || !heroIsAlive) {
    return;
  }

  clearTimeoutAndLaunchNewOne(
    TimeoutId.HERO,
    setTimeout(() => {
      launchHeroRunAnimation();
    }, special ? 500 : transformed ? 230 : 350)
  );
};

window.tryAgain = tryAgain;

const goFullScreen = (event: Event) => {
  document.documentElement.requestFullscreen();
}


window.launchAttack = (event: Event) => {
  if (!gameLaunched) {
    launchGame();
    return;
  }
  launchAttack();
};

window.goFullScreen = goFullScreen;



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

let enemyOnScreenAttackIndex = 0;

let mountainGodApparitionAnimationIndex = 0;

let getMountainGodApparitionAnimation = (character: DefaultCharacter): () => void => {

  const mountainGodApparitions: Array<() => void> = [() =>  launchAnimation(character, AnimationType.taunt, false), () => launchAnimation(character, AnimationType.idle), () => launchAnimation(character, AnimationType.taunt, false), () => launchAnimation(character, AnimationType.idle), () => launchAnimation(character, AnimationType.taunt)];

  const mountainGodApparitionAnimation = mountainGodApparitions[mountainGodApparitionAnimationIndex];

  mountainGodApparitionAnimationIndex++;

  if(mountainGodApparitionAnimationIndex > mountainGodApparitions.length - 1){
    mountainGodApparitionAnimationIndex = 0;
  }

  return mountainGodApparitionAnimation;

}

let mountainGodAttackIndexesIndex = 0;

const getMountainGodAttackIndex = () => {

  const mountainGodAttackIndexes = [0,1,1,0,1,0,1,0,1,1,1,0,1];

  const attackIndex = mountainGodAttackIndexes[mountainGodAttackIndexesIndex];

  mountainGodAttackIndexesIndex++;

  if(mountainGodAttackIndexesIndex > mountainGodAttackIndexes.length - 1 ){
    mountainGodAttackIndexesIndex = 0;
  }

  return attackIndex;
   
}

const launchOpponent = (enemy: EnemyInterface) => {
  APP_ELEMENTS_ANIMATION_QUEUE.enemy.current_animation = null;

  enemyOnScreenAttackIndex = enemyCurrentlyOnScreen === ENEMIES_ON_SCREEN.MOUNTAIN_GOD ? getMountainGodAttackIndex() : 0;

  if(enemyCurrentlyOnScreen === ENEMIES_ON_SCREEN.MOUNTAIN_GOD){

    if(enemyOnScreenAttackIndex === 2){
      enemy.character.element.parentElement!.classList.add("enmy_container_jump_attack");
    } else {
      enemy.character.element.parentElement!.classList.add("enemy_container_normal");
    }

    launchAnimation(enemy.character, AnimationType.teleportation,false);

      setTimeout(
        () => {
          if(enemyOnScreenAttackIndex < 2){

         const animation = getMountainGodApparitionAnimation(enemy.character);
         animation();

           ANIMATION_RUNNING_VALUES[ANIMATION_ID.hammer_opponent_move]++;
           moveEnemy(enemy, 0, Date.now());

          } else {
            
            launchAnimation(enemy.character, AnimationType.specialAttack2, false);
            setTimeout(
              () => {
                handleHeroAndEnemyContact(enemy)
              }, 330
            )
            setTimeout(
              () => {
                ANIMATION_RUNNING_VALUES[ANIMATION_ID.hammer_opponent_move]++;
                moveEnemy(enemy, 0, Date.now());
              }, 600
            )
          }
        }, 360
      )

  } else {
    enemy.character.element.parentElement!.classList.add("red_golem_container");
    enemyViewPoint.style.left = "70vw";
    if(!runStopped){
      interruptAnimation(ANIMATION_ID.golem_opponent_move);
      ANIMATION_RUNNING_VALUES[ANIMATION_ID.golem_opponent_move]++;
      moveEnemy(enemy, 0, Date.now());
    }
    launchAnimation(enemy.character, AnimationType.idle);
  }
};

const createMountainGod = (cinematic = false) => {

  const mountainGodContainer = document.createElement("div")! as HTMLImageElement;
  mountainGodContainer.classList.add("mountain_god_container");

  const mountainGodImg = document.createElement("img");

  mountainGodContainer.append(mountainGodImg);

  if(cinematic){
    document.body.append(mountainGodContainer);
  } else {
    mountainGodContainer.classList.add("mountain_god_container_fight");
  }
  
  return new DefaultCharacter(mountainGodImg, CharacterDefaultStates.default, redHammerAnimations);
}

const launchMountainGodCinematic = () => {

  const thunder = document.getElementById("thunder_audio")! as HTMLAudioElement;
  thunder.play();

  const mountainGodCharacter = createMountainGod(true);

  setTimeout(
    () => { 
     launchAnimation(mountainGodCharacter, AnimationType.teleportation,false);
      setTimeout(
      () => {
        launchAnimation(mountainGodCharacter, AnimationType.specialAttack2, false);

        setTimeout(
          () => {
            launchAnimation(mountainGodCharacter, AnimationType.idle)
          }, 1600
        )

        setTimeout(
          () => {
            setTimeout(
              () => {
                const god = document.getElementById("god_audio")! as HTMLAudioElement;
                god.play();
                setTimeout(
                  () => {
                    launchAnimation(mountainGodCharacter, AnimationType.teleportation,false);          
                    setTimeout(
                      () => {
                        document.getElementById("obelisk")!.style.left = `${document.getElementById("obelisk")!.getBoundingClientRect().left + window.innerWidth * 0.02}px`;
                        quitCinematic();
                        setTimeout(
                          () => {
                           launchChallenge("677e814577322467895fd15c");
                          }, 2000
                        )
                      }, 2000
                    )
                  }, 8000
                )
              }, 700
            )
          }, 700
        )
      }, 360
     )
    }, 1000
  );

  /*
  setTimeout(
    () => {

  setTimeout(
    () => { 

      const mountainGodCharacter = new DefaultCharacter(mountainGodImg, CharacterDefaultStates.default, mountainGodAnimations);


      setTimeout(
        () => {
          
      setTimeout(
        () => {
          const god = document.getElementById("god_audio")! as HTMLAudioElement;
          god.play();

          setTimeout(
            () => {
              launchAnimationAndDeclareItLaunched(
                mountainGodImg,
                0,
                "png",
                "assets/challenge/items/teleportation_lightning",
                1,
                8,
                8,
                false,
                ANIMATION_ID.lightning,
              );
            
            }, 8000
          )

        }, 1000
      )

        }, 2000
      )

    }, 360
  )

    }, 1000
  )

  */
  

  


}

let godAppeared = false;

const launchNonLoopAnimation = (character: CharacterInterface, animationType: AnimationType, timeBetweenAnimations: number) => {

  const animation = getCharacterAnimationAccordingToType(character, animationType)!;

  if(!animation){
    console.log("sorry, no animations were found");
    return;
  }

  launchAnimationAndDeclareItLaunched(
    character.element,
    0,
    "png",
    animation.sprite.path,
    1,
    animation.sprite.length,
    1,
    true,
    animation.id
   );

  setTimeout(
    () => {
      interruptAnimation(animation.id);
      setTimeout(
        () => {
          launchNonLoopAnimation(character, animationType, timeBetweenAnimations)
        }, 3000
      );

      godAppeared = true;
    }, 3000
  )
}

const launchIdleProcess = (character: CharacterInterface) => {
  launchAnimation(character, AnimationType.idle, false);

  setTimeout(
   () => launchIdleProcess(character), 6000
  );
}

interface ElementInterface extends HTMLImageElement {};

enum Direction {
  LEFT_TO_RIGHT,
  RIGHT_TO_LEFT
}

let currentHeroDirection = Direction.LEFT_TO_RIGHT;
let heroMoving = false;

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

let currentChallengeLevel = 1;

let enemyOnScreen = false;

const moveEnemy = (
  enemy: Enemy,
  throttleNum = 0,
  previousTimeStamp: number
): any => {
  if(!enemyOnScreen){
    return;
  }
  const enemyAnimation = getCharacterAnimationAccordingToType(enemy.character, AnimationType.movement)!;

  if (ANIMATION_RUNNING_VALUES[enemyAnimation.id] !== 1 || !enemy.character.element) {
    return; 
  }

  const currentTimeStamp = Date.now();
  const diff = currentTimeStamp - previousTimeStamp;

  throttleNum = 0;
  const enemyContainer = enemy.character.element.parentElement!;

  enemyContainer.style.left = `${Math.round(
    enemyContainer.getBoundingClientRect().left -
      2 * (runningPointReached ? 1.4  : 1) * (superSpeedOn ? CAMERA_SUPER_SPEED_MULTIPLICATOR : 1) * (diff/5)
  )}px`;

  if (enemyCurrentlyOnScreen !== ENEMIES_ON_SCREEN.MOUNTAIN_GOD) {
    enemyViewPoint.style.left = `${Math.round(
      enemyViewPoint.getBoundingClientRect().left -
      2 * (runningPointReached ? 1.4  : 1) * (superSpeedOn ? CAMERA_SUPER_SPEED_MULTIPLICATOR : 1) * (diff/5)
  )}px`;
  }

  requestAnimationFrame(() => moveEnemy(enemy, throttleNum, currentTimeStamp));

};

const transformIfRequired = () => {
  if (rewardStreak >= TRANSFORMATION_THRESHOLD && !transformed) {
    rewardStreak = 0;
    updateTransformationProgressBarDisplay();
    if(hardMode){
     // launchTransformation();
    }
  }
};

const killRightEnemyAndUpdateScore = (enemy: EnemyInterface, fromSpecialAttack: boolean) => {
  killEnemy(enemy, fromSpecialAttack);

  rewardHero();
  transformIfRequired();
};


const turnHeroSpecialModeOff = () => {
  store.dispatch(setHeroMode(HERO_MODES.normal));
  specialMoveIndicator.style.display = "none";
  if(specialMoveTimer){
    specialMoveTimer.style.display="none";
  }
 // switchToNormalHeroEnergy();
}


const updateSpecialModeDisplay = (value: number) => {

  if(!specialMoveTimer){
    return;
  }

  specialMoveTimer.innerHTML = value.toString();
}

const switchToSpecialHeroEnergy = () => {
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.lightning] = 0;
  lightningImg.style.opacity = "0";

  setTimeout(
    () => {
      lightningImg.style.opacity = "1";
      lightningImg.style.left = "10%";

      launchAnimationAndDeclareItLaunched(
        lightningImg,
        0,
        "png",
        `assets/challenge/items/sparks`,
        1,
        6,
        1,
        true,
        ANIMATION_ID.lightning
      );

    }, 300
  )
}

const switchToNormalHeroEnergy = () => {
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.lightning] = 0;
  lightningImg.style.opacity = "0";

  setTimeout(
    () => {
      lightningImg.style.opacity = "1";
      lightningImg.style.left = "0";

      launchAnimationAndDeclareItLaunched(
        lightningImg,
        0,
        "png",
        `assets/challenge/items/lightning`,
        1,
        17,
        1,
        true,
        ANIMATION_ID.lightning
      );

    }, 300
  )
}
const switchToSpecialModeAndLaunchSpecialModeTimeout = () => {
  specialMoveIndicator.style.display = "flex";
  store.dispatch(setHeroMode(HERO_MODES.special));
  if(specialMoveTimer){
    specialMoveTimer.style.display="flex";
  }
  //switchToSpecialHeroEnergy();
  launchHeroSpecialTimeout(SPECIAL_MODE_MAX_VALUE);
}

const launchHeroSpecialTimeout = (timerValue: number) => {
   
   timerValue--;
   if(timerValue === 0){
    turnHeroSpecialModeOff();
      return;
   }

   updateSpecialModeDisplay(timerValue);
  
   setTimeout(
    () => launchHeroSpecialTimeout(timerValue), 1000
   )
   
}

const rewardHero = () => {
  const bonus_ratio = transformed ? TRANSFORMED_BONUS_RATIO : 1;

 // store.dispatch(setFoundAtIndex({index: store.getState().challenge.currentAnswerIndex - 1, found: true}))

  if (!transformed) {
    rewardStreak++;
    updateTransformationProgressBarDisplay();

    if(rewardStreak === 5){
      switchToSpecialModeAndLaunchSpecialModeTimeout();
    }
  }

  score += bonus_ratio * (transformed ? 2 : REWARD_UNIT);
  updateScoreDisplay();

  displayReward("Congrats! You destroyed a good answer!");

  if (transformed) {
    displayTransformationKillReward(
      `Transformation bonus reward! X${TRANSFORMED_BONUS_RATIO}`
    );
  }
};

const updateScoreDisplay = () => {
  const grade = getChallengeGrade();
  if(grade){
    scoreValue.innerHTML = grade;
  }
};

const killWrongEnemy = (enemy: EnemyInterface, fromSpecialAttack: boolean) => {
  scoreMalusContainer.style.display = "flex";

 // store.dispatch(setFoundAtIndex({index: store.getState().challenge.currentAnswerIndex - 1, found: false}))

  lifePoints.value--;
  checkForHerosDeath();

  //updateLifePointsDisplay();

  rewardStreak = 0;
  specialMoveIndicator.style.display = "none";
  updateTransformationProgressBarDisplay();

  killEnemy(enemy, fromSpecialAttack);

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

const killEnemy = (enemy: EnemyInterface, fromSpecialAttack: boolean) => {
  const launchExplosion = () => {
    bombAudio.play();
    bombAudio.currentTime = 0;

    if(enemyCurrentlyOnScreen === ENEMIES_ON_SCREEN.MOUNTAIN_GOD){

      if(!fromSpecialAttack){
        
       interruptAnimation(ANIMATION_ID.mountain_god_run);
       interruptAnimation(ANIMATION_ID.mountain_god_attack);
       interruptAnimation(ANIMATION_ID.hammer_opponent_idle);

       enemy.character.element.src = ASSETS_PATH_BASE + "/characters/enemies/hard/attack/jump/death/1.png";
      
       setTimeout(
         () => {
             launchAnimation(enemy.character, AnimationType.teleportation,false);
         },200
       );
    
      } else {
        enemy.character.element.style.opacity = "0";
        interruptAnimation(ANIMATION_ID.hammer_opponent_attack); 
        interruptAnimation(ANIMATION_ID.hammer_opponent_idle);
        interruptAnimation(ANIMATION_ID.hammer_opponent_taunt);
       
        setTimeout(
          () => {
            launchAnimation(enemy.character, AnimationType.teleportation,false);
            enemy.character.element.style.opacity = "1";
          }, 500
        );

       const explosionImg = document.getElementById("explosion_img_small") as HTMLImageElement;
             
        launchAnimationAndDeclareItLaunched(
          explosionImg,
          0,
          "png",
          "assets/challenge/explosion",
          1,
          12,
          1,
          false,
          ANIMATION_ID.golem_opponent_death_from_special_attack
        );
      }

    mountainGodHurt = true;
    
    } else if(fromSpecialAttack) {

      enemy.character.element.style.opacity = "0";

      const explosionImg = document.getElementById("explosion_img_big") as HTMLImageElement;

      launchAnimationAndDeclareItLaunched(
        explosionImg,
        0,
        "png",
        "assets/challenge/explosion",
        1,
        12,
        1,
        false,
        ANIMATION_ID.golem_opponent_death_from_special_attack
      );

    } else {
      launchAnimation(enemy.character,AnimationType.death, false);
    }

  };

  launchExplosion();

  destroyEnemyAndLaunchNewOne(enemy);
};

const getMountainGodRealLeft = (enemy: EnemyInterface) => {
  const enemyContainer = enemy.character.element.parentElement;

  if(!enemyContainer){
    console.log("sorry, we did not find the html container of your enemy");
    return;
  }

  return (
    enemyContainer.getBoundingClientRect().left * 1.3
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

  const enemyDestructionAndRevivalCallback = () => {
    enemy.character.element.remove();
    enemyOnScreen = false;

    if (!preTransformed) {
      triggerOpponentsApparition();
    }
  }

  if(delay){
    setTimeout(enemyDestructionAndRevivalCallback, Math.random() > 0.4? 2500 : 2500);
  } else {
    enemyDestructionAndRevivalCallback();
  }

  runningPointReached = false;

  ennemiesOnScreen.forEach((enemyOnScreen, index) => {
    if (enemy === enemyOnScreen) {
      ennemiesOnScreen.splice(index, 1);
     // ANIMATION_RUNNING_VALUES[getCharacterAnimationAccordingToType(enemy.character, AnimationType.movement)!.id] = 0;
    }
  });
};

const destroyEnemyAndLaunchNewOne = (enemy: EnemyInterface) => {
  destroyEnemy(enemy);
};

let currentForm:  null | MapElement = null;

const updateFormElement = () => {
  if (!currentForm) {
    return;
  }

  
  const questionContainer = document.getElementsByClassName("extended_form_container_aaaa")[0] as HTMLDivElement;
  // Only access formBlocks if mapElement is a FormElement
  if ('formBlocks' in currentForm && Array.isArray((currentForm as any).formBlocks)) {
    if(currentFormIndex >=  (currentForm as FormElement).formBlocks.length) {
      alert("You have answered all questions! Well done!");
      currentFormIndex = 0;
      extendedFormContainer.style.display = "none";
    }

    questionContainer.innerHTML = (currentForm as FormElement).formBlocks[currentFormIndex].question;
  } else {
    questionContainer.innerHTML = "";
  }
}


const validateQuestion = (event: Event) => {

 // event.preventDefault();
 // event.stopPropagation();


  const questionContainer = document.getElementsByClassName("extended_form_container_aaaa")[0] as HTMLDivElement;
  const answerInput = document.getElementById("answer_input") as HTMLInputElement;

  if (!currentForm || !answerInput) {
    return;
  }

  const answer = answerInput.value.trim();

  if (answer === "") {
    questionContainer.innerHTML = "Please enter an answer!";
    return;
  }

  // Check the answer against the current question's correct answer
  if (
    'formBlocks' in currentForm &&
    typeof (currentForm as any).questionIndex === 'number' &&
    Array.isArray((currentForm as any).formBlocks) &&
    (currentForm as any).formBlocks[currentFormIndex] &&
    (currentForm as any).formBlocks[currentFormIndex].answer === answer
  ) {
    questionContainer.innerHTML = "Correct answer!";
    currentFormIndex++;
  } else {
    questionContainer.innerHTML = "Wrong answer!";
    return;
  }

  answerInput.value = "";
  updateFormElement();

}

window.validateQuestion = validateQuestion;

const hurtHero = () => {
  if (!heroIsAlive) {
    return;
  }
  runAudio.volume = 0;

  rewardStreak = 0;
  updateTransformationProgressBarDisplay();

 // heroHurt = true;
  lifePoints.value--;
  checkForHerosDeath();

  // hurtAudio.play();
   hurtAudio.currentTime = 0;

 // updateLifePointsDisplay();
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

let enemyLaunchedAttack = false;

let movementInteruptedForCinematicTransition = false; 

const detectCollision = () => {
  ennemiesOnScreen.forEach((enemyOnScreen) => {
    const enemyContainer = enemyOnScreen.character.element.parentElement!;
    const enemyLeft = enemyCurrentlyOnScreen === ENEMIES_ON_SCREEN.MOUNTAIN_GOD
      ? getMountainGodRealLeft(enemyOnScreen)!
      : enemyContainer.getBoundingClientRect().left;

    if(getHeroLeft() > enemyContainer.getBoundingClientRect().left && !enemyLaunchedAttack){
      enemyLaunchedAttack = true;

      if(enemyCurrentlyOnScreen === ENEMIES_ON_SCREEN.MOUNTAIN_GOD){
        if(enemyOnScreenAttackIndex < 2){
          launchAnimation(enemyOnScreen.character, enemyOnScreenAttackIndex === 0 ? AnimationType.attack : AnimationType.specialAttack);
        }
      } else {
        launchAnimation(enemyOnScreen.character, AnimationType.attack, false);
        setTimeout(
          () => {
            if(enemyOnScreen.hurt){
              return;
            }
            launchAnimation(enemyOnScreen.character, AnimationType.idle);
          }, 1920
        )
      }
    } 
   
    if (
      enemyCurrentlyOnScreen !== ENEMIES_ON_SCREEN.MOUNTAIN_GOD &&
      !heroInTheRedZone &&
      enemyViewPoint.getBoundingClientRect().left +
        enemyViewPoint.getBoundingClientRect().width <
        getHeroLeft()
    ) {
      heroInTheRedZone = true;
      updateEnemyViewPointDisplay();
      runningPointReached = true;
      launchAnimation(enemyOnScreen.character, AnimationType.run);
     }
  
    if (
      getHeroLeft() >
        enemyLeft + (enemyContainer.getBoundingClientRect().width * ( enemyCurrentlyOnScreen === ENEMIES_ON_SCREEN.RED_GOLEM ? 0.3 : 0)) &&
      enemyOnScreen.collideable && enemyOnScreenAttackIndex < 2
    ) {
      handleHeroAndEnemyContact(enemyOnScreen);
    }
  });

  requestAnimationFrame(detectCollision);
};

let repositioningDone = false;

const checkForScreenUpdateFromLeftToRight = (throttleNum: number): any => {

  if(currentHeroDirection === Direction.RIGHT_TO_LEFT){
    
  if(gameMode === GAME_MODES.challenge){
    return;
  }

  MAP_SETS.forEach(

  (mapSet, index) => {

   const startIndex = store.getState().persistedMap.startIndex;
   const firstMapDomElement = mapSet.maps[0];

  if (firstMapDomElement.getBoundingClientRect().left > 0 && firstMapDomElement.getBoundingClientRect().left <= window.innerWidth * 0.05) {

    if(index === 4){

      if(startIndex === 0){
        interruptAnimation(ANIMATION_ID.hero_walk_left);
        stopCameraMovingToLeft();
        return;
      }  
    }

    mapSet.maps.unshift(
      index === 4 ? createElementMapBlockStart(firstMapDomElement.offsetLeft - firstMapDomElement.offsetWidth, mapSet.imagePath, `${index}`) :
      createMapBlock(
        firstMapDomElement.offsetLeft - firstMapDomElement.offsetWidth, mapSet.imagePath, `${index}`
       )
    );

  }

  const lastMapDomElement = mapSet.maps[mapSet.maps.length - 1];
  
    if (
      lastMapDomElement &&
      lastMapDomElement.getBoundingClientRect().left > window.innerWidth * 1.5
    ) {
      if(index === 4){
        store.dispatch(decreaseEndIndex());
      }
         lastMapDomElement.remove();
         mapSet.maps.pop();
      } 
    }
  )

  requestAnimationFrame(() => checkForScreenUpdateFromLeftToRight(throttleNum));

  } else {
      
  MAP_SETS.forEach(

    (mapSet, index) => {
        
    const firstMapDomElement = mapSet.maps[0];
  
    if (firstMapDomElement.getBoundingClientRect().left < -window.innerWidth) {
  
      if(index === 4){
       store.dispatch(removeElementFromElementsOnScreen(store.getState().persistedMap.startIndex)) 
       store.dispatch(increaseStartIndex());
      }
  
      firstMapDomElement.remove();
      mapSet.maps.shift();
    }
  
    const lastMapDomElement = mapSet.maps[mapSet.maps.length - 1];
    const endIndex = store.getState().persistedMap.endIndex;
    const elements = store.getState().persistedMap.elements;

    if(index === 4 && lastMapDomElement && lastMapDomElement.getBoundingClientRect().left <= 0){
      if(endIndex >= (elements.length - 1)){
         interruptAnimation(ANIMATION_ID.hero_walk_right);
         stopCameraMovingToRight();
         return;
       }
     }
  
      if (
        lastMapDomElement &&
        (lastMapDomElement.getBoundingClientRect().left + lastMapDomElement.getBoundingClientRect().width) <= window.innerWidth
      ) {
        
        if(index === 4){
          if(endIndex >= (elements.length - 1)){
            interruptAnimation(ANIMATION_ID.hero_walk_right);
            stopCameraMovingToRight();
             return;
           }
  
        if(store.getState().unpersistedMapReducer.currentlyFinishingChallenge){
          store.dispatch(setCurrentlyFinishingChallenge(false));
        }
       };
  
       if(index === 4){
  
          mapSet.maps.push(createElementMapBlockEnd(lastMapDomElement.getBoundingClientRect().left + lastMapDomElement.getBoundingClientRect().width - 10, mapSet.imagePath, `${index}`));
   
      } else {
        mapSet.maps.push(createMapBlock(
           lastMapDomElement.offsetLeft + lastMapDomElement.offsetWidth - 10, mapSet.imagePath, `${index}`
         ));
      }
      if(currentCinematicMode !== CINEMATIC_MODES.NONE && !repositioningDone){
        repositioningDone = true;
        repositionMapBlocks();
      }
      } 
     }
    )
   requestAnimationFrame(() => checkForScreenUpdateFromLeftToRight(throttleNum));

  }

};

const buildEndOfChallengeElement = () => {

  const endOfChallengeContainer = document.createElement("div");
  endOfChallengeContainer.style.position = "absolute";
  endOfChallengeContainer.style.zIndex = "1500";
  endOfChallengeContainer.style.left = "40vw";
  endOfChallengeContainer.style.top = "30vh";
  endOfChallengeContainer.style.height = "30vh";
  endOfChallengeContainer.style.width = "40vw";
  endOfChallengeContainer.style.background = "blue";

  return endOfChallengeContainer;
}

const createEndOfChallengeMapBlock = (left:number, imagePath: string, zIndex: string) => {
   store.dispatch(setCurrentlyFinishingChallenge(false));

   const endOfChallengeElement = buildEndOfChallengeElement();

   return createMapBlock(left, imagePath, zIndex, endOfChallengeElement);
}


const checkForScreenUpdateFromRightToLeft = (throttleNum: number): any => {

  if(gameMode === GAME_MODES.challenge){
    return;
  }

  MAP_SETS.forEach(

  (mapSet, index) => {

   const startIndex = store.getState().persistedMap.startIndex;
   const firstMapDomElement = mapSet.maps[0];

  if (firstMapDomElement.getBoundingClientRect().left > 0 && firstMapDomElement.getBoundingClientRect().left <= window.innerWidth * 0.05) {

    if(index === 4 && gameMode === GAME_MODES.discovery){

      if(startIndex === 0){
        interruptAnimation(ANIMATION_ID.hero_walk_left);
        stopCameraMovingToLeft();
        return;
      }  
    }

    mapSet.maps.unshift(
      index === 4 && gameMode === GAME_MODES.discovery ? createElementMapBlockStart(firstMapDomElement.offsetLeft - firstMapDomElement.offsetWidth, mapSet.imagePath, `${index}`) :
      createMapBlock(
        firstMapDomElement.offsetLeft - firstMapDomElement.offsetWidth, mapSet.imagePath, `${index}`
       )
    );

  }

  const lastMapDomElement = mapSet.maps[mapSet.maps.length - 1];
  
    if (
      lastMapDomElement &&
      lastMapDomElement.getBoundingClientRect().left > window.innerWidth * 1.5
    ) {
      if(index === 4 && gameMode === GAME_MODES.discovery){
        store.dispatch(decreaseEndIndex());
      }
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

export const launchAnimation = (character: CharacterInterface, animationType: AnimationType, loop=true) => {
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

const initCharacterAnimations = (character: DefaultCharacter) => {

  character.animations.forEach(
    animation => {
      animation.animationsStatesBlocks.forEach(
        animationStateBlock => interruptAnimation(animationStateBlock.animation.id)
      )
    }
  )

}

const launchHeroWalkAnimation = (direction: ANIMATION_ID) => {

  if (!heroIsAlive) {
    return;
  }

  runAudio.volume = 0.7;

  launchAnimation(heroCharacter, direction === ANIMATION_ID.hero_walk_left ? AnimationType.walk_left : AnimationType.run_right);

}

const launchHeroRunAnimation = (direction = Direction.LEFT_TO_RIGHT) => {

  if (!heroIsAlive) {
    return;
  }

  runAudio.volume = 0.7;

  launchAnimation(heroCharacter, direction === Direction.LEFT_TO_RIGHT ? transformed ? AnimationType.transformed_run : AnimationType.run : AnimationType.walk_left);

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

export enum AnimationType {
  attack,
  specialAttack,
  specialAttack2,
  transformed_attack,
  transformed_hurt,
  transformed_run,
  run,
  run_right,
  run_left,
  walk,
  walk_right,
  walk_left,
  hurt,
  death,
  death_from_special_attack,
  idle,
  secondIdle,
  movement,
  open_course,
  transformation,
  transformation2,
  teleportation,
  taunt,
  open_gate
}

type CharacterAnimations = Array<
  {
    animationType: AnimationType,
    animationsStatesBlocks: Array<{
        states: Array<CharacterStates> ,
        animation: Animation;
    }>
  }
>;

export interface CharacterInterface {
  element: HTMLImageElement;
  state: CharacterStates;
  animations: CharacterAnimations;
}

interface MovingElementInterface {
  velocity: number;
}

interface MovingCharacterInterface extends CharacterInterface, MovingElementInterface {}

export class DefaultCharacter {
   element: HTMLImageElement;
   state: CharacterStates;
   animations: CharacterAnimations;
   
   constructor(element: HTMLImageElement, state: CharacterStates, animations: CharacterAnimations){
    this.element = element;
    this.state = state;
    this.animations = animations;
   }
}


type CharacterStates = CharacterDefaultStates | HeroCharacterStates | LearningGodCharacterStates | RedHammerEnemyCharacterStates | OrcEnemyCharacterStates | DwarfEnemyCharacterStates | GolemEnemyCharacterStates | KingEnemyCharacterStates | WitchEnemyCharacterStates;




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

enum CharacterDefaultStates {
  default
}

export enum LearningGodCharacterStates {
  idle,
  walk
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
const ALL_DEFAULT_STATES = [CharacterDefaultStates.default];

export const learningGodAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: ALL_HERO_STATES,
      animation: 
       {
        id: ANIMATION_ID.learning_god_idle,
        sprite:    {
          path: ASSETS_PATH_BASE + "/characters/neutral/learningGod/idle",
          length: 15
       }
      }
     },
   ]
  },
   {
      animationType: AnimationType.walk_left,
        animationsStatesBlocks: [
          {
            states: ALL_HERO_STATES,
            animation: 
            {
              id: ANIMATION_ID.learning_god_walk_left,
              sprite: {
                path: ASSETS_PATH_BASE + "/characters/neutral/learningGod/walk",
                length: 12
               }
            }
         },
      ]
    },
    {
      animationType: AnimationType.open_course,
        animationsStatesBlocks: [
          {
            states: ALL_HERO_STATES,
            animation: 
            {
              id: ANIMATION_ID.learning_god_open_course,
              sprite: {
                  path: ASSETS_PATH_BASE + "/characters/neutral/learningGod/open_course",
                  length: 17
                }
             }
          },
       ]
    }
];

let runningPointReached = false;


const getMountainGodRunningEnemyPoint = () => {
  return ;
}


const mountainPillarAnimations = [
  
  {
    animationType: AnimationType.transformation,
    animationsStatesBlocks: [
      {
        states: ALL_DEFAULT_STATES,
        animation: 
        {
          id: ANIMATION_ID.mountain_pillar_activated ,
          sprite:    {
            path: ASSETS_PATH_BASE + "/items/god_obelisk",
            length: 14
        }
        }
       }
    ]
  }
]

const maleOrcAnimations = [
  {
    animationType: AnimationType.idle,
    animationsStatesBlocks: [
      {
        states: ALL_DEFAULT_STATES,
        animation: 
        {
          id: ANIMATION_ID.male_orc_idle ,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/neutral/orc/male",
            length: 7
        }
        }
       }       
     ]
    }
];

const femaleOrcAnimations = [
  {
    animationType: AnimationType.idle,
    animationsStatesBlocks: [
      {
        states: ALL_DEFAULT_STATES,
        animation: 
        {
          id: ANIMATION_ID.female_orc_idle,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/neutral/orc/female",
            length: 6
        }
        }
       }

       
     ]
    }
];


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
          path: ASSETS_PATH_BASE + "/characters/transformed_hero/pre_run/new",
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
          path: ASSETS_PATH_BASE + "/characters/hero/idle",
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
            path: ASSETS_PATH_BASE + "/characters/hero/attack",
            length: 4
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.transformed_attack,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: {
            id: ANIMATION_ID.hero_transformation_attack,
            sprite: {
              path: ASSETS_PATH_BASE + "/characters/transformed_hero/attack/new/new",
              length: 7
            }
          },

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
              path: ASSETS_PATH_BASE + "/characters/hero/flames",
              length: 14
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
                path: ASSETS_PATH_BASE + "/characters/hero/walk",
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
              path: ASSETS_PATH_BASE + "/characters/hero/run",
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
              path: ASSETS_PATH_BASE + "/characters/transformed_hero/run/new",
              length: 6
          }
          }
         }
       ]
      },
      {
        animationType: AnimationType.transformed_run,
        animationsStatesBlocks: [
          {
            states: ALL_HERO_STATES,
            animation: {
              id: ANIMATION_ID.hero_transformation_run,
              sprite: {
                path: ASSETS_PATH_BASE + "/characters/transformed_hero/run/new",
                length: 6
              }
            }
          }

        ]
      },
      {
        animationType: AnimationType.walk_left,
        animationsStatesBlocks: [
          {
            states: ALL_HERO_STATES,
            animation: 
            {
              id: ANIMATION_ID.hero_walk_left,
              sprite:    {
                path: ASSETS_PATH_BASE + "/characters/hero/walk_left",
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
                path: ASSETS_PATH_BASE + "/characters/transformed_hero/run/new",
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
                  path: ASSETS_PATH_BASE + "/characters/hero/walk_left",
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
                  path: ASSETS_PATH_BASE + "/characters/transformed_hero/run/new",
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
                path: ASSETS_PATH_BASE + "/characters/hero/second_idle",
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
                path: ASSETS_PATH_BASE + "/characters/hero/back_up",
                length: 4
              }
            }
           }
         ]
        },
        {
          animationType: AnimationType.teleportation,
          animationsStatesBlocks: [
            {
             states: ALL_HERO_STATES,
             animation: 
              {
               id: ANIMATION_ID.hero_teleportation,
               sprite:    {
                path: ASSETS_PATH_BASE + "/characters/hero/teleportation",
                length: 12
              }
            }
           }
         ]
        },
];

const pnj1Animations = [
  {
    animationType: AnimationType.transformation,
    animationsStatesBlocks: [
      {
        states: ALL_DEFAULT_STATES,
        animation: 
        {
          id: ANIMATION_ID.pnj1_transformation,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/neutral/golem2/1",
            length: 14
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.transformation2,
      animationsStatesBlocks: [
        {
          states: ALL_DEFAULT_STATES,
          animation: 
          {
            id: ANIMATION_ID.pnj1_transformation2,
            sprite:    {
              path: ASSETS_PATH_BASE + "/characters/neutral/golem2/2",
              length: 12
          }
          }
         }
       ]
      }
];

const pnj2Animations = [
  {
    animationType: AnimationType.idle,
    animationsStatesBlocks: [
      {
        states: ALL_DEFAULT_STATES,
        animation: 
        {
          id: ANIMATION_ID.pnj2_idle,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/neutral/guardian",
            length: 16
        }
        }
       }
     ]
    }
]

let mountainGodInTheContactZone = false;

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
          path: ASSETS_PATH_BASE + "/characters/enemies/hard/idle/new/new",
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
            path: ASSETS_PATH_BASE + "/characters/enemies/hard/attack",
            length: 30
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.specialAttack,
      animationsStatesBlocks: [
        {
          states: ALL_RED_HAMMER_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.hammer_opponent_special_attack,
            sprite:    {
              path: ASSETS_PATH_BASE + "/characters/enemies/hard/attack/spin",
              length: 30
          }
          }
         }
       ]
      },
      {
        animationType: AnimationType.specialAttack2,
        animationsStatesBlocks: [
          {
            states: ALL_RED_HAMMER_ENEMY_STATES,
            animation: 
            {
              id: ANIMATION_ID.hammer_opponent_special_attack,
              sprite:    {
                path: ASSETS_PATH_BASE + "/characters/enemies/hard/attack/jump/new",
                length: 20
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
              path: ASSETS_PATH_BASE + "/characters/enemies/mountain_god/hurt",
              length: 5
          }
          }
         }
       ]
      },
      {
        animationType: AnimationType.death_from_special_attack,
        animationsStatesBlocks: [
          {
            states: ALL_WITCH_ENEMY_STATES,
            animation: 
            {
              id: ANIMATION_ID.hammer_opponent_death_from_special_attack,
              sprite:  {
                path: ASSETS_PATH_BASE + "/explosion",
                length: 12
            }
            }
           }
         ]
      }, 

      {
        animationType: AnimationType.taunt,
        animationsStatesBlocks: [
          {
            states: ALL_WITCH_ENEMY_STATES,
            animation: 
            {
              id: ANIMATION_ID.hammer_opponent_taunt,
              sprite:  {
                path: ASSETS_PATH_BASE + "/characters/enemies/hard/taunt/new/new",
                length: 16
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

      {
        animationType: AnimationType.run,
        animationsStatesBlocks: [
          {
            states: ALL_RED_HAMMER_ENEMY_STATES,
            animation: 
            {
              id: ANIMATION_ID.hammer_opponent_run,
              sprite:    {
                path: ASSETS_PATH_BASE + "/characters/enemies/hard/walk/new",
                length: 16
            }
            
            }
           }
         ]
        },
        {
          animationType: AnimationType.teleportation,
          animationsStatesBlocks: [
            {
              states: [CharacterDefaultStates.default],
              animation: 
              {
                id: ANIMATION_ID.mountain_god_teleportation,
                sprite:  {
                  path: "assets/challenge/items/teleportation_lightning/normal",
                  length: 9
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
          path: ASSETS_PATH_BASE + "/characters/enemies/orc/idle",
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
            path: ASSETS_PATH_BASE + "/characters/enemies/orc/attack",
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
            id: ANIMATION_ID.orc_opponent_death,
            sprite:    {
              path: ASSETS_PATH_BASE + "/characters/enemies/orc/death",
              length: 36
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
          path: ASSETS_PATH_BASE + "/characters/enemies/dwarf/idle",
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
            path: ASSETS_PATH_BASE + "/characters/enemies/dwarf/attack",
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
              path: ASSETS_PATH_BASE + "/characters/enemies/dwarf/death",
              length: 38
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
          path: ASSETS_PATH_BASE + "/characters/enemies/witch/idle",
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
        states: ALL_WITCH_ENEMY_STATES,
        animation: 
        {
          id: ANIMATION_ID.witch_opponent_attack,
          sprite:    {
          path: ASSETS_PATH_BASE + "/characters/enemies/witch/attack",
             length: 18
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
            id: ANIMATION_ID.witch_opponent_death,
            sprite:  {
              path: ASSETS_PATH_BASE + "/characters/enemies/witch/death",
              length: 12
          }
          }
         }
       ]
      },
      {
        animationType: AnimationType.death_from_special_attack,
        animationsStatesBlocks: [
          {
            states: ALL_WITCH_ENEMY_STATES,
            animation: 
            {
              id: ANIMATION_ID.witch_opponent_death_from_special_attack,
              sprite:  {
                path: ASSETS_PATH_BASE + "/explosion",
                length: 12
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


const mountainGodAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: [CharacterDefaultStates.default],
      animation: 
      {
        id: ANIMATION_ID.mountain_god_idle,
        sprite:    {
          path: ASSETS_PATH_BASE + "/characters/enemies/mountain_god/idle",
          length: 10
      }
      }
     }
   ]
  },
  {
    animationType: AnimationType.attack,
    animationsStatesBlocks: [
      {
        states: [CharacterDefaultStates.default],
        animation: 
        {
          id: ANIMATION_ID.mountain_god_attack,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/enemies/mountain_god/attack",
            length: 7
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.death,
      animationsStatesBlocks: [
        {
          states: [CharacterDefaultStates.default],
          animation: 
          {
            id: ANIMATION_ID.mountain_god_hurt,
            sprite: {
              path: ASSETS_PATH_BASE + "/characters/enemies/mountain_god/hurt",
              length: 5
          }
          }
         }
       ]
      },
      {
        animationType: AnimationType.death_from_special_attack,
        animationsStatesBlocks: [
          {
            states: [CharacterDefaultStates.default],
            animation: 
            {
              id: ANIMATION_ID.mountain_god_hurt_from_special_attack,
              sprite:  {
                path: ASSETS_PATH_BASE + "/explosion",
                length: 12
            }
            }
           }
         ]
      },
    {
      animationType: AnimationType.movement,
      animationsStatesBlocks: [
        {
          states: [CharacterDefaultStates.default],
          animation: 
          {
            id: ANIMATION_ID.mountain_god_move,
            sprite:    {
              path: "",
              length: 0
          }
          }
         }
       ]
      },
      {
        animationType: AnimationType.run,
        animationsStatesBlocks: [
          {
            states: [CharacterDefaultStates.default],
            animation: 
            {
              id: ANIMATION_ID.mountain_god_run,
              sprite:    {
                path: ASSETS_PATH_BASE + "/characters/enemies/mountain_god/run",
                length: 16
            }
            }
           }
         ]
      },
      {
        animationType: AnimationType.death_from_special_attack,
        animationsStatesBlocks: [
          {
            states: [CharacterDefaultStates.default],
            animation: 
            {
              id: ANIMATION_ID.mountain_god_hurt_from_special_attack,
              sprite:  {
                path: "assets/challenge/items/teleportation_lightning",
                length: 12
            }
            }
           }
         ]
      },
      {
        animationType: AnimationType.teleportation,
        animationsStatesBlocks: [
          {
            states: [CharacterDefaultStates.default],
            animation: 
            {
              id: ANIMATION_ID.mountain_god_teleportation,
              sprite:  {
                path: "assets/challenge/items/teleportation_lightning",
                length: 9
            }
            }
           }
         ]
      },
];

const pikeManAnimations = [
  {
    animationType: AnimationType.idle,
    animationsStatesBlocks: [
      {
        states: ALL_DEFAULT_STATES,
        animation: 
        {
          id: ANIMATION_ID.golem_master_transformation,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/neutral/pike_man/idle",
            length: 9
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.open_gate,
      animationsStatesBlocks: [
        {
          states: ALL_DEFAULT_STATES,
          animation: 
          {
            id: ANIMATION_ID.pike_man_open_gate,
            sprite:    {
              path: ASSETS_PATH_BASE + "/characters/neutral/pike_man/open_gate",
              length: 5
          }
          }
         }
       ]
      },

]

const golemMasterAnimations = [
  {
    animationType: AnimationType.transformation,
    animationsStatesBlocks: [
      {
        states: ALL_GOLEM_ENEMY_STATES,
        animation: 
        {
          id: ANIMATION_ID.golem_master_transformation,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/neutral/master/transformation",
            length: 45
        }
        }
       }
     ]
    },
    {
      animationType: AnimationType.idle,
      animationsStatesBlocks: [
        {
          states: ALL_GOLEM_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.golem_opponent_idle,
            sprite:    {
              path: ASSETS_PATH_BASE + "/characters/neutral/master/idle",
              length: 8
          }
          }
         }
       ]
      }
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
          path: ASSETS_PATH_BASE + "/characters/enemies/golem/idle/new",
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
            path: ASSETS_PATH_BASE + "/characters/enemies/golem/attack/new",
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
            sprite: {
              path: ASSETS_PATH_BASE + "/characters/enemies/golem/death/new",
              length: 28
          }
          }
         }
       ]
      },
      {
        animationType: AnimationType.death_from_special_attack,
        animationsStatesBlocks: [
          {
            states: ALL_WITCH_ENEMY_STATES,
            animation: 
            {
              id: ANIMATION_ID.golem_opponent_death_from_special_attack,
              sprite:  {
                path: ASSETS_PATH_BASE + "/explosion",
                length: 12
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
      {
        animationType: AnimationType.run,
        animationsStatesBlocks: [
          {
            states: ALL_GOLEM_ENEMY_STATES,
            animation: 
            {
              id: ANIMATION_ID.golem_opponent_run,
              sprite:    {
                path: ASSETS_PATH_BASE + "/characters/enemies/golem/walk",
                length: 7
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
          path: ASSETS_PATH_BASE + "/characters/enemies/king/idle",
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
          id: ANIMATION_ID.king_opponent_attack,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/enemies/king/attack",
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
              path: ASSETS_PATH_BASE + "/explosion",
              length: 11
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

export const heroCharacter = new DefaultCharacter(heroImage, HeroCharacterStates.idle, heroAnimations);

export const maleOrcCharacter = new DefaultCharacter(heroImage, CharacterDefaultStates.default, maleOrcAnimations);

export const femaleOrcCharacter = new DefaultCharacter(heroImage, CharacterDefaultStates.default, femaleOrcAnimations);

const resetViewPoint = () => {
  enemyViewPoint.style.left = "70vw";
  enemyViewPoint.style.display = "flex";
  updateEnemyViewPointDisplay();
}

const createAndInjectRedHammerImgInDomAndGetCharacter = (): DefaultCharacter => {

    const newOpponentContainer = document.createElement("div");
    newOpponentContainer.classList.add("hard_enemy_container");
    const newEnnemyImg = document.createElement("img") as HTMLImageElement;
    newEnnemyImg.src = ASSETS_PATH_BASE + "/items/teleportation_lightning/8.png";  
    newOpponentContainer.append(newEnnemyImg);

    document.getElementsByTagName("body")[0].append(newOpponentContainer);

    //init view point

 return getRedHammerCharacter(newEnnemyImg);

}

const getRedHammerCharacter = (img: HTMLImageElement) => {

  return new DefaultCharacter(img, RedHammerEnemyCharacterStates.idle, redHammerAnimations);
}


const createChallengPilar = (element: MapElement) => {
 
  //On créée une div, qui fait

  const pilarBackgroundContainer = document.createElement("div");
  pilarBackgroundContainer.style.position = "absolute";
  pilarBackgroundContainer.style.left = "0";    
  pilarBackgroundContainer.style.top = "0";    
  pilarBackgroundContainer.style.width = "100vw";
  pilarBackgroundContainer.style.height = "100vh";
  pilarBackgroundContainer.style.zIndex = "10";

  pilarBackgroundContainer.style.display = "flex";
  pilarBackgroundContainer.style.justifyContent = "center";
  pilarBackgroundContainer.style.alignItems = "center";

  const pillarcontainer = document.createElement("div");
  pillarcontainer.style.width = "5vw";
  pillarcontainer.style.height = "20vh";
  pillarcontainer.style.background = "grey";
  pillarcontainer.style.borderRadius = "15px";
  pillarcontainer.id = `${element.id}`;
  pillarcontainer.style.cursor = "pointer";
  pillarcontainer.onclick = (event) => {
    const response = confirm("voulez vous lancer le challenge?");
    if(response){
      launchChallenge(element.id);
    }
  }

  pilarBackgroundContainer.append(pillarcontainer);

  return pilarBackgroundContainer;
 
}

let lastGolemVal = 0;
let golemAudioIndex = 0;




const getMinifiedFormContainerFromId = (id: string) => {
  return document.getElementById(`${MINIFIED_FORM_PREFIX}${id}`);
}

const getFormContainerFromId = (id: string) => {
  return document.getElementById(`${FORM_CONTAINER_PREFIX}${id}`)
}

const getFormFromId = (id: string) => {

  let  foundForm = null;

  const elementsOnScreen = store.getState().persistedMap.elementsOnScreen;

  elementsOnScreen.forEach(
    element => {
       if(element.id === id && element.type === ELEMENT_TYPE.form){
         foundForm === element;
       }
    }
  );

  return foundForm;
}

const launchGolemTalk = () => {
  const needSomethingAudio = document.getElementById("need_something")! as HTMLAudioElement;
  const byeAudio = document.getElementById("bye")! as HTMLAudioElement;

  if(golemAudioIndex === 0){
    needSomethingAudio.play();
  } else {
    byeAudio.play();
  }

  golemAudioIndex = golemAudioIndex === 0 ? 1 : 0;

}

const MINIFIED_FORM_PREFIX = "minified_form_";
const FORM_CONTAINER_PREFIX= "form_container";

const createFormElement = (formElement: MapElement) => {
  
    //On créée une div, qui fait

    const formBackgroundContainer = document.createElement("div");
    formBackgroundContainer.style.position = "absolute";
    formBackgroundContainer.style.left = "35vw";    
    formBackgroundContainer.style.top = "30vh";    
    formBackgroundContainer.style.width = "30vw";
    formBackgroundContainer.style.height = "50vh";
    formBackgroundContainer.style.zIndex = "10";
    formBackgroundContainer.style.borderRadius = "15px";
    formBackgroundContainer.style.display = "flex";
    formBackgroundContainer.style.justifyContent = "space-between";
    formBackgroundContainer.style.alignItems = "center";
    formBackgroundContainer.style.flexDirection = "column";

    const formContainer = document.createElement("div");
    formContainer.id=`${FORM_CONTAINER_PREFIX}${formElement.id}`;
    formContainer.style.position="relative";
    formContainer.style.width = "70%";
    formContainer.style.height = "45%";
    formContainer.style.background = "grey";
    formContainer.style.borderRadius = "15px";
    formContainer.style.position = "absolute";
    formContainer.style.top = "0";
    formContainer.style.zIndex = "1000";

    const minifiedFormContentContainer = document.createElement("div");
    minifiedFormContentContainer.style.height = "100%";
    minifiedFormContentContainer.style.width = "100%";
    minifiedFormContentContainer.id= `${MINIFIED_FORM_PREFIX}${formElement.id}`;

    formContainer.append(minifiedFormContentContainer);

    const validatedPoint = document.createElement("div");
    validatedPoint.style.position = "absolute";
    validatedPoint.style.background = "#007480";
    validatedPoint.style.borderRadius = "50%";
    validatedPoint.style.height = "5%";
    validatedPoint.style.aspectRatio = "1/1";
    validatedPoint.style.top = "10px";
    validatedPoint.style.right = "10px";

    const extendButton = document.createElement("button");
    extendButton.style.cursor = "pointer";
    extendButton.style.bottom = "10%";
    extendButton.style.right = "25%";
    extendButton.style.position = "absolute";
    extendButton.style.width = "50%";
    extendButton.style.height = "20%";
    extendButton.style.borderRadius = "10px";
    extendButton.style.border ="none";
    extendButton.style.display = "flex";
    extendButton.style.justifyContent = "center";
    extendButton.style.alignItems = "center";
    extendButton.style.background = "#726e6e";
    extendButton.innerHTML = "Extend";
    extendButton.onclick = (event: Event) => extendForm(formElement.id);

    minifiedFormContentContainer.append(validatedPoint);
    minifiedFormContentContainer.append(extendButton);
    
    formBackgroundContainer.append(formContainer);

    currentForm = formElement;

    updateFormElement();

    const golemContainer = document.createElement("div");
    golemContainer.style.height = "50%";
    golemContainer.style.position = "absolute";
    golemContainer.style.bottom = "0";

    const golemImg = document.createElement("img") as HTMLImageElement;
    golemImg.style.height = lastGolemVal === 0 ? "100%" : "80%";
    golemImg.style.width = "auto";
    golemImg.src= `assets/challenge/characters/neutral/golem2/1/1.png`;
    golemContainer.append(golemImg);

    if(formElement.id === GOLEM_IDS.golem1.toString()){
      const pnjCharacter = new DefaultCharacter(golemImg, CharacterDefaultStates.default, pnj1Animations);
      
    setTimeout(
      () => {
        launchAnimation(pnjCharacter, AnimationType.transformation, false);
      }, 10000
    )

    } else {
      const pnjCharacter = new DefaultCharacter(golemImg, CharacterDefaultStates.default, pnj2Animations);
      launchAnimation(pnjCharacter, AnimationType.idle);
    }

    formBackgroundContainer.append(golemContainer);
    lastGolemVal = lastGolemVal === 0 ? 1 : 0; 

    return formBackgroundContainer;
}

const createGolemCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = ASSETS_PATH_BASE + "/characters/enemies/golem/idle/new/1.png";  
  newOpponentContainer.append(newEnnemyImg);
  newOpponentContainer.style.bottom = "13vh";
  newOpponentContainer.style.width = "77vw";

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  //init view point

  resetViewPoint();

  return new DefaultCharacter(newEnnemyImg, GolemEnemyCharacterStates.idle, golemAnimations);
}

let golemLaunched = false;

const createPikeManCharacter = (pikeImage: HTMLImageElement) => {

  enemyCurrentlyOnScreen = ENEMIES_ON_SCREEN.RED_GOLEM;
  
  const masterCharacter = new DefaultCharacter(pikeImage, CharacterDefaultStates.default, pikeManAnimations);
  //launchAnimation(masterCharacter, AnimationType.idle);

  document.addEventListener("keyup", (event) => {
    if(event.key === "b"){
      launchAnimation(masterCharacter, AnimationType.open_gate, false);
      setTimeout(
        () => {
          //launchChallenge("677e814577322467895fd17e");
          launchChallenge("677e814577322467895fd17e");


          gateOpened = true;
          setTimeout(
            () => {
              //gateOpened = true;
              //specifyAndLaunchCinematic(CINEMATIC_MODES.FIRST);
              //repositionMapBlocks();
            }, 2000
          )
        }, 5000
      )
    }
  });

}

const createMasterCharacter = (masterImage : HTMLImageElement) => {

  const masterCharacter = new DefaultCharacter(masterImage as HTMLImageElement, HeroCharacterStates.idle, golemMasterAnimations);

  const animateMaster = () => {
       launchAnimation(masterCharacter, AnimationType.transformation, false);

       const transformationAudio = document.getElementById("transformation_audio")! as HTMLAudioElement;

       transformationAudio.play();

       setTimeout(
        () => {
           launchAnimation(masterCharacter, AnimationType.idle);
          const talnurAudio = document.getElementById("talnur_audio")! as HTMLAudioElement;
          talnurAudio.play();

          setTimeout(
            () => {
              killHero();
            
              setTimeout(
                () => {
                  const talnurMusic = document.getElementById("talnur_music") as HTMLAudioElement;
                  talnurMusic.pause();
                  quitCinematic();
                }, 5000
              )

            }, 19000
          )

        }, 5400
       )
  }

  const launchMasterPositionCheck = () => {

     if(golemLaunched){
      return;
     }
      
     if(masterImage.parentElement!.getBoundingClientRect().left - getHeroLeft() < (window.innerWidth * 0.01)){
       
        setTimeout(animateMaster, 1000);
        golemLaunched = true;
     }

     requestAnimationFrame(launchMasterPositionCheck)
  }

  launchMasterPositionCheck();
}

const interuptMovementForCinematicTransition = () => {
  movementInteruptedForCinematicTransition = true;
  setTimeout(
    () => {
      movementInteruptedForCinematicTransition = false;
    }, 100
  )
  stopHeroMove(currentHeroDirection);
}

const specifyAndLaunchCinematic = (cinematicMode: CINEMATIC_MODES) => {
  currentCinematicMode = cinematicMode;
  interuptMovementForCinematicTransition();
  launchCinematic();
}

const createMasterCharacterElementAndPrepareAnimations = (): HTMLElement => {

  specifyAndLaunchCinematic(CINEMATIC_MODES.L);

  const talnurMusic = document.getElementById("talnur_music") as HTMLAudioElement;
  talnurMusic.play();

  const masterElement = document.createElement("div");
  masterElement.classList.add("golem_master_container");

  const masterImg = document.createElement("img");
  masterImg.src= ASSETS_PATH_BASE + "/characters/neutral/master/transformation/1.png"; 

  masterElement.append(masterImg);

  createMasterCharacter(masterImg);

  return masterElement;
}

const moveBackground = (direction: Direction) => {

  if (ANIMATION_RUNNING_VALUES[direction === Direction.LEFT_TO_RIGHT ? ANIMATION_ID.camera_left_to_right : ANIMATION_ID.camera_right_to_left] === 0) {
    startCamera(direction);
    for(let i=0; i < 5 ; i++){
      moveCamera(direction, Date.now(), i, 1);
    }
  }
}

const launchHeroWalk = (direction = Direction.LEFT_TO_RIGHT) => {
  moveBackground(direction);
  launchHeroWalkAnimation(ANIMATION_ID.hero_walk_left);
  if(gameMode === GAME_MODES.discovery){
    stepsInSwow.play();
  }
};

const launchHeroRun = (direction = Direction.LEFT_TO_RIGHT) => {
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
        ASSETS_PATH_BASE + "/characters/hero/stop_time",
        1,
        4,
        1,
        false,
        ANIMATION_ID.ghost_opponent_run
      );
    }
  });
};

let superSpeedOn = false;

enum MovementType {
  WALK,
  RUN  
}

const launchHeroWalk2 = (direction: Direction) => {
   moveHero(MovementType.WALK, direction);
   moveBackground(direction);
  stepsInSwow.play();
  }

const stopHeroMove = (direction = Direction.LEFT_TO_RIGHT) => {
    heroMoving = false;
    stepsInSwow.pause();  
    interruptAnimation(ANIMATION_ID.hero_run);
   
    if(direction === Direction.LEFT_TO_RIGHT){
      interruptAnimation(ANIMATION_ID.hero_walk_right);
      stopCameraMovingToRight();
    } else {
      interruptAnimation(ANIMATION_ID.hero_walk_left);
      stopCameraMovingToLeft();
    }

}

export const moveHero = (type: MovementType, direction: Direction) => {

  launchAnimation(heroCharacter, AnimationType.walk_right);
  //moveCamera depending on the direction
}

const executeSuperSpeedToggle = () => {  
  superSpeedOn = !superSpeedOn;

  setTimeout(
    () => superSpeedOn = false, 300
  )
}

const quitChallenge = () => {
  window.location.replace(window.location.href)
}

document.addEventListener("keyup", (event) => {

  if(event.key === "a"){
    launchCinematic();
  }

  if(event.key === "Shift"){
    heroRunning = false;

    if(heroMoving){
      launchAnimation(heroCharacter, currentHeroDirection === Direction.LEFT_TO_RIGHT ? AnimationType.walk_right : AnimationType.walk_left);
    }
  }

  if(event.key === "d" && gameMode === GAME_MODES.discovery){
    stopHeroMove(Direction.LEFT_TO_RIGHT);
  }

  
  if(event.key === "d" && gameMode === GAME_MODES.challenge){
    stopRun(true);
  }


  
  if(event.key === "q"){
    stopHeroMove(Direction.RIGHT_TO_LEFT);
  }

});

const findMapElement = (elementId: string) => {
  return document.getElementById(`${elementId}`);
}

const hideChallengeDisplay = () => {
  lightningImg.style.opacity = "0";
  answerDataContainer.style.opacity = "0";
  scoreContainer.style.opacity = "0";
  topScoreContainer.style.opacity = "0";
}

const launchChallenge = (challengeId: string) => {

  store.getState().persistedMap.elementsOnScreen.forEach(
    element => {
      if(element.id !== challengeId){
        const mapElement = findMapElement(element.id);
        if(!mapElement){
          return;
        }
          mapElement.remove();
          store.dispatch(removeElementFromElementsOnScreen(parseInt(element.id)));
        
      }
    }
  );

  setupChallengeDisplay();
  breathAudio.play();
  gameMode = GAME_MODES.challenge;
//  initializeChallengePage(challengeId);

}

const setupChallengeDisplay = () => {
  lightningImg.style.opacity = "1";
  answerDataContainer.style.opacity = "1";
  scoreContainer.style.opacity = "1";
  topScoreContainer.style.opacity = "1";
}

const launchHero = () => {
    
  if(movementInteruptedForCinematicTransition){
    return;
  }

  heroMoving = true;

  if(gameMode === GAME_MODES.discovery){
    currentHeroDirection=Direction.LEFT_TO_RIGHT;
    launchHeroWalk2(Direction.LEFT_TO_RIGHT)
    return;
  }

  if (!gameLaunched) {
    launchGame();
  } else if (ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_run] === 0) {
    resumeRun();
  }

}

const launchHeroMovement = (event: Event) => {
  launchHero();
}

window.launchHeroMovement = launchHeroMovement;

document.addEventListener("keydown", (event) => {

  if(event.key === "Shift"){
    heroRunning = true;
    if(heroMoving){
      launchAnimation(heroCharacter, currentHeroDirection === Direction.LEFT_TO_RIGHT ? AnimationType.walk_right : AnimationType.walk_left);
    }
  }

  if(event.key === "b"){

  }

  if(event.key === "p"){
    checkForScreenUpdateFromLeftToRight(0);
  }

  if(event.key === "r"){
    window.location.replace(window.location.href);
  }

  if (event.key === "d") {
    launchHero();
  
  }
  
  if(event.key === "q"){
    if(gameMode === GAME_MODES.challenge){
      //return;
    }
    heroMoving = true;
    gameLaunched = true;
    currentHeroDirection=Direction.RIGHT_TO_LEFT;
    launchHeroWalk(Direction.RIGHT_TO_LEFT);
  }

  if (!gameLaunched || preTransformed || heroHurt) {
    return;
  }

  if(event.key === " "){
    executeSuperSpeedToggle();
  }

  /*

  if (event.key === " " && !invisible) {
    if(getHeroMode() === HERO_MODES.special){
      launchHeroLightningSpeedAnimation();
      return;
    }
    launchInvisibilityToggle();
  }
  */

  if (event.key === "m") {
    if(getHeroMode() === HERO_MODES.special){
      launchAttack(true);
      return;
    }
    launchAttack();
  }

  if (event.key === "y") {
    launchTransformation();
  }

  if(event.key === "t"){
    firstRedGolemCanAppear = true;
  }

  if (event.key === "s" && hardMode) {
    if (runStopped) {
      return;
    };
    stopRun(true);
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


const stopRun = (definitiveStop = false) => {
  
  const currentTime = Date.now();

  if(lastStopInMs && (currentTime - lastStopInMs ) < 1000){
    return;
  }

  runStopped = true;

  launchAnimation(heroCharacter, AnimationType.idle, false);

  if(!definitiveStop){
    launchIdleTimeout();
  }


  runAudio.pause();

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


  heroImage.src = ASSETS_PATH_BASE + "/characters/hero/idle/1.png";

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

export const interruptAnimation = (animation: ANIMATION_ID) => {
  ANIMATION_RUNNING_VALUES[animation] = 0;

  const appElementId = getAppIdByAnimationId(animation);
  if (!appElementId) {
    return;
  }

  APP_ELEMENTS_ANIMATION_QUEUE[appElementId].current_animation = null;
};

const stopAndResetIdleTimer = () => {
  idleTimeoutContainer.style.display = "none";
  idleTimerValue = 5;
}

const resumeRun = () => {
  runStopped = false;
  stopAndResetIdleTimer();
  runAudio.play();

  launchHeroRun();
  ennemiesOnScreen.forEach((enemy) => {
    const enemyMovementAnimation = getCharacterAnimationAccordingToType(enemy.character, AnimationType.movement)!;
    ANIMATION_RUNNING_VALUES[enemyMovementAnimation.id]++;
    moveEnemy(enemy, 0, Date.now());
  });

  if (!ennemiesOnScreen.length) {
   // triggerOpponentsApparition();
  }
};

const checkForOpponentsClearance = () => {
  ennemiesOnScreen.forEach((enemyOnScreen) => {
    const enemyRight = getEnemyRight(enemyOnScreen.character.element.parentElement!);
    if (enemyRight/2 < 0 - window.innerWidth * 0.05) {
      clearEnemy(enemyOnScreen);
    }
  });

  requestAnimationFrame(checkForOpponentsClearance);
};

const launchInvisibilityToggleFromDom = () => {
  launchInvisibilityToggle();
}

const launchInvisibilityToggle = (superSpeed = false) => {
  invisible = !invisible;

  heroContainer.style.opacity = invisible ? "0.3" : "1";
  heroContainer.style.zIndex = invisible ? "1000" : "3000";

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
  setTimeout(launchInvisibilityToggle, INVISIBILITY_DURATION_IN_MILLISECONDS/(superSpeed ?  CAMERA_SUPER_SPEED_MULTIPLICATOR : 1));
};

const quitChallengeFromMapClick = () => {
  runAudio.pause();
  const response = confirm("Vous êtes sur un chemin périlleux, vous ne pouvez pas regarder la carte. Voulez vous quitter le chemin perilleux et revenir au dernier point de sauvegarde? ")

  if(response){
    window.location.replace(window.location.href);
  } else {
    runAudio.play();
  }
}

const openMap = (event: Event) => {
  if(gameMode === GAME_MODES.challenge){
    quitChallengeFromMapClick();
    return;
  }
  window.location.replace("http://localhost:3001/new_world");
} 

window.launchInvisibilityToggle = launchInvisibilityToggleFromDom;

window.openMap = openMap;


const launchTransformation = () => {

  
  //heroContainer.style.width = "45%";
  //heroContainer.style.bottom = "9.5vh";

  runAudio.volume = 0;
  swordAudio.volume = 0;
  bombAudio.volume = 0;
  epicAudio.pause();
  transformed = true;

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
      ASSETS_PATH_BASE + "/characters/transformed_hero/run/new",
      1,
      6,
      1,
      true,
      ANIMATION_ID.hero_transformation_run
    );

    setTimeout(turnHeroTransformationOff, 15000);
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
        ASSETS_PATH_BASE + "/characters/transformed_hero/pre_run/new",
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

         // setTimeout(() => transformedEpicAudio.play(), 1000);

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
            ASSETS_PATH_BASE + "/characters/transformed_hero/run/new",
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
  answerDataValue.style.opacity = "1";
};

const clearAndHideAnswerDataContainer = () => {
  answerDataValue.style.opacity = "0";
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
  idleTimerValue = 5;
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
      ASSETS_PATH_BASE + "/characters/hero/death",
      1,
      6,
      1,
      false,
      ANIMATION_ID.hero_death
    );

    clearGameTimeouts();

    if (enemiesComingTimeout) {
      clearTimeout(enemiesComingTimeout);
      enemiesComingTimeout = null;
    }
  
    ennemiesOnScreen.forEach(
      (enemy) => {
        ANIMATION_RUNNING_VALUES[getCharacterAnimationAccordingToType(enemy.character, AnimationType.movement)!.id] = 0;
      }
    )

    setTimeout(
      launchEndOfChallenge
    );
  };

  if (transformed) {
    transformed = false;
  }

  heroImage.src = ASSETS_PATH_BASE + "/characters/hero/death/1.png";

  setTimeout(killHero, 1000);
};

const launchHeroHurtAnimation = () => {
  launchAnimationAndDeclareItLaunched(
    heroImage,
    0,
    "png",
    transformed
      ? ASSETS_PATH_BASE + "/characters/transformed_hero/hurt"
      : ASSETS_PATH_BASE + "/characters/hero/hurt",
    1,
    transformed ? 7 : 3,
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


const startCamera = (direction: Direction) => {

  const cameraAnimation = direction === Direction.LEFT_TO_RIGHT ? ANIMATION_ID.camera_left_to_right : ANIMATION_ID.camera_right_to_left;

  if (ANIMATION_RUNNING_VALUES[cameraAnimation] > 0) {
    return;
  }
  ANIMATION_RUNNING_VALUES[cameraAnimation]++;
};

const initHeroAnimations = () => {
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_transformation_pre_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_transformation_run] = 0;
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.hero_hurt] = 0;
};

const animateLightning = () => {

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

 export const createMapSets = () => {

    for(let i=1; i <= 5; i++){

      const lastSet = i === 5 ? true : false;
      const velocity = i <= 4 ? 0.01 : i * i;

      createMapSet(`assets/challenge/maps/snow/${i}.png` , velocity, `${i}`, lastSet);

    }
 }

 const initElementsIndexes = () => {
  const currentIndex = store.getState().persistedMap.currentIndex;

   store.dispatch(setStartIndex(currentIndex));
   store.dispatch(setEndIndex(currentIndex));
 }

 const setGameVolumes = () => {
  
  dragonAudio.volume = 0.05;
  epicAudio.volume = 0;
  windAudio.volume = 0.15;
  stepsInSwow.volume = 0.1;
  flameThrowerAudio.volume = 0.6;
  transitionAudio.volume = 0.15;

 }

window.onload = () => {
  setGameVolumes();
  initElementsIndexes();
  createMapSets();
//  checkForCurrentMapElementUpdate();
//  setupListeners();
  setInitialGameVolume();
  launchHardModeToggle();
  createGameAccordingToMode();
  //updateLifePointsDisplay();
  updateScoreDisplay();
  detectCollision();
  checkForScreenUpdateFromLeftToRight(10);
 // checkForScreenUpdateFromRightToLeft(10);
  checkForOpponentsClearance();
  defineSwordReach();
  updateTransformationProgressBarDisplay();
  animateLightning();
  //launchHeroTeleporationAnimation();
 // launchAnimation(heroCharacter, AnimationType.idle, false);
 launchDragon();
 // quitCinematic();
};

const launchHeroTeleporationAnimation = () => {
  launchAnimation(heroCharacter, AnimationType.teleportation);
  setTimeout(
      () => {
        launchAnimation(heroCharacter, AnimationType.idle, false)
      }, 3000
  )
}

const setupListeners = () => {
  document
    .getElementById("playAgainLink")
    ?.addEventListener("click", (event: Event) => window.location.reload());

  document
    .getElementById("backToStormGradButton")
    ?.addEventListener("click", goBackToMountain);
};


const calculateHeroSize = () => {
  const heroFullWidthInScreenWidthPercentage = 31;
  heroContainer.style.width = `${heroFullWidthInScreenWidthPercentage * currentMapBlockHeightAndWidthComparedToScreen}%`;
}

const launchCinematic = () => {

  //According to cinematic, modify width accordingly. Go through each map block. Simply change => their width, their height, their top
  
  if(currentCinematicMode === CINEMATIC_MODES.NONE){
    return;
  }

  const bottomDiv = document.getElementById("bottomDiv")!;
  bottomDiv.style.display = "none";
  dragonContainer.style.top = "20vh"

  const mapBlocks = document.querySelectorAll<HTMLElement>('.mapBlock');
  // Iterate over each element and add the "cinematicMapBlock" class

  if(currentCinematicMode as CINEMATIC_MODES === CINEMATIC_MODES.FIRST){
    currentMapBlockHeightAndWidthComparedToScreen = 0.65;
    updateHeroContainerBottom("17.5vh");
  } else {
    currentMapBlockHeightAndWidthComparedToScreen = 0.76;
    updateHeroContainerBottom("12vh");
  }

  mapBlocks.forEach((block) => {
    if(currentCinematicMode as CINEMATIC_MODES === CINEMATIC_MODES.FIRST){
      block.classList.add("cinematicMapBlock1");
    } else {
      block.classList.add("cinematicMapBlock2");
    }
  });
  
  calculateHeroSize();

 /*
   calculate new top => easy
   100 - height / 2;

   bottom of each element on the screen with certain class => bottom = mapBlockBottom

  */
}

const updateHeroContainerBottom = (newBottomInVw: string) => {   
  heroContainer.style.bottom = newBottomInVw;
}


const quitCinematic = () => {

  const bottomDiv = document.getElementById("bottomDiv")!;
  bottomDiv.style.display = "flex";

  currentCinematicMode = CINEMATIC_MODES.NONE;

  const mapBlocks = document.querySelectorAll<HTMLElement>('.mapBlock');
  // Iterate over each element and add the "cinematicMapBlock" class


  mapBlocks.forEach((block) => {
    block.classList.remove('cinematicMapBlock1');
    block.classList.remove("cinematicMapBlock2");
  });
  
  currentMapBlockHeightAndWidthComparedToScreen = 1;
  calculateHeroSize();

  updateHeroContainerBottom("15.5vh");

  repositionMapBlocks();
   
}

const createGameAccordingToMode = () => {
  //progressBar.style.display = "flex";

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
  const progress = document.getElementById("specialBarValue")! as HTMLElement;
  progress.style.setProperty(
    "--progress",
    `${getTransformationProgressValue()}%`
  );
};

const defineSwordReach = () => {
//  swordReach = window.innerWidth * (window.innerWidth > 1000 ? 0.15 : 0.35);
 //swordReach = heroImage.getBoundingClientRect().height * 2;
 swordReach = window.innerWidth * 0.6;
};

const getRedHammerCharacterRealRight = (redHammerContainer: HTMLElement) => {
  return
}

const launchGame = () => {
  runAudio.play();
  epicAudio.play();
  heroRunning = true;
  gameLaunched = true;
  launchHeroRun();
  triggerOpponentsApparition();
};

const killAllAudios = () => {
  runAudio.pause();
  epicAudio.pause();
  transformedEpicAudio.pause();
};

const dragonImage = document.getElementById("dragon_img") as HTMLImageElement;
const dragonContainer = document.getElementById("dragon_container")!;

const moveDragon = (lastExecutionTimeStamp: number) => {

  const newExecutionTimeStamp = Date.now();

  const diff = newExecutionTimeStamp - lastExecutionTimeStamp;

  if(diff < 100){
   return requestAnimationFrame(() => moveDragon(lastExecutionTimeStamp));
  }

  dragonContainer.style.left = `${dragonContainer.getBoundingClientRect().left - 4}px`;

  if(dragonContainer.getBoundingClientRect().left < (-(window.innerWidth * 0.1))){
    dragonContainer.style.left = `${window.innerWidth * 1.2}px`;
  }

  requestAnimationFrame(() => moveDragon(newExecutionTimeStamp))
}

const launchDragon = () => {

  dragonAudio.play();

  launchAnimationAndDeclareItLaunched(
    dragonImage,
    0,
    "png",
    ASSETS_PATH_BASE + "/characters/neutral/dragons/red/rightToLeft",
    1,
    3,
    1,
    true,
    ANIMATION_ID.dragon_fly_left
  );

  moveDragon(Date.now());
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

  launchInvisibilityToggle(true);
  ANIMATION_RUNNING_VALUES[ANIMATION_ID.lightning] = 0;
  lightningImg.style.opacity = "0";

  if(enemyCurrentlyOnScreen === ENEMIES_ON_SCREEN.MOUNTAIN_GOD && enemyOnScreenAttackIndex === 2){
    ennemiesOnScreen.forEach(
      enemy => moveEnemy(enemy, 0, Date.now())
    )
  }
  
  setTimeout(() =>{
    superSpeedOn = false;
    lightningImg.style.opacity = "1";
    lightningImg.style.left = "10%";

    launchAnimationAndDeclareItLaunched(
      lightningImg,
      0,
      "png",
      `assets/challenge/items/purple_lightning`,
      1,
      8,
      1,
      true,
      ANIMATION_ID.lightning
    );
    heroImage.style.display = 'flex';

    setTimeout(
      () => {
        ANIMATION_RUNNING_VALUES[ANIMATION_ID.lightning] = 0;
        lightningImg.style.opacity = "0";

        setTimeout(
          () => {
            lightningImg.style.opacity = "1";
            lightningImg.style.left = "0";


            launchAnimationAndDeclareItLaunched(
              lightningImg,
              0,
              "png",
              `assets/challenge/items/lightning`,
              1,
              17,
              1,
              true,
              ANIMATION_ID.lightning
            );

          }, 800
        )

      }, 800
    )


  }, INVISIBILITY_DURATION_IN_MILLISECONDS/CAMERA_SUPER_SPEED_MULTIPLICATOR);

}

const repositionHero = () => {

}

const repositionMapBlocks = () => {
 let previousMapBlock = null;

 MAP_SETS.forEach(
  (mapSet) => {
    mapSet.maps.forEach(
      (map, mapIndex) => {
        
        if(mapIndex > 0){
          map.style.left = `${previousMapBlock!.getBoundingClientRect().left + previousMapBlock!.getBoundingClientRect().width - 10}px`; 
        }
          previousMapBlock = map;

      }
    )
  }
 );

}
