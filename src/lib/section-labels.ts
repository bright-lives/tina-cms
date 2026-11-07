import schema from '../../tina/__generated__/_schema.json';

// Section labels as editors see them in Tina's "add section" menu, keyed by
// GraphQL typename (template `quote` → `PagesSectionsQuote`). Read from the
// generated schema so they can't drift from the templates.
const pages = schema.collections.find(collection => collection.name === 'pages');
const sections = pages?.fields.find(field => field.name === 'sections');
const templates = (sections && 'templates' in sections ? sections.templates : []) as { name: string; label?: string }[];

export const sectionLabels: Record<string, string> = Object.fromEntries(
  templates.map(({ name, label }) => [
    `PagesSections${name[0].toUpperCase()}${name.slice(1)}`,
    label ?? name,
  ]),
);
