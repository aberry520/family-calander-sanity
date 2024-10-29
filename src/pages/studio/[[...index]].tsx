import Head from 'next/head'
import { NextStudio } from 'next-sanity/studio'
import { metadata } from 'next-sanity/studio/metadata'
import config from 'sanity.config'
import Link from 'next/link'

export default function StudioPage() {
  return (
    <>
      <Head>
        {Object.entries(metadata).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Head>
      <Link href="/">Back to Calander</Link>
      <NextStudio config={config} unstable_globalStyles />
    </>
  )
}
