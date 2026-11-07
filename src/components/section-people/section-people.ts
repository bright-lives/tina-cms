import type { TinaField } from "tinacms";

// No alt text field: the portrait sits next to the person's name, so it's
// rendered as decorative.
export const personFields: TinaField[] = [
  { type: "string", name: "name", label: "Naam" },
  { type: "string", name: "role", label: "Functie", description: "Bijvoorbeeld Voorzitter of Penningmeester." },
  { type: "image", name: "image", label: "Foto", description: "Wordt vierkant bijgesneden." },
  { type: "string", name: "bio", label: "Korte introductie", description: "Optioneel.", ui: { component: "textarea" } },
];

export const sectionPeopleFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  { type: "string", name: "content", label: "Tekst", ui: { component: "textarea" } },
  {
    type: "object",
    list: true,
    name: "people",
    label: "Personen",
    ui: {
      itemProps: (item) => ({ label: [item?.name, item?.role].filter(Boolean).join(" – ") || "Persoon" }),
    },
    fields: personFields,
  },
];

export const sectionPeopleTemplate = {
  label: "Team of bestuur",
  name: "people",
  fields: sectionPeopleFields,
};
