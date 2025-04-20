# Google Apps Script Form Project

This project is a Google Apps Script application that handles form submissions and data processing. It's built using TypeScript and the Google Apps Script platform.

## Prerequisites

- [Bun](https://bun.sh) installed
- Google Apps Script project set up
- [clasp](https://github.com/google/clasp) CLI tool installed globally

## Project Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Login to clasp:
   ```bash
   clasp login
   ```
4. Push the code to Google Apps Script:
   ```bash
   clasp push
   ```

## Project Structure

- `src/` - Source code directory
  - `index.ts` - Main application code
  - `appsscript.json` - Google Apps Script manifest file
- `package.json` - Project dependencies and configuration
- `tsconfig.json` - TypeScript configuration
- `.clasp.json` - Clasp configuration for Google Apps Script deployment
- `bun.lock` - Bun lockfile for dependency management

## Development

The project uses TypeScript for type safety and better development experience. The main application logic is in `src/index.ts`.

## Dependencies

- `@types/google-apps-script` - TypeScript definitions for Google Apps Script
- `@types/bun` - TypeScript definitions for Bun
- `typescript` - TypeScript compiler

## Deployment

To deploy changes to Google Apps Script:

1. Make your changes in the source files
2. Push the changes:
   ```bash
   clasp push
   ```
3. The changes will be available in your Google Apps Script project

## License

This project is private and not licensed for public use.
