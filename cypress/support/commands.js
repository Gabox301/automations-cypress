// For more comprehensive examples of custom commands please read more here: https://on.cypress.io/custom-commands

const timeout = 80000;

Cypress.Commands.add('limpiar_base', (endpoint) => {
  cy.env(['API_TOKEN', 'API_URL']).then(({ API_TOKEN, API_URL }) => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/cache/${endpoint}`,
      body: {
        Token: API_TOKEN,
      },
      timeout: timeout,
    }).then((response) => {
      expect(response.status, `Request realizado con éxito para ${endpoint}`).to.eq(200);
      expect(response.body.message, `Limpieza de ${endpoint} exitosa`).to.include(`cache cleared`);
    });
  });
});
