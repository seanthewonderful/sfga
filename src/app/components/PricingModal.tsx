'use client';

import { GiGolfFlag } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from 'react';
import GolfHouseContactForm from './GolfHouseContactForm';

interface PricingModalProps {
    option: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function PricingModal({ option, isOpen, onClose }: PricingModalProps) {
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        // Reset form state when modal closes
        if (!isOpen) {
            setShowForm(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onClick={onClose}
        >
            <div
                className="bg-gh-tan rounded-lg p-8 md:p-12 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gh-green hover:text-gh-brown transition-colors p-2"
                    aria-label="Close modal"
                >
                    <FaTimes size={24} />
                </button>
                {!showForm ? (
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gh-green mb-8 font-cormorant-garamond">
                            {option} Pricing
                        </h2>

                        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                            <div className="mb-6 w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                <GiGolfFlag size={48} className="text-gh-green" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-gh-green mb-4 font-cormorant-garamond">
                                Hourly Rental
                            </h3>
                            <p className="text-gh-green text-lg mb-2">
                                2 Hours (minimum): <span className="font-bold italic">$400</span>
                            </p>
                            <p className="text-gh-green text-lg mb-2">
                                Each additional hour: <span className="font-bold italic">$100</span>
                            </p>
                            <p className="text-gh-green text-lg mb-2">
                                Includes setup, cleanup, and a dedicated attendant.
                            </p>
                            <p className="text-gh-green italic font-medium text-lg mb-2">
                                *Incentive pricing valid on events booked by February 28, 2026.
                            </p>

                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-6 px-8 py-3 bg-gh-green text-gh-tan font-semibold rounded border-2 border-gh-tan hover:bg-gh-tan hover:text-gh-green transition-colors"
                            >
                                Inquire Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        <h2 className="text-3xl md:text-4xl font-bold text-gh-green mb-8 font-cormorant-garamond text-center">
                            {option} Pricing Inquiry
                        </h2>
                        <GolfHouseContactForm subject={option} />
                    </div>
                )}
            </div>
        </div>
    );
}

