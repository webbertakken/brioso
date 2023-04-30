# Development

## Prerequisites

- Volta

## Setup

You must use `node@16` for your global node version in order for the `emulators` in `firebase-tools`
to work.

```bash
volta install node@16
```

You must also have the latest `yarn` globally installed (4-beta is fine)

```bash
volta install yarn
```

Install `firebase-tools` globally.

```bash
npm install -g firebase-tools
```

**Troubleshooting**: remove `~/.cache` before reinstalling `firebase-tools`.

## Develop

```bash
yarn dev
```

## Deploy

```bash
firebase deploy
```
