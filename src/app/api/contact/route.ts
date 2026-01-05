import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { subject, name, email, phone, details } = body;

        const emailContent = `
            New Contact Form Submission from SFGA Website
            
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            
            Additional Notes:
            ${details}
        `;

        const data = await resend.emails.send({
            from: 'SFGA Contact Form <onboarding@resend.dev>',
            to: 'lessons@seanfagangolf.com',
            subject: subject,
            text: emailContent,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
} 