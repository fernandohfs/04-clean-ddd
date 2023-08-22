import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface QuestionAttachmentProps {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }
}
