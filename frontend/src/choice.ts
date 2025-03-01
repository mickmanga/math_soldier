import { AnimationType, heroCharacter, launchAnimation } from "./challenge"

window.onload = () => {
  launchAnimation(heroCharacter, AnimationType.idle);
}