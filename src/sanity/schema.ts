import { defineField, defineType } from 'sanity';

export const experienceSchema = defineType({
  name: 'experience',
  title: 'Expérience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description courte',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required().max(2000),
    }),
    defineField({
      name: 'audience',
      title: 'Public',
      type: 'string',
      options: {
        list: [
          { title: 'Particuliers', value: 'particuliers' },
          { title: 'Entreprises', value: 'entreprises' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Type d’expérience',
      type: 'string',
      options: {
        list: [
          { title: 'Atelier', value: 'atelier' },
          { title: 'Food tour', value: 'tour' },
          { title: 'Immersion à la ferme', value: 'immersion' },
          { title: 'Team building', value: 'team-building' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Mettre en avant',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Avis client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom affiché (avec autorisation)',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'role',
      title: 'Fonction (facultatif)',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'quote',
      title: 'Avis',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().max(1500),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Afficher sur l’accueil',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

export const aboutSchema = defineType({
  name: 'about',
  title: 'À propos',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().max(1000),
    }),
    defineField({
      name: 'values',
      title: 'Valeurs',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(8),
    }),
  ],
});

export const schemaTypes = [experienceSchema, testimonialSchema, aboutSchema];
