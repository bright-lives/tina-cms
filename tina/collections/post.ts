import type {Collection} from "tinacms";

export const PostCollection: Collection = {
  name: "post",
  label: "Nieuwsberichten",
  path: "content/posts",
  ui: {
    router: ({ document }) => `/posts/${document._sys.filename}`,
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Titel",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Datum",
    },
    {
      type: "string",
      name: "excerpt",
      label: "Samenvatting",
      description: "Korte tekst die in het overzicht van nieuwsberichten wordt getoond.",
      ui: { component: "textarea" },
    },
    { type: "image", name: "image", label: "Afbeelding" },
    {
      type: "string",
      name: "imageAlt",
      label: "Beschrijving afbeelding",
      description: "Korte beschrijving van wat er op de foto staat, voor schermlezers en zoekmachines.",
    },
    {
      type: "object",
      list: true,
      name: "tags",
      label: "Labels",
      ui: {
        itemProps: (item) => ({ label: item?.tag?.split("/").pop() || "Nieuw label" }),
      },
      fields: [
        { type: "reference", name: "tag", label: "Label", collections: ["tag"] },
      ],
    },
    {
      type: "rich-text",
      name: "body",
      label: "Tekst",
      isBody: true,
    },
  ],
}
