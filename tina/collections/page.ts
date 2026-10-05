import type {Collection} from "tinacms";
import { linkButtonFields, linkButtonTemplate } from "../../src/components/link-button/link-button";
import { sectionHighlightTemplate } from "../../src/components/section-highlight/section-highlight";
import { sectionStandoutColumnsTemplate } from "../../src/components/section-standout-columns/section-standout-columns";
import { sectionDisplayDataTemplate } from "../../src/components/section-display-data/section-display-data";
import { sectionDonateTemplate } from "../../src/components/section-donate/section-donate";
import { sectionIntroTemplate } from "../../src/components/section-intro/section-intro";
import { sectionFactsTemplate } from "../../src/components/section-facts/section-facts";
import { sectionCalculatorTemplate } from "../../src/components/section-calculator/section-calculator";
import { donationFormTemplate } from "../../src/components/donation-form/donation-form";

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
            {
              type: 'object', label: 'Button', name: 'button',
              fields: [...linkButtonFields],
            },
          ],
        },
        linkButtonTemplate,
        sectionHighlightTemplate,
        sectionStandoutColumnsTemplate,
        sectionDisplayDataTemplate,
        sectionDonateTemplate,
        sectionIntroTemplate,
        sectionFactsTemplate,
        sectionCalculatorTemplate,
        donationFormTemplate,
      ],
    },
  ],
}