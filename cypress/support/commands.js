Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Luan')
    cy.get('#lastName').type('Cesar')
    cy.get('#email').type('test@test.com')
    cy.get('#open-text-area').type('Teste com Cypress.', { delay: 0 })

    cy.contains('button', 'Enviar').click()
})