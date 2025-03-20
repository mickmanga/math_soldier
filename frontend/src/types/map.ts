export type MapElement = FormElement | ChallengeElement | CharacterElement;

export type FormElement = {
   type: ELEMENT_TYPE;
   id: string;
   formBlocks: Array<FormBlock>
};

export type FormBlock = {
   question: string;
   answer: string;
   validated: boolean
}

export type ChallengeElement = {
   type: ELEMENT_TYPE;
   id: string;
   topScore: string
};

export type CharacterElement = {
   type: ELEMENT_TYPE,
   id: string,
   name: CHARACTER_ELEMENTS_NAMES
}

export enum CHARACTER_ELEMENTS_NAMES {
   "golem_master",
   "mountain_god",
   "pike_man",
}

export enum HERO_MODES {
   normal,
   special
}

export enum ELEMENT_TYPE {
  "challenge",
  "form",
  "character",
}