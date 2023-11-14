// pages/server-sitemap.xml/index.tsx
import { getServerSideSitemapLegacy, ISitemapField } from "next-sitemap"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const branches = [
    "SsDc",
    "PlDc",
    "SsMd",
    "SPAk",
    "PlCd",
    "SsSc",
    "PlSc",
    "ScSc",
    "PlBb",
    "SsJs",
    "PlJs",
    "ScJs",
    "LbJs",
    "PlPc",
    "PlSd",
    "PlSj",
  ]

  const defaultField: ISitemapField[] = [
    {
      // loc: 'https://example.com', // Absolute url
      loc: process.env.URL || "",
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ]

  const additionalFields: ISitemapField[] = []
  branches.map((branchId: string) => {
    additionalFields.push({
      loc: `${process.env.URL}/branch/schedule/0`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    }),
      additionalFields.push({
        loc: `${process.env.URL}/branch/schedule/1`,
        lastmod: new Date().toISOString(),
        // changefreq
        // priority
      }),
      additionalFields.push({
        loc: `${process.env.URL}/branch/presentation/0`,
        lastmod: new Date().toISOString(),
        // changefreq
        // priority
      }),
      additionalFields.push({
        loc: `${process.env.URL}/branch/presentation/1`,
        lastmod: new Date().toISOString(),
        // changefreq
        // priority
      })
  })

  const fields: ISitemapField[] = [...defaultField, ...additionalFields]

  return getServerSideSitemapLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
