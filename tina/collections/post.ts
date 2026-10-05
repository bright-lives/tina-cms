import type {Collection} from "tinacms";

export const PostCollection: Collection = {
  name: "post",
  label: "Posts",
  path: "content/posts",
  ui: {
    router: ({ document }) => `/posts/${document._sys.filename}`,
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
    },
    {
      type: "string",
      name: "excerpt",
      label: "Excerpt",
      ui: { component: "textarea" },
    },
    { type: "image", name: "image", label: "Image" },
    { type: "string", name: "imageAlt", label: "Image alt text" },
    {
      type: "object",
      list: true,
      name: "tags",
      label: "Tags",
      ui: {
        itemProps: (item) => ({ label: item?.tag?.split("/").pop() || "New tag" }),
      },
      fields: [
        { type: "reference", name: "tag", label: "Tag", collections: ["tag"] },
      ],
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
}
