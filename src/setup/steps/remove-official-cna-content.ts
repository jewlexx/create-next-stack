import Command from "@oclif/command"
import fs from "fs/promises"
import { throwError } from "../../error-handling"

/**
 * Removes the content generated by the official Create Next App CLI tool.
 */
export async function removeOfficialCNAContent(this: Command): Promise<void> {
  this.log("Cleaning up official Next.js boilerplate...")

  const remove = (path: string) => {
    return fs.rm(path, {
      recursive: true,
      force: true,
    })
  }

  try {
    await Promise.all([
      remove(`pages`),
      remove(`styles`),
      remove(`public/vercel.svg`),
      // TODO: Remove README.md when/if another one is generated.
    ])
  } catch (error) {
    throwError.call(
      this,
      "An error occurred while removing the content generated by the official Create Next App CLI tool.",
      error
    )
  }
}
