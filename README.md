# Travioli

English | [日本語](README.ja.md)

## Demo

![Demo](docs/demo.gif)

## Tech Stack

### Core
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

### Supporting
- **Frontend**: Google Maps API, TanStack Query, React Router, Tailwind, shadcn
- **Backend**: OpenAPI, Zod, JWT authorization, Nodemailer
- **Infra**: Docker, GitHub Actions (CI/CD)
- **Testing**: Vitest, Supertest

## API Docs
- Full OpenAPI spec available [openapi-docs.yml](./backend/public/openapi-docs.yml)

## Tests
- Backend unit and integration tests with **Vitest** + **Supertest**
- [Tests folder](./backend/src/__tests__/)

## Next Steps
- Deploy to AWS
  - EC2 or ECS for application hosting
  - RDS for PostgreSQL
  - Elasticache for Redis
  - Configure monitoring and logging
- Add end-to-end testing with Playwright

