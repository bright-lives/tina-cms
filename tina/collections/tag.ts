import type { Collection } from "tinacms";

export const TagCollection: Collection = {
  name: "tag",
  label: "Labels",
  path: "content/tags",
  format: "json",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Naam",
      isTitle: true,
      required: true,
    },
  ],
};
