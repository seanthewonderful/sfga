'use client';

import { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

export default function GolfHouseContactInfo() {
    const [copied, setCopied] = useState(false);
    const email = 'thegolfhouse@seanfagangolf.com';
    const phone = '(949) 292-4665';

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 mb-8">
            {/* Phone Section */}
            <div className="flex items-center">
                <a
                    href={`tel:${phone.replace(/\s/g, '').replace(/[()]/g, '')}`}
                    className="text-gh-green text-lg md:text-xl font-semibold hover:underline"
                >
                    {phone}
                </a>
            </div>

            {/* Email Section */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                    <a
                        href={`mailto:${email}`}
                        className="text-gh-green text-lg md:text-xl font-semibold hover:underline"
                    >
                        {email}
                    </a>
                    <button
                        onClick={handleCopyEmail}
                        className="px-4 py-2 bg-gh-green text-gh-tan font-semibold rounded border-2 border-gh-tan hover:bg-gh-tan hover:text-gh-green transition-colors text-sm flex items-center gap-2"
                    >
                        <FaCopy />
                        Copy email
                    </button>
                </div>
                {copied && (
                    <p className="text-gh-green text-sm italic">
                        Email address copied to clipboard.
                    </p>
                )}
            </div>
        </div>
    );
}

