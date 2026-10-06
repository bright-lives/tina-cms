import type { TinaField } from "tinacms";
import { linkButtonFields } from "../link-button/link-button";

export const standoutColumnFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  { type: "string", name: "content", label: "Tekst", ui: { component: "textarea" } },
  {
    type: "object",
    list: true,
    name: "buttons",
    label: "Knoppen",
    fields: [...linkButtonFields],
  },
];

export const sectionStandoutColumnsFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  {
    type: "object",
    list: true,
    name: "columns",
    label: "Kolommen",
    description: "3 tot 5 kolommen; elke kolom krijgt automatisch een eigen tint.",
    ui: {
      itemProps: (item) => ({ label: item?.title || "Kolom" }),
    },
    fields: standoutColumnFields,
  },
];

export const sectionStandoutColumnsTemplate = {
  label: "Gekleurde kolommen",
  name: "standoutColumns",
  fields: sectionStandoutColumnsFields,
};
