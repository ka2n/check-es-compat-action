import * as core from "@actions/core";
import { execSync } from "child_process";
import path from 'path';

const inputs = {
  version: () => core.getInput("version"),
  files: () => core.getInput("files"),
  working_directory: () => core.getInput("working-directory"),
};

try {
  execSync('npm i -g eslint-plugin-ecmascript-compat check-es-compat')
  execSync(
    `env NODE_PATH="$(npm root -g):$NODE_PATH" npx check-es-compat ${path.join(inputs.working_directory(), inputs.files())}`,
    {
      stdio: "inherit",
    }
  );
} catch (error: any) {
  console.error(error);
  core.setFailed(error.message);
}
