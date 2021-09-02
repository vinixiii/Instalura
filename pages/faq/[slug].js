/* eslint-disable array-callback-return */
import React from 'react';
import FAQQuestionScreen from '../../src/components/screens/FaqQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQInternalPage({ question, category }) {
  return <FAQQuestionScreen question={question} category={category} />;
}

FAQInternalPage.propTypes = FAQQuestionScreen.propTypes;

export default websitePageHOC(FAQInternalPage);

export async function getStaticProps({ params }) {
  const faqCategories = await fetch(
    // eslint-disable-next-line comma-dangle
    'https://instalura-api.vercel.app/api/content/faq'
  )
    .then(async (res) => {
      const response = await res.json();
      return response.data;
    })
    .catch((error) => console.error(error));

  const pageData = faqCategories.reduce((accumulator, faqCategory) => {
    const questionFound = faqCategory.questions.find((question) => {
      if (question.slug === params.slug) {
        return true;
      }

      return false;
    });

    if (questionFound) {
      return {
        ...accumulator,
        category: faqCategory,
        question: questionFound,
      };
    }

    return accumulator;
  }, {});

  return {
    // Todas essas props são passadas automaticamente
    // para o componente FAQInternalPage
    props: {
      category: pageData.category,
      question: pageData.question,
      pageWrapperProps: {
        seoProps: {
          headTitle: pageData.question.title,
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const faqCategories = await fetch(
    // eslint-disable-next-line comma-dangle
    'https://instalura-api.vercel.app/api/content/faq'
  )
    .then(async (res) => {
      const response = await res.json();
      return response.data;
    })
    .catch((error) => console.error(error));

  // Pega cada objeto dentro de data, ou seja, cada faqCategory
  const paths = faqCategories.reduce((accumulator, faqCategory) => {
    // Pega o slug de cada question de cada faqCategory
    // e retorna um array de objetos contendo os slugs
    // de acordo com o padrão necessário para utilizar no getStaticPaths
    // { params: { slug: 'caminho-da-página' }}
    const questionPaths = faqCategory.questions.map((question) => {
      const questionSlug = question.slug;
      return { params: { slug: questionSlug } };
    });

    return [...accumulator, ...questionPaths];
  }, []);

  return {
    paths,
    // true -> possibilita configurar certas coisas
    // false -> utiliza a configuração padrão do Next.js
    // Comportamento padrão: qualquer outra rota que não seja as que foram definidas
    // nos paths vai gerar um 404
    fallback: false,
  };
}
