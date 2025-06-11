'use client';

import { useState } from 'react';
import type { Metadata } from "next";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Button from "@/ui/button";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import Input from "@/form/input";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <SectionLayout className="py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h1" className="mb-4 text-4xl font-bold text-[#141718] md:text-5xl">
            Contact Us
          </Heading>
          <Text className="mb-8 text-lg text-[#6C7275] md:text-xl">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Text>
        </div>
      </SectionLayout>

      {/* Contact Form Section */}
      <SectionLayout className="py-16 px-4">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="rounded-md bg-green-50 p-4 border border-green-200">
                <div className="text-sm text-green-800">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <div className="text-sm text-red-800">
                  ❌ {errorMessage}
                </div>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="mb-2 block font-inter text-sm font-medium text-[#141718]">
                Full Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full"
                disabled={isSubmitting}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="mb-2 block font-inter text-sm font-medium text-[#141718]">
                Email Address *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
                className="w-full"
                disabled={isSubmitting}
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="mb-2 block font-inter text-sm font-medium text-[#141718]">
                Subject *
              </label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter message subject"
                required
                className="w-full"
                disabled={isSubmitting}
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="mb-2 block font-inter text-sm font-medium text-[#141718]">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
                required
                disabled={isSubmitting}
                className="w-full rounded-md border border-[#CBCBCB] px-4 py-2 font-inter text-base font-normal text-[#6C7275] outline-none placeholder:text-[#6C7275] placeholder:opacity-100 focus:text-[#141718] resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                fontSize="lg" 
                className="px-16 py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </SectionLayout>

      {/* Contact Information Section */}
      <SectionLayout bg="bg-[#F3F5F7]" className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Heading as="h2" className="mb-4 text-3xl font-bold text-[#141718]">
              Get in Touch
            </Heading>
            <Text className="text-lg text-[#6C7275]">
              Have questions? We're here to help.
            </Text>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Email */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#377DFF]">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <Heading as="h3" className="mb-2 text-xl font-semibold text-[#141718]">
                Email
              </Heading>
              <Text className="text-[#6C7275]">
                support@test.com
              </Text>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#377DFF]">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <Heading as="h3" className="mb-2 text-xl font-semibold text-[#141718]">
                Phone
              </Heading>
              <Text className="text-[#6C7275]">
                +62 123 456 7890
              </Text>
            </div>

            {/* Address */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#377DFF]">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <Heading as="h3" className="mb-2 text-xl font-semibold text-[#141718]">
                Address
              </Heading>
              <Text className="text-[#6C7275]">
                Jakarta, Indonesia
              </Text>
            </div>
          </div>
        </div>
      </SectionLayout>
    </>
  );
}