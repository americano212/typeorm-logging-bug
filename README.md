# Reproduce typeorm logging bug

## Installation & Reproduce bug

```bash
# 1. Install node_modules
npm ci
# 2. Load local test DB by docker
npm run docker:up
# 3. Load Entity 
npm run entity:sync # (Need to few time(~30s) for DB loading.)
```

## Description

When I set option `logging: false`...

However, queries were output with sensitive information.

### /bin/ormconfig.ts
```typescript
const dataSource = new DataSource({
    ...config.db,
    logging: false, // Here!
    namingStrategy: new SnakeNamingStrategy(),
    entities: [`src/**/*.entity{.ts,.js}`],
  });
```

### Bug Result
```bash
query: SELECT VERSION() AS `version`
query: START TRANSACTION
query: SELECT DATABASE() AS `db_name`
query: SELECT `TABLE_SCHEMA`, `TABLE_NAME`, `TABLE_COMMENT` FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = 'test_database' AND `TABLE_NAME` = 'role' UNION SELECT `TABLE_SCHEMA`, `TABLE_NAME`, `TABLE_COMMENT` FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = 'test_database' AND `TABLE_NAME` = 'user_role' UNION SELECT `TABLE_SCHEMA`, `TABLE_NAME`, `TABLE_COMMENT` FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = 'test_database' AND `TABLE_NAME` = 'board' UNION SELECT `TABLE_SCHEMA`, `TABLE_NAME`, `TABLE_COMMENT` FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = 'test_database' AND `TABLE_NAME` = 'content' UNION SELECT `TABLE_SCHEMA`, `TABLE_NAME`, `TABLE_COMMENT` FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = 'test_database' AND `TABLE_NAME` = 'user' UNION SELECT `TABLE_SCHEMA`, `TABLE_NAME`, `TABLE_COMMENT` FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = 'test_database' AND `TABLE_NAME` = 'upload_file'
query: 
                SELECT
                    *
                FROM
                    `INFORMATION_SCHEMA`.`COLUMNS`
                WHERE
                    `TABLE_SCHEMA` = 'test_database'
                    AND
                    `TABLE_NAME` = 'role'
                 UNION 

...(more)
```