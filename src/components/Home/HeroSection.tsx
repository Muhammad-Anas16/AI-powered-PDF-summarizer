"use client";


import React from 'react'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="relative mx-auto flex flex-col items-center justify-center pt-10 pb-20 transition-all animate-in lg:px-12 max-w-7xl text-center">

            {/* Gradient Badge */}
            <div className="flex items-center cursor-pointer mb-6">
                <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-green-200 via-green-500 to-green-800 animate-gradient-x group">
                    <Badge className="relative px-6 py-2 text-base font-medium bg-white rounded-full transition-colors duration-300 group-hover:bg-green-100">
                        <Sparkles className="h-6 w-6 mr-2 text-green-600 animate-pulse" />
                        <p className="text-base text-green-600">Powered by AI</p>
                    </Badge>
                </div>
            </div>

            {/* Heading */}
            <h1 className="font-bold py-4 text-2xl sm:text-3xl lg:text-4xl">
                Transform PDFs into {' '}
                <span className='relative inline-block'>
                    <span className='relative z-10 px-2'>concise</span>
                    <span className='absolute inset-0 bg-green-200/50 -rotate-2 rounded-full transform -skew-y-1' aria-hidden={'true'}></span>
                </span>
                summaries
            </h1>

            {/* Subheading */}
            <h2 className="text-lg sm:text-xl lg:text-2xl max-w-4xl text-gray-600 mb-8 px-4">
                Get a beautiful summary reel of the document in seconds.
            </h2>

            {/* CTA Button */}
            <Link href="/upload">
            <Button
                className="text-white text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-4 sm:py-6 lg:py-6
                   bg-gradient-to-r from-green-800 via-green-500 to-green-200
                   hover:from-green-700 hover:via-green-400 hover:to-green-300
                   shadow-lg transition-all duration-300"
            >
                Try Lubb →
            </Button>
            </Link>
        </section>
    )
}

export default HeroSection;