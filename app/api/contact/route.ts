import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // 验证必填字段
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 创建邮件传输器
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10), // Ensure it's parsed as a number, radix 10
      secure: false, // Use false for port 587 (STARTTLS)
      requireTLS: true, // Explicitly require TLS for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // This must be your 16-character app password
      },
    });

    // Mail content (rest of your code is fine here)
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.MAIL_TO, // 您指定的接收邮箱
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #141718; border-bottom: 2px solid #377DFF; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #377DFF; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #377DFF; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #6C7275;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 8px;">
            <p style="margin: 0; font-size: 12px; color: #6C7275;">
              This email was sent from the leoga contact form.
            </p>
          </div>
        </div>
      `,
      // 纯文本版本
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        ---
        This email was sent from the leoga contact form.
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) { // Explicitly type error as 'any' for better error handling access
    console.error('Error sending email:', error);

    // Provide more specific error messages for better debugging
    if (error.responseCode === 535) {
      return NextResponse.json(
        { error: 'Authentication failed. Please check your Gmail app password and user.' },
        { status: 500 }
      );
    }
    if (error.code === 'EENVELOPE') { // Example: If sender/receiver issue
        return NextResponse.json(
            { error: 'Invalid sender or recipient email address.' },
            { status: 500 }
        );
    }
    // Generic error
    return NextResponse.json(
      { error: error.message || 'Failed to send email.' },
      { status: 500 }
    );
  }
}