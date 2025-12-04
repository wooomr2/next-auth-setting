docker compose up -d

<!-- 프리스마 명령어 -->
npx prisma init --db --output ./src/generated/prisma
npx prisma generate
npx prisma db push
