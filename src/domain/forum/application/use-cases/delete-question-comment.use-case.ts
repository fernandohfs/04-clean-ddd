import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { NotAllowedError } from '@/core/errors/not-allowed.error'

interface DeleteQuestionCommentUseCaseInput {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  public async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseInput): Promise<DeleteQuestionCommentUseCaseOutput> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId,
    )

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentRepository.delete(questionComment)

    return right({})
  }
}
