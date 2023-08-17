import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(AnswerComment: AnswerComment): Promise<void>
  delete(AnswerComment: AnswerComment): Promise<void>
}
