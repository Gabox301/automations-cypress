// For more comprehensive examples of custom commands please read more here: https://on.cypress.io/custom-commands

// -----------------
// Backend commands
// -----------------

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

Cypress.Commands.add('orux_auth', (username, password) => {
  cy.env(['SUPABASE_ANON_KEY', 'SUPABASE_URL']).then(({ SUPABASE_ANON_KEY, SUPABASE_URL }) => {
    return cy
      .request({
        method: 'POST',
        url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        body: {
          email: username,
          password: password,
        },
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
        },
        timeout: timeout,
      })
      .then((response) => {
        expect(response.status, 'Request realizado con éxito').to.eq(200);
        expect(response.body.access_token, 'Token de acceso obtenido').not.to.be.empty;
      });
  });
});

Cypress.Commands.add('orux_crud_api', (method, endpoint, body = null, token = null) => {
  cy.env(['ORUX_BASE_URL']).then(({ ORUX_BASE_URL }) => {
    const request_config = {
      method: method.toUpperCase(),
      url: `${ORUX_BASE_URL}/api/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      timeout: timeout,
    };
    if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      request_config.body = body;
    }
    return cy.request(request_config);
  });
});

// -----------------
// Frontend commands
// -----------------

Cypress.Commands.add('llenar_inputs', (inputs) => {
  inputs.forEach(({ selector, value }) => {
    cy.get(selector).should('be.visible').type(value);
  });
});

Cypress.Commands.add('limpiar_inputs', (selectors) => {
  selectors.forEach((selector) => {
    cy.get(selector).clear();
  });
});

Cypress.Commands.add('click_buttons', (selectors) => {
  if (Array.isArray(selectors)) {
    selectors.forEach((selector) => {
      cy.get(selector).should('be.visible').click();
    });
  } else {
    cy.get(selectors).should('be.visible').click();
  }
});
