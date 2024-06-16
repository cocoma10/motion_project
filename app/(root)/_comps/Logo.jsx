import React from 'react'
import Image from "next/image"
import {Poppins} from "next/font/google";
import {cn} from "./../../../lib/utils"

const font = Poppins({
    subsets: ["latin"],
    weight: ['400','600']
});
const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
    <Image className='dark:hidden' src="/removed.png" height="40" width="40" alt="logo" />
    <Image className='hidden dark:block' src="/dark1.png" height="40" width="40" alt="logo" />

    <p className={cn("font-semibold",font.className)}>Motion</p>
</div>
  )
}

export default Logo


