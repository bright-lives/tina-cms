import type { TinaField } from "tinacms";
import { linkButtonFields } from "../link-button/link-button";

export const sectionDonateFields: TinaField[] = [
  { type: "string", name: "title", label: "Title" },
  // Rich text (not a plain string) because the WP block's subTitle is a
  // RichText that commonly contains inline links and line breaks.
  { type: "rich-text", name: "subTitle", label: "Subtitle" },
  {
    type: "object",
    list: true,
    name: "buttons",
    label: "Buttons",
    fields: [...linkButtonFields],
  },
];

export const sectionDonateTemplate = {
  label: "Section Donate",
  name: "donate",
  fields: sectionDonateFields,
};
