import { Answer } from "../entities/Answer";

interface AnswerQuestionInput {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  public execute({ instructorId, questionId, content }: AnswerQuestionInput) {
    const answer = new Answer(content);

    return answer;
  }
}