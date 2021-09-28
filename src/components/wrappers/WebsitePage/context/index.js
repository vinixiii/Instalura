import { createContext } from 'react';

export const WebsitePageWrapperContext = createContext({
  toggleRegisterModal: () => {},
  getCMSContent: (cmsKey) => cmsKey,
});
