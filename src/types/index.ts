export interface MbtiType {
  typeCode: string;
  typeName: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  compatibleTypes: string[];
  color: {
    primary: string;
    gradient: [string, string];
  };
  emoji: string;
}

export interface Question {
  id: number;
  dimension: 'E/I' | 'S/N' | 'T/F' | 'J/P';
  text: string;
  options: {
    A: { text: string; value: 'E' | 'S' | 'T' | 'J' };
    B: { text: string; value: 'I' | 'N' | 'F' | 'P' };
  };
}

export type Answers = Record<number, 'A' | 'B'>;

export interface LastResult {
  typeCode: string;
  completedAt: string;
}
