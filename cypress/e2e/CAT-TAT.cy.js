/// <reference types='Cypress' />

describe('Central de atendimento ao cliente TAT', function () {
  const THREE_SECONDS_IN_MS = 3000

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  //[Caso de Teste 001]
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  //[Caso de Teste 002]
  it('Preenche os campos obrigatórios e envia o formulário com invoke', () => {
    const longText =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'

    cy.clock()

    cy.get('#firstName').type('Luan')
    cy.get('#lastName').type('Cesar')
    cy.get('#email').type('test@test.com')
    cy.get('#open-text-area')
      .invoke('val', longText) // força a apresentação do longText no text-area
      .should('have.value', longText)

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
  })

  //[Caso de Teste 003]
  it('Exibe mensagem de erro ao submeter o formulário com email inválido', () => {
    cy.clock()

    cy.get('#firstName').type('Luan')
    cy.get('#lastName').type('Cesar')
    cy.get('#email').type('test@test,com')
    cy.get('#open-text-area').type('Teste com Cypress.', { delay: 0 })

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  //[Caso de Teste 004]
  it('Campo  telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone').type('abcdefgh').should('have.value', '')
  })

  //[Caso de Teste 005]
  it('Exibe mensagem de erro quando o telefone se torna obrigatório e não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName').type('Luan')
    cy.get('#lastName').type('Cesar')
    cy.get('#email').type('test@test.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste com Cypress.', { delay: 0 })

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  //[Caso de Teste 006]
  it('Preencher e limpa os campos nome, sobrenome, email, telefone e área de texto', () => {
    const longText =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'

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
      .invoke('val', longText) // força a apresentação do longText no text-area
      .should('have.value', longText)
      .clear()
      .should('have.value', '')
  })

  //[Caso de Teste 007]
  it('Exibe mensagem de erro ao submeter o form sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  //[Caso de Teste 008]
  it('Envia o form com sucesso usando comando customizado', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
  })

  //[Caso de Teste 009]
  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  //[Caso de Teste 010]
  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  //[Caso de Teste 011]
  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  //[Caso de Teste 012]
  it('Marca o tipo de atendimento (Feedback)', () => {
    cy.get("input[type='radio'][value='feedback']")
      .check()
      .should('have.value', 'feedback')
  })

  //[Caso de Teste 013]
  it('Marca cada tipo de atendimento', () => {
    cy.get("input[type='radio']")
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  //[Caso de Teste 014]
  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get("input[type='checkbox']")
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  //[Caso de Teste 015]
  it('Selecina um arquivo da pasta fixtures (upload de arquivos)', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($arquivo) {
        expect($arquivo[0].files[0].name).to.eql('example.json')
      })
  })

  //[Caso de Teste 016]
  it('Seleciona um arquivo simulando um drag-and-drop (arrastando o aquivo)', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/drag-and-drop.json', {
        action: 'drag-drop',
      })
      .should(function ($arquivo) {
        expect($arquivo[0].files[0].name).to.eql('drag-and-drop.json')
      })
  })

  //[Caso de Teste 017]
  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(function ($arquivo) {
        expect($arquivo[0].files[0].name).to.eql('example.json')
      })
  })

  //[Caso de Teste 018]
  it('Verifica que politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  //[Caso de Teste 019]
  it('Acessa a página de politica de privacidade removendo a target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()

    cy.contains('Talking About Testing').should('be.visible')
  })

  //[Caso de Teste 020]
  it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show') // força a apresentação da mensagem em tela
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide') // força a exclusão da mensagem em tela
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show') // força a apresentação da mensagem em tela
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide') // força a exclusão da mensagem em tela
      .should('not.be.visible')
  })

  //[Caso de Teste 021]
  it('Preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('Automation Test with cypress.io', 20)

    cy.get('#open-text-area')
      .invoke('val', longText) // força a apresentação do longText no text-area
      .should('have.value', longText)
  })

  //[Caso de Teste 022]
  it('Faz uma requisição HTTP', () => {
    cy.request(
      'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    ).should(function (response) {
      const { status, statusText, body } = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')
    })
  })

  //[Caso de Teste 023]
  it('Encontrar o gato escondido e substituir titulo e subtituto por novos textos', () => {
    cy.get('#cat')
      .invoke('show') // força a apresentação do Id cat em tela
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT') // força a apresentação do título 'CAT TAT' em tela
      .should('be.visible')
      cy.get('#subtitle')
      .invoke('text', 'I ❤️ Santos F.C 💯') // força a apresentação do subtítulo 'I ❤️ Santos F.C 💯' em tela
      .should('be.visible')
  })
})
