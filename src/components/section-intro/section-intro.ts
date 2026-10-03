import type { TinaField } from "tinacms";

export const sectionIntroFields: TinaField[] = [
  { type: "string", name: "title", label: "Title" },
  // Rich text (not a plain string) so each paragraph renders as its own <p>.
  { type: "rich-text", name: "intro", label: "Intro" },
];

export const sectionIntroTemplate = {
  label: "Section Intro",
  name: "intro",
  fields: sectionIntroFields,
};
