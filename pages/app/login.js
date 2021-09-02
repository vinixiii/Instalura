import React from 'react';
import { Box } from '../../src/components/foundation/layout/Box';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function LoginScreen() {
  return (
    <Box display="flex" flex="1" flexDirection="column">
      <h1>Login</h1>
    </Box>
  );
}

export default websitePageHOC(LoginScreen, {
  pageWrapperProps: {
    seoProps: { headTitle: 'Login' },
    menuProps: { display: false },
  },
});
