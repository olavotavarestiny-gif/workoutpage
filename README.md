# SamoraFit Workout — painel de aulas

## Escopo atual

Uma única página simples e responsiva, em `/dashboard`: escolher entre Cross Training, Pernas Top, Fight Kombat, Barriga Zero e Tabata e aceder às aulas na Cademi. A página inicial redireciona para o painel.

A Cademi mantém autenticação, permissões, módulos, aulas e vídeos. Não há gestão de treinos, exercícios, calendário, métricas, progresso fictício ou pagamentos neste painel. Funcionalidades adicionais ficam para uma fase futura.

## Imagens e ligação às aulas

As cinco capas reutilizam a captura fornecida em `public/images/cademi-modules-source.png`, com enquadramento CSS individual. São uma solução provisória para a apresentação; não são os ficheiros originais da Cademi. O enquadramento exclui a barra do navegador e o botão de pagamento da captura.

Os cinco cartões abrem diretamente os endereços reais fornecidos pelo proprietário, pela ordem da referência: Cross Training (1771737), Pernas Top (1771739), Fight Kombat (1771738), Barriga Zero (1771736) e Tabata (1771740). Os URLs estão em `lib/config.ts`. A navegação sai do iframe através de `target="_top"` e a Cademi continua a verificar a sessão e as permissões do aluno. Não são inventadas aulas, contagens ou progresso.

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
```

Para incorporar na Cademi, usar a URL publicada terminada em `/dashboard` e autorizar esse domínio nas definições da plataforma. O acesso à publicação Sites também deve permitir os alunos antes de uso em produção; a publicação privada serve para revisão pelo proprietário.

Os parâmetros opcionais `cuser_fname`, `cuser_name` e `cuser_avatar` personalizam a apresentação. Não substituem autenticação. Sem esses parâmetros, o painel usa uma saudação neutra, sem inventar um aluno. Email e telefone não são usados nem guardados. Não existe backend ou armazenamento de progresso.

## Patrocinadores e publicidade

O topo mostra Rádio MFM, Pumangol ao centro e Unitel, usando os logótipos fornecidos. A identidade visual combina vermelho e preto; os módulos mantêm os cinco links reais da Cademi.

O carrossel abaixo dos módulos alterna as inserções a cada 5,5 segundos. Tem navegação manual, indicadores e pausa; suspende a rotação ao receber foco, ao passar o rato e quando a página está oculta. Respeita a preferência do dispositivo por movimento reduzido.

Para gerir as inserções, editar `lib/sponsors.ts`: `sponsors` contém os logótipos e `campaigns` define a ordem dos anúncios. Cada campanha aceita `sponsorId`, `image`, `imageAlt` e `url`. Guardar as peças em `public/images/sponsors/` e indicar o caminho. Quando não existe imagem de campanha, apresenta o logótipo. Quando não existe URL, a inserção não simula uma ligação. As peças e os destinos comerciais ainda não foram fornecidos, pelo que a versão atual mostra apenas as marcas. Não há sistema de cobrança, métricas publicitárias ou painel administrativo nesta fase.
