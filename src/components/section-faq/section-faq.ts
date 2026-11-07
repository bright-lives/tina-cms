import type { TinaField } from "tinacms";

export const faqItemFields: TinaField[] = [
  { type: "string", name: "question", label: "Vraag" },
  // Rich text so answers can contain links and lists.
  { type: "rich-text", name: "answer", label: "Antwoord" },
];

export const sectionFaqFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  { type: "string", name: "content", label: "Tekst", ui: { component: "textarea" } },
  {
    type: "object",
    list: true,
    name: "items",
    label: "Vragen",
    ui: {
      itemProps: (item) => ({ label: item?.question || "Vraag" }),
    },
    fields: faqItemFields,
  },
];

export const sectionFaqTemplate = {
  label: "Veelgestelde vragen",
  name: "faq",
  fields: sectionFaqFields,
};
