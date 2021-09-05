import React from "react"

const tahoe_peaks = [
  { name: "Freel Peak", elevation: 10891 },
  { name: "Monument Peak", elevation: 10067 },
  { name: "Pyramid Peak", elevation: 9983 },
  { name: "Mt. Tallac", elevation: 9735 }
]

function List( { data=[], renderItem, renderEmpty } ) {
  if ( !data.length ) return renderEmpty
  // return <p>{ data.length } items</p>
  return data.map( ( item, i) => <li key={ i }>{ renderItem(item) }</li> )
}

export default function App( ) {
  // return (
  //   <ul>
  //     {tahoe_peaks.map( ( peak, i ) =>
  //       <li key={ i }>{ peak.name } - { peak.elevation.toLocaleString() } ft.</li>
  //     )}
  //   </ul>
  // )

  // return <List renderEmpty={<p>This list is empty</p>} />

  return (
    <List
      data={ tahoe_peaks }
      renderEmpty={ <p>This list is empty</p> }
      renderItem={ item => <>{ item.name } - { item.elevation.toLocaleString() } ft.</> }
    />
  )



}
