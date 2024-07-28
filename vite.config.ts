import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    base: env.VITE_BASE_ROUTER_URL,
    plugins: [react(), tsconfigPaths()],
  });
};
