import path from "path"
import rehypeMetaAsAttributes from "@lekoarts/rehype-meta-as-attributes"
import remarkGfm from "remark-gfm"

import { fileURLToPath } from "url"
import { withDefaults } from "./utils/default-options.mjs"


const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config = (themeOptions) => {
    const options = withDefaults(themeOptions)
    return {
      siteMetadata: {
      siteTitle: `Novela Theme Blog`,
      siteTitleAlt: `Novela Theme Blog - @pengying/novela`,
      siteHeadline: `Novela Theme Blog - Novela Theme from @pengying`,
      siteUrl: `https://incremental.fyi`,
      siteDescription: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and line highlighting.`,
      siteImage: `/banner.jpg`,
      siteLanguage: `en`,
      author: `@pengying`,
    },
    plugins: [

      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.postsPath,
          path: options.postsPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.pagesPath,
          path: options.pagesPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `theme-overrides`,
          path: `./src/@lekoarts`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.authorsPath,
          path: options.authorsPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `texts`,
          path: `${__dirname}/src/texts`,
        },
      },
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-theme-ui`,
      options.mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeMetaAsAttributes],
          },
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 960,
                quality: 90,
                linkImagesToOriginal: false,
                backgroundColor: `transparent`,
              },
            },
            {
              resolve: `gatsby-remark-mermaid`,
              options: {
                theme: options.mermaidTheme,
              }
            }
          ],
        },
      },
      `gatsby-transformer-sharp`,
      options.sharp && {
        resolve: `gatsby-plugin-sharp`,
        options: {},
      },
    ].filter(Boolean), // Shortcut to remove null elements from array
  }
}

export default config
