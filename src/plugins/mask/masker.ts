import maskit from "./maskit";

export default (
  value: string,
  mask: string,
  masked = true,
  tokens: { [key: string]: any }
) => maskit(value, mask, masked, tokens);
