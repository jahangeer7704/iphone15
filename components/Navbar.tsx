import React from 'react'
import apple from "@/public/assets/images/apple.svg"
import search  from "@/public/assets/images/search.svg"
import bag  from "@/public/assets/images/bag.svg"
import Image from 'next/image'
function Navbar() {
  const products = [
    "iPhone", "Mac", "iPad", "Store"
  ]
  return (
    <div className='text-gray-400'>
      <nav className='flex md:justify-around p-5 justify-between' >
      
      <Image className='cursor-pointer hover:shadow-lg shadow-white' src={apple} alt="Logo" width={15} height={15}/>
      <ul className= 'hidden  gap-x-7 md:flex'>

        {products.map((product, index) => (
          <li className='list-none hover:text-white cursor-pointer' key={index}>{product}</li>
        ))}
      </ul>
      <div className='flex gap-x-7'>
      <Image src={search} alt="Logo" width={15} height={15}/>
      <Image src={bag} alt="Logo" width={15} height={15}/>
      </div>

      </nav>
    </div>
  )
}

export default Navbar