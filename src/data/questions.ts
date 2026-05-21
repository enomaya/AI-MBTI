import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    dimension: 'E/I',
    text: '주말에 친구에게 연락이 왔을 때, 나는?',
    options: {
      A: { text: '신나서 바로 약속을 잡는다', value: 'E' },
      B: { text: '조금 망설이다가 혼자 쉬고 싶다고 한다', value: 'I' },
    },
  },
  {
    id: 2,
    dimension: 'S/N',
    text: '새로운 프로젝트를 시작할 때, 나는?',
    options: {
      A: { text: '구체적인 계획과 실행 방법부터 생각한다', value: 'S' },
      B: { text: '큰 그림과 가능성을 먼저 상상한다', value: 'N' },
    },
  },
  {
    id: 3,
    dimension: 'T/F',
    text: '친구가 힘든 일을 털어놓을 때, 나는?',
    options: {
      A: { text: '원인을 분석하고 해결책을 제안한다', value: 'T' },
      B: { text: '먼저 공감하고 감정을 위로해준다', value: 'F' },
    },
  },
  {
    id: 4,
    dimension: 'J/P',
    text: '여행 계획을 세울 때, 나는?',
    options: {
      A: { text: '숙소, 교통, 일정을 미리 꼼꼼히 짜놓는다', value: 'J' },
      B: { text: '큰 틀만 정하고 현지에서 즉흥적으로 움직인다', value: 'P' },
    },
  },
  {
    id: 5,
    dimension: 'E/I',
    text: '모르는 사람이 많은 파티에서, 나는?',
    options: {
      A: { text: '적극적으로 말을 걸고 새로운 친구를 사귄다', value: 'E' },
      B: { text: '아는 사람 곁에 있거나 조용한 곳을 찾는다', value: 'I' },
    },
  },
  {
    id: 6,
    dimension: 'S/N',
    text: '책을 읽을 때, 나는?',
    options: {
      A: { text: '사실과 정보가 많은 실용서를 선호한다', value: 'S' },
      B: { text: '상상력을 자극하는 소설이나 철학서를 선호한다', value: 'N' },
    },
  },
  {
    id: 7,
    dimension: 'T/F',
    text: '중요한 결정을 내릴 때, 나는?',
    options: {
      A: { text: '장단점을 따져 논리적으로 판단한다', value: 'T' },
      B: { text: '내 가치관과 감정에 따라 결정한다', value: 'F' },
    },
  },
  {
    id: 8,
    dimension: 'J/P',
    text: '마감이 있는 과제나 업무를 할 때, 나는?',
    options: {
      A: { text: '미리 시작해서 여유 있게 끝낸다', value: 'J' },
      B: { text: '마감 직전에 집중력이 올라와 처리한다', value: 'P' },
    },
  },
  {
    id: 9,
    dimension: 'E/I',
    text: '긴 하루를 보낸 후, 에너지를 충전하는 방법은?',
    options: {
      A: { text: '친구를 만나거나 사람들과 어울린다', value: 'E' },
      B: { text: '혼자만의 시간을 갖는다', value: 'I' },
    },
  },
  {
    id: 10,
    dimension: 'S/N',
    text: '대화할 때, 나는?',
    options: {
      A: { text: '구체적인 사실과 경험을 이야기한다', value: 'S' },
      B: { text: '아이디어와 가능성에 대해 이야기하는 걸 즐긴다', value: 'N' },
    },
  },
  {
    id: 11,
    dimension: 'T/F',
    text: '누군가를 평가해야 할 때, 나는?',
    options: {
      A: { text: '객관적인 기준과 성과를 중심으로 평가한다', value: 'T' },
      B: { text: '노력과 상황을 고려해 따뜻하게 피드백한다', value: 'F' },
    },
  },
  {
    id: 12,
    dimension: 'J/P',
    text: '내 방이나 책상의 상태는?',
    options: {
      A: { text: '항상 정리정돈이 되어 있다', value: 'J' },
      B: { text: '창의적인 혼돈 상태이다', value: 'P' },
    },
  },
];
