import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import CinematicHero from "@/components/home/CinematicHero";
import AchievementCounters from "@/components/home/AchievementCounters";
import CoreValues from "@/components/home/CoreValues";
import LeadershipSection from "@/components/home/LeadershipSection";
import TimelineRail from "@/components/home/TimelineRail";
import MottoSection from "@/components/home/MottoSection";
import WhyJoinPreview from "@/components/home/WhyJoinPreview";
import StorySection from "@/components/home/StorySection";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Global Brotherhood`,
  description: siteConfig.metaDescription,
};

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <StorySection />
      <CoreValues />
      <AchievementCounters />
      <LeadershipSection />
      <TimelineRail />
      <WhyJoinPreview />
      <MottoSection />
    </>
  );
}
