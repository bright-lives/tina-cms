import type { Collection } from "tinacms";

export const MenuCollection: Collection = {
  name: "menu",
  label: "Menu",
  path: "src/content/menu",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      list: true,
      name: "items",
      label: "Menu-items",
      ui: {
        itemProps: (item) => ({
          label: item?.label || "Nieuw item",
        }),
      },
      fields: [
        {
          type: "string",
          name: "label",
          label: "Tekst in menu",
          required: true,
        },
        {
          type: "reference",
          name: "page",
          label: "Link naar pagina",
          collections: ["pages"],
        },
        {
          type: "number",
          name: "order",
          label: "Volgorde",
          description: "Lagere nummers staan eerder in het menu.",
          ui: {
            step: 1,
          },
        },
      ],
    },
  ],
};

