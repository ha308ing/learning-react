import React, { useState, useCallback, useEffect } from "react"
import ReactMarkdown from "react-markdown"

const apost = login => 
  ( login[ login.length - 1 ] === 'x' || login[ login.length - 1 ] === 's' ) ?
    `${ login }'` : `${ login }'s`

export default function RepositoryReadme( { login, repo } ) {
  const [ loading, setLoading ] = useState( false )
  const [ error, setError ] = useState( false )
  const [ markdown, setMarkdown ] = useState( "" )

  const loadReadme = useCallback( async ( login, repo ) => {
    setLoading( true )
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`
    const { download_url } = await fetch( uri ).
      then( async(response) => {
        if ( [ 404, 403 ].includes( response.status ) ) {
          const { message } = await response.json()
          setLoading( false )
          throw new Error(`${ response.status }: ${ message }`)
        }
        return response.json()
      } )
    const m = await fetch( download_url ).then( res => res.text() )
    setMarkdown( m )
    setLoading( false )
    setError( false )
  }, [  ])

  useEffect( () => { 
    if ( !login || !repo ) return
    loadReadme( login, repo ).catch( setError )
   }, [ repo ])

  if ( loading ) return <p>Loading 'README' file for { repo } repository..</p>

  if (error) return <p>Failed to load 'README' file... Error: <span style={{ fontFamily:"monospace" }}>{ error.message }</span></p>

  return <ReactMarkdown>{ markdown }</ReactMarkdown>
}
