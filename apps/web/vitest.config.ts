/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    // Vitest configuration options
    // e.g., environment: 'jsdom', globals: true
  },
});
