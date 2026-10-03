import type { TinaField } from "tinacms";
import { linkButtonFields } from "../link-button/link-button";

export const sectionHighlightFields: TinaField[] = [
  { type: "string", name: "title", label: "Title" },
  { type: "string", name: "content", label: "Content", ui: { component: "textarea" } },
  { type: "image", name: "imageUrl", label: "Image" },
  { type: "string", name: "imageAlt", label: "Image alt text" },
  {
    type: "string",
    name: "orientation",
    label: "Orientation",
    options: [
      { label: "Normal", value: "normal" },
      { label: "Reversed", value: "reversed" },
    ],
  },
  { type: "boolean", name: "backgroundGradient", label: "Background gradient" },
  {
    type: "object",
    list: true,
    name: "buttons",
    label: "Buttons",
    fields: [...linkButtonFields],
  },
];

export const sectionHighlightTemplate = {
  label: "Section Highlight",
  name: "highlight",
  fields: sectionHighlightFields,
};
