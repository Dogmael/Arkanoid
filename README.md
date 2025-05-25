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

## Docker usage
Run the following FROM THE ROOT OF PROJECT commands to build and run the Docker containers for the frontend and backend.
### Frontend
- Build: `docker build -f frontend/docker/dockerfile.dev -t arkanoid_front frontend`
- Run: `docker run -p 8080:8080 -v "$(pwd)/frontend":/app arkanoid_front`
### Backend
- Build: `docker build -f backend/docker/dockerfile.dev -t arkanoid_back .`
- Run: `docker run -p 3000:3000 -v "$(pwd)/backend":/app/backend --env-file ./backend/.env  arkanoid_back`