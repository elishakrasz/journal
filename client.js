import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: true // `false` if you want to ensure fresh data
})


