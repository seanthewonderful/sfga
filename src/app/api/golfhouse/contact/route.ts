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

        console.log('=== Resend Email Debug Info ===');
        console.log('API Key exists:', !!apiKey);
        console.log('API Key length:', apiKey?.length);
        console.log('API Key prefix:', apiKey?.substring(0, 15) + '...');
        console.log('API Key starts with "re_":', apiKey?.startsWith('re_'));
        console.log('From address: lessons@seanfagangolf.com');
        console.log('To address: thegolfhouse@seanfagangolf.com');
        console.log('==============================');
        console.log('');
        console.log('⚠️ IMPORTANT: If you see "domain not verified" error but dashboard shows verified,');
        console.log('   this is likely Resend API cache being out of sync. Try:');
        console.log('   1. Click "Restart verification" in Resend dashboard');
        console.log('   2. Wait 10-15 minutes and try again');
        console.log('   3. Contact Resend support if issue persists');
        console.log('');

        // Resend requires the "from" address to match a verified domain
        // DNS propagation can take 24-48 hours even after dashboard shows "verified"
        // Try verified domain first, automatically fallback to test domain if it fails

        let fromAddress = 'lessons@seanfagangolf.com';
        console.log('Sending email request to Resend API...');
        console.log('Attempting with verified domain:', fromAddress);

        let data = await resend.emails.send({
            from: fromAddress,
            to: 'thegolfhouse@seanfagangolf.com',
            subject: 'New Golf House Booking Inquiry',
            text: emailContent,
        });

        console.log('Resend API response:', JSON.stringify(data, null, 2));

        // If domain verification fails, try with Resend's test domain as fallback
        if (data.error && data.error.message?.includes('domain is not verified')) {
            console.warn('⚠️ Verified domain failed, trying Resend test domain as fallback...');
            fromAddress = 'onboarding@resend.dev';

            data = await resend.emails.send({
                from: fromAddress,
                to: 'thegolfhouse@seanfagangolf.com',
                subject: 'New Golf House Booking Inquiry',
                text: emailContent,
            });

            console.log('Fallback attempt response:', JSON.stringify(data, null, 2));

            if (data.error) {
                console.error('Resend API error (fallback also failed):', data.error);
                return NextResponse.json(
                    {
                        error: 'Failed to send email',
                        details: data.error,
                        note: 'Both verified domain and test domain failed. Please check your API key and Resend account status.'
                    },
                    { status: 500 }
                );
            } else {
                console.log('✅ Email sent successfully using Resend test domain');
                console.log('ℹ️ Your verified domain should work once DNS propagation completes (24-48 hours)');
            }
        } else if (data.error) {
            console.error('Resend API error:', data.error);
            return NextResponse.json(
                { error: 'Failed to send email', details: data.error },
                { status: 500 }
            );
        } else {
            console.log('✅ Email sent successfully using verified domain');
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

