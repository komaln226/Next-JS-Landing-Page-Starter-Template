import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
            Maps
          </Link>
        </li>
        <li>
          <Link href="/optin">Opt In</Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'Know about wildfires in your area with\n'}
            <span className="text-primary-500">EmberAlert</span>
          </>
        }
        description="Prediction, Forecasting, and Alerting about Wildfires in your area."
        button={
          <Link href="/optin">
            <Button xl>Opt In</Button>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
