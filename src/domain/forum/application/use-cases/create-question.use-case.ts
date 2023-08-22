import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions.repository'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

interface CreateQuestionUseCaseInput {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseOutput = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseInput): Promise<CreateQuestionUseCaseOutput> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        questionId: question.id,
        attachmentId: new UniqueEntityID(attachmentId),
      })
    })

    question.attachments = questionAttachments

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
