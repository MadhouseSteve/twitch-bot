import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

const env_allow_list = ["TWITCH_CLIENT_ID"];

let replaces = {};
for (let i = 0; i < env_allow_list.length; i++) {
  replaces[`process.env.${env_allow_list[i]}`] = JSON.stringify(
    process.env[env_allow_list[i]]
  );
}

export default {
  input: "src/client/index.ts",
  output: {
    name: "index.js",
    dir: "output",
    format: "iife",
  },
  plugins: [
    replace(replaces),
    svelte(),
    typescript({ module: "es6" }),
    nodeResolve(),
  ],
};
