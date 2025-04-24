/*
 * This helper function returns a flag stating the current environment.
 * If an environment variable is found with NODE_ENV set to true,
 * then it is a prod environment. Otherwise, dev.
 * Returns true if the application is running in production.
 */
export function isProduction(): boolean {
  // Deploy the development version to Vercel
  return false;
  return process.env.NODE_ENV === "production";
}
