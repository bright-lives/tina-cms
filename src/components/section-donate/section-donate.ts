import type { TinaField } from "tinacms";
import { linkButtonFields } from "../link-button/link-button";

export const sectionDonateFields: TinaField[] = [
  { type: "string", name: "title", label: "Titel" },
  // Rich text (not a plain string) because the WP block's subTitle is a
  // RichText that commonly contains inline links and line breaks.
  { type: "rich-text", name: "subTitle", label: "Ondertitel" },
  {
    type: "object",
    list: true,
    name: "buttons",
    label: "Knoppen",
    fields: [...linkButtonFields],
  },
];

export const sectionDonateTemplate = {
  label: "Oproep tot doneren",
  name: "donate",
  fields: sectionDonateFields,
};
