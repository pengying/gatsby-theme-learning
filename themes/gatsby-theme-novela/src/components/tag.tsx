/** @jsx jsx */
import { jsx, Heading, Flex } from "theme-ui"
import { HeadFC, Link } from "gatsby"
import Layout from "./layout"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import Listing from "./listing"
import replaceSlashes from "../utils/replaceSlashes"
import Seo from "./seo"

type Props = {
  data: {
    allPost: any
    [key: string]: any
  }
  pageContext: {
    isCreatedByStatefulCreatePages: boolean
    slug: string
    name: string
    [key: string]: any
  }
  [key: string]: any
}

export type MBTagProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags: {
      name: string
      slug: string
    }[]
  }[]
  pageContext: {
    isCreatedByStatefulCreatePages: boolean
    slug: string
    name: string
  }
}

const Tag = ({...props }: Props) => {
  const { tagsPath, basePath } = useMinimalBlogConfig()
  const {
    data: { allPost }
  } = props

  const posts = allPost.nodes;
  const pageContext = props.pageContext;

  return (
    <Layout {...props}>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
          {pageContext.name}
        </Heading>
        <Link
          sx={(t) => ({ ...t.styles?.a, variant: `links.secondary`, marginY: 2 })}
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          View all tags
        </Link>
      </Flex>
      <Listing posts={posts} sx={{ mt: [4, 5] }} />
    </Layout>
  )
}

export default Tag

export const Head: HeadFC<unknown, { name: string }> = ({ pageContext }) => <Seo title={`Tag: ${pageContext.name}`} />
