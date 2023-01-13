import { defineApp } from "umi";
export default defineApp({
  rootContainer(lastRootContainer) {
    return <div id="sifon">{lastRootContainer}</div>;
  }
});
