import { Command, flags } from "@oclif/command"
import { QuestionnaireAnswers } from "./questionnaire/questionnaire"
import { promptProjectName } from "./questionnaire/questions/project-name"
import { Step } from "./setup/step"
import { AddBaseBabelConfigStep } from "./setup/steps/add-base-babel-config"
import { ChooseLinterStep } from "./setup/steps/choose-linter"
import { CreateNextAppStep } from "./setup/steps/create-next-app"
import { FormatProjectStep } from "./setup/steps/format-project"
import { InitializeGitStep } from "./setup/steps/initialize-git"
import { RemoveOfficialCNAContentStep } from "./setup/steps/remove-official-cna-content"
import { SetupEmotionStep } from "./setup/steps/setup-emotion"
import { SetupLintStagedStep } from "./setup/steps/setup-lint-staged"
import { SetupPrettierStep } from "./setup/steps/setup-prettier"
import { UpdateYarnStep } from "./setup/steps/update-yarn"

class Boil extends Command {
  static description =
    "Boil is an opinionated interactive CLI tool to easily set up the boilerplate of a new frontend project."

  static flags = {
    help: flags.help({ char: "h" }),
    version: flags.version({ char: "v" }),
    debug: flags.boolean({
      description: "show verbose error messages for debugging purposes",
    }),
  }

  async run() {
    const { flags } = this.parse(Boil)

    if (flags.debug) process.env.DEBUG = "true"

    const steps: Step[] = [
      UpdateYarnStep,
      CreateNextAppStep,

      InitializeGitStep,

      RemoveOfficialCNAContentStep,
      ChooseLinterStep,

      AddBaseBabelConfigStep,
      SetupEmotionStep,

      SetupPrettierStep,
      SetupLintStagedStep,

      FormatProjectStep,
    ]

    let answerSet: QuestionnaireAnswers = {
      projectName: await promptProjectName(),
      technologies: [],
    }
    const sortedSteps = generateStepsToRun.call(this, steps)

    const stepsToRun: Step[] = []

    for (const step of sortedSteps) {
      if (step.shouldRun.call(this, answerSet)) {
        stepsToRun.push(step)
        answerSet = step.question
          ? await step.question.call(this, answerSet)
          : answerSet
      }
    }

    for (const step of generateStepsToRun.call(this, stepsToRun)) {
      step.run && (await step.run.call(this, answerSet))
    }

    // const answers = await performQuestionnaire.call(this)

    this.log(`Successfully created project ${answerSet.projectName}.`)
  }
}

function generateStepsToRun(this: Command, steps: Step[]) {
  const stepsToRun: Step[] = []

  a: while (true) {
    for (const step of steps) {
      let requirementsMet = true
      for (const dependency of step.dependencies) {
        if (!stepsToRun.includes(dependency)) {
          requirementsMet = false
        }
      }
      if (requirementsMet) {
        stepsToRun.push(step)
        steps.splice(steps.indexOf(step), 1)
        continue a
      }
    }
    break
  }

  return stepsToRun
}

export = Boil
