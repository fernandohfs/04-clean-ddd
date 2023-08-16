import { QuestionsRepository } from '../repositories/questions.repository'

interface EditQuestionInput {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionOutput {}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionInput): Promise<EditQuestionOutput> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {}
  }
}
