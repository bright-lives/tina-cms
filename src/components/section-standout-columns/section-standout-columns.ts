import type { TinaField } from "tinacms";
import { linkButtonFields } from "../link-button/link-button";

export const standoutColumnFields: TinaField[] = [
  { type: "string", name: "title", label: "Title" },
  { type: "string", name: "content", label: "Content", ui: { component: "textarea" } },
  {
    type: "object",
    list: true,
    name: "buttons",
    label: "Buttons",
    fields: [...linkButtonFields],
  },
];

export const sectionStandoutColumnsFields: TinaField[] = [
  { type: "string", name: "title", label: "Title" },
  {
    type: "object",
    list: true,
    name: "columns",
    label: "Columns",
    ui: {
      itemProps: (item) => ({ label: item?.title || "Column" }),
    },
    fields: standoutColumnFields,
  },
];

export const sectionStandoutColumnsTemplate = {
  label: "Standout Columns",
  name: "standoutColumns",
  fields: sectionStandoutColumnsFields,
};
