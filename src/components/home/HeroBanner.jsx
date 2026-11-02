
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import SearchBar from "./SearchBar";

const slides = [
  {
    eyebrow: "A MARKETPLACE FOR CREATORS",
    title: (
      <>
        Find your space.
        <br />
        <span className="text-brand">Create</span> something
        <br />
        extraordinary.
      </>
    ),
    description:
      "Discover inspiring studios and creative spaces. Book the perfect environment to bring your next big idea to life.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Modern creative studio interior",
  },
  {
    eyebrow: "BUILT FOR YOUR CREATIVE VISION",
    title: (
      <>
        Every great idea
        <br />
        deserves a
        <br />
        <span className="text-brand">great space.</span>
      </>
    ),
    description:
      "From photography and filmmaking to podcasts and music, find a space that matches your creative vision.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Creative production and event space",
  },
  {
    eyebrow: "TURN YOUR SPACE INTO OPPORTUNITY",
    title: (
      <>
        Your space.
        <br />
        Your vision.
        <br />
        <span className="text-brand">Your opportunity.</span>
      </>
    ),
    description:
      "Have a creative space? Connect with creators, showcase your studio and make your space part of someone's next big project.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Bright professional studio workspace",
  },
];

export default function HeroBanner() {
  return (
    <section className="bg-canvas">
      {/* Hero Slider */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
          }}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          className="studio-hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative flex min-h-[570px] items-center overflow-hidden bg-ink bg-cover bg-center sm:min-h-[620px] lg:min-h-[680px]"
                style={{
                  backgroundImage: `url("${slide.image}")`,
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

                {/* Bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                {/* Slide Content */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-8">
                  <div className="max-w-3xl">
                    {/* Eyebrow */}
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-white backdrop-blur-md">
                      <Sparkles
                        size={15}
                        className="text-brand"
                      />
                      {slide.eyebrow}
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="mt-7 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
                      >
                        Explore Studios
                        <ArrowRight size={18} />
                      </Link>

                      <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink"
                      >
                        Host Your Space
                        <ArrowRight size={18} />
                      </Link>
                    </div>

                    {/* Slide Counter */}
                    <p className="mt-9 text-xs font-medium tracking-widest text-white/60">
                      0{index + 1} / 0{slides.length}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slider Controls */}
        <div className="pointer-events-none absolute bottom-8 right-5 z-20 flex items-center gap-3 sm:right-8 lg:right-[max(2rem,calc((100vw-80rem)/2))]">
          <button
            type="button"
            aria-label="Previous slide"
            className="hero-prev pointer-events-auto flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-ink"
          >
            <ChevronLeft size={21} />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            className="hero-next pointer-events-auto flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-ink"
          >
            <ChevronRight size={21} />
          </button>
        </div>

        {/* Pagination */}
        <div className="hero-pagination absolute bottom-12 left-5 z-20 flex items-center gap-2 sm:left-8 lg:left-[max(2rem,calc((100vw-80rem)/2))]" />
      </div>

      {/* Search Bar */}
      <div className="relative z-20 mx-auto -mt-1 max-w-7xl px-5 py-8 sm:px-8 lg:px-8">
        <div className="rounded-2xl border border-border bg-white p-4 shadow-lg sm:p-6">
          <SearchBar />
        </div>
      </div>

      {/* Pagination and Swiper styling */}
      <style jsx global>{`
        .studio-hero-swiper .swiper-slide {
          opacity: 0 !important;
        }

        .studio-hero-swiper .swiper-slide-active {
          opacity: 1 !important;
        }

        .hero-pagination .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .hero-pagination .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 20px;
          background: #e86b42;
          opacity: 1;
        }

        .studio-hero-swiper .swiper-button-lock {
          display: none;
        }
      `}</style>
    </section>
  );
}
