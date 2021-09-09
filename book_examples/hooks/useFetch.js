import React, { useState, useEffect } from "react"

export const useFetch = ( uri )  => {
  const [ data, setData ] = useState(  )
  const [ loading, setLoading ] = useState( true )
  const [ error, setError ] = useState(  )
  
  useEffect( () => {
    if( !uri ) return
    if( !data ) {
      fetch( uri ).
      then( async( response ) => {
        const { status } = response
        const responseJSON = await response.json()
        const { message } = responseJSON
        if ( status !== 200 ) {
          throw `Failed to fetch ${uri}.\nError: ${status}:\n${message}`
        }
        return responseJSON } ).
        catch( setError )
    }
  }, [uri] )

  return {
    data,
    loading,
    error
  }
}
