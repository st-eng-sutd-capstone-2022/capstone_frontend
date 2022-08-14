import LineChart from '../LineChart'

const twolineData = {
    "labels":["01-05-2022", "02-05-2022", "03-05-2022", "04-05-2022", "05-05-2022", "06-05-2022", "07-05-2022","08-05-2022","09-05-2022","10-05-2022"],
    "datasets": [
                        {
                "label": "ActiveHours",
                "data": [1,2,5,2,6,7,2,5,2,8]
            },
                        {
                                "label": "BatteryUsed",
                "data": [50.3,63.3,70,62.8,71,61,68.2,53,80]
                        }
                    ]

}

const singleLineData = {
    "labels":["01-05-2022", "02-05-2022", "03-05-2022", "04-05-2022", "05-05-2022", "06-05-2022", "07-05-2022","08-05-2022","09-05-2022","10-05-2022"],
    "datasets":[50.3,63.3,70,62.8,71,61,68.2,53,80]
}

describe('<BarChart>', () => {
  it('mounts ideally', () => {
    cy.mount(<LineChart networkData={singleLineData}
        multi={false}
        title="Some Title"
        subtitle='Some Subtitle'/>)
    
    cy.get('[data-cy=listItemText]').contains('Some')
  })

  it('mounts with 2 dataset', () => {
    cy.mount(<LineChart networkData={twolineData}
        multi={true}
        title="Some Title"
        subtitle='Some Subtitle'
       />)
    cy.get('[data-cy=listItemText]').contains('Some')
  })
})