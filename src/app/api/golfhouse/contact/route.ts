import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, eventDate, eventType, message } = body;

        const emailContent = `
            New Booking Inquiry from The Golf House Website
            
            Contact Information:
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            
            Event Details:
            ${eventDate ? `Preferred Date: ${eventDate}` : 'No date specified'}
            ${eventType ? `Event Type: ${eventType}` : 'No event type specified'}
            
            Message:
            ${message || 'No additional message provided'}
        `;

        const data = await resend.emails.send({
            from: 'The Golf House Contact Form <lessons@seanfagangolf.com>',
            to: 'thegolfhouse@seanfagangolf.com',
            subject: 'New Golf House Booking Inquiry',
            text: emailContent,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

