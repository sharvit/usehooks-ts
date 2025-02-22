import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { graphql } from 'gatsby'

import MdxRenderer from '~/components/mdxRenderer'
import SEO from '~/components/seo'
import { Post } from '~/models'

const PREFIX = 'PostTemplate'

const classes = {
  title: `${PREFIX}-title`,
  subtitle: `${PREFIX}-subtitle`,
  textMono: `${PREFIX}-textMono`,
}

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.title}`]: {
    margin: theme.spacing(10, 0, 2),
    wordBreak: 'break-all',
    fontWeight: 700,
  },

  [`& .${classes.subtitle}`]: {
    margin: theme.spacing(4, 0, 2),
    wordBreak: 'break-all',
    fontWeight: 700,
  },

  [`& .${classes.textMono}`]: {
    fontFamily: 'Fira Code, monospace',
  },
}))

export interface PostTemplateProps {
  data: {
    post: Post
    hook?: {
      body: string
    }
    demo?: {
      body: string
    }
  }
}

export const Head = ({ data }: PostTemplateProps) => (
  <SEO
    title={`${data.post.frontmatter.title}() react hook - usehooks-ts`}
    description={data.post.excerpt}
  />
)

const Subtitle: FC = ({ children }) => (
  <Typography
    id="hook"
    variant="h4"
    component="h2"
    className={classes.subtitle}
  >
    {children}
  </Typography>
)

function PostTemplate(props: PostTemplateProps) {
  const { post, hook, demo } = props.data
  const { body, frontmatter } = post
  const repoUrl = 'https://github.com/juliencrn/usehooks-ts'
  const editLink = `${repoUrl}/tree/master/src/${post.fields.name}`

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h2" component="h1" className={classes.title}>
        {frontmatter.title}
        <Typography variant="h2" component="span" className={classes.textMono}>
          ()
        </Typography>
      </Typography>

      <MdxRenderer body={body} />

      {hook && (
        <>
          <Subtitle>The Hook</Subtitle>
          <MdxRenderer body={hook.body} />
        </>
      )}

      {demo && (
        <>
          <Subtitle>Usage</Subtitle>
          <MdxRenderer body={demo.body} />
        </>
      )}

      <Box my={6}>
        <Typography align="center" color="textSecondary">
          See a way to make this page better?
          <br />
          <Link href={editLink} target="_blank" underline="hover">
            Edit there »
          </Link>
        </Typography>
      </Box>
    </StyledContainer>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query ($id: String!, $hookId: String!, $demoId: String!) {
    post: mdx(id: { eq: $id }) {
      ...Post
    }
    hook: mdx(id: { eq: $hookId }) {
      body
    }
    demo: mdx(id: { eq: $demoId }) {
      body
    }
  }
`
