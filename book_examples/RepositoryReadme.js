import React, { useState, useCallback, useEffect } from "react"
import ReactMarkdown from "react-markdown"

export default function RepositoryReadme( { login, repo } ) {
  const [ loading, setLoading ] = useState( false )
  const [ error, setError ] = useState()
  const [ markdown, setMarkdown ] = useState( "" )

  const loadReadme = useCallback( async ( login, repo ) => {
    setLoading( true )
    const uri = `https://api.github.com/repos/${ login }/${ repo }/readme`
    const { download_url } = await fetch( uri ).then( async ( res ) => {
      const response = await res.json()
      if ( res.status !== 200 )
        throw `Error Loading README file.\n${ res.status }: ${ response.message }`
      return response
    } )
    const markdown = await fetch( download_url ).then( res => res.text() )
    setMarkdown( markdown)
    setLoading( false)
  }, [  ] )

  useEffect( () => { 
    if ( !login || !repo ) return
    loadReadme( login, repo ).catch( e => setError( new Error( e ) ) )
   }, [ repo ])

   if (error) return <pre>{ JSON.stringify( error, null, 2 ) }</pre>

  if ( loading ) return <p>Loading..</p>

   if ( error ) return <pre style={{ whiteSpace:"break-spaces" }}>{ error }</pre>

  return <ReactMarkdown>{ markdown }</ReactMarkdown>
}
