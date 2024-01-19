# Reproduce typeorm logging bug

## Installation & Reproduce bug

```bash
# 1. Install node_modules
npm ci
# 2. Load test database by docker
npm run docker:up
# 2. Load Entity
npm run entity:sync
```

