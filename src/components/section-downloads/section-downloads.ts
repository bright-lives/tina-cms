import type { TinaField } from "tinacms";

// Tina has no dedicated file field; the image field's media manager also
// accepts PDFs and Office documents.
export const downloadFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel", description: "Bijvoorbeeld Jaarverslag 2025." },
  { type: "string", name: "description", label: "Omschrijving", description: "Optioneel." },
  {
    type: "image",
    name: "file",
    label: "Bestand",
    description: "Upload een PDF of ander document.",
  },
];

export const sectionDownloadsFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  { type: "string", name: "content", label: "Tekst", ui: { component: "textarea" } },
  {
    type: "object",
    list: true,
    name: "files",
    label: "Bestanden",
    ui: {
      itemProps: (item) => ({ label: item?.title || "Bestand" }),
    },
    fields: downloadFields,
  },
];

export const sectionDownloadsTemplate = {
  label: "Downloads",
  name: "downloads",
  fields: sectionDownloadsFields,
};
