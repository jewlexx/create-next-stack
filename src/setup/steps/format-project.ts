import execa from "execa"
import { throwError } from "../../error-handling"
import { Step } from "../step"
import { AddBaseBabelConfigStep } from "./add-base-babel-config"
import { CreateNextAppStep } from "./create-next-app"
import { InitializeGitStep } from "./initialize-git"
import { RemoveOfficialCNAContentStep } from "./remove-official-cna-content"
import { SetupPrettierStep } from "./setup-prettier"
import { UpdateYarnStep } from "./update-yarn"

export const FormatProjectStep: Step = {
  type: "Runnable",
  dependencies: [
    AddBaseBabelConfigStep,
    SetupPrettierStep,
    RemoveOfficialCNAContentStep,
    InitializeGitStep,
    CreateNextAppStep,
    UpdateYarnStep,
  ],

  shouldRun: function (this) {
    return true
  },

  run: async function (this) {
    this.log("Formatting project...")

    try {
      await execa("yarn format")
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while formatting project.",
        error
      )
    }
  },
}
