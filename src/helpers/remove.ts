import { promises as fs } from "fs"

export const remove = (path: string): Promise<void> => {
  return fs.rm(path, {
    recursive: true,
    force: true,
  })
}
