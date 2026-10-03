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
    },
    {
      type: "object",
      name: "footer",
      label: "Footer",
      fields: [
        {
          type: "string",
          name: "newsletterTitle",
          label: "Newsletter title",
        },
        {
          type: "string",
          name: "newsletterFormAction",
          label: "Newsletter form URL",
          description: "Mailchimp embedded form action URL (…list-manage.com/subscribe/post?u=…&id=…)",
        },
        {
          type: "string",
          name: "newsletterPlaceholder",
          label: "Newsletter e-mail placeholder",
        },
        {
          type: "string",
          name: "newsletterButtonText",
          label: "Newsletter button text",
        },
        {
          type: "string",
          name: "contactTitle",
          label: "Contact title",
        },
        {
          type: "string",
          name: "addressLines",
          label: "Address lines",
          list: true,
        },
        {
          type: "string",
          name: "email",
          label: "E-mail address",
        },
        {
          type: "string",
          name: "copyright",
          label: "Copyright name",
          description: "Shown after © and the current year",
        },
      ],
    },
  ]
}
