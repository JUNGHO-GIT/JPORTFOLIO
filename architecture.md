# JPORTFOLIO Architecture

## Structure Map

```text
JPORTFOLIO
|-- index.ts         -> server entry
|-- src/
|   |-- routers/     -> HTTP route surface
|   |-- services/    -> application logic
|   |-- repositories/-> data access
|   |-- schemas/     -> contracts and validation
|   `-- assets/      -> shared server helpers
|-- client/
|   |-- src/         -> front-end app source
|   `-- public/      -> static client assets
`-- ecosystem.config.cjs -> runtime process config
```

## Flow Map

```text
HTTP request
  -> index.ts boots server
  -> router selects endpoint
  -> service applies business logic
  -> repository or schema layer resolves data
  -> response returns to client app
```

## Boundaries

- Root `src/` owns backend concerns.
- `client/` owns the browser-facing application.
- Build outputs and deployment state are excluded.