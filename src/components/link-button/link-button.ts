import type { TinaField } from "tinacms";
import { ManualUrlField } from "./ManualUrlField";

export const linkButtonFields: TinaField[] = [
  {
    type: "string",
    name: "text",
    label: "Text",
  },
  {
    type: "reference",
    name: "page",
    label: "Select Page",
    collections: ["pages"],
    description: "Select a CMS page, or leave empty to use the manual URL below.",
  },
  {
    type: "string",
    name: "url",
    label: "URL",
    description: "Manual link (for example, an external URL). Disabled while a CMS page is selected.",
    ui: {
      component: ManualUrlField,
    },
  },
  {
    type: "string",
    name: "style",
    label: "Style",
    options: [
      { label: "Fill", value: "fill" },
      { label: "Outline", value: "outline" },
      { label: "Text only", value: "textOnly" },
    ],
  },
  {
    type: "string",
    name: "variant",
    label: "Variant",
    options: [
      { label: "Normal", value: "normal" },
      { label: "Inverted", value: "inverted" },
    ],
  },
];

export const linkButtonTemplate = {
  label: "Link Button",
  name: "button",
  fields: [...linkButtonFields],
};
