# SamoraFit Workout — área de aluno

## Testar localmente

As dependências já estão instaladas. Não é necessário reinstalar para esta alteração.

```bash
npm run dev
```

Usar a porta indicada no terminal. A raiz redireciona para `/dashboard`.

- `/dashboard`: aluno de demonstração com treino em curso, aula 04 e retoma aos 18:42.
- `/dashboard?demo=new`: novo aluno, aula 01 recomendada e todas as métricas a zero.
- `/dashboard?cuser_fname=Maria`: personalização existente da Cademi; nome completo e avatar continuam disponíveis em `cuser_name` e `cuser_avatar`.

```bash
npm run lint
npx tsc --noEmit
npm run build
```

**Esta fase é exclusivamente local. Não fazer deploy, git push, PR ou alterar configurações de produção sem autorização explícita.**

## Experiência

A home segue a sequência Hoje → Treinar → Progresso → Explorar. Inclui header sticky, menu de perfil, navegação mobile, treino principal, resumo de programa, quatro métricas simples, biblioteca filtrável e parceiros com cards editoriais. “Os meus treinos” filtra os programas em curso; “Biblioteca” repõe todos. Mobilidade apresenta um estado vazio porque não existe esse programa nos dados fornecidos.

O carrossel publicitário automático foi substituído por um spotlight e dois cards, sem rotação nem distrações. A biblioteca usa quatro colunas no desktop, três no tablet e cartões de scroll horizontal no telemóvel. Filtros e diálogos usam os componentes acessíveis já instalados. As animações respeitam movimento reduzido.

## Dados e Cademi

Todos os valores ilustrativos de aluno, aulas, progresso e campanhas estão centralizados em `lib/student-data.ts`. Os tipos `StudentProfile`, `WorkoutProgram` e `PartnerAd` preparam a substituição por dados reais. A interface identifica a demonstração.

Não foram modificados login, autenticação, backend, base de dados, rotas nem links dos módulos. Os campos de personalização da URL não substituem autenticação. O middleware mantém exatamente os mesmos cabeçalhos; apenas o nome de um argumento não utilizado foi ajustado para o lint.

Os cinco URLs reais permanecem em `lib/config.ts`: Cross Training (1771737), Pernas Top (1771739), Fight Kombat (1771738), Barriga Zero (1771736), Tabata (1771740).

“Continuar treino” abre o módulo na Cademi enquanto `currentLesson.url` for nulo. O tempo 18:42 e o progresso são demonstrações: esta interface **não** controla o player da Cademi nem grava progresso. Quando existir URL real de aula, pode ser fornecido em `currentLesson.url`. Não são inventados links de aula ou parâmetros de seek.

## Componentes

- `app-shell.tsx`: header, menu de perfil, footer e navegação mobile.
- `welcome-section.tsx`: saudação pela hora local, sem erro de hidratação.
- `today-workout.tsx`: treino recomendado ou retoma.
- `programme-details.tsx`: resumo acessível do programa.
- `progress-overview.tsx`: métricas do aluno.
- `workout-library.tsx`, `workout-card.tsx`, `workout-cover.tsx`: filtros, cards e capas.
- `sponsors.tsx`: faixa discreta e componente de logótipo.
- `partner-offers.tsx`: `AdSpotlight` e `AdCard` reutilizáveis.
- `dashboard.tsx`: composição e estado dos filtros.

## Assets

Todos os assets reais foram reutilizados sem edição ou geração de novas fotografias. As capas são enquadramentos proporcionais da captura existente `cademi-modules-source.png`; os ficheiros individuais originais da Cademi continuam indisponíveis. O componente de capa mantém o enquadramento inteiro disponível, sem zoom agressivo ou sombras a cobrir Bruno.

Pumangol e Unitel têm transparência (a Unitel usa PNG indexado com transparência). MFM contém fundo branco opaco. Não foi efetuada remoção automática. O logo MFM mantém uma pequena base branca; Unitel recebe uma base clara compacta para contraste do azul escuro. A faixa de parceiros permanece dark, com a Pumangol ao centro. Caminhos e dimensões estão em `lib/sponsors.ts`, prontos para novas versões dos ficheiros.

As campanhas em `studentDemo.ads` são exemplos, não ofertas comerciais confirmadas. Sem `link`, “Descobrir” abre um aviso de demonstração. Com um destino real, abre a campanha. Não existem descontos, preços ou métricas publicitárias inventados.

## Verificação e ajustes na base existente

Foram corrigidos avisos de lint do código alterado e problemas preexistentes no conjunto de primitives: encaminhamento explícito de filhos/associação de labels, conversão explícita de chaves de gráfico, sincronização de media query e remoção de subscrições de carousel. Exceções de lint locais e comentadas preservam a API e os papéis ARIA dos componentes genéricos quando a regra sugere trocar a tag. Não foi desativado o lint global nem mudadas dependências.

## Segunda fase

Ligar as métricas e o estado da aula à fonte de dados autenticada, integrar a retoma real no player quando suportada, obter capas originais e variantes de logos para fundo escuro, e substituir as campanhas de exemplo por peças e links aprovados.
