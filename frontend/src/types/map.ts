export type MapElement = FormElement | ChallengeElement;

export type FormElement = {
   type: string;
   id: string;
   formBlocks: Array<FormBlock>
};

export type FormBlock = {
   question: string;
   answer: string;
   validated: boolean
}

export type ChallengeElement = {
   type: string;
   id: string;
   topScore: string
};