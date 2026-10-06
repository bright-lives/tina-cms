import type { TinaField } from "tinacms";
import { linkButtonFields } from "../link-button/link-button";
import { ProgressBarEndField } from "./ProgressBarEndField";

// The total price is derived from the rows, so it isn't stored — the component
// computes it, and it doubles as the progress bar's (read-only) `end`.
export const calculationRowFields: TinaField[] = [
  { type: "string", name: "kind", label: "Soort" },
  { type: "string", name: "item", label: "Artikelen" },
  { type: "number", name: "amount", label: "Aantal" },
  { type: "number", name: "unitPrice", label: "Stukprijs (€)" },
];

export const progressBarFields: TinaField[] = [
  { type: "number", name: "start", label: "Startbedrag (€)", description: "Meestal 0." },
  {
    type: "number",
    name: "end",
    label: "Doelbedrag (€)",
    description: "Totaal van de projectkosten; wordt automatisch berekend.",
    ui: { component: ProgressBarEndField },
  },
  { type: "number", name: "current", label: "Opgehaald bedrag (€)" },
];

export const sectionCalculatorFields: TinaField[] = [
  {
    type: "object",
    name: "costs",
    label: "Kostenoverzicht",
    fields: [
      { type: "string", name: "title", label: "Titel" },
      {
        type: "object",
        list: true,
        name: "rows",
        label: "Kostenposten",
        ui: {
          itemProps: (item) => ({ label: item?.item || "Kostenpost" }),
        },
        fields: calculationRowFields,
      },
    ],
  },
  {
    type: "object",
    name: "explainer",
    label: "Toelichting en voortgang",
    fields: [
      { type: "string", name: "title", label: "Titel" },
      { type: "string", name: "description", label: "Tekst", ui: { component: "textarea" } },
      { type: "object", name: "progressBar", label: "Voortgangsbalk", fields: progressBarFields },
      { type: "object", name: "button", label: "Knop", fields: [...linkButtonFields] },
    ],
  },
];

export const sectionCalculatorTemplate = {
  label: "Projectkosten en voortgang",
  name: "calculator",
  fields: sectionCalculatorFields,
};
