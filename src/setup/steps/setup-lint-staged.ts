import execa from "execa"
import fs from "fs/promises"
import { throwError } from "../../error-handling"
import { isUnknownObject } from "../../helpers/is-unknown-object"
import { remove } from "../../helpers/remove"
import { writeJsonFile } from "../../helpers/write-json-file"
import { Step } from "../step"
import { InitializeGitStep } from "./initialize-git"
import { SetupPrettierStep } from "./setup-prettier"

export const SetupLintStagedStep: Step = {
  dependencies: [SetupPrettierStep, InitializeGitStep],

  shouldRun: function (this) {
    return true
  },

  run: async function (this) {
    this.log("Setting up lint-staged...")

    try {
      await execa("npx mrm@2 lint-staged")
      await remove("6") // Removes the unnecessary log file (named "6") created during the previous command.

      // TODO: Remove linting from pre-commit hook to get formatting only?

      // Override "lint-staged" configuration
      const packageJsonString = await fs.readFile("package.json", "utf8")
      const packageJson = JSON.parse(packageJsonString)

      if (!isUnknownObject(packageJson)) {
        throw new TypeError("Expected packageJson to be an object.")
      }

      packageJson["lint-staged"] = {
        "*": "prettier --write --ignore-unknown",
      }

      await writeJsonFile("package.json", packageJson)
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while setting up lint-staged.",
        error
      )
    }
  },
}