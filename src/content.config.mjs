import { defineCollection, z, reference } from 'astro:content'

import { glob } from 'astro/loaders'

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/_content/blogs' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    intro: z.string(),
    seo: z.string(),
    image: z.string().optional(),
    relateBlogs: z.array(reference('blog')).optional(),
    active: z.boolean(),
  }),
})

const courseCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/_content/courses' }),
  schema: z.object({
    title: z.string(),
    seo: z.string(),
    active: z.boolean(),
  })
})

const pageCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/_content/pages' }),
  schema: z.object({
    title: z.string(),
    seo: z.string(),
    active: z.boolean(),
  })
})


export const collections = { blogCollection, courseCollection, pageCollection }