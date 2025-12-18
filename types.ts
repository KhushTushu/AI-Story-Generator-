
export enum StoryTone {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  INTENSE = 'INTENSE',
  MYSTERIOUS = 'MYSTERIOUS',
  CALM = 'CALM',
  HOPEFUL = 'HOPEFUL',
  NEUTRAL = 'NEUTRAL'
}

export interface GeneratedStory {
  title: string;
  content: string;
  tone: StoryTone;
}

export interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}
