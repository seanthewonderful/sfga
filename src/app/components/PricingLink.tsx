'use client';

import { useState } from 'react';
import PricingModal from './PricingModal';

interface PricingLinkProps {
    option: string;
}

export default function PricingLink({ option }: PricingLinkProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-gh-green underline hover:text-gh-brown transition-colors"
            >
                {option}
            </button>
            <PricingModal 
                option={option} 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
            />
        </>
    );
}

