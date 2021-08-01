import { useState, useEffect, useContext } from 'react'
import Layout from '@/components/layout'
import { fade, slightScale } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import SanityPageService from '@/services/sanityPageService'
import { Context } from '../context/state'
import Div100vh from 'react-div-100vh'

const query = `{
  "home": *[_type == "home"][0]{
    title,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    },
    featuredWork[]->{
      slug {
        current
      },
      title,
      gps,
      indexNumber,
      homeCarouselImage {
        asset ->
      },
      imageSlides[]{
        layout,
        images[] {
          asset-> {
            ...
          }
        }
      }
    }
  },
}`

const pageService = new SanityPageService(query)

export default function Home(initialData) {
  const { data: { home }  } = pageService.getPreviewHook(initialData)()
  const [currentProject, setCurrentProject] = useState(1);
  const [introContext, setIntroContext] = useContext(Context);
  
  let numberSplit = home.featuredWork[0].indexNumber.split("")
  let numberSplit1 = home.featuredWork[1].indexNumber.split("")
  let numberSplit2 = home.featuredWork[2].indexNumber.split("")
  let numberSplit3 = home.featuredWork[3].indexNumber.split("")
  let numberSplit4 = home.featuredWork[4].indexNumber.split("")
  let coords = ''
  let numberRoll = ''

  if (currentProject == 2) {
    coords = 'md:translate-y-[-16px]'
    numberRoll = 'md:translate-y-[-160px] 2xl:translate-y-[-230px]'
  } else if (currentProject == 3) {
    coords = 'md:translate-y-[-32px]'
    numberRoll = 'md:translate-y-[-320px] 2xl:translate-y-[-460px]'
  } else if (currentProject == 4) {
    coords = 'md:translate-y-[-48px]'
    numberRoll = 'md:translate-y-[-480px] 2xl:translate-y-[-690px]'
  } else if (currentProject == 5) {
    coords = 'md:translate-y-[-64px]'
    numberRoll = 'md:translate-y-[-640px] 2xl:translate-y-[-920px]'
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIntroContext(true)
    }, 4000);
  },[]);
  

  const reveal = {
    initial: { y: '100%' },
    enter: { 
      y: 0,
      transition: { delay: introContext ? 0 : 3.2, duration: 1, ease: [0.83, 0, 0.17, 1] }
    },
    exit: {
      y: '100%',
      transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
    }
  }

  const revealMore = {
    initial: { y: '110%' },
    enter: { 
      y: 0,
      transition: { delay: introContext ? 0 : 3.2, duration: 1, ease: [0.83, 0, 0.17, 1] }
    },
    exit: {
      y: '110%',
      transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
    }
  }

  return (
    <Layout>
      <LazyMotion features={domAnimation}>
        <m.section
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
        >
          <Div100vh className="flex flex-col p-[14px] md:p-[20px]">
          {/* {home.featuredWork.map((e, i) => {
            e.imageSlides.map(e, i) => {
              return (

              )
            })
            })} */}
            
            <m.div variants={fade} className="text-white my-auto">
              <div className="w-full h-[60vh] md:h-[63vh] relative mt-[-2vw]">
                <div className="absolute inset-0 flex flex-wrap z-[6]">
                  
                  <Link href={`/works/${home.featuredWork[0].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(1)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[1].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(2)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[2].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(3)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[3].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(4)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                  <Link href={`/works/${home.featuredWork[4].slug.current}`}>
                    <a className="w-1/5" onMouseEnter={() => setCurrentProject(5)} onMouseLeave={() => setCurrentProject(1)}></a>
                  </Link>
                </div>
                <div className="absolute inset-0 overflow-hidden">
                  <m.div className="absolute inset-0" variants={slightScale}>
                    <Image
                      src={home.featuredWork[0].homeCarouselImage.asset.url}
                      alt="Placeholder"
                      layout="fill"
                      className={`w-full h-full object-cover object-center [z-2] home-image ${currentProject === 1 ? 'opacity-100 scale-[1.005]' : 'md:opacity-0 md:scale-[1.0275]'}`}
                      placeholder="blur"
                      blurDataURL={home.featuredWork[0].homeCarouselImage.asset.metadata.lqip}
                    />

                    <div className="hidden md:block">
                      <Image
                        src={home.featuredWork[1].homeCarouselImage.asset.url}
                        alt="Placeholder"
                        layout="fill"
                        className={`w-full h-full object-cover object-center [z-1] home-image ${currentProject === 2 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                        placeholder="blur"
                        blurDataURL={home.featuredWork[1].homeCarouselImage.asset.metadata.lqip}
                      />
                    </div>

                    <div className="hidden md:block">
                      <Image
                        src={home.featuredWork[2].homeCarouselImage.asset.url}
                        alt="Placeholder"
                        layout="fill"
                        className={`w-full h-full object-cover object-center [z-2] home-image ${currentProject === 3 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                        placeholder="blur"
                        blurDataURL={home.featuredWork[2].homeCarouselImage.asset.metadata.lqip}
                      />
                    </div>
                    
                    <div className="hidden md:block">
                      <Image
                        src={home.featuredWork[3].homeCarouselImage.asset.url}
                        alt="Placeholder"
                        layout="fill"
                        className={`w-full h-full object-cover object-center [z-3] home-image ${currentProject === 4 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                        placeholder="blur"
                        blurDataURL={home.featuredWork[3].homeCarouselImage.asset.metadata.lqip}
                      />
                    </div>
                    
                    <div className="hidden md:block">
                      <Image
                        src={home.featuredWork[4].homeCarouselImage.asset.url}
                        alt="Placeholder"
                        layout="fill"
                        className={`w-full h-full object-cover object-center [z-4] home-image ${currentProject === 5 ? 'opacity-100 scale-[1.005]' : 'opacity-0 scale-[1.0275]'}`}
                        placeholder="blur"
                        blurDataURL={home.featuredWork[4].homeCarouselImage.asset.metadata.lqip}
                      />
                    </div>
                  </m.div>
                </div>
              </div>
            </m.div>

            <div className="flex flex-wrap items-end">
              
              <span className={`w-full md:w-auto text-[13px] md:text-[16px] tracking-tighter md:tracking-normal leading-none md:fixed bottom-0 left-0 mb-1 md:m-[20px] variant-numeric font-mono`}>
                <span className="block relative overflow-hidden mb-[5px]">
                  <m.span variants={revealMore} className="block uppercase leading-none">(Info)</m.span>
                </span>
                <span className="block overflow-hidden md:h-[13px]">
                  <m.span variants={reveal} className="block">
                    <span className={`block ${coords} transition-transform ease-in-out duration-500`}>
                      <span className="block leading-none">{home.featuredWork[0].gps}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[1].gps}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[2].gps}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[3].gps}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[4].gps}</span>
                    </span>
                  </m.span>
                </span>
              </span>

              <span className="w-full text-[13px] md:text-[16px] tracking-tighter md:tracking-normal ml-auto leading-none uppercase md:fixed md:text-center block font-mono">
                <span className="block overflow-hidden md:h-[13px]">
                  <m.span variants={reveal} className="block">
                    <span className={`block ${coords} transition-transform ease-in-out duration-500`}>
                      <span className="block leading-none">{home.featuredWork[0].title}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[1].title}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[2].title}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[3].title}</span>
                      <span className="hidden md:block leading-none">{home.featuredWork[4].title}</span>
                    </span>
                  </m.span>
                </span>
              </span>
              {/* mb-[9px] md:mb-[-7px] 2xl:mb-[-12px] */}
              <span className="overflow-hidden ml-auto fixed bottom-0 right-0 flex items-end mb-[9px] md:mb-[20px] 2xl:mb-[20px] mr-[14px] md:mr-[20px]">
                <m.span variants={reveal} className="block md:mb-[-23px] 2xl:mb-[-32px]">
                  <span className="text-[60px] md:text-[160px] 2xl:text-[230px] leading-none font-semibold tracking-tight flex items-end"><span className="block text-[13px] md:text-[16px] tracking-tighter md:tracking-normal leading-none mb-[38px] md:mb-[20px] 2xl:mb-[30px] uppercase font-normal font-mono"><span className="transform hidden md:inline-block rotate-180">◄</span> p<span className="hidden md:inline">roject</span> /</span>
                    <span className="block tracking-tighter">
                      <span className="block overflow-hidden md:h-[160px] 2xl:h-[230px]">
                        <span className={`block`}>
                          <span className="block leading-none">
                            {numberSplit.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="hidden md:block leading-none">
                            {numberSplit1.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="hidden md:block leading-none">
                            {numberSplit2.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="hidden md:block leading-none">
                            {numberSplit3.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                          <span className="hidden md:block leading-none">
                            {numberSplit4.map((e, i) => {
                              return (
                                <span key={i} className={`${i == 1 ? `${numberRoll} inline-block transition-transform ease-in-out duration-500` : ''}`}>{e}</span>
                              )
                            })}
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </m.span>
              </span>
            </div>
          </Div100vh>
        </m.section>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}