export type MapElement = FormElement | ChallengeElement;

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

export enum HERO_MODES {
   normal,
   special
}

export enum ELEMENT_TYPE {
  "challenge",
  "form"
}