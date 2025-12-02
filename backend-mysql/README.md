# Backend MySQL para PIM

1. Copie `.env.example` para `.env` e preencha as credenciais do seu MySQL.
2. Instale dependências:
   npm install
3. Rodar local:
   npm run dev
4. Endpoints:
   - POST /auth/login  { email, role }
   - GET /materias
   - POST /materias { nome, professor }
   - GET /notas?materiaId=&alunoId=
   - POST /notas { materiaId, alunoId, np1, np2, pim }  (media calculada no servidor)
