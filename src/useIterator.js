import React, { useState, useCallback, useMemo } from "react"

export const useIterator = ( { items, initialIndex = 0 } ) => {
  const [ index, setIndex ] = useState( initialIndex )

  const next = useCallback( () => {
    if ( index  === items.length - 1 ) setIndex( 0 )
    setIndex( index + 1 )
  }, [ index ])

  const prev = useCallback( () => {
    if ( index === 0 ) setIndex( items.length - 1 )
    setIndex( index - 1 )
  }, [ index ])

  const item = useMemo( () => items[index], [ index ] )
  return [ item || items[0], next, prev ]
}
