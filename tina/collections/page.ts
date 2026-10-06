import type {Collection} from "tinacms";
import { linkButtonFields } from "../../src/components/link-button/link-button";
import { sectionHighlightTemplate } from "../../src/components/section-highlight/section-highlight";
import { sectionStandoutColumnsTemplate } from "../../src/components/section-standout-columns/section-standout-columns";
import { sectionDisplayDataTemplate } from "../../src/components/section-display-data/section-display-data";
import { sectionDonateTemplate } from "../../src/components/section-donate/section-donate";
import { sectionIntroTemplate } from "../../src/components/section-intro/section-intro";
import { sectionFactsTemplate } from "../../src/components/section-facts/section-facts";
import { sectionCalculatorTemplate } from "../../src/components/section-calculator/section-calculator";
import { donationFormTemplate } from "../../src/components/donation-form/donation-form";
import { sectionPostsOverviewTemplate } from "../../src/components/section-posts-overview/section-posts-overview";

export const PageCollection: Collection = {
  name: "pages",
  label: "Pagina's",
  path: "content/pages",
  ui: {
    router: ({ document }) =>
      document._sys.filename === "homepage" ? "/" : `/${document._sys.filename}`,
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Paginatitel",
    },
    {
      type: "object",
      list: true,
      name: "sections",
      label: "Onderdelen",
      templates: [
        {
          label: "Openingsbeeld",
          name: "hero",
          fields: [
            { type: "string", name: "heading", label: "Titel" },
            {
              type: "string",
              name: "subheading",
              label: "Ondertitel",
              description: "Wordt op dit moment niet getoond op de website.",
            },
            {
              type: 'object', label: 'Afbeelding', name: 'image',
              fields: [
                { name: 'src', label: 'Afbeelding', type: 'image' },
                {
                  name: 'alt',
                  label: 'Beschrijving afbeelding',
                  type: 'string',
                  description: 'Korte beschrijving van wat er op de foto staat, voor schermlezers en zoekmachines.',
                },
              ],
            },
            {
              type: 'object', label: 'Knop', name: 'button',
              fields: [...linkButtonFields],
            },
          ],
        },
        // Ordered as they'd typically appear top-to-bottom on a page; this is
        // also the order of Tina's "add section" menu.
        sectionIntroTemplate,
        sectionHighlightTemplate,
        sectionStandoutColumnsTemplate,
        sectionDisplayDataTemplate,
        sectionFactsTemplate,
        sectionCalculatorTemplate,
        sectionPostsOverviewTemplate,
        sectionDonateTemplate,
        donationFormTemplate,
      ],
    },
  ],
}