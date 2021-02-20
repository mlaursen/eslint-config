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
    const { scope = '' } = commit;
    if (scope === 'deps') {
      return 'Dependencies';
    }

    if (scope === 'dev-deps') {
      // don't include dev-deps
      return '';
    }

    return defaultGetCommitType(commit);
  },
});
