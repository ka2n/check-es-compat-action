import * as core from "@actions/core";
import { execSync } from "child_process";

const inputs = {
  version: () => core.getInput("version"),
  files: () => core.getInput("files"),
  working_directory: () => core.getInput("working-directory"),
};

try {
  execSync(`npm i -g check-es-compat@${inputs.version()}`);
  execSync(
    `cd ${inputs.working_directory()} && check-es-compat ${inputs.files()}`,
    {
      stdio: "inherit",
    }
  );
} catch (error: any) {
  console.error(error);
  core.setFailed(error.message);
}
