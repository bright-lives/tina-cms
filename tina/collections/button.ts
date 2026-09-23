import type { TinaField } from "tinacms";

export const buttonFields: TinaField[] = [
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
      { label: "Text", value: "text" },
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

export const buttonTemplate = {
  label: "Button",
  name: "button",
  fields: buttonFields,
};
