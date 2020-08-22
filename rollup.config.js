import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/client/index.ts",
  output: {
    name: "index.js",
    dir: "output",
    format: "iife",
  },
  plugins: [svelte(), typescript({ module: "es6" }), nodeResolve()],
};
