import type { TinaField } from "tinacms";
import { linkButtonFields } from "../link-button/link-button";
import { ProgressBarEndField } from "./ProgressBarEndField";

// The total price is derived from the rows, so it isn't stored — the component
// computes it, and it doubles as the progress bar's (read-only) `end`.
export const calculationRowFields: TinaField[] = [
  { type: "string", name: "kind", label: "Soort" },
  { type: "string", name: "item", label: "Artikelen" },
  { type: "number", name: "amount", label: "Aantal" },
  { type: "number", name: "unitPrice", label: "Stuk prijs" },
];

export const progressBarFields: TinaField[] = [
  { type: "number", name: "start", label: "Start" },
  {
    type: "number",
    name: "end",
    label: "End",
    description: "Total of the project costs; updates automatically.",
    ui: { component: ProgressBarEndField },
  },
  { type: "number", name: "current", label: "Current" },
];

export const sectionCalculatorFields: TinaField[] = [
  {
    type: "object",
    name: "costs",
    label: "Project costs",
    fields: [
      { type: "string", name: "title", label: "Title" },
      {
        type: "object",
        list: true,
        name: "rows",
        label: "Rows",
        ui: {
          itemProps: (item) => ({ label: item?.item || "Row" }),
        },
        fields: calculationRowFields,
      },
    ],
  },
  {
    type: "object",
    name: "explainer",
    label: "Explainer",
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
      { type: "object", name: "progressBar", label: "Progress bar", fields: progressBarFields },
      { type: "object", name: "button", label: "Button", fields: [...linkButtonFields] },
    ],
  },
];

export const sectionCalculatorTemplate = {
  label: "Section Calculation overview",
  name: "calculator",
  fields: sectionCalculatorFields,
};
