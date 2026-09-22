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

Estes parâmetros personalizam a apresentação; não autenticam o aluno nem comprovam permissão para um produto específico. Eles são lidos directamente da URL do navegador para funcionarem também na exportação estática. `cuser_gratis=1` mostra cadeados e “Verificar acesso”; `0` mostra os botões de treino. Um valor ausente, inválido ou duplicado significa estado desconhecido, não falta de pagamento. Todos os cartões navegam para o módulo oficial, onde a Cademí verifica a permissão. O HTML estático também contém esse caminho, sem depender da inicialização do JavaScript.

Diagnóstico verificado em 22/09/2026: a mesma sessão recebeu `cuser_gratis=1` na página incorporada, mas conseguiu abrir o módulo 1771737, a aula 8990077 e o player. Por isso, não usar este indicador geral como veto à navegação para um produto específico. Não foi alterada nenhuma Entrega, compra ou permissão da Cademí.

Mesmo no estado gratuito os botões permitem verificar acesso, para não aprisionar alunos com contexto desactualizado. Estes links saem do iframe com `target="_top"` e não concedem acesso: a autenticação e autorização efectiva continuam sob responsabilidade das Entregas e permissões da Cademí. Nunca acrescentar `cuser_gratis=0` fixo à URL de incorporação nem guardar uma autorização em localStorage. Os produtos pagos devem estar protegidos na Cademí; um cadeado visual nesta página não substitui essas permissões.

Configurar a incorporação como **Página Dinâmica**, não apenas iframe genérico. Confirmar o URL exacto do módulo em `lib/config.ts` e a Entrega do aluno na Cademí. Um email de entrega, isoladamente, não comprova que todos os módulos estão incluídos. Referências: [Páginas Dinâmicas](https://ajuda.cademi.com.br/configuracoes/paginas-dinamicas) e [Entregas](https://ajuda.cademi.com.br/vitrines/entregas-e-integracoes).

O progresso e o tempo de retoma ainda usam os dados locais de `lib/student-data.ts`; não existe sincronização com o player ou histórico da Cademi. `/progresso?demo=new` permite verificar o estado inicial.

## Validação

```sh
npx tsc --noEmit
node --experimental-strip-types --test tests/cademi-access.test.mjs
npm run build:static
```

Após publicar, confirmar uma resposta HTTP 200 em `/`, `/treinos`, `/progresso` e `/suporte`, o cabeçalho `Content-Security-Policy`, ausência de bloqueio de login e disponibilidade dos assets.
