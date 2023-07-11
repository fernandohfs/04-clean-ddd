import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers.repository";

interface AnswerQuestionInput {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  public async execute({ instructorId, questionId, content }: AnswerQuestionInput) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    await this.answersRepository.create(answer);

    return answer;
  }
}