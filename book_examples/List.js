import React from "react"

export default function List( { items, renderItem = f => f } ) {
  return (
    <ul>
      { items.map( ( item, i ) => 
        <li key={ i }>{ renderItem( item ) }</li>
      ) }
    </ul>
  )
}
