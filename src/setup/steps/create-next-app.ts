import execa from "execa"
import { promises as fs } from "fs"
import { throwError } from "../../error-handling"
import { commandInstance } from "../../instance"
import { getNameVersionCombo, packages } from "../packages"
import { Step } from "../step"

export const createNextAppStep: Step = {
  shouldRun: () => true,

  run: async (answers) => {
    const instance = commandInstance.get()
    instance.log("Creating Next.js app...")

    try {
      // Make sure directory exists to avoid error from create-next-app
      await fs.mkdir(answers.projectPath, { recursive: true })

      await execa("npx", [
        getNameVersionCombo(packages["create-next-app"]),
        answers.projectPath,
        "--typescript",
      ])
    } catch (error) {
      throwError("An error occurred while creating Next.js app.", error)
    }

    process.chdir(answers.projectPath)
  },
}
