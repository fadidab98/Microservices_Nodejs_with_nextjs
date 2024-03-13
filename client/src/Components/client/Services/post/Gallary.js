import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

function Gallary(props) {
  const [image,setImage]=useState(props.mainImage)
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  useEffect(() => {
    if (thumbsSwiper) {
      thumbsSwiper.init(); // Make sure swiperRef.current is not undefined
    }
  }, [props.mainImage]);
 
  return (
    <>
    <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      loop={true}
      spaceBetween={10}
      navigation={true}
      thumbs={{
        swiper:
          thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
      }}

      modules={[FreeMode, Navigation, Thumbs]}
      className="mySwiper2 h-[32rem]"
    >
      <SwiperSlide >
        <Image src="https://swiperjs.com/demos/images/nature-1.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
      <Image src="https://swiperjs.com/demos/images/nature-2.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
      <Image src="https://swiperjs.com/demos/images/nature-3.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
      <Image src="https://swiperjs.com/demos/images/nature-4.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
      <Image src="https://swiperjs.com/demos/images/nature-5.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-6.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-7.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-8.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-9.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-10.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
    </Swiper>
    <Swiper
      onSwiper={setThumbsSwiper}
      loop={true}
      spaceBetween={10}
      slidesPerView={4}
      freeMode={true}
      watchSlidesProgress={true}
      modules={[FreeMode, Navigation, Thumbs]}
      className="mySwiper h-24 m-3"
    >
      <SwiperSlide className=''>
        <Image className='' src="https://swiperjs.com/demos/images/nature-1.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-2.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-3.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-4.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-5.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-6.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-7.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-8.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-9.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
      <SwiperSlide>
        <Image  src="https://swiperjs.com/demos/images/nature-10.jpg" fill priority={true}   loading="eager" alt="No Image" />
      </SwiperSlide>
    </Swiper>
  </>
 )
}

export default Gallary
{/* <div className='relative w-full h-[30rem] mx-auto rounded-md'>
    <Image src={image}  fill loading="lazy" objectFit='cover' alt="No Image" className='rounded-md' loading="lazy"/>

    </div>
     */}