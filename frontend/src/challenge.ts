import { addAnswer, ChallengeAnswerData, incrementAnswerIndex, setFoundAtIndex } from "./redux/slices/challengeSlice";
import {addElementOnScreen, decreaseEndIndex, decreaseStartIndex, increaseEndIndex, increaseStartIndex, removeElementFromElementsOnScreen, setEndIndex, setHeroMode, setStartIndex, updateCurrentIndex} from "./redux/slices/persisted_mapSlice";
import {store } from "./redux/index";
import { ELEMENT_TYPE, FormBlock, FormElement, HERO_MODES, MapElement } from "./types/map";
import { setCurrentlyFinishingChallenge } from "./redux/slices/unpersisted_mapSlice";

enum GAME_MODES {
  discovery,
  challenge
}

let gameMode: GAME_MODES = GAME_MODES.discovery;

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


const ASSETS_PATH_BASE = "assets/challenge";


let currentChallengeLength = 0;

let answers = null;


//selectors

const getHeroMode = () => {
 return store.getState().persistedMap.heroMode;
}




const goBackToMountain = (event: Event) => {
  window.location.href = `/discovery${hardMode ? "?started=true" : ""}`;
};

const getUrlParameter = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

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
      currentChallengeLength = challengeData.answers.length;
  } catch (error) {
    console.error('Error:', error);
  }
};

// On page load, get the challengeId from the URL and fetch the challenge
const initializeChallengePage = async (challengeId: string) => {
  if (challengeId) {
    const challenge = await fetchChallengeById(challengeId);
  } else {
    console.error('No challengeId provided in the URL.');
  }
};

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

  /*

  enemyViewPointLogo.src = `${
   ASSETS_PATH_BASE + heroInTheRedZone ? "/millescaneous/careful.png" :  "/items/lightning/11.png"
  }`;
  */
};

const runAudio = document.getElementById("run_audio")! as HTMLAudioElement;
const dragonAudio = document.getElementById("dragon_audio")! as HTMLAudioElement;

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

const setInitialGameVolume = () => {
  levelUpAudio.volume = 1;
  swordAudio.volume = 0.65;
  bombAudio.volume = 0.12;
  electricityAudio.volume = 0.7;
  transformationScreamAudio.volume = 0.25;
  hurtAudio.volume = 0.025;
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
    openMap: (event: Event) => void;
    tryAgain: (event: Event) => void;
    closeForm: (event: Event) => void;
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

  const grade = Math.round((score === 0 ? 0 :  score/currentChallengeLength) * 20);
  
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

 const enemyCreationCallbacks = [
  createGolemCharacter,
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
  learning_god_walk_left,
  learning_god_idle,
  master_attack,
  master_hurt,
  master_death_from_special_attack,
  master_run,
  master_idle,
  master_move,
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
  hammer_opponent_death_from_special_attack,
  hammer_opponent_move,
  golem_opponent_idle,
  golem_opponent_run,
  golem_opponent_attack,
  golem_opponent_death,
  golem_opponent_death_from_special_attack,
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
  lightning
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
  [ANIMATION_ID.hero_second_idle]: 0,
  [ANIMATION_ID.hero_special_attack]: 0,
  [ANIMATION_ID.learning_god_walk_left]: 0,
  [ANIMATION_ID.learning_god_idle]: 0,
  [ANIMATION_ID.master_attack]: 0,
  [ANIMATION_ID.master_run]: 0,
  [ANIMATION_ID.master_idle]: 0,
  [ANIMATION_ID.master_hurt]: 0,
  [ANIMATION_ID.master_move]: 0,
  [ANIMATION_ID.master_death_from_special_attack]: 0,
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
  master: "master"
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
      ANIMATION_ID.stop,
      ANIMATION_ID.stop_time,
      ANIMATION_ID.hero_transformation_hurt,
      ANIMATION_ID.hero_transformation_pre_run,
      ANIMATION_ID.hero_transformation_run,
      ANIMATION_ID.hero_transformation_attack,
      ANIMATION_ID.hero_idle,
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
      ANIMATION_ID.hammer_opponent_death,
      ANIMATION_ID.hammer_opponent_death_from_special_attack
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
    ]
  },
  master: {
    request_queue: [],
    current_animation: null,
    associated_animations: [
      ANIMATION_ID.master_idle,
      ANIMATION_ID.master_attack,
      ANIMATION_ID.master_hurt,
      ANIMATION_ID.master_death_from_special_attack,
      ANIMATION_ID.master_run
    ]
  },
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
    this.maps = [lastSet && gameMode === GAME_MODES.discovery ? createElementMapBlockCenter(0, imagePath, zIndex) : createMapBlock(0, imagePath, zIndex) ];
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
  const elementDiv = createMapElement(element);

  return createMapBlock(0, imagePath, zIndex, elementDiv);
};

type ChallengeEnd = {type: "ChallengeEnd"};

type ExtendedMapElement = MapElement | ChallengeEnd;


const createMapElement = (element: MapElement) => {
  return element.type === ELEMENT_TYPE.form ? createFormElement(element) : createChallengPilar(element);
}

const createElementMapBlockStart = (left:number, imagePath: string, zIndex: string)  => {
   store.dispatch(decreaseStartIndex());
   const startIndex = store.getState().persistedMap.startIndex;
   store.dispatch(addElementOnScreen(startIndex));

   const element = store.getState().persistedMap.elements[startIndex];
   const elementDiv = createMapElement(element);

   return createMapBlock(left, imagePath, zIndex, elementDiv);
};

const createElementMapBlockEnd = (left:number, imagePath: string, zIndex: string) => {
  store.dispatch(increaseEndIndex());
  const endIndex = store.getState().persistedMap.endIndex;
  store.dispatch(addElementOnScreen(endIndex));
  const element = store.getState().persistedMap.elements[endIndex];
  const elementDiv = createMapElement(element);

  return createMapBlock(left, imagePath, zIndex, elementDiv);
};

let lastBlockId = 0

const createMapBlock = (left: number, imagePath: string, zIndex = "1", element?: HTMLDivElement) => {

  lastBlockId++;

  const block = document.createElement("div");
  block.classList.add("mapBlock");
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
    (animationId === ANIMATION_ID.hero_run || animationId === ANIMATION_ID.hero_walk_left || animationId === ANIMATION_ID.hero_walk_right || animationId === ANIMATION_ID.hero_idle || animationId === ANIMATION_ID.hero_special_attack || animationId === ANIMATION_ID.hero_second_idle || animationId === ANIMATION_ID.lightning ||
      animationId === ANIMATION_ID.hammer_opponent_idle || animationId === ANIMATION_ID.hammer_opponent_death || animationId === ANIMATION_ID.witch_opponent_death || animationId === ANIMATION_ID.witch_opponent_death_from_special_attack || animationId === ANIMATION_ID.hammer_opponent_attack ||  animationId === ANIMATION_ID.orc_opponent_idle || animationId === ANIMATION_ID.orc_opponent_attack ||   animationId === ANIMATION_ID.dwarf_opponent_idle || animationId === ANIMATION_ID.dwarf_opponent_attack || animationId === ANIMATION_ID.golem_opponent_idle || animationId === ANIMATION_ID.golem_opponent_attack || animationId === ANIMATION_ID.golem_opponent_death || animationId === ANIMATION_ID.orc_opponent_death || animationId === ANIMATION_ID.dwarf_opponent_death || animationId === ANIMATION_ID.golem_opponent_death_from_special_attack || animationId === ANIMATION_ID.golem_opponent_run || animationId === ANIMATION_ID.witch_opponent_run  || animationId === ANIMATION_ID.hammer_opponent_run || animationId === ANIMATION_ID.hammer_opponent_death_from_special_attack || animationId === ANIMATION_ID.king_opponent_idle || animationId === ANIMATION_ID.king_opponent_attack || animationId === ANIMATION_ID.witch_opponent_idle || animationId === ANIMATION_ID.witch_opponent_attack ||  animationId === ANIMATION_ID.dragon_fly_right || animationId === ANIMATION_ID.dragon_fly_left || animationId === ANIMATION_ID.learning_god_idle || animationId === ANIMATION_ID.learning_god_walk_left || animationId === ANIMATION_ID.master_attack || animationId === ANIMATION_ID.master_idle || animationId === ANIMATION_ID.master_run || animationId === ANIMATION_ID.master_hurt || animationId === ANIMATION_ID.master_death_from_special_attack ) &&
    lastExecutionTimeStamp
  ) {
    const diff = newExecutionTimeStamp - lastExecutionTimeStamp;

    const minimumTimeInMsBetweenFrames = animationId === ANIMATION_ID.hero_run && superSpeedOn ? ANIMATION_HERO_RUN_SUPER_SPEED_DURATION_BETWEEN_FRAMES_IN_MS : animationId === ANIMATION_ID.hero_walk_left ? 150 : animationId === ANIMATION_ID.lightning ? 125 : animationId === ANIMATION_ID.hero_walk_right ? 150 : animationId === ANIMATION_ID.hero_idle ? 225 : animationId ===  ANIMATION_ID.hero_special_attack ? 30 :  animationId === ANIMATION_ID.hero_second_idle ? 400 : animationId === ANIMATION_ID.hammer_opponent_death ? 60 : animationId === ANIMATION_ID.golem_opponent_death ? 80 : animationId === ANIMATION_ID.witch_opponent_death ? 100 : animationId === ANIMATION_ID.witch_opponent_death_from_special_attack ? 40 : animationId === ANIMATION_ID.hammer_opponent_death_from_special_attack ? 40 : animationId === ANIMATION_ID.golem_opponent_death_from_special_attack ? 40 : animationId === ANIMATION_ID.hammer_opponent_idle ? 115 : animationId === ANIMATION_ID.orc_opponent_idle ? 80 : animationId === ANIMATION_ID.golem_opponent_idle ? 120 : animationId === ANIMATION_ID.golem_opponent_run ? 150 : animationId === ANIMATION_ID.witch_opponent_run ? 150 : animationId === ANIMATION_ID.hammer_opponent_run ? 50 : animationId === ANIMATION_ID.witch_opponent_idle ? 90 : animationId === ANIMATION_ID.witch_opponent_attack ? 120 : animationId === ANIMATION_ID.king_opponent_idle ? 115 :  animationId === ANIMATION_ID.king_opponent_attack ? 50 : animationId === ANIMATION_ID.dwarf_opponent_idle ? 80 : animationId === ANIMATION_ID.hammer_opponent_attack ? 100 : animationId === ANIMATION_ID.dragon_fly_left ? 150 : animationId === ANIMATION_ID.dragon_fly_right ? 150 : animationId === ANIMATION_ID.learning_god_idle ? 100 : animationId === ANIMATION_ID.learning_god_walk_left ? 100 : animationId === ANIMATION_ID.master_run ? 70 : animationId === ANIMATION_ID.master_idle ? 120 : ANIMATION_HERO_RUN_DURATION_BETWEEN_FRAMES_IN_MS;

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
  } else if (special) {
    flameThrowerAudio.play();
    flameThrowerAudio.currentTime = 0;
  } else {
       swordAudio.play();
    swordAudio.currentTime = 0;
  }

  if(!special){
    launchSwordSlash();
    launchAnimation(heroCharacter, AnimationType.attack, false);
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

  const enemyLeft = getHardModeEnemyRealLeft(enemy)! * (special ? 1.1: 1.2);

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
    }, special ? 500 : 350)
  );
};

window.tryAgain = tryAgain;

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

 // launchIdleProcess(enemy.character);

  moveEnemy(enemy, 0, Date.now());
};

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

  throttleNum = 0;
  const enemyContainer = enemy.character.element.parentElement!;

  enemyContainer.style.left = `${Math.round(
    enemyContainer.getBoundingClientRect().left -
      3 * (runningPointReached ? 1.3  : 1)
  )}px`;

  if (hardMode) {
    enemyViewPoint.style.left = `${Math.round(
      enemyViewPoint.getBoundingClientRect().left - diff * (hardMode ? 0.45 : 1) * (runningPointReached ? 1.3  : 1) * (superSpeedOn? CAMERA_SUPER_SPEED_MULTIPLICATOR : 1)
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

  store.dispatch(setFoundAtIndex({index: store.getState().challenge.currentAnswerIndex - 1, found: true}))

  if (!transformed) {
    rewardStreak++;
    updateTransformationProgressBarDisplay();

    if(rewardStreak === 5){
      switchToSpecialModeAndLaunchSpecialModeTimeout();
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
  const grade = getChallengeGrade();
  if(grade){
    scoreValue.innerHTML = grade;
  }
};

const killWrongEnemy = (enemy: EnemyInterface, fromSpecialAttack: boolean) => {
  scoreMalusContainer.style.display = "flex";

  store.dispatch(setFoundAtIndex({index: store.getState().challenge.currentAnswerIndex - 1, found: false}))

  lifePoints.value--;
  checkForHerosDeath();

  updateLifePointsDisplay();

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


    if(fromSpecialAttack){
      const hardEnemyContainer = enemy.character.element.parentElement as HTMLElement;
      hardEnemyContainer.style.height = "28.5vh";
      hardEnemyContainer.style.bottom = "17vh";
    }

    const deathAnimation = getCharacterAnimationAccordingToType(enemy.character, fromSpecialAttack ? AnimationType.death_from_special_attack : AnimationType.death)!;


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

  // hurtAudio.play();
   hurtAudio.currentTime = 0;

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

      if (!invisible || enemyOnScreen.answer.true) {
        hurtHero();
      } else if (invisible && !enemyOnScreen.answer.true) {
        rewardHero();
        transformIfRequired();
      }
    }
  });

  requestAnimationFrame(detectCollision);
};

const checkForScreenUpdateFromLeftToRight = (throttleNum: number): any => {
  
  MAP_SETS.forEach(

  (mapSet, index) => {
      
  const firstMapDomElement = mapSet.maps[0];

  if (firstMapDomElement.getBoundingClientRect().left < -window.innerWidth) {

    if(index === 4 && gameMode === GAME_MODES.discovery){
     store.dispatch(removeElementFromElementsOnScreen(store.getState().persistedMap.startIndex)) 
     store.dispatch(increaseStartIndex());
    }

    firstMapDomElement.remove();
    mapSet.maps.shift();
  }

  const lastMapDomElement = mapSet.maps[mapSet.maps.length - 1];
  const endIndex = store.getState().persistedMap.endIndex;
  const elements = store.getState().persistedMap.elements;

    if (
      lastMapDomElement &&
      lastMapDomElement.getBoundingClientRect().left <= window.innerWidth / 10
    ) {
      
      if(index === 4){
        if(gameMode === GAME_MODES.discovery && endIndex >= (elements.length - 1)){
          interruptAnimation(ANIMATION_ID.hero_walk_right);
          stopCameraMovingToRight();
           return;
         }

      if(store.getState().unpersistedMapReducer.currentlyFinishingChallenge){
        store.dispatch(setCurrentlyFinishingChallenge(false));
      }
     };

     if(index === 4){

      if(gameMode === GAME_MODES.discovery){
        mapSet.maps.push(createElementMapBlockEnd(lastMapDomElement.getBoundingClientRect().left + lastMapDomElement.getBoundingClientRect().width - 10, mapSet.imagePath, `${index}`));
      } else {
          mapSet.maps.push( store.getState().unpersistedMapReducer.currentlyFinishingChallenge ? createEndOfChallengeMapBlock(lastMapDomElement.offsetLeft + lastMapDomElement.offsetWidth - 10, mapSet.imagePath, `${index}`) : createMapBlock(
            lastMapDomElement.offsetLeft + lastMapDomElement.offsetWidth - 10, mapSet.imagePath, `${index}`
          ))
      }
    } else {
      mapSet.maps.push(createMapBlock(
         lastMapDomElement.offsetLeft + lastMapDomElement.offsetWidth - 10, mapSet.imagePath, `${index}`
       ));
    }
    } 
   }
  )
 requestAnimationFrame(() => checkForScreenUpdateFromLeftToRight(throttleNum));
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

  launchAnimation(heroCharacter, direction === Direction.LEFT_TO_RIGHT ? AnimationType.run : AnimationType.walk_left);

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

export const learningGodAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: ALL_HERO_STATES,
      animation: 
      {
        id: ANIMATION_ID.learning_god_idle ,
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
              sprite:    {
                path: ASSETS_PATH_BASE + "/characters/neutral/learningGod/walk",
                length: 12
            }
            }
           },
         ]
        },
];

let runningPointReached = false;

const checkForRunningEnemyPoint = () => {
  ennemiesOnScreen.forEach(
    (enemy) => {
      if(getHeroLeft() >= (enemy.character.element.getBoundingClientRect().left - (window.innerWidth * 0.35)) && !runningPointReached ){
        launchAnimation(enemy.character, AnimationType.run);
        runningPointReached=true;
      }
    }
  )
  requestAnimationFrame(checkForRunningEnemyPoint);
}

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
          path: ASSETS_PATH_BASE + "/characters/transformed_hero/pre_run",
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
       },
       {
        states: ALL_TRANSFORMED_HERO_STATES,
        animation: 
        {
          id:ANIMATION_ID.hero_transformation_attack,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/transformed_hero/attack",
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
              path: ASSETS_PATH_BASE + "/characters/hero/flames/new",
              length: 15
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
              path: ASSETS_PATH_BASE + "/characters/transformed_hero/run",
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
                path: ASSETS_PATH_BASE + "/characters/transformed_hero/run",
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
                  path: ASSETS_PATH_BASE + "/characters/transformed_hero/run",
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
                path: ASSETS_PATH_BASE + "/characters/hero/death",
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
          path: ASSETS_PATH_BASE + "/characters/enemies/hard/idle/new",
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
        states: ALL_RED_HAMMER_ENEMY_STATES,
        animation: 
        {
          id: ANIMATION_ID.hammer_opponent_attack,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/enemies/hard/attack/new",
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
          states: ALL_RED_HAMMER_ENEMY_STATES,
          animation: 
          {
            id: ANIMATION_ID.hammer_opponent_death,
            sprite:    {
              path: ASSETS_PATH_BASE + "/characters/enemies/hard/death/new",
              length: 3
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


const masterAnimations = [
  {
  animationType: AnimationType.idle,
  animationsStatesBlocks: [
    {
      states: [CharacterDefaultStates.default],
      animation: 
      {
        id: ANIMATION_ID.master_idle,
        sprite:    {
          path: ASSETS_PATH_BASE + "/characters/neutral/master/idle",
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
        states: [CharacterDefaultStates.default],
        animation: 
        {
          id: ANIMATION_ID.master_attack,
          sprite:    {
            path: ASSETS_PATH_BASE + "/characters/neutral/master/attack/new",
            length: 8
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
            id: ANIMATION_ID.master_hurt,
            sprite: {
              path: ASSETS_PATH_BASE + "/characters/neutral/master/hurt",
              length: 4
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
              id: ANIMATION_ID.master_death_from_special_attack,
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
            id: ANIMATION_ID.master_move,
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
              id: ANIMATION_ID.master_run,
              sprite:    {
                path: ASSETS_PATH_BASE + "/characters/neutral/master/run/new",
                length: 8
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
          path: ASSETS_PATH_BASE + "/characters/enemies/golem/idle",
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
            path: ASSETS_PATH_BASE + "/characters/enemies/golem/attack",
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
              path: ASSETS_PATH_BASE + "/characters/enemies/golem/death",
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


const heroCharacter = new DefaultCharacter(heroImage, HeroCharacterStates.idle, heroAnimations);

const resetViewPoint = () => {
  enemyViewPoint.style.left = "100vw";
  enemyViewPoint.style.display = "flex";
  updateEnemyViewPointDisplay();
}
const createRedHammerCharacter = (): DefaultCharacter => {

    const newOpponentContainer = document.createElement("div");
    newOpponentContainer.classList.add("hard_enemy_container");
    const newEnnemyImg = document.createElement("img") as HTMLImageElement;
    newEnnemyImg.src = ASSETS_PATH_BASE + "/characters/enemies/hard/idle/1.png";  
    newOpponentContainer.append(newEnnemyImg);

    document.getElementsByTagName("body")[0].append(newOpponentContainer);

    //init view point

    resetViewPoint();

 return new DefaultCharacter(newEnnemyImg, RedHammerEnemyCharacterStates.idle, redHammerAnimations);
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


const extendForm = (id: string) => {
  extendedFormContainer.style.display = "flex";
}


const closeForm = (event: Event) => {
  extendedFormContainer.style.display = "none";
};

window.closeForm = closeForm;


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
    formBackgroundContainer.style.top = "40vh";    
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

    const golemContainer = document.createElement("div");
    golemContainer.style.height = "50%";
    golemContainer.style.position = "absolute";
    golemContainer.style.bottom = "0";

    const golemImg = document.createElement("img") as HTMLImageElement;
    golemImg.style.height = lastGolemVal === 0 ? "100%" : "80%";
    golemImg.style.width = "auto";
    golemImg.src= `assets/challenge/characters/neutral/${lastGolemVal === 0? "golem" : "golem2"}/gif/golem.gif`;
    golemContainer.append(golemImg);

    formBackgroundContainer.append(golemContainer);

    lastGolemVal = lastGolemVal === 0 ? 1 : 0; 

    return formBackgroundContainer;
}

const createGolemCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = ASSETS_PATH_BASE + "/characters/enemies/golem/idle/1.png";  
  newOpponentContainer.append(newEnnemyImg);
  newOpponentContainer.style.bottom = "-4.5vh";

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  //init view point

  resetViewPoint();

  return new DefaultCharacter(newEnnemyImg, GolemEnemyCharacterStates.idle, golemAnimations);
 
}


const createMasterCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = ASSETS_PATH_BASE + "/characters/neutral/master/idle/1.png";  
  newOpponentContainer.append(newEnnemyImg);
  newOpponentContainer.style.bottom = "5vh";
  newOpponentContainer.style.height = "35vh";

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  //init view point

  resetViewPoint();

  return new DefaultCharacter(newEnnemyImg, CharacterDefaultStates.default, masterAnimations);

}


const createKingCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = ASSETS_PATH_BASE + "/characters/enemies/king/idle/1.png";  
  newOpponentContainer.append(newEnnemyImg);
  newOpponentContainer.style.bottom = "-10.5vh"

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  //init view point

  resetViewPoint();

 return new DefaultCharacter(newEnnemyImg, KingEnemyCharacterStates.idle, kingAnimations); 
}

const createWitchCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = ASSETS_PATH_BASE + "/characters/enemies/witch/idle/1.png";  
  newOpponentContainer.append(newEnnemyImg);
  newOpponentContainer.style.bottom = "-4vh";

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
    newEnnemyImg.src = ASSETS_PATH_BASE + "/characters/enemies/orc/idle/1.png";  
    newOpponentContainer.append(newEnnemyImg);
    newOpponentContainer.style.bottom = "-15.5vh";

    document.getElementsByTagName("body")[0].append(newOpponentContainer);

    //init view point

    enemyViewPoint.style.left = "100vw";
    enemyViewPoint.style.display = "flex";

 return new DefaultCharacter(newEnnemyImg, OrcEnemyCharacterStates.idle, orcAnimations)
}

const createDwarfCharacter = (): DefaultCharacter => {

  const newOpponentContainer = document.createElement("div");
  newOpponentContainer.classList.add("hard_enemy_container");
  const newEnnemyImg = document.createElement("img") as HTMLImageElement;
  newEnnemyImg.src = ASSETS_PATH_BASE + "/characters/enemies/dwarf/idle/1.png";  
  newOpponentContainer.append(newEnnemyImg);
  newOpponentContainer.style.bottom = "-15vh";

  document.getElementsByTagName("body")[0].append(newOpponentContainer);

  //init view point

  enemyViewPoint.style.left = "80vw";
  enemyViewPoint.style.display = "flex";

  return new DefaultCharacter(newEnnemyImg, DwarfEnemyCharacterStates.idle, dwarfAnimations);
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

const heroInitialTop = heroContainer.getBoundingClientRect().top;


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

const moveHero = (type: MovementType, direction: Direction) => {

  launchAnimation(heroCharacter, AnimationType.walk_right);
  //moveCamera depending on the direction
}

const executeSuperSpeedToggle = () => {  
  superSpeedOn = !superSpeedOn;
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
    heroMoving = false;
    interruptAnimation(ANIMATION_ID.hero_walk_right);
    stopCameraMovingToRight();
    stepsInSwow.pause();
  }

  
  if(event.key === "q"){
    heroMoving = false;
    interruptAnimation(ANIMATION_ID.hero_walk_left);
    stopCameraMovingToLeft();
    if(gameMode === GAME_MODES.discovery){
      stepsInSwow.pause();
    }
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

const launchChallenge = (pillarId: string) => {

  store.getState().persistedMap.elementsOnScreen.forEach(
    element => {
      if(element.id !== pillarId){
        const mapElement = findMapElement(element.id);
        if(!mapElement){
          return;
        }
          mapElement.remove();
          store.dispatch(removeElementFromElementsOnScreen(parseInt(element.id)));
        
      }
    }
  )

  setupChallengeDisplay();
  breathAudio.play();
  gameMode = GAME_MODES.challenge;
  initializeChallengePage(pillarId);

}

const setupChallengeDisplay = () => {
  lightningImg.style.opacity = "1";
  answerDataContainer.style.opacity = "1";
  scoreContainer.style.opacity = "1";
  topScoreContainer.style.opacity = "1";
}

document.addEventListener("keydown", (event) => {

  if(event.key === "Shift"){
    heroRunning = true;
    if(heroMoving){
      launchAnimation(heroCharacter, currentHeroDirection === Direction.LEFT_TO_RIGHT ? AnimationType.walk_right : AnimationType.walk_left);
    }
  }

  if(event.key === "p"){
    checkForScreenUpdateFromLeftToRight(0);
  }

  if(event.key === "r"){
    window.location.replace(window.location.href);
  }

  if (event.key === "d") {

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
  
  if(event.key === "q"){
    if(gameMode === GAME_MODES.challenge){
      return;
    }
    heroMoving = true;
    gameLaunched = true;
    currentHeroDirection=Direction.RIGHT_TO_LEFT;
    launchHeroWalk(Direction.RIGHT_TO_LEFT);
  }

  if (!gameLaunched || preTransformed || heroHurt) {
    return;
  }

  if (event.key === " " && !invisible) {
    if(getHeroMode() === HERO_MODES.special){
      launchHeroLightningSpeedAnimation();
      return;
    }
    launchInvisibilityToggle();
  }

  if (event.key === "m") {
    if(getHeroMode() === HERO_MODES.special){
      launchAttack(true);
      return;
    }
    launchAttack();
  }

  if (event.key === "y") {
    launchDeathAnimation();
  }

  if (event.key === "s" && hardMode) {
    if (runStopped || runningPointReached) return;
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
  if (heroInTheRedZone) {
    return;
  }
  
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
      ASSETS_PATH_BASE + "/characters/transformed_hero/run",
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
        ASSETS_PATH_BASE + "/characters/transformed_hero/pre_run",
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
            ASSETS_PATH_BASE + "/characters/transformed_hero/run",
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

 const createMapSets = () => {

    for(let i=1; i <= 5; i++){

      const lastSet = i === 5 ? true : false;
      
      const velocity = i * i;
      createMapSet( `assets/challenge/maps/snow/${i}.png` , velocity, `${i}`, lastSet);

    } 

 }

 const initElementsIndexes = () => {
  const currentIndex = store.getState().persistedMap.currentIndex;

   store.dispatch(setStartIndex(currentIndex));
   store.dispatch(setEndIndex(currentIndex));
 }

 const setGameVolumes = () => {
  dragonAudio.volume = 0.01;
  
  epicAudio.volume = 0;
  windAudio.volume = 0.1;
  stepsInSwow.volume = 0.1;

  flameThrowerAudio.volume = 0.6;

  transitionAudio.volume = 0.15;



 }

window.onload = () => {

  initElementsIndexes();
  createMapSets();

  checkForCurrentMapElementUpdate();
  setupListeners();
  setInitialGameVolume();
  launchHardModeToggle();

  createGameAccordingToMode();
  updateLifePointsDisplay();
  updateScoreDisplay();
  detectCollision();
  checkForScreenUpdateFromLeftToRight(10);
  checkForScreenUpdateFromRightToLeft(10);
  checkForOpponentsClearance();
  defineSwordReach();
  updateTransformationProgressBarDisplay();
  animateLightning();
  launchAnimation(heroCharacter, AnimationType.idle, false);
  launchDragon();
  //launchChallenge(store.getState().persistedMap.elements[1].id)

  checkForRunningEnemyPoint();

};

const setupListeners = () => {
  document
    .getElementById("playAgainLink")
    ?.addEventListener("click", (event: Event) => window.location.reload());

  document
    .getElementById("backToStormGradButton")
    ?.addEventListener("click", goBackToMountain);
};

const launchCinematic = () => {
  const bottomDiv = document.getElementById("bottomDiv")!;
  bottomDiv.style.display = "none";

  // Select all elements with class "mapBlock" and type them as HTMLElement (or a more specific type if you know it).
  
  const mapBlocks = document.querySelectorAll<HTMLElement>('.mapBlock');
  // Iterate over each element and add the "cinematicMapBlock" class

  mapBlocks.forEach((block) => {
    block.classList.add('cinematicMapBlock');
  });

  heroContainer.classList.add("cinematicHero");

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

}

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

