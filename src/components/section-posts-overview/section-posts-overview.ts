import type { TinaField } from "tinacms";

export const sectionPostsOverviewFields: TinaField[] = [
  // Only posts carrying this tag are listed.
  { type: "reference", name: "tag", label: "Tag", collections: ["tag"] },
];

export const sectionPostsOverviewTemplate = {
  label: "Section Posts Overview",
  name: "postsOverview",
  fields: sectionPostsOverviewFields,
};
