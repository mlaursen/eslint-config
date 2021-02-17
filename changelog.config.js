const packageJson = require('./package.json');
const {
  createConfig,
  defaultGetCommitType,
} = require('@mlaursen/changelog-preset/createConfig');

module.exports = createConfig({
  tokens: Array.from(
    new Set([
      ...Object.keys(packageJson.dependencies),
      ...Object.keys(packageJson.devDependencies),
    ])
  ),
  ignoreDeps: false,
  getCommitType: (commit) => {
    if ((commit.scope || '').includes('deps')) {
      return 'Dependencies';
    }

    return defaultGetCommitType(commit);
  },
});
