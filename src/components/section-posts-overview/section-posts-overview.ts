import type { TinaField } from "tinacms";

export const sectionPostsOverviewFields: TinaField[] = [
  {
    type: "reference",
    name: "tag",
    label: "Label",
    collections: ["tag"],
    description: "Alleen berichten met dit label worden getoond.",
  },
];

export const sectionPostsOverviewTemplate = {
  label: "Overzicht nieuwsberichten",
  name: "postsOverview",
  fields: sectionPostsOverviewFields,
};
