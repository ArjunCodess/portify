"use client";

import { Package, Sparkles, HelpCircle, XIcon, MoveDown, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeatureCard } from "@/components/feature-card";
import Link from "next/link";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from "@/components/ui/morphing-dialog";
import { heroImages } from "@/lib/hero-images";
import CallToAction from "@/components/call-to-action";
import { FeatureSteps } from "@/components/feature-section";
import { features } from "@/lib/features";
import { Separator } from "@/components/ui/separator";
import BlurFade from "@/components/ui/blur-fade";
import TextRotate from "@/components/ui/text-rotate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/faqs";

export default function Home() {
  return (
    <main className="flex flex-col h-full w-full container mx-auto">
      <section className="md:min-h-screen sm:h-[calc(100vh-65px)] bg-background text-foreground flex items-center">
        <main className="px-4 w-full py-8 sm:py-0">
          <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-4 md:gap-8 sm:mb-16">
            <BlurFade delay={0.1} offset={10} inView={true} inViewMargin="0px">
              <div className="hidden lg:block space-y-8">
                {heroImages.slice(0, 2).map((image) => (
                  <MorphingDialog key={image.src}>
                    <MorphingDialogTrigger>
                      <div
                        className="border border-border rounded-lg relative w-full aspect-video group"
                        style={{
                          transform: `rotate(${image.rotation}deg)`,
                          transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "rotate(0deg)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = `rotate(${image.rotation}deg)`;
                        }}
                      >
                        <MorphingDialogImage
                          src={image.src}
                          alt={image.alt}
                          className="rounded-lg shadow-xl w-full h-full object-cover"
                        />
                      </div>
                    </MorphingDialogTrigger>
                    <MorphingDialogContainer>
                      <MorphingDialogContent>
                        <div className="relative">
                          <MorphingDialogImage
                            src={image.src}
                            alt={image.alt}
                            className="h-auto w-full max-w-[90vw] rounded-lg object-cover lg:h-[90vh]"
                          />
                          <MorphingDialogClose
                            variants={{
                              initial: { opacity: 0 },
                              animate: {
                                opacity: 1,
                                transition: { delay: 0.3, duration: 0.1 },
                              },
                              exit: { opacity: 0, transition: { duration: 0 } },
                            }}
                          >
                            <XIcon className="h-full w-full text-white" />
                          </MorphingDialogClose>
                        </div>
                      </MorphingDialogContent>
                    </MorphingDialogContainer>
                  </MorphingDialog>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.2} offset={15} inView={true} inViewMargin="0px">
              <div className="text-center space-y-4 sm:space-y-6 md:pt-10">
                <h1 className="font-medium font-eb-garamond text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-neutral-900 dark:text-white">
                  Create a{" "}
                  <TextRotate
                    texts={[
                      "Stunning",
                      "Beautiful",
                      "Professional",
                      "Modern",
                      "Unique",
                    ]}
                    mainClassName="inline-block bg-[#1570EF] px-4 py-1 rounded-lg text-white overflow-hidden -mb-3 md:-mb-4"
                    staggerFrom="first"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                  <br />
                  Portfolio in Minutes
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground dark:text-neutral-400 max-w-xl mx-auto">
                  Showcase your work professionally with our modern portfolio
                  builder.
                  <br className="hidden sm:block" />
                  Stand out from the crowd and land your dream opportunities.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <Input
                    type="text"
                    placeholder="Enter your username to get started"
                    className="w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  />
                  <Link href="/create" className="w-full sm:w-auto">
                    <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
                      Create Portfolio
                    </Button>
                  </Link>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.3} offset={20} inView={true} inViewMargin="0px">
              <div className="hidden lg:block space-y-8">
                {heroImages.slice(2, 4).map((image) => (
                  <MorphingDialog key={image.src}>
                    <MorphingDialogTrigger>
                      <div
                        className="border border-border rounded-lg relative w-full aspect-video group"
                        style={{
                          transform: `rotate(${image.rotation}deg)`,
                          transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "rotate(0deg)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = `rotate(${image.rotation}deg)`;
                        }}
                      >
                        <MorphingDialogImage
                          src={image.src}
                          alt={image.alt}
                          className="rounded-lg shadow-xl w-full h-full object-cover"
                        />
                      </div>
                    </MorphingDialogTrigger>
                    <MorphingDialogContainer>
                      <MorphingDialogContent>
                        <div className="relative">
                          <MorphingDialogImage
                            src={image.src}
                            alt={image.alt}
                            className="h-auto w-full max-w-[90vw] rounded-lg object-cover lg:h-[90vh]"
                          />
                          <MorphingDialogClose
                            variants={{
                              initial: { opacity: 0 },
                              animate: {
                                opacity: 1,
                                transition: { delay: 0.3, duration: 0.1 },
                              },
                              exit: { opacity: 0, transition: { duration: 0 } },
                            }}
                          >
                            <XIcon className="h-full w-full text-white" />
                          </MorphingDialogClose>
                        </div>
                      </MorphingDialogContent>
                    </MorphingDialogContainer>
                  </MorphingDialog>
                ))}
              </div>
            </BlurFade>
          </div>

          <BlurFade delay={0.4} offset={25} inView={true} inViewMargin="0px">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 max-w-5xl mx-auto">
              <FeatureCard
                icon={<Package className="w-5 h-5 sm:w-6 sm:h-6" />}
                text="Professional templates for showcasing your work"
              />
              <FeatureCard
                icon={<Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
                text="Easy customization with live preview"
              />
              <FeatureCard
                icon={<HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
                text="Intuitive interface for effortless portfolio creation"
              />
            </div>
          </BlurFade>
        </main>
      </section>

      <Separator className="mb-12 sm:mb-20" />

      <BlurFade delay={0.5} offset={30} inView={true} inViewMargin="0px">
        <section className="px-4 sm:px-0">
          <h1 className="font-medium font-eb-garamond text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-neutral-900 dark:text-white text-center mb-8">
            Create a Portfolio in <span className="underline underline-offset-8 decoration-blue-500">Minutes</span>{" "}
            <MoveDown className="inline-block w-10 h-10 ml-2 -mt-3" />
          </h1>
          <FeatureSteps features={features} autoPlayInterval={3000} />
        </section>
      </BlurFade>

      <Separator className="my-12 sm:my-20" />

      <BlurFade delay={0.6} offset={35} inView={true} inViewMargin="0px">
        <section>
          <div className="px-8 py-16">
            <div className="mx-auto max-w-3xl space-y-12">
              <h1 className="font-medium font-eb-garamond text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-neutral-900 dark:text-white text-center mb-8">
                <span className="underline underline-offset-8 decoration-blue-500">Frequently</span> Asked Questions{" "}
                <MessageCircleQuestion className="inline-block w-10 h-10 ml-2 -mt-3" />
              </h1>

              <Accordion type="single" collapsible className="mt-16 space-y-4">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </BlurFade>

      <Separator className="my-12 sm:my-20" />

      <BlurFade delay={0.7} offset={40} inView={true} inViewMargin="0px">
        <section>
          <CallToAction />
        </section>
      </BlurFade>
    </main>
  );
}