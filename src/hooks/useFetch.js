import React, { useState, useEffect } from "react"

export const useFetch = ( uri )  => {
  const [ data, setData ] = useState(  )
  const [ loading, setLoading ] = useState( true )
  const [ error, setError ] = useState( false )
  
  useEffect( () => {
    if( !uri ) return
    setTimeout( (  ) => {
      fetch( uri ).
        then( async( response ) => {
          if ( [ 404, 403 ].includes( response.status ) ) {
            const { message } = await response.json();
            throw new Error( `${ response.status }: ${ message }` )
          }
          else return response.json()
        } ).
        then( setData ).
        then( () => setError( false ) ).
        then( () => setLoading( false ) ).
        catch( setError )
      }, 0 )
      
  }, [uri] )

  return {
    data,
    loading,
    error
  }
}
