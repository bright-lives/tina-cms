import type { TinaField } from "tinacms";

export const factFields: TinaField[] = [
  { type: "string", name: "title", label: "Title" },
  // Rich text (not a plain string) so paragraphs and line breaks survive.
  { type: "rich-text", name: "content", label: "Content" },
];

export const sectionFactsFields: TinaField[] = [
  {
    type: "object",
    list: true,
    name: "facts",
    label: "Facts",
    ui: {
      itemProps: (item) => ({ label: item?.title || "Fact" }),
    },
    fields: factFields,
  },
];

export const sectionFactsTemplate = {
  label: "Section Facts",
  name: "facts",
  fields: sectionFactsFields,
};
