import type { TinaField } from "tinacms";
import { linkButtonFields } from "../link-button/link-button";

export const stepFields: TinaField[] = [
  {
    type: "string",
    name: "label",
    label: "Label",
    description: "Optioneel, bijvoorbeeld een datum of fase. Staat boven de titel.",
  },
  { type: "string", name: "title", label: "Titel" },
  { type: "string", name: "content", label: "Tekst", ui: { component: "textarea" } },
];

export const sectionStepsFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  { type: "string", name: "content", label: "Tekst", ui: { component: "textarea" } },
  {
    type: "boolean",
    name: "numbered",
    label: "Stappen nummeren",
    description: "Uitzetten voor een tijdlijn; dan krijgt elke stap een stip in plaats van een nummer.",
  },
  {
    type: "object",
    list: true,
    name: "steps",
    label: "Stappen",
    ui: {
      itemProps: (item) => ({ label: [item?.label, item?.title].filter(Boolean).join(" – ") || "Stap" }),
    },
    fields: stepFields,
  },
  {
    type: "object",
    list: true,
    name: "buttons",
    label: "Knoppen",
    fields: [...linkButtonFields],
  },
];

export const sectionStepsTemplate = {
  label: "Stappen of tijdlijn",
  name: "steps",
  ui: { defaultItem: { numbered: true } },
  fields: sectionStepsFields,
};
