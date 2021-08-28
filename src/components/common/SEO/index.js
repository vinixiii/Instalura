/* eslint-disable operator-linebreak */
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export function SEO({ headTitle }) {
  const hasHeadTitle = Boolean(headTitle);
  const baseTitle = 'Instalura';
  const title = hasHeadTitle ? `${baseTitle} | ${headTitle}` : baseTitle;

  const description =
    'Aplicação desenvolvida durante o Bootcamp de Front-end Avançado da Alura!';
  const image = 'https://github.com/vinixiii.png';
  const baseUrl = 'https://instalura-vinixiii.vercel.app';

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={baseUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
}

SEO.defaultProps = {
  headTitle: '',
};

SEO.propTypes = {
  headTitle: PropTypes.string,
};
