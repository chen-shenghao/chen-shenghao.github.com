import { defineConfig } from "umi";

export default defineConfig({
  npmClient: "pnpm",
  codeSplitting: {
    jsStrategy: "granularChunks"
  },
  hash: true,
  title: "羊只领养"
});
