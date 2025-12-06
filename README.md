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

## Project development
All commands are to be run from the root folder.

### Backend using Docker
Use docker-compose during devloppement.
```bash
docker compose -f docker-compose.dev.yml up
```

Build production images and run the containers.
```bash
docker build -t arkanoid-backend -f backend/docker/dockerfile.prod .
docker run --env-file ./backend/.env.fake.prod -p 3000:3000 arkanoid-backend
```

### Frontend using Webpack Dev Server
```bash
cd frontend
npm install
npm run serve:dev
```
