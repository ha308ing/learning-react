import React, { useCallback, useEffect } from "react"
import { useIterator } from "./hooks/useIterator"

export default function RepoMenu( { repositories, selected, onSelect = f => f } ) {

  const index = useCallback( (  ) => {
    let s = repositories.findIndex( repo => repo.name === selected )
    return s !== -1 ? s : null
  }, [ repositories, selected ] )

  const [ { name }, previous, next ] = useIterator( repositories, index )

  useEffect( () => {
    onSelect( name )
  }, [ name ])

  return (
    <>
      <div style={{ display:"flex" }}>
        <button onClick={ previous }>&lt;</button>
        <p>{ name }</p>
        <button onClick={ next }>&gt;</button>
      </div>
    </>
  )
}
