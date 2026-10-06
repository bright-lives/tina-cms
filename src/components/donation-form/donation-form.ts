import type { TinaField } from "tinacms";

export const donationFormFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  { type: "rich-text", name: "description", label: "Tekst" },
  { type: "string", name: "submitLabel", label: "Tekst op de verzendknop" },
  {
    type: "reference",
    name: "thankYouPage",
    label: "Bedankpagina",
    collections: ["pages"],
    description: "Pagina waar donateurs na het betalen op terechtkomen.",
  },
];

export const donationFormTemplate = {
  label: "Donatieformulier",
  name: "donationForm",
  fields: donationFormFields,
};
