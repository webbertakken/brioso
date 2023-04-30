# Development

## Prerequisites

- Volta

## Setup

You must use `node@16` for your global node version in order for the `emulators` in `firebase-tools`
to work.

```bash
volta install node@16
```

Install `firebase-tools` globally.

```bash
npm install -g firebase-tools
```

**Troubleshooting**: remove `~/.cache` before reinstalling `firebase-tools`.

## Development

Run both:

- yarn dev
- firebase emulators:start
