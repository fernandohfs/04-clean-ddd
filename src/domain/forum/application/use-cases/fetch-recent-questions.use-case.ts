import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions.repository'

interface FetchRecentQuestionsUseCaseInput {
  page: number
}

type FetchRecentQuestionsUseCaseOutput = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    page,
  }: FetchRecentQuestionsUseCaseInput): Promise<FetchRecentQuestionsUseCaseOutput> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
