import type { TinaField } from "tinacms";
import { linkButtonFields } from "../link-button/link-button";

export const sectionHighlightFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  { type: "string", name: "content", label: "Tekst", ui: { component: "textarea" } },
  { type: "image", name: "imageUrl", label: "Afbeelding" },
  {
    type: "string",
    name: "imageAlt",
    label: "Beschrijving afbeelding",
    description: "Korte beschrijving van wat er op de foto staat, voor schermlezers en zoekmachines.",
  },
  {
    type: "string",
    name: "orientation",
    label: "Indeling",
    options: [
      { label: "Afbeelding rechts", value: "normal" },
      { label: "Afbeelding links", value: "reversed" },
    ],
  },
  { type: "boolean", name: "backgroundGradient", label: "Achtergrond met kleurverloop" },
  {
    type: "object",
    list: true,
    name: "buttons",
    label: "Knoppen",
    fields: [...linkButtonFields],
  },
];

export const sectionHighlightTemplate = {
  label: "Tekst met foto",
  name: "highlight",
  ui: { defaultItem: { backgroundGradient: true } },
  fields: sectionHighlightFields,
};
