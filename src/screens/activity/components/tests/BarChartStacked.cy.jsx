import BarChartStacked from '../BarChartStacked'

const someData = {
    "labels":["01-05-2022", "02-05-2022", "03-05-2022", "04-05-2022", "05-05-2022", "06-05-2022", "07-05-2022","08-05-2022","09-05-2022","10-05-2022"],
    "datasets":[
          {
              "label": "Active",
              "data": [4,6,6,5,6,6,5,6,7,8]
          },
          {
              "label": "Inactive",
              "data": [2,1,1,2,1,1,2,2,1,0]
          },
          {
              "label": "Moving",
              "data": [2,1,1,1,1,1,1,1,1,1]     
          }
      ]
  }

describe('<BarChartStacked>', () => {
  it('mounts ideally', () => {
    cy.mount(<BarChartStacked networkData={someData}
        title="Some Title"
        subtitle={'Some Subtitle'}/>)
    
    cy.get('[data-cy=listItemText]').contains('Some')
  })

  it('mounts without title and subtitle', () => {
    cy.mount(<BarChartStacked networkData={someData}
       />)
  })
})