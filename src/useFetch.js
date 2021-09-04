import React, { useState, useEffect } from "react"

const loadJSON = ( key ) =>
  key && JSON.parse( localStorage.getItem(key) )

const saveJSON = ( key, data ) =>
  localStorage.setItem( key, JSON.stringify( data ) )

const getKey = ( s ) => "fetch:"+/[\w-_]*$/gi.exec( s )[0]

export const useFetch = ( uri )  => {
  const storageKey = getKey( uri )
  const [ data, setData ] = useState( loadJSON( storageKey ) )
  const [ loader, setLoader ] = useState( data ? false : true )
  const [ error, setError ] = useState( false )
  
  useEffect( () => {
    if( !uri ) return
    if( !data ) {
      console.log( "do fetch" )
      setTimeout( () => {
      fetch( uri ).
        then( response => response.json() ).
        then( setData ).
        then( setLoader( false ) ).
        catch( setError )
      }, 3000 )
    }
  }, [uri] )

  useEffect( () => {
    saveJSON( storageKey, data )
  }, [data] )

  return {
    data,
    loader,
    error
  }
}
