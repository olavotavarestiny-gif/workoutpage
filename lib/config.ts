export const appConfig = {
  cademi: { courseHome: "https://brunosamora.cademi.com.br/" },
  defaults: { firstName: "", fullName: "" },
};

export type CourseModule = {
  slug: string;
  title: string;
  subtitle: string;
  imageX: number;
  // Set the real Cademi module URL when available. Never infer private routes.
  url: string | null;
};

export const modules: CourseModule[] = [
  { slug: "cross-training", title: "Cross Training", subtitle: "Força e resistência", imageX: 12, url: null },
  { slug: "pernas-top", title: "Pernas Top", subtitle: "Pernas e glúteos", imageX: 592, url: null },
  { slug: "fight-kombat", title: "Fight Kombat", subtitle: "Energia e movimento", imageX: 1173, url: null },
  { slug: "barriga-zero", title: "Barriga Zero", subtitle: "Foco nos abdominais", imageX: 1752, url: null },
  { slug: "tabata", title: "Tabata", subtitle: "Intensidade em cada treino", imageX: 2332, url: null },
];
