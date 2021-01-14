/*eslint no-undef: "error"*/
/*eslint-env node*/

module.exports = {
  extends: ["config:base", ":semanticCommitsDisabled"],
  prConcurrentLimit: 30,
  prHourlyLimit: 30,
  prCreation: "not-pending",
  pinDigests: true,
  onboarding: false,
  dependencyDashboard: true,
  gitAuthor: "KindlyMachine <support@kindlyops.com>",
  logLevel: "debug",
  requireConfig: false,
  platform: "github",
  token: process.env.APP_TOKEN,
  reviewersFromCodeOwners: true,
  enabledManagers: ["github-actions", "npm", "python", "java"],
  "github-actions": {
    fileMatch: ["^\\.github/workflows/[^/]+\\.ya?ml$"],
    pinDigests: true,
    labels: ["dependencies", "github"],
  },
  npm: {
    labels: ["dependencies", "javascript"],
  },
  packageRules: [
    {
      packageNames: ["renovate"],
      schedule: ["before 3am on monday"],
    },
  ],
};
