/* eslint-disable comma-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { FAQScreen } from '../../src/components/screens/FaqScreen';

export default function Faq({ faqCategories }) {
  return <FAQScreen faqCategories={faqCategories} />;
}

export async function getStaticProps() {
  const faqCategories = await fetch(
    'https://instalura-api.vercel.app/api/content/faq'
  ).then(async (res) => {
    const response = await res.json();
    return response.data;
  });

  return {
    props: {
      faqCategories,
    },
  };
}

Faq.propTypes = {
  faqCategories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          slug: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};
