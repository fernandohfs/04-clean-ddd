import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { NotAllowedError } from './errors/not-allowed.error'

interface EditAnswerUseCaseInput {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseInput): Promise<EditAnswerUseCaseOutput> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return right({ answer })
  }
}
