import { QuestionCommentsRepository } from '../repositories/question-comments.repository'

interface DeleteQuestionCommentUseCaseInput {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseOutput {}

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
      throw new Error('Question comment not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionCommentRepository.delete(questionComment)

    return {}
  }
}
