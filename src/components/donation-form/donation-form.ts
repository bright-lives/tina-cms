import type { TinaField } from "tinacms";

export const donationFormFields: TinaField[] = [
  { type: "string", name: "title", label: "Title" },
  { type: "rich-text", name: "description", label: "Description" },
  { type: "string", name: "submitLabel", label: "Submit label" },
  {
    type: "reference",
    name: "thankYouPage",
    label: "Thank-you page",
    collections: ["pages"],
    description: "Page donors return to after paying.",
  },
];

export const donationFormTemplate = {
  label: "Donation Form",
  name: "donationForm",
  fields: donationFormFields,
};
