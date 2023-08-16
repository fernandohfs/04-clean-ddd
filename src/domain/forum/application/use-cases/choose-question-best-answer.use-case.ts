import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers.repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions.repository'

interface ChooseQuestionBestAnswerUseCaseInput {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseOutput {
  question: Question
}

export class ChooseQuestionBestAnswerUseCaseUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  public async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseInput): Promise<ChooseQuestionBestAnswerUseCaseOutput> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toValue(),
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
