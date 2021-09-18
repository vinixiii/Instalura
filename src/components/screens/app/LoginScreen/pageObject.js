export class LoginScreenPageObject {
  constructor(cy) {
    this.cy = cy;

    // Ir até a página de login
    this.cy.visit('/app/login');
  }

  fillFormFields({ username, password }) {
    // Preencher o input usuario
    this.cy.get('#loginForm input[name="username"]').type(username);
    // Preencher o input senha
    this.cy.get('#loginForm input[name="password"]').type(password);

    return this;
  }

  submitForm() {
    // Clicar no botão entrar
    this.cy.get('#loginForm button[type="submit"]').click();

    return this;
  }
}
