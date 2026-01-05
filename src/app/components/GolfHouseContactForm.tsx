'use client';

import { useState } from 'react';

export default function GolfHouseContactForm({ subject }: { subject: string }) {
    const [formData, setFormData] = useState({
        subject: subject,
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/golfhouse/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            console.log('API Response:', responseData);

            if (!response.ok) {
                console.error('API Error:', responseData);
                throw new Error(responseData.message || responseData.error || 'Failed to send message');
            }

            if (responseData.error) {
                console.error('Response contains error:', responseData.error);
                throw new Error(responseData.message || responseData.error || 'Failed to send email');
            }

            console.log('Email sent successfully:', responseData);
            setSubmitStatus('success');
            setFormData({
                subject: subject,
                name: '',
                email: '',
                phone: '',
                eventDate: '',
                eventType: '',
                message: '',
            });
        } catch (error) {
            setSubmitStatus('error');
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-gh-green font-semibold mb-2">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gh-green focus:outline-none focus:ring-2 focus:ring-gh-green text-gh-green placeholder-gh-green/50"
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gh-green font-semibold mb-2">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gh-green focus:outline-none focus:ring-2 focus:ring-gh-green text-gh-green placeholder-gh-green/50"
                        placeholder="your@email.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="phone" className="block text-gh-green font-semibold mb-2">
                        Phone *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gh-green focus:outline-none focus:ring-2 focus:ring-gh-green text-gh-green placeholder-gh-green/50"
                        placeholder="(123) 456-7890"
                    />
                </div>
                <div>
                    <label htmlFor="eventDate" className="block text-gh-green font-semibold mb-2">
                        Preferred Event Date
                    </label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gh-green focus:outline-none focus:ring-2 focus:ring-gh-green text-gh-green"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="eventType" className="block text-gh-green font-semibold mb-2">
                    Event Type
                </label>
                <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gh-green focus:outline-none focus:ring-2 focus:ring-gh-green text-gh-green"
                >
                    <option value="">Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Backyard Gathering">Backyard Gathering</option>
                    <option value="Office & Team Event">Office & Team Event</option>
                    <option value="Holiday Celebration">Holiday Celebration</option>
                    <option value="Bachelor/Bachelorette Party">Bachelor/Bachelorette Party</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="message" className="block text-gh-green font-semibold mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gh-green focus:outline-none focus:ring-2 focus:ring-gh-green text-gh-green placeholder-gh-green/50 resize-none"
                    placeholder="Tell us about your event, preferred package, number of guests, or any special requests..."
                />
            </div>

            {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 border-2 border-green-500 rounded-lg text-green-800">
                    Thank you! We've received your inquiry and will get back to you soon.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 border-2 border-red-500 rounded-lg text-red-800">
                    There was an error sending your message. Please try again or contact us directly.
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-gh-green text-gh-tan font-semibold rounded-lg border-2 border-gh-tan hover:bg-gh-tan hover:text-gh-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
        </form>
    );
}

