import React from 'react';
import styled from 'styled-components';
import { TextStyleVariantsMap } from '../../foundation/Text';

const FooterWrapper = styled.footer`
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding-right: 28px;
  padding-left: 28px;

  ${TextStyleVariantsMap.paragraph2}

  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: ${({ theme }) => theme.colors.primary.main.color};
    text-decoration: none;
    transition: 0.3s;
    &:hover,
    &:focus {
      opacity: 0.5;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://www.alura.com.br/">
        <img
          src="https://www.alura.com.br/assets/img/alura-logo.svg"
          alt="Logo Alura"
        />
      </a>
      <p>
        Feito com &#128149; por
        <a
          href="https://www.github.com/vinixiii"
          target="_blank"
          rel="noreferrer"
        >
          <span> Vinícius Figueiroa </span>
        </a>
        durante o
        <a href="https://www.alura.com.br/" target="_blank" rel="noreferrer">
          <span> Bootcamp Alura JAM Stack</span>
        </a>
      </p>
    </FooterWrapper>
  );
}
