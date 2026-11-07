import type { TinaField } from "tinacms";

export const quoteFields: TinaField[] = [
  { type: "string", name: "quote", label: "Citaat", ui: { component: "textarea" } },
  { type: "string", name: "name", label: "Naam" },
  { type: "string", name: "role", label: "Functie of omschrijving", description: "Bijvoorbeeld Donateur of Leerling in Ghana." },
  {
    type: "image",
    name: "image",
    label: "Foto",
    description: "Optioneel. Wordt klein en rond naast de naam getoond.",
  },
];

export const sectionQuoteFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel", description: "Optioneel." },
  {
    type: "object",
    list: true,
    name: "quotes",
    label: "Citaten",
    description: "Eén citaat wordt groot getoond; meerdere citaten naast elkaar.",
    ui: {
      itemProps: (item) => ({ label: item?.name || "Citaat" }),
    },
    fields: quoteFields,
  },
];

export const sectionQuoteTemplate = {
  label: "Citaten",
  name: "quote",
  fields: sectionQuoteFields,
};
