/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Footer from '../../common/Footer';
import Menu from '../../common/Menu';
import Modal from '../../common/Modal';
import { Box } from '../../foundation/layout/Box';
import RegisterForm from '../../patterns/RegisterForm';
import { SEO } from '../../common/SEO';

import { WebsitePageWrapperContext } from './context';

export { WebsitePageWrapperContext } from './context';

export default function WebsitePageWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
  footerProps,
  messages,
  user,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <WebsitePageWrapperContext.Provider
      value={{
        toggleRegisterModal: () => setIsModalOpen(!isModalOpen),
        getCMSContent: (cmsKey) => get(messages, cmsKey),
      }}
    >
      <SEO {...seoProps} />

      <Box display="flex" flex="1" flexDirection="column" {...pageBoxProps}>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {(propsDoModal) => <RegisterForm propsDoModal={propsDoModal} />}
        </Modal>

        {menuProps.display && (
          <Menu onRegisterClick={() => setIsModalOpen(true)} user={user} />
        )}

        {children}
        {footerProps.display && <Footer />}
      </Box>
    </WebsitePageWrapperContext.Provider>
  );
}

WebsitePageWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
  },
  footerProps: {
    display: true,
  },
  messages: {},
  user: {},
};

WebsitePageWrapper.propTypes = {
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  footerProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  messages: PropTypes.object,
  user: PropTypes.object,
};
