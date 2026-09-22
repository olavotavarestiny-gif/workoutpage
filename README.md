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

`/dashboard` mantém compatibilidade com incorporações antigas e preserva os parâmetros enviados pela Cademí.

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
- `cuser_gratis`: `1` para aluno gratuito sem compra e `0` para aluno com compra.

Estes parâmetros personalizam a apresentação; não autenticam o aluno nem comprovam permissão para um produto específico. O parâmetro geral `cuser_gratis` não deve controlar os treinos. Diagnóstico verificado em 22/09/2026: a mesma sessão recebeu `cuser_gratis=1` na página incorporada, mas conseguiu abrir o módulo 1771737, a aula 8990077 e o player.

O frontend envia apenas `cuser_id` e `cuser_email` para `/api/workout-access`. A função de servidor consulta `GET /api/v1/usuario/acesso/{id}` e só libera os botões quando encontra o produto Workout `628509` activo para o mesmo email. Sem acesso, os cartões apresentam cadeado e abrem o aviso de pagamento no próprio ecrã. A chave `CADEMI_API_KEY` é obrigatória no ambiente da Vercel e nunca pode ser exposta ao frontend. `CADEMI_WORKOUT_PRODUCT_ID` é opcional e usa `628509` por defeito.

Configurar a incorporação como **Página Dinâmica**, não apenas iframe genérico. Confirmar o URL exacto do módulo em `lib/config.ts` e a Entrega do aluno na Cademí. Um email de entrega, isoladamente, não comprova que todos os módulos estão incluídos. Referências: [Páginas Dinâmicas](https://ajuda.cademi.com.br/configuracoes/paginas-dinamicas) e [Entregas](https://ajuda.cademi.com.br/vitrines/entregas-e-integracoes).

O progresso e o tempo de retoma ainda usam os dados locais de `lib/student-data.ts`; não existe sincronização com o player ou histórico da Cademi. `/progresso?demo=new` permite verificar o estado inicial.

## Validação

```sh
npx tsc --noEmit
node --experimental-strip-types --test tests/cademi-access.test.mjs
npm run build:static
```

Após publicar, confirmar uma resposta HTTP 200 em `/`, `/treinos`, `/progresso` e `/suporte`, o cabeçalho `Content-Security-Policy`, ausência de bloqueio de login e disponibilidade dos assets.
