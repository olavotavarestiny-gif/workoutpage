# SamoraFit Workout — painel de aulas

## Escopo atual

Uma única página simples e responsiva, em `/dashboard`: escolher entre Cross Training, Pernas Top, Fight Kombat, Barriga Zero e Tabata e aceder às aulas na Cademi. A página inicial redireciona para o painel.

A Cademi mantém autenticação, permissões, módulos, aulas e vídeos. Não há gestão de treinos, exercícios, calendário, métricas, progresso fictício ou pagamentos neste painel. Funcionalidades adicionais ficam para uma fase futura.

## Imagens e ligação às aulas

As cinco capas reutilizam a captura fornecida em `public/images/cademi-modules-source.png`, com enquadramento CSS individual. São uma solução provisória para a apresentação; não são os ficheiros originais da Cademi. O enquadramento exclui a barra do navegador e o botão de pagamento da captura.

Os endereços privados dos módulos e os ficheiros originais não estão disponíveis no repositório. O acesso público à Cademi apresenta o login. Configurar o campo `url` de cada módulo em `lib/config.ts` com o endereço real obtido na conta autorizada; quando existir, o cartão passa a abrir diretamente o módulo. Até lá, o cartão informa que as aulas estão na Cademi e disponibiliza um botão explicitamente identificado como “Abrir Cademi”. Não são inventadas aulas, contagens ou ligações privadas.

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
```

Para incorporar na Cademi, usar a URL publicada terminada em `/dashboard` e autorizar esse domínio nas definições da plataforma. O acesso à publicação Sites também deve permitir os alunos antes de uso em produção; a publicação privada serve para revisão pelo proprietário.

Os parâmetros opcionais `cuser_fname`, `cuser_name` e `cuser_avatar` personalizam a apresentação. Não substituem autenticação. Sem esses parâmetros, o painel usa uma saudação neutra, sem inventar um aluno. Email e telefone não são usados nem guardados. Não existe backend ou armazenamento de progresso.
