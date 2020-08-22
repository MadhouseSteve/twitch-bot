module.exports = function (wallaby) {
  return {
    files: ["src/**/*.ts", "src/**/*.svelte"],

    tests: ["test/**/*Spec.ts"],

    compilers: {
      "**/*.js": wallaby.compilers.babel(),
      "**/*.ts": wallaby.compilers.babel(),
      "**/*.svelte": wallaby.compilers.babel(),
    },
  };
};
