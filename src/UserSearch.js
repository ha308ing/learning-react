import React, { useState } from "react"

export default function UserSearch( { user, handleSearch } ) {
  const [ user_, setUser ] = useState( user )

  return (
    <form onSubmit={ ( e ) => { e.preventDefault(); handleSearch( user_ ) } }>
      <input
        type="text"
        value={ user_ }
        onChange={ e => setUser( e.target.value ) }
      />
      <input type="submit" value="Search" />
    </form>
  )
}
