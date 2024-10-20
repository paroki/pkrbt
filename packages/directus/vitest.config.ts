import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./tests/**/*.{test,spec}.{ts,tsx}"],
    exclude: [],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["html", "clover", "text"],
      include: ["src"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
