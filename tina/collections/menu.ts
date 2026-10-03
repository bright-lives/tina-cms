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
      label: "Menu Items",
      ui: {
        itemProps: (item) => ({
          label: item?.label || "New item",
        }),
      },
      fields: [
        {
          type: "string",
          name: "label",
          label: "Menu Label",
          required: true,
        },
        {
          type: "reference",
          name: "page",
          label: "Select Page",
          collections: ["pages"],
        },
        {
          type: "number",
          name: "order",
          label: "Display Order",
          ui: {
            step: 1,
          },
        },
      ],
    },
  ],
};

