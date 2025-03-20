import { confirm, input, rawlist } from "@inquirer/prompts";
import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
import { execSync } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { version } from "../package.json" assert { type: "json" };

const exec = (command: string, inherit = false): void => {
  console.log(command);
  execSync(command, { stdio: inherit ? "inherit" : undefined });
};

interface CreateReleaseOptions {
  body: string;
  version: string;
  override?: boolean;
  prerelease: boolean;
}

async function createRelease(options: CreateReleaseOptions): Promise<void> {
  const { version, body, override, prerelease } = options;

  dotenv.config({ path: ".env.local", override });
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  try {
    const response = await octokit.request(
      "POST /repos/{owner}/{repo}/releases",
      {
        owner: "mlaursen",
        repo: "eslint-config",
        tag_name: `@mlaursen/eslint-config@${version}`,
        body,
        prerelease,
      }
    );

    console.log(`Created release: ${response.data.html_url}`);
  } catch (e) {
    console.error(e);

    console.log();
    console.log(
      "The npm token is most likely expired or never created. Update the `.env.local` to include the latest GITHUB_TOKEN"
    );
    console.log(
      "Regenerate the token: https://github.com/settings/tokens?type=beta"
    );
    if (
      !(await confirm({ message: "Try creating the Github release again?" }))
    ) {
      process.exit(1);
    }

    return createRelease({ ...options, override: true });
  }
}

async function getReleaseVersion(): Promise<string> {
  if (
    await confirm({
      message: `Is "${version}" the next github release version?`,
    })
  ) {
    return version;
  }

  return await input({
    message: "Input the next release version for Github",
  });
}

async function getCurrentChangelog(disableAuto?: boolean): Promise<string> {
  let changesetName = "";
  if (!disableAuto) {
    changesetName = execSync("git diff --name-only @{upstream} .changeset/*.md")
      .toString()
      .trim();
  }

  if (
    !changesetName ||
    !(await confirm({
      message: `Is "${changesetName}" the correct changeset path?`,
    }))
  ) {
    const changesetNames = await readdir(".changeset");
    changesetName = await rawlist({
      message: "Select the changeset path",
      choices: changesetNames
        .filter((changeset) => changeset.endsWith(".md"))
        .map((changeset) => ({
          value: changeset,
        })),
    });
    changesetName = join(".changeset", changesetName);
  }

  return await readFile(changesetName, "utf8");
}

async function run(): Promise<void> {
  exec("pnpm clean");
  exec("pnpm build");
  exec("pnpm changeset", true);
  const changeset = await getCurrentChangelog();

  exec("pnpm changeset version", true);
  const version = await getReleaseVersion();
  exec("git add -u");

  exec('git commit -m "build(version): version packages"');
  exec("pnpm changeset publish", true);
  exec("git push --follow-tags");

  await createRelease({
    body: changeset,
    version,
    prerelease: false,
  });
}

void run();
