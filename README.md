# SamoraFit Workout

Pequena plataforma de treino integrada com a Cademi. O projecto concentra a experiência SamoraFit Workout; a autenticação, o perfil e os pagamentos continuam na Cademi.

## Desenvolvimento

```sh
npm ci
npm run dev
```

Rotas disponíveis:

- `/` — início e treino recomendado;
- `/treinos` — biblioteca completa;
- `/progresso` — evolução do aluno;
- `/suporte` — ajuda rápida.

`/dashboard` mantém compatibilidade e redireciona para `/`.

## Publicação externa na Vercel

```sh
npm run build:static
vercel deploy --prod --scope olavos-projects-c1426332
```

`DEPLOY_TARGET=static` exclui os plugins Sites/Cloudflare e gera `dist/client`, sem autenticação ChatGPT. `vercel.json` configura a saída estática, o redirecionamento da raiz, URLs sem `.html` e os cabeçalhos para incorporação na Cademi. Não é necessário publicar no Sites.

## Cademi

Incorporar cada rota pública como página externa ou iframe. A política `frame-ancestors` autoriza os subdomínios HTTPS de `cademi.com.br` e `cademi.com`. Se a área de membros usar um domínio próprio, adicionar a sua origem exacta em `vercel.json` e publicar novamente.

Personalização opcional por parâmetros de URL:

- `cuser_name`: nome completo.
- `cuser_fname`: primeiro nome.
- `cuser_avatar`: URL HTTPS do avatar.
- `cuser_id`: identificador de aluno.

Estes parâmetros personalizam a apresentação; não autenticam o aluno. As aulas continuam na Cademi e os botões abrem os módulos reais configurados em `lib/config.ts`.

O progresso e o tempo de retoma ainda usam os dados locais de `lib/student-data.ts`; não existe sincronização com o player ou histórico da Cademi. `/progresso?demo=new` permite verificar o estado inicial.

## Validação

```sh
npx tsc --noEmit
npm run build:static
```

Após publicar, confirmar uma resposta HTTP 200 em `/`, `/treinos`, `/progresso` e `/suporte`, o cabeçalho `Content-Security-Policy`, ausência de bloqueio de login e disponibilidade dos assets.
