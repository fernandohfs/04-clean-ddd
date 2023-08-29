import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/not-allowed.error'

interface DeleteQuestionUseCaseInput {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseInput): Promise<DeleteQuestionUseCaseOutput> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right({})
  }
}
