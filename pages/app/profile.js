import React from 'react';
import { authService } from '../../src/services/auth/authService';

export default function ProfilePage(props) {
  return (
    <div>
      {JSON.stringify(props, null, 4)}
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

    return {
      props: {
        user: session,
      }, // will be passed to the page component as props
    };
  }

  context.res.writeHead(307, { location: '/login' });
  return context.res.end();
}
