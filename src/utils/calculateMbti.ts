import type { Answers } from '../types';

const questionMap: Record<string, number[]> = {
  'E/I': [1, 5, 9],
  'S/N': [2, 6, 10],
  'T/F': [3, 7, 11],
  'J/P': [4, 8, 12],
};

export function calculateMbtiType(answers: Answers): string {
  return ['E/I', 'S/N', 'T/F', 'J/P'].map(dim => {
    const qNums = questionMap[dim];
    const aCount = qNums.filter(n => answers[n] === 'A').length;
    return aCount >= 2 ? dim.split('/')[0] : dim.split('/')[1];
  }).join('');
}

export function isValidMbtiType(code: string): boolean {
  return /^[EI][NS][TF][JP]$/.test(code);
}
