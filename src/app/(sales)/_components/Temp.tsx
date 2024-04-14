import React from 'react'
import Hero from './Hero/Hero'
import Navbar from './Navbar/Navbar'
import MaxWidthWrapper from '@/lib/MaxWidthWrapper'
import ProductTrial from './ProductTrial/ProductTrial'

const Temp = () => {
    return (
        <MaxWidthWrapper>
            <Navbar />
            <Hero />
            <section>
                <ProductTrial />
            </section>
        </MaxWidthWrapper>
    )
}

export default Temp
