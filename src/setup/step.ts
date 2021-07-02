import Command from "@oclif/command"
import { QuestionnaireAnswers } from "../questionnaire/questionnaire"

export type StepBase = {
  dependencies: Step[]
  shouldRun: (this: Command, answers: QuestionnaireAnswers) => boolean
}

export type Question = StepBase & {
  type: "Question"
  question: (
    this: Command,
    answers: QuestionnaireAnswers
  ) => Promise<QuestionnaireAnswers>
}

export type Runnable = StepBase & {
  type: "Runnable"
  run: (this: Command, answers: QuestionnaireAnswers) => Promise<void>
}

export type Step = Question | Runnable
