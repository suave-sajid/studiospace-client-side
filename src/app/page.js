import CategorySection from "@/components/home/CategorySection";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroBanner from "@/components/home/HeroBanner";
import HostCTA from "@/components/home/HostCTA";
import HowItWorks from "@/components/home/HowItWorks";
import {
  ArrowRight,
  Aperture,
  Camera,
  Film,
  Mic2,
  Music2,
  Palette,
  Search,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    name: "Photography",
    description: "Studios for every frame",
    icon: Camera,
  },
  {
    name: "Film & Video",
    description: "Spaces for your next story",
    icon: Film,
  },
  {
    name: "Podcast",
    description: "Make your voice heard",
    icon: Mic2,
  },
  {
    name: "Music",
    description: "Create your next sound",
    icon: Music2,
  },
  {
    name: "Creative",
    description: "Spaces for new ideas",
    icon: Palette,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      {/* Navigation */}
     <HeroBanner></HeroBanner>
      <FeaturedStudios></FeaturedStudios>
     <CategorySection></CategorySection>
      <HowItWorks></HowItWorks>
      <HostCTA></HostCTA>
    </main>
  );
}