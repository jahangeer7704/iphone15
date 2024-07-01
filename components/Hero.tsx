'use client'
import React from 'react'
import gsap from 'gsap'
import { useWindowSize } from "@uidotdev/usehooks";
import { useGSAP } from '@gsap/react'
import { Triangle } from 'react-loader-spinner';
function Hero() {
  const dimension: (number | null) = useWindowSize().width
  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2, y: 0 })
    gsap.to("#amount", { opacity: 1, delay: 2, y: -10 })
  }, [dimension])

  if (dimension == null) {
    return (
    <div className='h-screen flex justify-center items-center'>

      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#A19C93"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
)
  }

  
    return (

      <section className='h-screen flex justify-center items-center flex-col gap-3 md:gap-y-16'>
        <h1 id="hero" className='text-[#A19C93] text-2xl font-bold opacity-0'>iPhone 15 Pro </h1>
        <div className='w-full flex justify-center' >
          <video autoPlay playsInline={true} muted className='w-9/12 md:w-10/12' loop={false} src={dimension < 768 ? '/assets/videos/smallHero.mp4' : "/assets/videos/hero.mp4"}></video>
        </div>
        <section id='amount' className='opacity-0 w-full flex flex-col justify-center items-center gap-y-5 '>

          <h3 className='text-white bg-blue-600 grid place-content-center px-6 py-2 rounded-full w-fit '>Buy</h3>
          <p className='text-white font-semibold'>From $999 or $41.62/mo. </p>
        </section>

      </section>
    )

  }



export default Hero