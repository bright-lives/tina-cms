import type { TinaField } from "tinacms";

export const factFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  // Rich text (not a plain string) so paragraphs and line breaks survive.
  { type: "rich-text", name: "content", label: "Tekst" },
];

export const sectionFactsFields: TinaField[] = [
  {
    type: "object",
    list: true,
    name: "facts",
    label: "Feiten",
    ui: {
      itemProps: (item) => ({ label: item?.title || "Feit" }),
    },
    fields: factFields,
  },
];

export const sectionFactsTemplate = {
  label: "Feiten op een rij",
  name: "facts",
  fields: sectionFactsFields,
};
