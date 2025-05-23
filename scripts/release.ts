import { confirm, input, rawlist } from "@inquirer/prompts";
import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
import { execSync } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const isPreRelease = process.argv.includes("--pre");

const exec = (command: string): void => {
  console.log(command);
  execSync(command);
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

async function getCurrentChangeset(disableAuto?: boolean): Promise<string> {
  const MANUAL_CHANGESET = "Manually Enter";
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
        }))
        .concat([{ value: MANUAL_CHANGESET }]),
    });

    if (changesetName === MANUAL_CHANGESET) {
      return await input({
        message: "Manually provide the changeset:",
      });
    }

    changesetName = join(".changeset", changesetName);
  }

  return await readFile(changesetName, "utf8");
}

async function getReleaseVersion(): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const version: string = JSON.parse(
    await readFile("package.json", "utf8")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  ).version;

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

exec("pnpm clean");
exec("pnpm build");

if (isPreRelease) {
  exec("pnpm changeset pre enter next");
}

console.log(`Run the following commands in another terminal since I don't know how to get it to work in this script.

pnpm changeset
pnpm changeset version
`);

if (!(await confirm({ message: "Continue the release?" }))) {
  process.exit(1);
}

exec("git add -u");
exec("git add .changeset");

const changeset = await getCurrentChangeset();
const version = await getReleaseVersion();

exec('git commit -m "build(version): version packages"');
console.log(`Run the following command in another terminal since I don't know how to get it to work in this script.

pnpm changeset publish
`);
await confirm({ message: "Have the packages been published?" });
exec("git push --follow-tags");

await createRelease({
  body: changeset,
  version,
  prerelease: isPreRelease || version.includes("-next"),
});
