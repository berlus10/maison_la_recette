export const schemaTypes = [
  {
    name: 'experience',
    title: 'Expérience',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', title: 'Titre' },
      { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
      { name: 'description', type: 'text', title: 'Description' },
    ],
  },
];
