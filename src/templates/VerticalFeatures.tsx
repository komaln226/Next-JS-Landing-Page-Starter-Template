import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

const VerticalFeatures = () => (
  <Section
    title="Our Mission"
    description={
      'The purpose of EmberAlert is to help revolutionize wildfire management by predicting wildfire progressions and ' +
      'providing timely alerts to those in at-risk areas. This project arose from Canada and America’s escalating frequency and ' +
      'intensity of wildfires where relying on locals to report wildfires results in delayed awareness, missed evacuation opportunities, and lost lives. \n' +
      '\n\n' +
      'By integrating geospatial data, current weather metrics, and satellite-derived imagery, the goal is to develop a ' +
      'comprehensive model that can predict wildfire progressions. Through a web application, the aim is to offer residents ' +
      'and first responders a clear visualization forecast of anticipated wildfire spreads, complimented by a notification ' +
      'system for prompt alerts. With this project, the hope is to work towards a future where communities are better ' +
      'informed, prepared, and protected against the unpredictable nature of wildfires'
    }
  >
    <VerticalFeatureRow
      title="Detection"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim."
      image="/assets/images/image1.jpeg"
      imageAlt="First feature alt text"
    />
    <VerticalFeatureRow
      title="Forecast"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim."
      image="/assets/images/image2.jpeg"
      imageAlt="Second feature alt text"
      reverse
    />
    <VerticalFeatureRow
      title="Alert"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim."
      image="/assets/images/image3.jpeg"
      imageAlt="Third feature alt text"
    />
  </Section>
);

export { VerticalFeatures };
