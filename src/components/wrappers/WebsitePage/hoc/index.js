/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { WebsiteGlobalProvider } from '../provider';
import WebsitePageWrapper from '..';

export default function websitePageHOC(
  PageComponent,
  { pageWrapperProps } = { pageWrapperProps: {} }
) {
  // Pegas as props do Next e repassa para o PageComponent
  return (props) => (
    // Providers gerais da aplicação, como por exemplo o ThemeProvider
    <WebsiteGlobalProvider>
      {/* Componente que possui elementos que são comuns em toda a página */}
      <WebsitePageWrapper {...pageWrapperProps} {...props.pageWrapperProps}>
        <PageComponent {...props} />
      </WebsitePageWrapper>
    </WebsiteGlobalProvider>
  );
}
