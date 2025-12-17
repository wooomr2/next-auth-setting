docker compose up -d

<!-- 프리스마 명령어 -->

```
npx prisma init --db --output ./src/generated/prisma
or
npx prisma migrate dev --name init

npx prisma generate
npx prisma db push

<!-- reset -->
npx prisma migrate reset

<!-- db studio-->
npx prisma studio
```

<!-- random secret key 생성 -->

npx auth secret

<!-- 4:13:34 -->
