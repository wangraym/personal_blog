import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Article, Wrapper, Button, SectionTitle } from 'components';
import { media } from '../utils/media';
import logo from "../../images/gitpic.jpg"

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media ${media.tablet} {
    padding: 3rem 2rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`;

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 6rem 2rem;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.grey.dark};

  p {
    font-size: 1.68rem;
    margin-top: -1rem;
    @media ${media.phone} {
      font-size: 1.25rem;
    }
    @media ${media.tablet} {
      font-size: 1.45rem;
    }
  }
`;

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
  },
}) => (
  <Layout>
    <Wrapper>
      <Hero>
        <h1>Welcome!</h1>
        <p>
          I&apos;m Raymond, a recent grad of the University of Toronto in Mechanical engineering with a minor in Robotics
        </p>
        <img src={logo} />
        <p>
          I&apos;m now using my engineering skills and my love for coding to explore the world of IoT software development and 
          Deep Learning. Join me in this blog, as I document some of the things I learn and create!
        </p>
        <Link to="/about">
          <Button big>
            <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 20 20">
							<path d="M 8.749 9.934 c 0 0.247 -0.202 0.449 -0.449 0.449 H 4.257 c -0.247 0 -0.449 -0.202 -0.449 -0.449 S 4.01 9.484 4.257 9.484 H 8.3 C 8.547 9.484 8.749 9.687 8.749 9.934 M 7.402 12.627 H 4.257 c -0.247 0 -0.449 0.202 -0.449 0.449 s 0.202 0.449 0.449 0.449 h 3.145 c 0.247 0 0.449 -0.202 0.449 -0.449 S 7.648 12.627 7.402 12.627 M 8.3 6.339 H 4.257 c -0.247 0 -0.449 0.202 -0.449 0.449 c 0 0.247 0.202 0.449 0.449 0.449 H 8.3 c 0.247 0 0.449 -0.202 0.449 -0.449 C 8.749 6.541 8.547 6.339 8.3 6.339 M 18.631 4.543 v 10.78 c 0 0.248 -0.202 0.45 -0.449 0.45 H 2.011 c -0.247 0 -0.449 -0.202 -0.449 -0.45 V 4.543 c 0 -0.247 0.202 -0.449 0.449 -0.449 h 16.17 C 18.429 4.094 18.631 4.296 18.631 4.543 M 17.732 4.993 H 2.46 v 9.882 h 15.272 V 4.993 Z M 16.371 13.078 c 0 0.247 -0.202 0.449 -0.449 0.449 H 9.646 c -0.247 0 -0.449 -0.202 -0.449 -0.449 c 0 -1.479 0.883 -2.747 2.162 -3.299 c -0.434 -0.418 -0.714 -1.008 -0.714 -1.642 c 0 -1.197 0.997 -2.246 2.133 -2.246 s 2.134 1.049 2.134 2.246 c 0 0.634 -0.28 1.224 -0.714 1.642 C 15.475 10.331 16.371 11.6 16.371 13.078 M 11.542 8.137 c 0 0.622 0.539 1.348 1.235 1.348 s 1.235 -0.726 1.235 -1.348 c 0 -0.622 -0.539 -1.348 -1.235 -1.348 S 11.542 7.515 11.542 8.137 M 15.435 12.629 c -0.214 -1.273 -1.323 -2.246 -2.657 -2.246 s -2.431 0.973 -2.644 2.246 H 15.435 Z" ></path>
						</svg>
            Me
          </Button>
        </Link>
        <Link to="/categories">
          <Button big>
            <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 20 20">
							<path d="M 18.125 15.804 l -4.038 -4.037 c 0.675 -1.079 1.012 -2.308 1.01 -3.534 C 15.089 4.62 12.199 1.75 8.584 1.75 C 4.815 1.75 1.982 4.726 2 8.286 c 0.021 3.577 2.908 6.549 6.578 6.549 c 1.241 0 2.417 -0.347 3.44 -0.985 l 4.032 4.026 c 0.167 0.166 0.43 0.166 0.596 0 l 1.479 -1.478 C 18.292 16.234 18.292 15.968 18.125 15.804 M 8.578 13.99 c -3.198 0 -5.716 -2.593 -5.733 -5.71 c -0.017 -3.084 2.438 -5.686 5.74 -5.686 c 3.197 0 5.625 2.493 5.64 5.624 C 14.242 11.548 11.621 13.99 8.578 13.99 M 16.349 16.981 l -3.637 -3.635 c 0.131 -0.11 0.721 -0.695 0.876 -0.884 l 3.642 3.639 L 16.349 16.981 Z" ></path>
						</svg>
            Categories
          </Button>
        </Link>
        <Link to="/contact">
          <Button big>
            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-453-185-242 295q-18 23-49 23-13 0-22-4-19-7-30.5-23.5t-11.5-36.5v-349l864-1059-1069 925-395-162q-37-14-40-55-2-40 32-59l1664-960q15-9 32-9 20 0 36 11z" />
            </svg>
            Contact
          </Button>
        </Link>
      </Hero>
      <Content>
        <SectionTitle>Latest Posts</SectionTitle>
        {postEdges.map(post => (
          <Article
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.fields.slug}
            category={post.node.frontmatter.category}
            key={post.node.fields.slug}
          />
        ))}
      </Content>
    </Wrapper>
  </Layout>
);

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC  }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            category
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
