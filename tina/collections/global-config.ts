import type { Collection } from "tinacms";

export const GlobalConfigCollection: Collection = {
  name: "config",
  label: "Algemene instellingen",
  path: "src/content/config",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      name: "SEOTitle",
      label: "Titel voor zoekmachines",
      description: "Wordt getoond in het browsertabblad en in zoekresultaten van bijvoorbeeld Google.",
      required: true,
    },
    {
      type: "string",
      name: "SEODescription",
      label: "Omschrijving voor zoekmachines",
      description: "Korte omschrijving van de website die in zoekresultaten wordt getoond.",
      required: true,
    },
    {
      type: "object",
      name: "footer",
      label: "Footer (onderkant van elke pagina)",
      fields: [
        {
          type: "string",
          name: "newsletterTitle",
          label: "Titel nieuwsbrief",
        },
        {
          type: "string",
          name: "newsletterFormAction",
          label: "Mailchimp-formulierlink",
          description: "De 'form action'-URL uit het Mailchimp-insluitformulier (…list-manage.com/subscribe/post?u=…&id=…)",
        },
        {
          type: "string",
          name: "newsletterPlaceholder",
          label: "Voorbeeldtekst in e-mailveld",
        },
        {
          type: "string",
          name: "newsletterButtonText",
          label: "Tekst op aanmeldknop",
        },
        {
          type: "string",
          name: "contactTitle",
          label: "Titel contactgegevens",
        },
        {
          type: "string",
          name: "addressLines",
          label: "Adresregels",
          list: true,
        },
        {
          type: "string",
          name: "email",
          label: "E-mailadres",
        },
        {
          type: "string",
          name: "copyright",
          label: "Naam bij copyright",
          description: "Wordt getoond na © en het huidige jaar",
        },
      ],
    },
  ]
}
