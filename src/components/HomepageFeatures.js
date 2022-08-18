import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate id="homepage.features.first.title">Ready to use</Translate>,
    description: (
      <Translate id="homepage.features.first.desc">
        Everything you need to get started with Golang microservices is ready to use.
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.second.title">Focus on what matters</Translate>,
    description: (
      <Translate id="homepage.features.second.desc">
         Spend your time writing code that really matters. Forget boilerplate code! 
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.third.title">IoC Container ready!</Translate>,
    description: (
      <Translate id="homepage.features.third.desc">
        Configure your services and inject your dependencies in your controller! 
      </Translate>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
