import type { TinaField } from "tinacms";

export const sectionIntroFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  // Rich text (not a plain string) so each paragraph renders as its own <p>.
  { type: "rich-text", name: "intro", label: "Tekst" },
];

export const sectionIntroTemplate = {
  label: "Introductietekst",
  name: "intro",
  fields: sectionIntroFields,
};
