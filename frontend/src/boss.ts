import {
  ANIMATION_ID,
  ANIMATION_RUNNING_VALUES,
  THROTTLE_NUMS,
  launchAnimationAndDeclareItLaunched,
} from "./challenge";

const heroImage = document.getElementById("heroImage")! as HTMLImageElement;
const bossImage = document.getElementById("bossImage")! as HTMLImageElement;

const launchCharacterAnimation = (
  characterElement: HTMLImageElement,
  throttleNum: number,
  extension: string,
  spriteBase: string,
  spriteIndex: number,
  max: number,
  min: number,
  loop: boolean,
  animationId: ANIMATION_ID
): any => {
  if (!characterElement) alert("no element no more!");

  if (
    !ANIMATION_RUNNING_VALUES[animationId] ||
    ANIMATION_RUNNING_VALUES[animationId] > 1
  ) {
    return;
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
        animationId
      )
    );
  }

  throttleNum = 0;

  if (spriteIndex === max) {
    if (loop === false) {
      ANIMATION_RUNNING_VALUES[animationId] = 0;
      return;
    }

    spriteIndex = min;
  } else {
    spriteIndex++;
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
      animationId
    )
  );
};

const launcHeroIdle = () => {
  launchAnimationAndDeclareItLaunched(
    heroImage,
    0,
    "png",
    "assets/challenge/characters/hero/idle",
    1,
    7,
    1,
    false,
    ANIMATION_ID.idle
  );

  setTimeout(
    launcHeroIdle, 4000
  )
};

const launchBossIdle = () => {
  launchAnimationAndDeclareItLaunched(
    bossImage,
    0,
    "png",
    "assets/challenge/characters/bosses/ctuluhu_boss",
    1,
    8,
    1,
    true,
    ANIMATION_ID.boss_idle
  );
};
const launchBossAttack = () => {
  launchAnimationAndDeclareItLaunched(
    bossImage,
    0,
    "png",
    "assets/challenge/characters/bosses/ctuluhu/attack",
    1,
    17,
    1,
    false,
    ANIMATION_ID.boss_attack
  );
};
window.onload = () => {
  launcHeroIdle();
  launchBossIdle();
};
