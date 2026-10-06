import type { TinaField } from "tinacms";
import { ManualUrlField } from "./ManualUrlField";

export const linkButtonFields: TinaField[] = [
  {
    type: "string",
    name: "text",
    label: "Tekst op de knop",
  },
  {
    type: "reference",
    name: "page",
    label: "Link naar pagina",
    collections: ["pages"],
    description: "Kies een pagina van deze website, of laat leeg en vul hieronder een eigen link in.",
  },
  {
    type: "string",
    name: "url",
    label: "Eigen link (URL)",
    description: "Bijvoorbeeld een link naar een andere website. Uitgeschakeld zolang hierboven een pagina is gekozen.",
    ui: {
      component: ManualUrlField,
    },
  },
  {
    type: "string",
    name: "style",
    label: "Stijl",
    options: [
      { label: "Gevuld", value: "fill" },
      { label: "Omlijnd", value: "outline" },
      { label: "Alleen tekst", value: "textOnly" },
    ],
  },
  {
    type: "string",
    name: "variant",
    label: "Kleur",
    description: "Kies op basis van de achtergrond waar de knop op staat.",
    options: [
      { label: "Voor lichte achtergrond", value: "normal" },
      { label: "Voor donkere achtergrond", value: "inverted" },
    ],
  },
];
