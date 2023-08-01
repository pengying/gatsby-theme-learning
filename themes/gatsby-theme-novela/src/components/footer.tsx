/** @jsx jsx */

import { jsx, Link } from "theme-ui";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import useSiteMetadata from "../hooks/use-site-metadata";
import theme from "../gatsby-plugin-theme-ui";

type PostQueryProps = {
  allMdx: {
    edges: [
      {
      node: {
        id: string;
        frontmatter: {
          date: string;
        }
      }
    }
    ]
  }
};

const Footer = () => {
  const { siteTitle, name, social } = useSiteMetadata()
  const postQuery = useStaticQuery<PostQueryProps>(graphql`
  {
    allMdx(
      filter: { frontmatter: { date: { ne: null } } }
    ) {
      edges {
        node {
          frontmatter {
            date
          }
        }
      }
    }
  }`);

  const copyrightDate = (() => {
    const { edges } = postQuery.allMdx;
    debugger;
    const years = [0, edges.length - 1].map((edge) =>
      new Date(edges[edge].node.frontmatter.date).getUTCFullYear()
    );
    return years[0] === years[1] ? `${years[0]}` : `${years[0]}–${years[1]}`;
  })();

  return (

      <footer
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          justifyContent: `space-between`,
          mt: [6],
          color: `secondary`,
          a: {
            variant: `links.secondary`,
          },
          flexDirection: [`column`, `column`, `row`],
          variant: `dividers.top`,
        }}
      >
        <FooterGradient />
        <div>
          &copy; {new Date().getFullYear()} by {siteTitle}. All rights reserved.
        </div>
        <div>

        </div>
      </footer>
  )
}

export default Footer

const FooterGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: ${p => p.theme.colorModeTransition};
`;
