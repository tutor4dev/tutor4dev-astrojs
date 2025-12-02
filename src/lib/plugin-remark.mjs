import path from 'node:path'
import fs from 'node:fs/promises'
import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'

/**
 *
 * @param {*} options
 * @returns
 */
export function remarkInclude(options = {}) {
  const includePath = options['includePath']
    ? path.resolve('src', '_content', options['includePath'])
    : path.resolve('src', '_content')

  const pattern = /^!!!(.+\.md)$/

  return async (tree) => {
    const promises = []
    const contexts = []

    visit(tree, 'text', (node, index, parent) => {
      const match = node.value.match(pattern)

      if (match) {
        const f = path.join(includePath, match[1])

        promises.push(fs.readFile(f, 'utf8'))
        contexts.push({ node, index, parent })
      }
    })

    const includes = await Promise.all(promises)

    for (let i = 0; i < includes.length; i++) {
      const { parent } = contexts[i]
      const u = await unified().use(remarkParse).parse(includes[i])

      tree.children.splice(tree.children.indexOf(parent), 1, u)
    }
  }
}
