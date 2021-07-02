import inquirer from "inquirer"
import {
  answerName,
  emotionValue,
  lintStagedValue,
  prettierValue,
  TechnologiesAnswers,
} from "../../questionnaire/questions/technologies"
import { Step } from "../step"
import { RemoveOfficialCNAContentStep } from "./remove-official-cna-content"

export const ChooseLinterStep: Step = {
  dependencies: [RemoveOfficialCNAContentStep],

  shouldRun: function (this, answers) {
    return true
  },

  question: async function (this, answers) {
    const { technologies } = await inquirer.prompt<TechnologiesAnswers>({
      name: answerName,
      type: "checkbox",
      message: "What technologies are you looking to use?",
      choices: [
        {
          name: "Formatting (Prettier)",
          value: prettierValue,
        },
        {
          name: "CSS-in-JS (Emotion)",
          value: emotionValue,
        },
        {
          name: "Pre-commit hook (Lint-staged)",
          value: lintStagedValue,
        },
      ],
    })
    answers.technologies = answers.technologies.concat(technologies)
    return answers
  },
}
