import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

import Translate from '@docusaurus/Translate';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <Translate
            id="homepage.title"
            description="Title of the homepage">
              Build an optimized microservices quickly, focus on what matter
            </Translate>
        </h1>
        <p className="hero__subtitle">{
          <Translate id="homepage.subtitle">
            Go-Web is a web framework for Golang that makes it simple to write fast, secure web applications without sacrificing flexibility, usability, or type safety.
          </Translate>
        }</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate
              id="header.button.docs"
              description="Button to get started">
              Start!
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - The Golang web framework`}
      description="Go-Web is a web application framework that allow developer to focus on what matter.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
