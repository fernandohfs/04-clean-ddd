import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions.repository'

interface EditQuestionUseCaseInput {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseOutput {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseInput): Promise<EditQuestionUseCaseOutput> {
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

    return {
      question,
    }
  }
}
