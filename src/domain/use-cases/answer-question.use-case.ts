import { UniqueEntityID } from '../../core/entities/unique-entity-id'
import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers.repository'

interface AnswerQuestionInput {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionInput) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
