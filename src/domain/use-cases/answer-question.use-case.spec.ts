import { test, expect } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question.use-case';
import { AnswersRepository } from '../repositories/answers.repository';
import { Answer } from '../entities/answer';

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  }
}

test('create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestionUseCase.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta'
  });

  expect(answer.content).toEqual('Nova resposta');
})