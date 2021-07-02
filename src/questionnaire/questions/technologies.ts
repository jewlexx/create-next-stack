import inquirer from "inquirer"

export const prettierValue = "prettier"
export const emotionValue = "emotion"
export const lintStagedValue = "lintStaged"

export type TechValue =
  | typeof prettierValue
  | typeof emotionValue
  | typeof lintStagedValue

export const answerName = "technologies"
export type TechnologiesAnswers = {
  [answerName]: TechValue[]
}

export async function promptTechnologies() {
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

  return technologies
}
