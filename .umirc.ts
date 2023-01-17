import { defineConfig } from "umi";
import routes from "./config/routes";

export default defineConfig({
  npmClient: "pnpm",
  codeSplitting: {
    jsStrategy: "granularChunks"
  },
  hash: true,
  title: "羊只领养",
  routes,
  plugins: ["@umijs/plugins/dist/request"],
  request: {}
});
