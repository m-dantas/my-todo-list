/* eslint-disable no-undef */
describe('my-todo-list test', () => {
  /*
    * cy.visit: define o path que vai visitar
    * cy.contains: ele procura alguma tag em que seu textcontent seja aquilo que foi passado por 
    parametro
    * cy.get: ele procura o elemento utilizando seletores css
    * .type: add um texto dentro do elemento selecionado
  */

  it('Should add new todo', () => {
    cy.visit('/')

    cy.get('[data-cy=input-todo]').type('Nova tarefa') // digita o valor na input
    cy.get('[data-cy=add-todo]').click() // clica para add uma nova TODO
    cy.get('[data-cy=todo-component]').should('to.have.length', 1) // verifica se a TODO foi add
  })

  it('Should add new todo 2', () => {    
    cy.get('[data-cy=input-todo]').type('Nova tarefa 2') // digita o valor na input
    cy.get('[data-cy=add-todo]').click() // clica para add uma nova TODO
    cy.get('[data-cy=todo-component]').should('to.have.length', 1)
  })

  it('Change TODO for check concluid', () => {
    cy.contains('Nova tarefa 2')
    .next().children('[data-cy=concluir]').click()
  })

  it('Remove TODO', () => {
    cy.contains('Nova tarefa')
    .next().children('[data-cy=remover]').click()
  })

  it('Change TODO for unchecked concluid', () => {
    cy.contains('Nova tarefa 2')
    .next().children('[data-cy=concluir]').click()
  })

  it('Visit Kanban', () => {    
    cy.contains('Kanban').click()
  })

  it('Concluid all TODO', () => {
    cy.contains('Concluir').click()
  })

  it('UnChecked concluid all', () => {
    cy.contains('Desmarcar tudo').click()
  })

  it('Concluid all TODO', () => {
    cy.contains('Concluir').click()
  })

  it('Remove all TODO', () => {
    cy.contains('Remover tudo').click()
  })

  it('Return Home', () => {
    cy.contains('Home').click()
  })
})