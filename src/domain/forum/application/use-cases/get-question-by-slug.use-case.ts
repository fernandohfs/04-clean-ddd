import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions.repository'

interface GetQuestionBySlugInput {
  slug: string
}

interface GetQuestionBySlugOutput {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    slug,
  }: GetQuestionBySlugInput): Promise<GetQuestionBySlugOutput> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return {
      question,
    }
  }
}
