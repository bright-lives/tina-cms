import type { TinaField } from "tinacms";

export const displayDataItemFields: TinaField[] = [
  { type: "string", name: "amount", label: "Getal", description: "Bijvoorbeeld 120 of 85%." },
  { type: "string", name: "title", label: "Omschrijving" },
];

export const sectionDisplayDataFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  { type: "string", name: "content", label: "Tekst", ui: { component: "textarea" } },
  {
    type: "object",
    list: true,
    name: "items",
    label: "Cijfers",
    ui: {
      itemProps: (item) => ({ label: [item?.amount, item?.title].filter(Boolean).join(" – ") || "Cijfer" }),
    },
    fields: displayDataItemFields,
  },
];

export const sectionDisplayDataTemplate = {
  label: "Kerncijfers",
  name: "displayData",
  fields: sectionDisplayDataFields,
};
