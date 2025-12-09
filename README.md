docker compose up -d

<!-- 프리스마 명령어 -->
```
npx prisma init --db --output ./src/generated/prisma
or
npx prisma migrate dev --name init

npx prisma generate
npx prisma db push
```