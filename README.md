# SamoraFit Workout

Área de aluno com Home, Meus treinos, Biblioteca, Progresso e Parceiros. A Home apresenta uma faixa de patrocinadores com movimento contínuo, pausa ao passar o rato, swipe e respeito pela preferência de movimento reduzido.

## Desenvolvimento

```sh
npm ci
npm run dev
```

A raiz redireciona para `/dashboard`. O ambiente local mantém o fluxo Vinext existente.

## Publicação externa na Vercel

```sh
npm run build:static
vercel deploy --prod --scope olavos-projects-c1426332
```

`DEPLOY_TARGET=static` exclui os plugins Sites/Cloudflare e gera `dist/client`, sem autenticação ChatGPT. `vercel.json` configura a saída estática, o redirecionamento da raiz, URLs sem `.html` e os cabeçalhos para incorporação na Cademi. Não é necessário publicar no Sites.

## Cademi

Incorporar o endereço público `/dashboard` como página externa ou iframe. A política `frame-ancestors` autoriza os subdomínios HTTPS de `cademi.com.br` e `cademi.com`. Se a área de membros usar um domínio próprio, adicionar a sua origem exata em `vercel.json` e publicar novamente.

Personalização opcional por parâmetros de URL:

- `cuser_name`: nome completo.
- `cuser_fname`: primeiro nome.
- `cuser_avatar`: URL HTTPS do avatar.
- `cuser_id`: identificador de aluno.

Estes parâmetros personalizam a apresentação; não autenticam o aluno. As aulas continuam na Cademi e os botões abrem os módulos reais configurados em `lib/config.ts`.

O progresso, tempo de retoma e histórico ainda usam os dados locais de `lib/student-data.ts`; não existe sincronização com o player ou histórico da Cademi. `/dashboard?demo=new` permite verificar o estado inicial. As publicidades ainda necessitam de destinos reais para as campanhas.

## Validação

```sh
npx tsc --noEmit
npm run build:static
```

Após publicar, confirmar uma resposta HTTP 200 em `/dashboard`, o cabeçalho `Content-Security-Policy`, ausência de bloqueio de login e disponibilidade dos assets.
