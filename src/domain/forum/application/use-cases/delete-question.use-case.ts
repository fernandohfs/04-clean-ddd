import { QuestionsRepository } from '../repositories/questions.repository'

interface DeleteQuestionInput {
  authorId: string
  questionId: string
}

interface DeleteQuestionOutput {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    authorId,
    questionId,
  }: DeleteQuestionInput): Promise<DeleteQuestionOutput> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
