import React from 'react'
import Hero from './Hero/Hero'
import Navbar from './Navbar/Navbar'
import MaxWidthWrapper from '@/lib/MaxWidthWrapper'

const Temp = () => {
    return (
        <MaxWidthWrapper>
            <Navbar />
            <Hero />
        </MaxWidthWrapper>
    )
}

export default Temp
