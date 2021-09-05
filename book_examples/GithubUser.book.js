import React, { useState, useEffect } from "react"

const loadJSON = ( key ) =>
  key && JSON.parse( localStorage.getItem(key) )

const saveJSON = ( key, data ) =>
  localStorage.setItem( key, JSON.stringify( data ) )

const getKey = ( s ) => "fetch:"+/[\w-_]*$/gi.exec( s )[0]

export const useFetch = ( uri )  => {
  const storageKey = getKey( uri )
  const [ data, setData ] = useState( loadJSON( storageKey ) )
  const [ loading, setLoading ] = useState( data ? false : true )
  const [ error, setError ] = useState( false )
  
  useEffect( () => {
    if( !uri ) return
    if( !data ) {
      console.log( "do fetch" )
      setTimeout( () => {
      fetch( uri ).
        then( response => response.json() ).
        then( setData ).
        then( setLoading( false ) ).
        catch( setError )
      }, 3000 )
    }
  }, [uri] )

  useEffect( () => {
    if (!data) return
    let { avatar_url, name, location, login } = data
    saveJSON( storageKey, { avatar_url, name, location, login } )
  }, [data] )

  if ( loading ) return <h1>Loading</h1>

  if ( error ) return <pre>JSON.stringify( error, null, 2 )</pre>

  if (data)
    return (
      <div
      style={{
        color: "pink",
        display: "flex",
        height: "100px",
        margin: "15px 5px",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <img src={ data.avatar_url } alt={data.name} height={100} width={100} style={{clipPath:"circle(50px)"}} />
      <div>
        <h1>{ data.login }</h1>
        {data.name && <p>{ data.name }</p>}
        {data.location && <p>{ data.location }</p>}
      </div>
    </div>
    )
  
  return null



  return {
    data,
    loading,
    error
  }
}
