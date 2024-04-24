import React from 'react'
import Hero from './Hero/Hero'
import Navbar from './Navbar/Navbar'
import MaxWidthWrapper from '@/lib/MaxWidthWrapper'
import ProductTrial from './ProductTrial/ProductTrial'
import Benefits from './Benefits/Benefits'
import Features from './Features/Features'
import Why from './why/Why'

const Temp = () => {
    return (
        <>
        <MaxWidthWrapper>
            <Navbar />
        </MaxWidthWrapper>
            <Hero />
        <MaxWidthWrapper>
            <section>
                <ProductTrial />
            </section>
            </MaxWidthWrapper>
            <section>
                <Benefits />
            </section>
            <section>
                <Features />
            </section>
            <section>
                <Why />
            </section>
        </>
    )
}

export default Temp
