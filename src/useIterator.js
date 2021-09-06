import React, { useState } from "react"

export const useIterator = ( { items, initialIndex = 0 } ) => {
  const [ index, setIndex ] = useState( initialIndex )

  const next = () => {
    if ( index  === items.length - 1 ) setIndex( 0 )
    setIndex( index + 1 )
  }

  const prev = () => {
    if ( index === 0 ) setIndex( items.length - 1 )
    setIndex( index - 1 )
  }

  return [ items[index], next, prev ]
}
