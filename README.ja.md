# Travioli

[English](README.md) | 日本語

## デモ

![Demo](docs/demo.gif)

## 技術スタック

### コア技術
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

### 関連技術
- **フロントエンド**: Google Maps API, TanStack Query, React Router, Tailwind, shadcn
- **バックエンド**: OpenAPI, Zod, JWT認証, Nodemailer
- **インフラ**: Docker, GitHub Actions（CI/CD）
- **テスト**: Vitest, Supertest

## APIドキュメント
- OpenAPI仕様書はこちら: [openapi-docs.yml](./backend/public/openapi-docs.yml)

## テスト
- **Vitest** と **Supertest** を使用したバックエンドの単体テストおよび統合テスト
- [テストコード](./backend/src/__tests__/)

## 今後の改善予定
- AWSへのデプロイ
  - アプリケーションホスティング用の EC2 または ECS
  - PostgreSQL 用の RDS
  - Redis 用の ElastiCache
  - モニタリングおよびログ管理の構築
- Playwright を用いた E2E テストの追加