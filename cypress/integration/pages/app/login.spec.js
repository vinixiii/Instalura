/* eslint-disable comma-dangle */
// Habilitar alguns auto-completes do Cypress no VSCode
/// <reference types="cypress" />

// Define uma descrição para o teste
describe('pages/app/login', () => {
  it('preencha os campos e vá para a página de perfil (/app/profile/)', () => {
    // Averá uma chamada para esse Endpoint
    cy.intercept('https://instalura-api-omariosouto.vercel.app/api/login').as(
      // É um alias para a chamada do Endpoint
      'userLogin'
    );

    // Ir até a página de login
    cy.visit('/app/login/');
    // Preencher o input usuario
    cy.get('#loginForm input[name="username"]').type('vinixiii');
    // Preencher o input senha
    cy.get('#loginForm input[name="password"]').type('senhasegura');
    // Clicar no botão entrar
    cy.get('#loginForm button[type="submit"]').click();
    // O que esperamos que aconteça?
    cy.url().should('include', '/app/profile/');

    // Temos o token?
    // Pedimos para esperar a respota desse endpoint
    // .wait é uma promise
    cy.wait('@userLogin').then((intercept) => {
      // Intercepta o valor do token da response
      const { token } = intercept.response.body.data;
      // Verificamos se o token foi salvo nos cookies
      cy.getCookie('APP_TOKEN')
        // Verifica se o token existe
        .should('exist')
        // Verifica se o valor do token no cookie é igual
        // ao valor que veio na response
        .should('have.property', 'value', token);
    });
  });
});
