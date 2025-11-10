import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = "force-dynamic";

interface ContactFormData {
  topic: string;
  fullName: string;
  email: string;
  orderId: string;
  message: string;
  consent: boolean;
  marketing: boolean;
  honeypot: string;
}

export async function POST(req: Request) {
  const { 
    topic, 
    fullName,  
    email, 
    orderId, 
    message, 
    consent, 
    marketing, 
    honeypot 
  }: ContactFormData = await req.json();

  // Check honeypot field for spam
  if (honeypot) {
    return NextResponse.json({ status: "success" }); // Silent success for bots
  }

  // Check if consent is given
  if (!consent) {
    return NextResponse.json(
      {
        message: "Consent is required",
        isSuccess: false,
      },
      { status: 400 }
    );
  }

  // Validate required environment variables
  const requiredEnvVars = [
    'SMTP_HOST',
    'SMTP_USER', 
    'SMTP_PASS',
    'SMTP_TO_EMAIL'
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`Missing environment variable: ${envVar}`);
      return NextResponse.json(
        {
          message: "Server configuration error",
          isSuccess: false,
        },
        { status: 500 }
      );
    }
  }

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || 'AnadjyTech'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO_EMAIL,
    replyTo: email,
    subject: `AnadjyTech Contact - ${topic}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4a5568;">New Contact Form Submission</h2>
        <div style="background-color: #f7fafc; padding: 1.5rem; border-radius: 0.5rem;">
          <p><strong style="color: #4a5568;">Topic:</strong> ${topic}</p>
          <p><strong style="color: #4a5568;">Full Name:</strong> ${fullName}</p>
          <p><strong style="color: #4a5568;">Email Address:</strong> ${email}</p>
          ${orderId ? `<p><strong style="color: #4a5568;">Order ID:</strong> ${orderId}</p>` : ''}
          ${message ? `
            <p><strong style="color: #4a5568;">Message:</strong></p>
            <div style="white-space: pre-wrap; background-color: #fff; padding: 1rem; border-radius: 0.25rem; border-left: 4px solid #4299e1;">
              ${message}
            </div>
          ` : ''}
          <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
            <strong style="color: #4a5568;">Preferences:</strong><br/>
            <strong>Consent Given:</strong> ${consent ? 'Yes' : 'No'}<br/>
            <strong>Marketing Emails:</strong> ${marketing ? 'Opted In' : 'Opted Out'}
          </p>
        </div>
        <p style="margin-top: 1rem; color: #718096; font-size: 0.875rem;">
          This email was sent from your website contact form.
        </p>
      </div>
    `,
  };

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    return NextResponse.json({ 
      status: "sent",
      message: "Email sent successfully",
      isSuccess: true 
    });

  } catch (error) {
    console.error("Email sending error:", error);
    
    // Don't expose sensitive error details in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error instanceof Error ? error.message : 'Unknown error')
      : 'Failed to send email';

    return NextResponse.json(
      {
        message: "Failed to send email",
        error: errorMessage,
        isSuccess: false,
      },
      { status: 500 }
    );
  }
}