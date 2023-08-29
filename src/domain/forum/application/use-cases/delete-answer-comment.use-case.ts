import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/not-allowed.error'

interface DeleteAnswerCommentUseCaseInput {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  public async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseInput): Promise<DeleteAnswerCommentUseCaseOutput> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId,
    )

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answerComment)

    return right({})
  }
}
