import { Command, flags } from "@oclif/command"
import { throwError } from "./error-handling"
import { isUnknownObject } from "./helpers/is-unknown-object"
import { performQuestionnaire } from "./questionnaire/questionnaire"
import { performSetupSteps } from "./setup/setup"

class CreateNextStack extends Command {
  static description =
    "Create Next Stack is an opinionated interactive CLI tool to easily set up the boilerplate of a new Next.js app."

  static args = [
    {
      name: "appName",
      description: `The name of your app, optionally including a path prefix. Eg.: "my-app" or "path/to/my-app"`,
      required: false,
    },
  ]

  static flags = {
    // General flags
    help: flags.help({
      char: "h",
      description: "Shows this help information.",
    }),
    version: flags.version({
      char: "v",
      description: "Shows the CLI version information.",
    }),
    debug: flags.boolean({
      description: "Show verbose error messages for debugging purposes",
    }),

    // Formatting:
    prettier: flags.boolean({
      description: "(R) Adds Prettier. (Code formatting)",
    }),

    // Styling:
    styling: flags.enum({
      options: ["emotion", "styled-components", "css-modules"],
      description: "Sets the preferred styling method.",
    }),

    // Form libraries:
    "react-hook-form": flags.boolean({
      description: "Adds React Hook Form. (Form library)",
    }),
    formik: flags.boolean({
      description: "Adds Formik. (Form library)",
    }),

    // Animation
    "framer-motion": flags.boolean({
      description: "Adds Framer Motion. (Animation library)",
    }),

    // Formatting pre-commit hook
    "formatting-pre-commit-hook": flags.boolean({
      description: "(R) Adds a formatting pre-commit hook.",
    }),
  }

  async run() {
    const { args, flags } = this.parse(CreateNextStack)

    if (!isUnknownObject(args)) {
      throwError.call(
        this,
        "An error occurred during create-next-stack command initialization.",
        new TypeError("Expected args to be an object.")
      )
    }

    if (flags.debug) process.env.DEBUG = "true"

    const answers = await performQuestionnaire.call(this, args)

    await performSetupSteps.call(this, answers)
  }
}

export = CreateNextStack
