# SAMORA WORKOUT

Aplicação separada para incorporar nas páginas dinâmicas da Cademí. A Cademí continua responsável por autenticação, alunos, produtos, módulos, aulas, vídeos e conteúdos. Esta interface apresenta o dashboard e o treino complementar.

## Desenvolvimento

```bash
npm install
npm run dev
```

Rotas: `/dashboard` e `/workout/peito-triceps`.

Exemplo local:

```text
http://localhost:3000/dashboard?cuser_id=123&cuser_fname=Maria&cuser_name=Maria%20Manuel&cuser_avatar=https%3A%2F%2Fexemplo.com%2Favatar.jpg
```

Os parâmetros `cuser_email` e `cuser_phone` não são exibidos nem guardados. Os parâmetros da URL personalizam a interface e não substituem autenticação segura.

## Cademí

1. Crie uma Página Dinâmica para o dashboard e incorpore a URL publicada terminada em `/dashboard`.
2. Crie outra Página Dinâmica para o treino e use `/workout/peito-triceps`.
3. Acrescente os parâmetros dinâmicos da Cademí à query string.
4. Troque `SEU-DOMINIO` em `lib/config.ts` pelas URLs reais.
5. Permita o domínio publicado nas definições de iframe da Cademí.

O local do treino e a conclusão do dia ficam em `localStorage`. Não existe backend, login paralelo ou base de dados.

## Vercel

A estrutura usa App Router. Para Vercel, instale a versão Next.js aprovada pela equipa e altere os scripts para `next dev` e `next build`; as rotas e os componentes permanecem iguais.
