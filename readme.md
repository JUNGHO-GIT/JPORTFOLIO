# JPORTFOLIO

## Overview

JPORTFOLIO is a full-stack portfolio application with a TypeScript server at the
repository root and a separate client application under `client/`.

## Structure

* root files such as `index.ts` and `ecosystem.config.cjs` define server entry points
* `src/` contains server assets, repositories, routers, schemas, and services
* `client/` contains the front-end source and public assets
* package metadata and lint configs live at the repository root

## Notes

* The repository keeps server and client code in one workspace but in separate trees.
* Environment files and deployment-specific values are intentionally omitted here.
