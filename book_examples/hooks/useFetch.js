import React, { useState, useEffect } from "react"

export const useFetch = ( uri )  => {
  const [ data, setData ] = useState(  )
  const [ loading, setLoading ] = useState( true )
  const [ error, setError ] = useState(  )
  console.log('usefetch:')
  console.log(uri)
  
  useEffect( () => {
    if( !uri ) return
    if( !data ) {
      console.log( "do fetch" )
      setTimeout( () => {
      fetch( uri ).
        then( response => response.json() ).
        then( setData ).
        then( () => setLoading( false ) ).
        catch( setError )
      }, 3000 )
    }
  }, [uri] )

  return {
    data,
    loading,
    error
  }
}
