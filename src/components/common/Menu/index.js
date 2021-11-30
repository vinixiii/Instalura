import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MenuWrapper } from './styles/MenuWrapper';
import { Logo } from '../../../theme/Logo';
import { Button } from '../Button';
// import Text from '../../foundation/Text';
import { Link } from '../Link';
import { authService } from '../../../services/auth/authService';
import TextField from '../../forms/TextField';
import { Box } from '../../foundation/layout/Box';

const links = [
  {
    text: 'Home',
    url: '/',
  },
  {
    text: 'Perguntas frequentes',
    url: '/faq',
  },
  {
    text: 'Sobre',
    url: '/about',
  },
];

export default function Menu({ onRegisterClick, user }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(async () => {
    const auth = authService();
    const isUserLogged = await auth.hasActiveSession();
    setIsLogged(isUserLogged);
  }, []);

  return (
    <Box border="1px solid #D4D4D4">
      <MenuWrapper isLogged={isLogged}>
        {!isLogged ? (
          <>
            <MenuWrapper.LeftSide>
              <Logo />
            </MenuWrapper.LeftSide>
            <MenuWrapper.Central>
              {links.map((link) => (
                <li key={link.url}>
                  <Link href={link.url}>{link.text}</Link>
                </li>
              ))}
            </MenuWrapper.Central>
            <MenuWrapper.RightSide>
              <Button variant="secondary.main" ghost href="/app/login">
                Entrar
              </Button>
              <Button variant="primary.main" onClick={onRegisterClick}>
                Cadastrar
              </Button>
            </MenuWrapper.RightSide>
          </>
        ) : (
          <>
            <MenuWrapper.LeftSide>
              <Logo />
            </MenuWrapper.LeftSide>
            <MenuWrapper.Central isLogged={isLogged}>
              <Box width="100%">
                <TextField placeholder="Pesquisar" isSearchInput />
              </Box>
            </MenuWrapper.Central>
            <MenuWrapper.RightSide isLogged={isLogged}>
              <Button ghost>
                <img
                  src="/images/plus.svg"
                  alt="Ícone de um círculo com um mais no meio"
                />
              </Button>
              <Button ghost>
                <img src="/images/home.svg" alt="Ícone de casa" />
              </Button>
              <Button ghost>
                <img src="/images/heart.svg" alt="Ícone de coração" />
              </Button>
              <Button ghost>
                <img
                  src={`https://github.com/${user.username}.png`}
                  alt={`Foto de ${user.username}`}
                  style={{ borderRadius: '50%' }}
                />
              </Button>
            </MenuWrapper.RightSide>
          </>
        )}
      </MenuWrapper>
    </Box>
  );
}

Menu.propTypes = {
  onRegisterClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

Menu.defaultProps = {
  user: {},
};
