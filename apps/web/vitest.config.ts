/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["html", "clover", "json"],
      include: ["src"],
    },
    mockReset: true,
    include: ["./src/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: ["dotenv/config", "./test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
