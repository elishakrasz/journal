import Image from 'next/image'
import PortableText from 'react-portable-text'
import client from '../../client'
import { urlFor } from '../../utils/urlTransfrom'

const Post = ({post}) => {
  console.log('super', post)
  return (
    <article>
      <h1>{post?.title}</h1>
      <img className="h-64 w-64" src={urlFor(post.mainImage)} width={60} height={60}  />
      <PortableText
        className='p-5 text-justify'
        dataset='production'
        projectId='2nwmiygt'
        content={post.body}
        serializers={{
            h1: (props) => (
              <h1 className="text-2xl font-bold my-5" {...props} />
            ),
            h2: (props) => (
              <h1 className="text-xl font-bold my-5" {...props} />
            ),
            li: ({ children }) => (
              <li className="ml-4 list-disc">{children}</li>
            ),
            link: ({ href, children }) => (
              <a href={href} className="text-blue-500 hover:underline">
                {children}
              </a>
            ),
          }}
      />

      
      {/* <h1>{post?.author?.current}</h1>
      <h1>{post?.title?.current}</h1> */}
    </article>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]
  `, { slug })
  return {
    props: {
      post
    }
  }
}

export default Post