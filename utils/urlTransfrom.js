import sanityClient from '../client'
import ImageUrlBuilder from '@sanity/image-url'

const builder = ImageUrlBuilder(sanityClient)

export function urlFor(source) {
    return builder
      .image(source)
      .auto('format')
      .fit('max')
      .url()
  }
  