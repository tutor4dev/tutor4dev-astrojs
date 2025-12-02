import { getCollection } from 'astro:content'

const BLOG_PAGE_SIZE = 6

export const blogs = await getCollection('blogCollection')
export const pages = await getCollection('pageCollection')
export const services = await getCollection('serviceCollection')
export const courses = await getCollection('courseCollection')

export const tags = Array.from(new Set(
  blogs.flatMap(({ data }) => {
    return data.tags
  }),
))

export const paginateBlogs = (new Array(Math.ceil(blogs.length / BLOG_PAGE_SIZE )))
  .fill(0)
  .reduce((acc, each, idx) => {
    const i1 = idx * BLOG_PAGE_SIZE
    const i2 = i1 + BLOG_PAGE_SIZE

    return {
      ...acc,
      [idx+1]: blogs
        .slice(i1, i2)
        .map(({ id, data }) => ({ id, data })) 
    }
  }, {})

export const tagBlogs = tags.reduce((acc, tag) => {
  return {
    ...acc,
    [tag]: blogs
      .filter(({ data }) => data.tags.includes(tag))
      .map(({ id, data }) => ({ id, data }))
  }
}, {})
