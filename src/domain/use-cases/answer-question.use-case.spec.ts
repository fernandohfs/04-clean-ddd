import { test, expect } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question.use-case';

test('create an answer', () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase();

  const answer = answerQuestionUseCase.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta'
  });

  expect(answer.content).toEqual('Nova resposta');
})