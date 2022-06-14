import * as core from "@actions/core";
import { execSync } from "child_process";

const inputs = {
  version: () => core.getInput("version"),
  files: () => core.getInput("files"),
  working_directory: () => core.getInput("working-directory"),
};

try {
  execSync(
    `cd ${inputs.working_directory()} && npx check-es-compat@${inputs.version()} ${inputs.files()}`,
    {
      stdio: "inherit",
    }
  );
} catch (error: any) {
  console.error(error);
  core.setFailed(error.message);
}
