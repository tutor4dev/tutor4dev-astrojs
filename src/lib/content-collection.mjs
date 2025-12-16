import { getCollection } from 'astro:content'

const BLOG_PAGE_SIZE = 6

const blogs = await getCollection('blogCollection')
const pages = await getCollection('pageCollection')
const courses = await getCollection('courseCollection')

export const activeBlogs = blogs.filter(({ data }) => data.active)
export const activePages = pages.filter(({ data }) => data.active)
export const activeCourses = courses.filter(({ data }) => data.active)

activeBlogs.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

export const tags = Array.from(new Set(
  activeBlogs.flatMap(({ data }) => {
    return data.tags
  }),
))

export const paginateBlogs = (new Array(Math.ceil(activeBlogs.length / BLOG_PAGE_SIZE )))
  .fill(0)
  .reduce((acc, each, idx) => {
    const i1 = idx * BLOG_PAGE_SIZE
    const i2 = i1 + BLOG_PAGE_SIZE

    return {
      ...acc,
      [idx+1]: activeBlogs
        .slice(i1, i2)
        .map(({ id, data }) => ({ id, data })) 
    }
  }, {})

export const tagBlogs = tags.reduce((acc, tag) => {
  return {
    ...acc,
    [tag]: activeBlogs
      .filter(({ data }) => data.tags.includes(tag))
      .map(({ id, data }) => ({ id, data }))
  }
}, {})
