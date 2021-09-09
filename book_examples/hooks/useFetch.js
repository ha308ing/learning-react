import React, { useState, useEffect } from "react"
import { useMountedRef } from "./useMountedRef"

export const useFetch = ( uri )  => {
  const [ data, setData ] = useState(  )
  const [ loading, setLoading ] = useState( true )
  const [ error, setError ] = useState(  )
  
  const mounted = useMountedRef()
  useEffect( () => { ( async function () {
    if( !uri ) return
    if( !mounted.current ) return
        if ( !mounted.current ) throw "Component is not mounted" 
      then( async( response ) => {
        const { status } = response
        const responseJSON = await response.json()
        const { message } = responseJSON
        if ( status !== 200 ) {
          throw `Failed to fetch ${uri}.\nError: ${status}:\n${message}`
        }
        return responseJSON } ).
      then( setData ).
      then( () => setLoading( false ) ).
      then( () => setError( false ) ).
      catch( error => {
        if ( !mounted.current ) return
        console.warn(error)
        setError( error )
        setData( null )
        setLoading( false )
      } )
  } )() }, [ uri ] )

  return {
    data,
    loading,
    error
  }
}
