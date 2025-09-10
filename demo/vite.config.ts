import type { UserConfig } from "vite";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  const config: UserConfig = {
    root: path.resolve(__dirname, "./"),
  };

  return config;
});
