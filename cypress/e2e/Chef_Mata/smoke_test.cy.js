import datos from '../../fixtures/Chef_Mata.json';

const inputs_to_manage = [
  'dish_name',
  'dish_price',
  'dish_description',
  'dish_badge',
  'dish_tag',
  'dish_ingredient',
  'dish_calories',
  'dish_protein',
  'dish_weight',
  'dish_cook_time',
  'dish_qr_link',
];

describe('Navegación a Chef Mata (pública)', () => {
  it('Debería navegar a la URL base', () => {
    cy.visit(datos.base_url);
    cy.url().should('include', datos.base_url);
    cy.contains('Nuestro Menú', { timeout: 10000 }).should('be.visible');
  });
});

describe('Navegación a Chef Mata (admin)', () => {
  beforeEach(() => {
    cy.env(['CHEF_MATA_ADMIN_LOGIN', 'CHEF_MATA_ADMIN_URL', 'CHEF_MATA_USER', 'CHEF_MATA_PASSWORD']).then(
      ({ CHEF_MATA_ADMIN_LOGIN, CHEF_MATA_ADMIN_URL, CHEF_MATA_USER, CHEF_MATA_PASSWORD }) => {
        cy.session(CHEF_MATA_USER, () => {
          cy.visit(CHEF_MATA_ADMIN_LOGIN);
          cy.get(datos.selectors.login.email_input).should('be.visible').type(CHEF_MATA_USER);
          cy.get(datos.selectors.login.password_input).should('be.visible').type(CHEF_MATA_PASSWORD);
          cy.click_buttons([datos.selectors.login.login_button]);
          cy.contains('Administración', { timeout: 10000 }).should('be.visible');
          cy.url().should('not.include', '/login');
        });
        cy.visit(CHEF_MATA_ADMIN_URL);
      },
    );
  });

  it('Debería crear un plato', () => {
    const inputs_data = inputs_to_manage.map((field) => ({
      selector: datos.selectors.create_dish[field],
      value: datos.dish_data[field.replace('dish_', '')],
    }));
    const buttons_to_click = [
      datos.dish_data.badge_color,
      datos.selectors.create_dish.dish_badge_create_button,
      datos.dish_data.tag_color,
      datos.selectors.create_dish.dish_tag_create_button,
      datos.selectors.create_dish.dish_tag_remove_button,
      datos.selectors.create_dish.dish_ingredient_add_button,
      datos.selectors.create_dish.dish_ingredient_remove_button,
      datos.selectors.create_dish.dish_create_button,
    ];
    cy.llenar_inputs(inputs_data);
    cy.get(datos.selectors.create_dish.dish_image).should('be.visible').selectFile(datos.dish_data.imagen);
    cy.get(datos.selectors.create_dish.dish_video).should('be.visible').selectFile(datos.dish_data.video);
    cy.click_buttons(buttons_to_click);
    cy.contains('Éxito', { timeout: 10000 }).should('be.visible');
  });

  it('Debería poder navegar a las distintas pantallas', () => {
    cy.click_buttons([datos.selectors.navigations.dish_manage]);
    cy.url().should('include', '/dishes');
    cy.click_buttons([datos.selectors.navigations.chef_info]);
    cy.url().should('include', '/admin/info');
    cy.click_buttons([datos.selectors.navigations.stats]);
    cy.url().should('include', '/admin/estadisticas');
    cy.window().then((win) => {
      cy.stub(win, 'open').as('nuevaPestana');
    });
    cy.click_buttons([datos.selectors.navigations.menu]);
    cy.get('@nuevaPestana').should('have.been.called');
    cy.get('@nuevaPestana').its('firstCall.args').should('deep.equal', ['/', '_blank']);
  });

  it('Debería editar un plato', () => {
    const edits_data = inputs_to_manage.map((field) => ({
      selector: datos.selectors.create_dish[field],
      value: datos.edit_data[field.replace('dish_', '')],
    }));
    const buttons_to_click = [
      datos.edit_data.badge_color,
      datos.selectors.create_dish.dish_badge_create_button,
      datos.edit_data.tag_color,
      datos.selectors.create_dish.dish_tag_create_button,
      datos.selectors.create_dish.dish_tag_remove_button,
      datos.selectors.create_dish.dish_ingredient_add_button,
      datos.selectors.create_dish.dish_ingredient_remove_button,
      datos.selectors.create_dish.dish_create_button,
    ];
    cy.click_buttons([datos.selectors.navigations.dish_manage, datos.selectors.manage_dish.edit_button]);
    cy.limpiar_inputs(inputs_to_manage.map((field) => datos.selectors.create_dish[field]));
    cy.llenar_inputs(edits_data);
    cy.get(datos.selectors.create_dish.dish_image).should('be.visible').selectFile(datos.edit_data.imagen);
    cy.click_buttons(buttons_to_click);
    cy.contains('ha sido actualizado', { timeout: 10000 }).should('be.visible');
  });

  it('Debería poder eliminar un plato', () => {
    cy.click_buttons([
      datos.selectors.navigations.dish_manage,
      datos.selectors.manage_dish.delete_button,
      datos.selectors.manage_dish.confirm_delete_button,
    ]);
    cy.contains('Plato eliminado').should('be.visible');
  });

  it('Debería poder cerrar sesión', () => {
    cy.click_buttons([datos.selectors.navigations.logout, datos.selectors.navigations.confirm_logout]);
    cy.url().should('eq', datos.base_url);
  });
});
