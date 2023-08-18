import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers.repository'

interface FetchQuestionAnswersUseCaseInput {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseOutput = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseInput): Promise<FetchQuestionAnswersUseCaseOutput> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({ answers })
  }
}
