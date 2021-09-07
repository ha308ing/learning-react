import React, { useCallback, useEffect, useState, useMemo } from "react"
import { useFetch } from "./hooks/useFetch"
import UserSearch from "./UserSearch"
import UserDetails from "./UserDetails"
import RepoMenu from "./RepoMenu"
import ReactMarkdown from "react-markdown"

export default function GithubUser( { login = "eve" } ) {
  const [ login_, setUser ] = useState( login )
  const [ repo, setRepo ] = useState()

  const userUri = useMemo( () => `https://api.github.com/users/${ login_ }`, [ login_ ])
  const repoUri = useMemo( () => `https://api.github.com/users/${ login_ }/repos`, [ login_ ])
  const repoReadmeUri = useMemo( () => `https://api.github.com/repos/${ login_ }/${ repo }/readme`, [ login_, repo ])

  // avoid state for cuz its computable
  const [ readmeText, setReadmeText ] = useState()

  const userFetch = useFetch( userUri )
  const repoFetch = useFetch( repoUri )

  const loadReadmeText = useCallback( async () => {
    fetch( repoReadmeUri ).
    // switch then to await
      then( async ( response ) => {
        if ( [ 403, 404 ].includes( response.status ) ) {
          setReadmeText( 'no repo' )
          const { errorMessage } = await response.json()
          throw new Error( `failed to load README file from ${ repo } repo. Error: ${ response.status }: ${ errorMessage }` )
        }
        return response.json()
      } ).
      then( j => { const { download_url } = j; return download_url } ).
      then( d => fetch( d ). //add error handler, switch to hook
        then( t => t.text() ).
        then( setReadmeText )
      ).catch( console.warn )
  }, [ repo ] )

  useEffect( () => {
    if ( !login_ || !repo ) return
    loadReadmeText()
  }, [ repo ] )

  return (
    <>
      <UserSearch handleSearch={ setUser } user={ login_ } />
      { userFetch.data && <UserDetails data={ userFetch.data } /> }
      { repoFetch.data && <RepoMenu onSelect={ setRepo } repos={ repoFetch.data } login={ login_ } /> }
      <ReactMarkdown>{ readmeText }</ReactMarkdown>
    </>
  )
}
