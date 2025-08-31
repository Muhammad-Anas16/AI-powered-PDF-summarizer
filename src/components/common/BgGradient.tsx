"use client";

import React from 'react';

interface BgGradientProps {
    children: React.ReactNode;
    className?: string;
}

export default function BgGradient({ children, className = '' }: BgGradientProps) {
    return (
        <div className={`relative isolate ${className}`}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
            >
                <div
                    id='clipPath'
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] 
                     bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 
                     opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
                />
            </div>

            {children}
        </div>
    );
}
