import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    description: (
      <>
          Go-Web adopts a “convention over configuration” approach similar to frameworks like Laravel ,Symfony and Rails.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    description: (
      <>
          Go-Web lets you focus on you code, and we&apos;ll do the chores.
      </>
    ),
  },
  {
    title: 'Web service in a minute',
    description: (
      <>
          With Go-Web you can create a simple web service in a minute
      </>
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
