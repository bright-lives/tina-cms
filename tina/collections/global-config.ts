import type { Collection } from "tinacms";

export const GlobalConfigCollection: Collection = {
  name: "config",
  label: "Global Config",
  path: "src/content/config",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      name: "SEOTitle",
      label: "SEO title",
      required: true,
    },
    {
      type: "string",
      name: "SEODescription",
      label: "SEO Description",
      required: true,
    }
  ]
}
