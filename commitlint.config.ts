import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  defaultIgnores: true,
  extends: ["@commitlint/config-conventional"],
  // parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "body-leading-blank": [RuleConfigSeverity.Warning, "always"],
    "scope-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "core",
        "ci",
        "ui",
        "docs",
        "tests",
        "build",
        "web",
        "dashboard",
        "project",
      ],
    ],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "build",
        "chore",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};

export default Configuration;
