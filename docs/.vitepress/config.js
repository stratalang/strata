import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'STRATA',
  titleTemplate: ':title | Strata Programming Language',
  description: 'A strongly and statically typed language for building reliable software',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Strata' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }]
  ],

  markdown: {
    theme: {
      dark: 'dark-plus',
      light: 'light-plus',
    },
    lineNumbers: true,
    config: (md) => {
      const defaultFence = md.renderer.rules.fence || ((tokens, idx, options, env, self) => {
        return self.renderToken(tokens, idx, options)
      })
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const info = token.info ? token.info.trim() : ''
        let originalLang = null

        if (info === 'strata' || info === 'str') {
          originalLang = info
          token.info = 'typescript'
        }

        const result = defaultFence(tokens, idx, options, env, self)

        if (originalLang) {
          return result
            .replace(/language-typescript/g, `language-${originalLang}`)
            .replace(/<span class="lang">typescript<\/span>/g, `<span class="lang">${originalLang}</span>`)
            .replace(/data-language="typescript"/g, `data-language="${originalLang}"`)
            .replace(/"typescript"/g, `"${originalLang}"`)
        }

        return result
      }
    }
  },

  themeConfig: {
    logo: '/branding/strata-icon.svg',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Documentation',
        items: [
          { text: 'Getting Started', link: '/getting-started/' },
          { text: 'Language Reference', link: '/language/' },
          { text: 'Guides', link: '/guides/' },
          { text: 'Examples', link: '/examples/' },
          { text: 'CLI Commands', link: '/cli/' }
        ]
      }
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started/' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Your First Program', link: '/getting-started/hello-world' }
          ]
        }
      ],
      '/language/': [
        {
          text: 'Language Basics',
          items: [
            { text: 'Variables', link: '/language/basics/variables' },
            { text: 'Types', link: '/language/basics/types' },
            { text: 'Functions', link: '/language/basics/functions' },
            { text: 'Control Flow', link: '/language/basics/control-flow' }
          ]
        },
        {
          text: 'Object Oriented Design',
          items: [
            { text: 'Classes', link: '/language/oop/classes' },
            { text: 'Interfaces & Traits', link: '/language/oop/interfaces' },
            { text: 'Generics', link: '/language/oop/generics' }
          ]
        },
        {
          text: 'Project Structure',
          items: [
            { text: 'File Structure', link: '/language/structure/files' },
            { text: 'Imports', link: '/language/structure/imports' }
          ]
        },
        {
          text: 'Standard Library',
          items: [
            { text: 'Overview', link: '/language/std/' },
            { text: 'Numbers', link: '/language/std/numbers' },
            { text: 'Strings', link: '/language/std/string' },
            { text: 'Arrays', link: '/language/std/array' },
            { text: 'Associative Arrays', link: '/language/std/associative-arrays' },
            { text: 'Input & Output', link: '/language/std/io' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Error Handling', link: '/language/error-handling' },
            { text: 'PHP Runtime', link: '/language/advanced/php-runtime' },
            { text: 'PHP Interoperability', link: '/language/advanced/php-interop' },
            { text: 'Code Guidelines', link: '/language/code-guidelines' }
          ]
        }
      ],
      '/cli/': [
        {
          text: 'CLI Commands',
          items: [
            { text: 'Overview', link: '/cli/' },
            { text: 'strata init', link: '/cli/init' },
            { text: 'strata build', link: '/cli/build' },
            { text: 'strata serve', link: '/cli/serve' },
            { text: 'strata check', link: '/cli/check' },
            { text: 'strata run', link: '/cli/run' },
            { text: 'strata watch', link: '/cli/watch' },
            { text: 'strata fmt', link: '/cli/fmt' },
            { text: 'strata clean', link: '/cli/clean' }
          ]
        }
      ],
      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'Overview', link: '/guides/' },
            { text: 'Configuration', link: '/guides/configuration' },
            { text: 'Editor Support & LSP', link: '/guides/editor-support' },
            { text: 'Debugging Guide', link: '/guides/debugging' },
            { text: 'Testing', link: '/guides/testing' },
            { text: 'Web Server Guide', link: '/guides/web-server' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' },
            { text: 'Basic Examples', link: '/examples/basic' },
            { text: 'Web Application', link: '/examples/web-app' },
            { text: 'CLI Application', link: '/examples/cli-app' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/stratalang' }
    ],

    footer: {
      message: '<a href="/branding">Branding</a> · <a href="https://github.com/stratalang/strata/blob/main/LICENSE">License</a> <br> Released under the MIT License.',
      copyright: 'Copyright © 2026 Donald Pakkies | Brought to you by <a href="https://lunaql.com/">LunaQL</a>'
    },

    search: {
      provider: 'local'
    }
  }
})
