import type { Collection } from "tinacms";

export const TagCollection: Collection = {
  name: "tag",
  label: "Tags",
  path: "content/tags",
  format: "json",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
  ],
};
