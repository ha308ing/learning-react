import React, { useEffect } from "react"
import { useIterator } from "./hooks/useIterator"
import RepositoryReadme from "./RepositoryReadme"

export default function RepoMenu( { repositories, onSelect = f => f, login } ) {
  const [ { name }, previous, next ] = useIterator( repositories )

  useEffect( (  )=>{
    if ( !name ) return
    onSelect( name )
  }, [ name ] )
  
  if ( repositories.length < 1 ) return <p>User { login } have no public repositories.</p>

  return (
    <>
      <div style={{ display:"flex" }}>
        { repositories.length > 1 && <button onClick={ previous }>&lt;</button> }
        <p>{ name }</p>
        { repositories.length > 1 && <button onClick={ next }>&gt;</button> }
      </div>
      <RepositoryReadme login={ login } repo={ name } />
    </>
  )
}
