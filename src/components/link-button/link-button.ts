import type { TinaField } from "tinacms";

export const linkButtonFields: TinaField[] = [
  {
    type: "string",
    name: "text",
    label: "Text",
  },
  {
    type: "string",
    name: "url",
    label: "URL",
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
