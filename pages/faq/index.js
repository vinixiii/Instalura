/* eslint-disable comma-dangle */
import React from 'react';
import { FAQScreen } from '../../src/components/screens/FaqScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQPage({ faqCategories }) {
  return <FAQScreen faqCategories={faqCategories} />;
}

export default websitePageHOC(FAQPage, {
  pageWrapperProps: {
    seoProps: { headTitle: 'Perguntas frequentes' },
  },
});

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

FAQPage.propTypes = FAQScreen.propTypes;

// Faq.propTypes = {
//   faqCategories: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//       slug: PropTypes.string,
//       questions: PropTypes.arrayOf(
//         PropTypes.shape({
//           title: PropTypes.string,
//           slug: PropTypes.string,
//           description: PropTypes.string,
//         })
//       ),
//     })
//   ).isRequired,
// };
