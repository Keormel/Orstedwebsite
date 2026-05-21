import { AboutSection } from '@/components/sections/AboutSection'
import { ClassesSection } from '@/components/sections/ClassesSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { HeroSection } from '@/components/sections/HeroSection'
import { NewsSection } from '@/components/sections/NewsSection'
import { ProgressSection } from '@/components/sections/ProgressSection'
import { PixelDivider } from '@/components/ui/PixelDivider'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PixelDivider />
      <ClassesSection />
      <ProgressSection />
      <NewsSection />
      <GallerySection />
      <FaqSection />
    </>
  )
}
