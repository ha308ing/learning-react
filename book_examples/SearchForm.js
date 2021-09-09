import React, { useState } from "react"

export default function SearchForm( { value, onSearch } ) {
  const [ login_, setLogin ] = useState( value )

  return (
    <form onSubmit={ ( e ) => { e.preventDefault(); onSearch( login_ ) } }>
      <input
        type="text"
        value={ login_ }
        onChange={ e => setLogin( e.target.value ) }
      />
      <input type="submit" value="Search" />
    </form>
  )
}
