'use client'
import React, { useEffect, useRef, useState } from 'react'
import right from '@/public/assets/images/right.svg'
import Image from 'next/image'
import { caroselData } from '@/utils/export'
import watch from '@/public/assets/images/watch.svg'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import replay from "@/public/assets/images/replay.svg"
import pause from "@/public/assets/images/pause.svg"
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);
import play from "@/public/assets/images/play.svg"
function Highlight() {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([])
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);
    const indicatorRef = useRef<(HTMLSpanElement | null)[]>([]);

    // video and indicator
    const [video, setVideo] = useState({
        isPlaying: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPause: false,
        isFirstload: true,
        isEnd: false
    });
    const [loadedData, setLoadedData] = useState([]);
    const { isPlaying, isLastVideo, startPlay, isEnd, videoId, isFirstload, isPause } = video;
    console.log(videoId);

    console.log(videoRef.current[videoId]);
    const pauseAllVideos = () => {
        videoRef.current.forEach((video) => {
            if (video) {
                video.pause();
            }
        });
    };
    const restart = () => {
        if (isPlaying) {
            pauseAllVideos()
            setVideo(prev => ({ ...prev, isFirstload: false, isPlaying: false }))

        }
        else if (!isPlaying && (isLastVideo && isEnd)) {
            setVideo({
                isPlaying: false,
                startPlay: false,
                videoId: 0,
                isLastVideo: false,
                isPause: false,
                isFirstload: false,
                isEnd: false
            })
        }

        else if (!isPlaying) {
            setVideo(prev => ({ ...prev, isFirstload: false, isPlaying: true }))
            videoRef.current[videoId]?.play()



        }

    }
    useGSAP(() => {
        gsap.to("#highlight", {
            scrollTrigger: {
                trigger: "#highlight",
                start: "20px 80%",
                toggleActions: "restart pause reverse pause",

            },
            opacity: 1,
            y: -10,
            duration: 1,
            ease: "power1.inOut"

        })
        gsap.to('.link', {
            scrollTrigger: {

                trigger: "#highlight",
                start: "20px 80%",
                toggleActions: "restart pause reverse pause",


            },
            opacity: 1, y: -10, duration: 1, stagger: 0.25,
            ease: "power1.inOut"

        })
    }, [])
    useGSAP(() => {

        gsap.to(indicatorRef.current, {
            width: "10px",
            duration: 0.3,
            ease: "power1.inOut"
        });

        gsap.to(indicatorRef.current[videoId], {
            width: "40px",
            duration: 0.3,
            ease: "power1.inOut"
        });
    }, [videoId])
    useEffect(() => {
        if (!isFirstload) {

            videoRef.current[videoId]?.scrollIntoView({ behavior: 'smooth', inline: "center" })
        }
        pauseAllVideos();
        videoRef.current[videoId]?.play()

        setVideo(prev => ({ ...prev, isFirstload: false, isPlaying: true }))

    }, [videoId])
    return (
        <div className='  bg-[#101010] h-screen'>
            <section className='flex justify-between flex-col p-14 lg:justify-around flex-wrap gap-5'>

                <h1 id='highlight' className='text-[#86868B] opacity-0 text-3xl md:text-5xl  font-bold md:ml-[-20px] '>
                    Get the highlights.
                </h1>
                <p className='flex gap-4 md:self-end flex-col md:flex-row '>

                    <span><a className='text-[rgb(41,151,255)] link opacity-0 text-md md:text-lg flex items-center gap-2  ' href="#"> Watch the film <Image src={watch} className='h-[20px] w-[20px]' alt="" /></a></span>
                    <span><a className='text-[rgb(41,151,255)] link opacity-0 text-md md:text-lg flex items-center gap-2 ' href="#"> Watch the event <Image src={right} className='h-[10px] w-[10px]' alt="" /></a></span>
                </p>
            </section>
            <div style={{ margin: "0 , auto" }} className="flex items-center  sm:px-10  px-5  overflow-hidden xl:pl-52">
                {caroselData.map((list, i) => (
                    <div key={i} id="slider" className="sm:pr-20 pr-10 ">
                        <div className="relative w-[90vw] lg:w-[70vw] lg:h-[75vh] md:min-h-[65vh] h-[45vh]">
                            <div className="w-full h-full flex justify-center items-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    playsInline={true}
                                    loop={false}
                                    onEnded={() => {
                                        console.log("call");

                                        if (videoId < 3) {
                                            setTimeout(() => {

                                                setVideo((prev) => ({ ...prev, videoId: prev.videoId + 1 }))
                                            }, 2000)
                                        }
                                        else if (videoId === 3) {
                                            setVideo(prev => ({ ...prev, isFirstload: false, isPlaying: false, isLastVideo: true, isEnd: true }))

                                        }
                                    }}
                                    className='scale-[1.35] lg:scale-150'
                                    preload={"auto"} ref={(e: any) => (videoRef!.current[i] = e)
                                    } autoPlay src={list.vedio}></video>
                            </div>
                            <div key={i + 3} className='absolute top-5 z-10 text-white text-lg sm:text-xl md:text-2xl font-semibold font-serif  left-5 '>
                                {list.list.map((item, i) => (
                                    <span key={i} className='block'>{item}</span>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <div className='sticky  bottom-6 z-20  w-full flex justify-center pt-10 gap-x-4'>
                <div className='flex justify-center gap-5 items-center bg-gray-100/20 backdrop-blur-md rounded-full h-14 min-w-[180px] p-5'>
                    {caroselData.map((_, index) => (
                        <span
                            key={index}
                            ref={(el: any) => indicatorRef.current[index] = el}
                            className={`h-2 cursor-pointer rounded-full w-2 block bg-gray-300 transition-all`}
                            onClick={() => setVideo((prev) => ({ ...prev, videoId: index }))}
                        ></span>
                    ))}

                </div>
                <div className='bg-gray-100/20 backdrop-blur-md h-14 w-14 flex justify-center items-center  rounded-full cursor-pointer' onClick={() => restart()}>
                    {
                        !isLastVideo ? (
                            <Image className='' src={isPlaying ? pause : play} alt={"replay"} />

                        ) : (
                            <Image className='' src={isEnd ? replay : pause} alt={"replay"} />

                        )

                    }

                </div>


            </div>

        </div>
    )
}

export default Highlight