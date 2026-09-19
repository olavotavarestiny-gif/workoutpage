export const appConfig = {
  cademi: { courseHome: "https://brunosamora.cademi.com.br/" },
  defaults: { firstName: "", fullName: "" },
};

export type CourseModule = {
  slug: string;
  title: string;
  subtitle: string;
  imageX: number;
  url: string;
};

export const modules: CourseModule[] = [
  { slug: "cross-training", title: "Cross Training", subtitle: "Força e resistência", imageX: 12, url: "https://brunosamora.cademi.com.br/area/conteudo/modulo/1771737" },
  { slug: "pernas-top", title: "Pernas Top", subtitle: "Pernas e glúteos", imageX: 592, url: "https://brunosamora.cademi.com.br/area/conteudo/modulo/1771739" },
  { slug: "fight-kombat", title: "Fight Kombat", subtitle: "Energia e movimento", imageX: 1173, url: "https://brunosamora.cademi.com.br/area/conteudo/modulo/1771738" },
  { slug: "barriga-zero", title: "Barriga Zero", subtitle: "Foco nos abdominais", imageX: 1752, url: "https://brunosamora.cademi.com.br/area/conteudo/modulo/1771736" },
  { slug: "tabata", title: "Tabata", subtitle: "Intensidade em cada treino", imageX: 2332, url: "https://brunosamora.cademi.com.br/area/conteudo/modulo/1771740" },
];
