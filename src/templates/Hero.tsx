import Image from 'next/image';
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
          <Link href="/map">Maps</Link>
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/apple-touch-icon.png"
                width={240}
                height={240}
                alt="logo"
              />
            </div>
          </>
        }
        description="Detection, Forecasting, and Alerting about Wildfires in your area."
        button={
          <Link href="https://creativedesignsguru.com/category/nextjs/">
            <Button xl>OPT IN</Button>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
