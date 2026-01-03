import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Check if API key is configured
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Email service is not configured' },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);
        const body = await request.json();
        const { name, email, phone, eventDate, eventType, message } = body;

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, and phone are required' },
                { status: 400 }
            );
        }

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

        console.log('Attempting to send email via Resend...');
        console.log('From: onboarding@resend.dev (Resend default)');
        console.log('To: lessons@seanfagangolf.com');
        console.log('API Key exists:', !!apiKey);
        console.log('API Key prefix:', apiKey?.substring(0, 10) + '...');

        // Use Resend's default from address to avoid domain verification issues
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'lessons@seanfagangolf.com',
            subject: 'New Golf House Booking Inquiry',
            text: emailContent,
        });

        console.log('Resend API response:', JSON.stringify(data, null, 2));

        if (data.error) {
            console.error('Resend API error:', data.error);
            return NextResponse.json(
                { error: 'Failed to send email', details: data.error },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error in golfhouse contact API:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        const errorStack = error instanceof Error ? error.stack : undefined;

        return NextResponse.json(
            {
                error: 'Failed to process request',
                message: errorMessage,
                ...(process.env.NODE_ENV === 'development' && { stack: errorStack })
            },
            { status: 500 }
        );
    }
}

