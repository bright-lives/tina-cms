import type {Collection} from "tinacms";

export const PageCollection: Collection = {
  name: "pages",
  label: "Pages",
  path: "content/pages",
  ui: {
    router: ({ document }) =>
      document._sys.filename === "homepage" ? "/" : `/${document._sys.filename}`,
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "object",
      list: true,
      name: "sections",
      label: "Sections",
      templates: [
        {
          label: "Hero",
          name: "hero",
          fields: [
            { type: "string", name: "heading", label: "Heading" },
            { type: "string", name: "subheading", label: "Subheading" },
            {
              type: 'object', label: 'Image', name: 'image',
              fields: [
                { name: 'src', label: 'Image Source', type: 'image' },
                { name: 'alt', label: 'Alt Text', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
  ],
}