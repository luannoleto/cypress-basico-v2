/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    //[Caso de Teste 001]
    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //[Caso de Teste 002]
    it('preenche os campos obrigatórios e envia o formulário com delay', () => {

        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'

        cy.get('#firstName').type('Luan')
        cy.get('#lastName').type('Cesar')
        cy.get('#email').type('test@test.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    //[Caso de Teste 003]
    it('exibe mensagem de erro ao submeter o formulário com email inválido', () => {
        cy.get('#firstName').type('Luan')
        cy.get('#lastName').type('Cesar')
        cy.get('#email').type('test@test,com')
        cy.get('#open-text-area').type('Teste com Cypress.')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //[Caso de Teste 004]
    it('campo  telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone')
            .type('abcdefgh')
            .should('have.value', '')
    })

    //[Caso de Teste 005]
    it('exibe mensagem de erro quando o telefone se torna obrigatório e não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Luan')
        cy.get('#lastName').type('Cesar')
        cy.get('#email').type('test@test.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste com Cypress.')

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //[Caso de Teste 006]
    it('preencher e limpa os campos nome, sobrenome, email, telefone e área de texto', () => {

        const longTest = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'

        cy.get('#firstName')
            .type('Luan')
            .should('have.value', 'Luan')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Cesar')
            .should('have.value', 'Cesar')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('test@test.com')
            .should('have.value', 'test@test.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('991907097')
            .should('have.value', '991907097')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type(longTest, { delay: 0 })
            .should('have.value', longTest)
            .clear()
            .should('have.value', '')
    })

    //[Caso de Teste 007]
    it('exibe mensagem de erro ao submeter o form sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //[Caso de Teste 008]
    it('envia o form com sucesso usando comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //[Caso de Teste 009]
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    //[Caso de Teste 010]
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    //[Caso de Teste 011]
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    //[Caso de Teste 012]
    it('marca o tipo de atendimento (Feedback)', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    //[Caso de Teste 013]
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio)
                    .should('be.checked')
            })
    })

    //[Caso de Teste 014]
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    //[Caso de Teste 015]
    it('selecina um arquivo da pasta fixtures (upload de arquivos)', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($arquivo) {
                expect($arquivo[0].files[0].name).to.eql('example.json')
            })
    })

    //[Caso de Teste 016]
    it('seleciona um arquivo simulando um drag-and-drop (arrastando o aquivo)', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/drag-and-drop.json', { action: 'drag-drop' })
            .should(function ($arquivo) {
                expect($arquivo[0].files[0].name).to.eql('drag-and-drop.json')
            })
    })

    //[Caso de Teste 017]
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(function ($arquivo) {
                expect($arquivo[0].files[0].name).to.eql('example.json')
            })
    })

    //[Caso de Teste 018]
    it('verifica que politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    //[Caso de Teste 019]
    it('acessa a página de politica de privacidade removendo a target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing')
            .should('be.visible')
    })
})
