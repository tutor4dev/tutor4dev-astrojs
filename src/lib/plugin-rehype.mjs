import { visit } from 'unist-util-visit'

/**
 *
 * @returns
 */
export function rehypeBulmaTable() {
  return async (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'table') {
        node.properties = {
          ...node.properties,
          className: ['table'],
        }
      }
    })
  }
}

/**
 *
 * @returns
 */
export function rehypeBulmaTitle() {
  return async (tree) => {
    visit(tree, 'element', (node) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        const i = node.tagName.replace('h', '')
        node.properties = {
          ...node.properties,
          className: ['title', `is-${i}`],
        }
      }
    })
  }
}

/**
 *
 * @returns
 */
export function rehypeBulmaImage() {
  return async (tree) => {
    visit(tree, 'element', (node, i, parent) => {
      if (node.tagName === 'img') {
        const { alt = '' } = node.properties
        let classNames = ['image']

        if (/\!$/.test(String(alt))) {
          node.properties.alt = String(node.properties.alt).replace('!', '')
        } else {
          if (/\./.test(String(alt))) {
            classNames = [
              ...classNames,
              ...String(alt)
                .split('.')
                .filter((e, i) => i !== 0),
            ]

            node.properties.alt = String(node.properties.alt).replace(
              `.${String(alt)
                .split('.')
                .filter((e, i) => i !== 0)
                .join('.')}`,
              ''
            )
          }

          const figure = {
            type: 'element',
            tagName: 'figure',
            properties: { className: classNames },
            children: [node],
          }

          parent.children[i] = figure
        }
      }
    })
  }
}

/**
 *
 * @returns
 */
export function rehypeBulmaYoutube() {
  return async (tree) => {
    visit(tree, 'element', (node, i, parent) => {
      if (node.tagName === 'p' && node.children[0].type === 'text') {
        const v = node.children[0].value

        if (/youtube\.com|youtu\.be/.test(v)) {
          const iframe = {
            type: 'element',
            tagName: 'iframe',
            properties: {
              className: 'has-ratio',
              src: v,
              width: 640,
              height: 360,
              frameborder: 0,
              allowfullscreen: true,
            },
            children: [],
          }

          const figure = {
            type: 'element',
            tagName: 'figure',
            properties: { className: ['image', 'is-16by9'] },
            children: [iframe],
          }

          if (parent && i) {
            parent.children[i] = figure
          }
        }
      }
    })
  }
}
