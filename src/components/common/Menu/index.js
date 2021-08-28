import React from 'react';
import PropTypes from 'prop-types';
import { MenuWrapper } from './styles/MenuWrapper';
import { Logo } from '../../../theme/Logo';
import { Button } from '../Button';
// import Text from '../../foundation/Text';
import { Link } from '../Link';

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

export default function Menu({ onRegisterClick }) {
  return (
    <MenuWrapper>
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
    </MenuWrapper>
  );
}

Menu.propTypes = {
  onRegisterClick: PropTypes.func.isRequired,
};
