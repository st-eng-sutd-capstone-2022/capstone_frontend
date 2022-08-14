import BarChart from '../BarChart'

const someData = {
    "labels":["01-05-2022", "02-05-2022", "03-05-2022", "04-05-2022", "05-05-2022", "06-05-2022", "07-05-2022","08-05-2022","09-05-2022","10-05-2022"],
    "datasets": [1,2,5,2,6,7,2,5,2,8]
}

describe('<BarChart>', () => {
  it('mounts ideally', () => {
    cy.mount(<BarChart networkData={someData}
        title="Some Title"
        subtitle={'Some Subtitle'}/>)
    
    cy.get('[data-cy=listItemText]').contains('Some')
  })

  it('mounts without title and subtitle', () => {
    cy.mount(<BarChart networkData={someData}
       />)
  })
})