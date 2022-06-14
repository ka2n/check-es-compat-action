import * as core from "@actions/core";
import { execSync } from "child_process";
import path from 'path';

const inputs = {
  version: () => core.getInput("version"),
  files: () => core.getInput("files"),
  working_directory: () => core.getInput("working-directory"),
};

try {
  execSync(
    `npx check-es-compat ${path.join(inputs.working_directory(), inputs.files())}`,
    {
      stdio: "inherit",
    }
  );
} catch (error: any) {
  console.error(error);
  core.setFailed(error.message);
}
