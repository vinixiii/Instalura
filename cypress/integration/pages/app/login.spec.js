/* eslint-disable comma-dangle */
// Habilitar alguns auto-completes do Cypress no VSCode
/// <reference types="cypress" />

import { LoginScreenPageObject } from '../../../../src/components/screens/app/LoginScreen/pageObject';

// Define uma descrição para o teste
describe('pages/app/login', () => {
  describe('when fill form fields and submit a login request', () => {
    it('go to profile page', () => {
      // === Pré-teste ===
      // Averá uma chamada para esse Endpoint
      cy.intercept(
        'https://instalura-api-git-master-omariosouto.vercel.app/api/login'
      ).as(
        // É um alias para a chamada do Endpoint
        'userLogin'
      );

      // === Cenário ===
      const loginScreen = new LoginScreenPageObject(cy);

      loginScreen
        .fillFormFields({
          username: 'vinixiii',
          password: 'senhasegura',
        })
        .submitForm();

      // === Asserções ===
      // O que esperamos que aconteça?
      cy.url().should('include', '/app/profile/');

      // Temos o token?
      // Pedimos para esperar a respota desse endpoint
      // .wait é uma promise
      cy.wait('@userLogin').then((intercept) => {
        // Intercepta o valor do token da response
        const { token } = intercept.response.body.data;
        // Verificamos se o token foi salvo nos cookies
        cy.getCookie('LOGIN_COOKIE_APP_TOKEN')
          // Verifica se o token existe
          .should('exist')
          // Verifica se o valor do token no cookie é igual
          // ao valor que veio na response
          .should('have.property', 'value', token);
      });
    });
  });

  // it('preencha os campos e vá para a página de perfil (/app/profile/)', () => {
  //   // Averá uma chamada para esse Endpoint
  //   cy.intercept(
  //     'https://instalura-api-git-master-omariosouto.vercel.app/api/login'
  //   ).as(
  //     // É um alias para a chamada do Endpoint
  //     'userLogin'
  //   );

  //   const loginScreen = new LoginScreenPageObject(cy);

  //   loginScreen
  //     .fillFormFields({
  //       username: 'vinixiii',
  //       password: 'senhasegura',
  //     })
  //     .submitForm();

  //   // O que esperamos que aconteça?
  //   cy.url().should('include', '/app/profile/');

  //   // Temos o token?
  //   // Pedimos para esperar a respota desse endpoint
  //   // .wait é uma promise
  //   cy.wait('@userLogin').then((intercept) => {
  //     // Intercepta o valor do token da response
  //     const { token } = intercept.response.body.data;
  //     // Verificamos se o token foi salvo nos cookies
  //     cy.getCookie('APP_TOKEN')
  //       // Verifica se o token existe
  //       .should('exist')
  //       // Verifica se o valor do token no cookie é igual
  //       // ao valor que veio na response
  //       .should('have.property', 'value', token);
  //   });
  // });
});
