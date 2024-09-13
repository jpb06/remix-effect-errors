/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "src",
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
  // serverModuleFormat: 'cjs',
  watchPaths: ["./src/**/*"],
};
