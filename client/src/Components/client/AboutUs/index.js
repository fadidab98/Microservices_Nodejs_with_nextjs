import React, { useEffect } from 'react'
import { Particles } from 'react-tsparticles';
import { loadFull } from "tsparticles";
import dynamic from 'next/dynamic';
import LoadingAboutUs from '../Loading/LoadingAboutUs';
const AboutUs = dynamic(() => import('./AboutUs'), { ssr: false,loading:()=><LoadingAboutUs/> });
const particlesConfig = {
  
    background: {
        color: {
            value: "#052E16",
        },
    },
    fpsLimit: 800,
    interactivity: {
        events: {
            onClick: {
                enable: false,
                mode: "push",
            },
            onHover: {
                enable: false,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 22,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 3,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 600,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 5 },
        },
    },
    detectRetina: true,

};
function index() {
  const particlesInit = async (main) => {

    await loadFull(main);
};
  return (
<<<<<<< HEAD
    <section  className='pt-16 w-full max-h-screen relative'>
=======
    <section  className='pt-16 w-full min-h-screen relative'>
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
        <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
<<<<<<< HEAD
      className='!absolute z-10 top-0 left-0 w-full !h-screen'
=======
      className='absolute z-10 top-0 left-0 w-full h-full'
>>>>>>> 802321716b56db79acec7e66d8e6f9c17aac17eb
     />
      <AboutUs/>
     
    </section>
  )
}

export default index