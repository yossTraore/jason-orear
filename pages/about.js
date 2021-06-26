import Head from 'next/head'
import Layout from '@/components/layout'
import FancyLink from '@/components/fancyLink'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"

export default function About() {
  return (
    <Layout>
      <Head>
        <title>Nextjs boilerplate - About</title>
      </Head>

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
          className="mb-12 md:mb-16 xl:mb-24"
        >
          <m.div variants={fade}>
            <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl mb-4">About Page</h1>
            <div className="content max-w-3xl mb-4">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

              <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            
            <FancyLink destination="/" a11yText="Navigate to the home page" label="Home Page" />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
