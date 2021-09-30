import React from 'react';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';

export default function ProfilePage(props) {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 4)}</pre>
      Página de Profile!
      <img
        src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif"
        alt="Nicolas Cage dando uma piscada"
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const auth = authService(context);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(context);

    return {
      props: {
        user: session,
        posts: profilePage.posts,
      }, // will be passed to the page component as props
    };
  }

  context.res.writeHead(307, { location: '/login' });
  return context.res.end();
}
