import React, { useState, useCallback, useEffect } from "react"
import ReactMarkdown from "react-markdown"

export default function RepositoryReadme( { login, repo } ) {
  const [ loading, setLoading ] = useState( false )
  const [ error, setError ] = useState()
  const [ markdown, setMarkdown ] = useState( "" )

  const loadReadme = useCallback( async ( login, repo ) => {
    setLoading( true )
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`
    const { download_url } = await fetch( uri ).then( res => res.json() )
    const m = await fetch( download_url ).then( res => res.text() ).then(console.log)
    setMarkdown( m )
    console.log(markdown)
    console.log(m)
    setLoading( false)
  }, [  ])

  useEffect( () => { 
    if ( !login || !repo ) return
    loadReadme( login, repo ).catch( setError )
   }, [ repo ])


  if ( loading ) return <h1>Loading..</h1>

  if (error) return <pre>Something went wrong...\n{ JSON.stringify( error, null, 2) }</pre>

  return <ReactMarkdown source={markdown} />
}
