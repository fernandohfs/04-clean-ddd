import { AnswersRepository } from '../repositories/answers.repository'

interface EditAnswerInput {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerOutput {}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerInput): Promise<EditAnswerOutput> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {}
  }
}
