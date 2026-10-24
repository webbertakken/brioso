# Development

## Prerequisites

- [mise](https://mise.jdx.dev): installs the Node and yarn versions pinned in `mise.toml`.

## Setup

```bash
mise install
yarn install
```

Install `firebase-tools` globally.

```bash
npm install -g firebase-tools
```

**Troubleshooting**: remove `~/.cache` before reinstalling `firebase-tools`.

## Node versions

- The toolchain (dev server, tests, the Hosting build and CI) runs on the Node in `mise.toml`.
- Cloud Functions run on the Node in `engines.node` of `functions/package.json`. That is the newest
  runtime Cloud Functions (1st gen) offers, and lower than the toolchain's.

## Develop

```bash
yarn dev
```

## Deploy

```bash
firebase deploy
```

## Upgrading tools

Upgrade Node

```bash
mise use node@<version>
```

Upgrade Yarn: pin it in `mise.toml`, then set the same version in `packageManager`

```bash
mise use yarn@<version>
npm pkg set packageManager=yarn@<version>
```
