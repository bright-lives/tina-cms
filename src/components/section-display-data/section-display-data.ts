import type { TinaField } from "tinacms";

export const displayDataItemFields: TinaField[] = [
  { type: "string", name: "amount", label: "Amount" },
  { type: "string", name: "title", label: "Title" },
];

export const sectionDisplayDataFields: TinaField[] = [
  { type: "string", name: "title", label: "Title" },
  { type: "string", name: "content", label: "Content", ui: { component: "textarea" } },
  {
    type: "object",
    list: true,
    name: "items",
    label: "Items",
    ui: {
      itemProps: (item) => ({ label: [item?.amount, item?.title].filter(Boolean).join(" – ") || "Item" }),
    },
    fields: displayDataItemFields,
  },
];

export const sectionDisplayDataTemplate = {
  label: "Display Data",
  name: "displayData",
  fields: sectionDisplayDataFields,
};
