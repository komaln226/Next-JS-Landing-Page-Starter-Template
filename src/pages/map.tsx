// opt in page
import Link from 'next/link';

import { Footer } from '@/templates/Footer';

import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from '../templates/Logo';
import Map from '../templates/Map';

const Maps = () => (
  <>
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
    <Map />
    <Footer />
  </>
);
export default Maps;
