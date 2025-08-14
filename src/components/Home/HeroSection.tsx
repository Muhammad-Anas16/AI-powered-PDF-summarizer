import React from 'react'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

const HeroSection = () => {
    return (
        <section className='relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl'>
            <div className='capitalize'>
                <div className="flex items-center cursor-pointer">
                    <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-green-200 via-green-500 to-green-800 animate-gradient-x group">
                        <Badge className="relative px-6 py-2 text-base font-medium bg-white rounded-full transition-colors duration-300 group-hover:bg-green-100">
                            <Sparkles className="h-8 w-8 mr-2 text-green-600 animate-pulse" />
                            <p className="text-base text-green-600">Powered by AI</p>
                        </Badge>
                    </div>
                </div>
                <h1>transform PDFs into concise summeries</h1>
                <h2>get the beautifull summery reel of the document in second</h2>
                <Button>Try Lubb</Button>
            </div>
        </section>
    )
}

export default HeroSection
