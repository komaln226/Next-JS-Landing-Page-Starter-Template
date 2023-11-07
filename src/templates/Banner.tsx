import Link from 'next/link';

import { Button } from '../button/Button';
import { CTABanner } from '../cta/CTABanner';
import { Section } from '../layout/Section';

const Banner = () => (
  <Section>
    <CTABanner
      title="Get up to date updates via SMS for wildfires in your area."
      subtitle="Opt In!"
      button={
        <Link href="https://creativedesignsguru.com/category/nextjs/">
          <Button>OPT IN!</Button>
        </Link>
      }
    />
  </Section>
);

export { Banner };