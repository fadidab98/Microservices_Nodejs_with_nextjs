import Image from 'next/image'
import React from 'react'
import AboutImage from "../../../../public/homeSale.jpg";

function AboutUs() {
  return (
    <div className='absolute left-0 right-0 top-0 bottom-0 w-full h-full z-20 pt-16 '>
    <h1 className='text-white text-4xl text-center mt-10'>About Us</h1>
    <div className='max-sm:w-11/12 sm:w-11/12 md:w-11/12 w-3/4 mx-auto  opacity-90  bg-green-950 rounded-lg   drop-shadow-xl text-white mt-10 p-4' >
    <div className='relative max-sm:w-full  sm:w-full  md:w-full  lg:w-96 h-96 rounded-lg float-right max-sm:mx-auto max-sm:mb-4 sm:mx-auto sm:mb-4 md:mx-auto lg:m-4 '>
            <Image src={AboutImage} fill priority objectFit='cover' className='rounded-lg' alt="No Image" />
        </div>
        <p className='w-full text-lg '>Commodo in pariatur pariatur nisi amet. Fugiat ex exercitation aliqua cillum labore ut. Elit dolor velit ipsum excepteur sit irure sunt occaecat reprehenderit. Tempor veniam duis ad adipisicing qui et. Tempor commodo enim dolor veniam nulla non Lorem.

Dolor voluptate tempor officia anim deserunt non cillum quis nostrud qui exercitation magna. Est culpa dolor ea occaecat esse incididunt ea ut laboris elit. Magna adipisicing magna et ex quis dolore officia est. Exercitation consectetur mollit ut minim voluptate ea mollit. Adipisicing occaecat magna tempor enim.

Culpa ut cupidatat labore aliquip irure anim cupidatat. Tempor tempor proident sint deserunt reprehenderit aute aliquip commodo reprehenderit et Lorem. Fugiat reprehenderit officia mollit nisi ut proident culpa ullamco consequat ut irure enim elit aliqua. Fugiat duis sunt aute cupidatat magna magna tempor. Amet sint fugiat magna minim commodo Lorem nostrud pariatur tempor voluptate. Dolore commodo aliquip culpa dolor eu officia ex pariatur.

Ullamco sit ex incididunt minim ullamco. Culpa deserunt et nisi incididunt id nostrud adipisicing sint. Enim non pariatur velit aliquip proident et non irure aliquip fugiat Lorem occaecat sint. Et adipisicing sit enim eiusmod officia deserunt cillum mollit officia ullamco.
Tempor tempor proident sint deserunt reprehenderit aute aliquip commodo reprehenderit et Lorem. Fugiat reprehenderit officia mollit nisi ut proident culpa ullamco consequat ut irure enim elit aliqua. Fugiat duis sunt aute cupidatat magna magna tempor. Amet sint fugiat magna minim commodo Lorem nostrud pariatur tempor voluptate. Dolore commodo aliquip culpa dolor eu officia ex pariatur.

</p>

    </div>

  </div>
  )
}

export default AboutUs
