import type { Metadata } from "next";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import Button from "@/ui/button";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import Input from "@/form/input";

export const metadata: Metadata = {
  title: "Contact Us - Kupingplug",
  description: "Get in touch with Kupingplug team",
};

export default function ContactUsPage() {
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
          <form className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="mb-2 block font-inter text-sm font-medium text-[#141718]">
                Full Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full"
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
                placeholder="Enter your email address"
                required
                className="w-full"
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
                placeholder="Enter message subject"
                required
                className="w-full"
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
                placeholder="Enter your message"
                required
                className="w-full rounded-md border border-[#CBCBCB] px-4 py-2 font-inter text-base font-normal text-[#6C7275] outline-none placeholder:text-[#6C7275] placeholder:opacity-100 focus:text-[#141718] resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                fontSize="lg" 
                className="px-16 py-3"
              >
                Send Message
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