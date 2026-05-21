import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Answers } from '../types';

interface TestStore {
  currentQuestion: number;
  answers: Answers;
  setAnswer: (q: number, v: 'A' | 'B') => void;
  goBack: () => void;
  reset: () => void;
}

export const useTestStore = create<TestStore>()(
  persist(
    (set) => ({
      currentQuestion: 1,
      answers: {},
      setAnswer: (q, v) =>
        set(state => ({
          answers: { ...state.answers, [q]: v },
          currentQuestion: Math.min(q + 1, 13),
        })),
      goBack: () =>
        set(state => ({
          currentQuestion: Math.max(state.currentQuestion - 1, 1),
        })),
      reset: () => set({ currentQuestion: 1, answers: {} }),
    }),
    {
      name: 'test_session',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
