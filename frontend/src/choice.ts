import { AnimationType, heroCharacter, maleOrcCharacter, femaleOrcCharacter, launchAnimation } from "./challenge";

const switchCharacter = () => {
  alert("switch character");
  
}

window.onload = () => {
  launchAnimation(femaleOrcCharacter, AnimationType.idle);
}