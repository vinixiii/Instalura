import React from 'react';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';
import { authService } from '../../src/services/auth/authService';
import { useUserService } from '../../src/services/user/hook';

function ProfilePage(props) {
  const data = useUserService.getProfilePage();

  console.log(data);
  console.log('props', props);

  return (
    <div>
      {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
      Página de Profile!
      {data.loading && 'Loading'}
      {!data.loading && data.data && 'Carregou com sucesso!'}
      {!data.loading && data.error}
      <img
        src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif"
        alt="Nicolas Cage dando uma piscada"
      />
    </div>
  );
}

export default websitePageHOC(ProfilePage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Profile',
    },
    footerProps: {
      display: false,
    },
  },
});

export async function getServerSideProps(context) {
  const auth = authService(context);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    // const profilePage = await userService.getProfilePage(context);

    return {
      props: {
        user: session,
        // posts: profilePage.posts,
      }, // will be passed to the page component as props
    };
  }

  context.res.writeHead(307, { location: '/login' });
  return context.res.end();
}
