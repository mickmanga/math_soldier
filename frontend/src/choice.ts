import { AnimationType, heroCharacter, launchAnimation } from "./challenge";

const switchCharacter = () => {
  alert("switch character");
  
}

window.onload = () => {
  launchAnimation(heroCharacter, AnimationType.idle);
}