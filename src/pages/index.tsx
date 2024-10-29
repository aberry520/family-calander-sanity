import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import Link from 'next/link'

import Card from '~/components/Card'
import Container from '~/components/Container'
import MyCalendar from '~/components/MyCalander/index'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  const events = posts.map((post) => ({
    id: post._id,
    title: post.title,
    date: new Date(`${post.date}T00:00:00`),
  }))
  return (
    // <Container>
    // <section>
    //   {/* {posts.length ? (
    //       posts.map((post) => <Card key={post._id} post={post} />)
    //     ) : (
    //       <Welcome />
    //     )} */}
    // </section>
    <>
      <MyCalendar events={events} />
      <Link href="/studio/structure/post">Add Events</Link>
    </>
    // </Container>
  )
}
