import AboutPreview from "../home/components/AboutPreview";
import Mission from "../home/components/Mission";
import CommunityStory from "../home/components/CommunityStory";
import WhatWeDo from "../home/components/WhatWeDo";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutPreview />
      <Mission />
      <WhatWeDo />
      <CommunityStory />
    </main>
  );
}
