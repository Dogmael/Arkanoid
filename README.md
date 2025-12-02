# Arkanoid
Rebuild Arkanoid in javascript using canvas for learning purpose

## Naming convention
### Javascript Naming convention
- Variable name: `camelCase`
- Function name: `camelCase`
- Class name: `PascalCase`

### SQL Naming convention
- Table name: `snake_case`, singular
- Column name: `snake_case`, singular
- Primary key: `pk_table_name`

### HTML and CSS Naming convention
- File name: `kebab-case.html`, `kebab-case.css`
- CSS class name: `kebab-case`
- CSS id name: `kebab-case`

## Start the project for development

### Backend using Docker Compose
From the root folder run
```bash
docker compose -f docker-compose.dev.yml up
```
### Frontend using Webpack Dev Server
From the root folder run
```bash
cd frontend
npm install
npm run serve:dev
```
