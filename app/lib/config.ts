const { NODE_ENV } = process.env;

export const IS_PRODUCTION = NODE_ENV === "production";
