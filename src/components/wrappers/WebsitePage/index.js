/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../common/Footer';
import Menu from '../../common/Menu';
import Modal from '../../common/Modal';
import { Box } from '../../foundation/layout/Box';
import RegisterForm from '../../patterns/RegisterForm';
import { SEO } from '../../common/SEO';

export const WebsitePageWrapperContext = createContext({
  toggleRegisterModal: () => {},
});

export default function WebsitePageWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <WebsitePageWrapperContext.Provider
      value={{
        toggleRegisterModal: () => setIsModalOpen(!isModalOpen),
      }}
    >
      <SEO {...seoProps} />

      <Box display="flex" flex="1" flexDirection="column" {...pageBoxProps}>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {(propsDoModal) => <RegisterForm propsDoModal={propsDoModal} />}
        </Modal>

        {menuProps.display && (
          <Menu onRegisterClick={() => setIsModalOpen(true)} />
        )}

        {children}
        <Footer />
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
};

WebsitePageWrapper.propTypes = {
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};
