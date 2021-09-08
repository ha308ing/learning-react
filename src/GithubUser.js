import React, { useCallback, useEffect, useState, useMemo } from "react"
import { useFetch } from "./hooks/useFetch"
import UserSearch from "./UserSearch"
import UserDetails from "./UserDetails"
import RepoMenu from "./RepoMenu"
import ReactMarkdown from "react-markdown"

export default function GithubUser( { login = "eve", repo } ) {
  const [ login_, setUser ] = useState( login )
  const [ repo_, setRepo ] = useState(repo)

  const userUri = useMemo( () => `https://api.github.com/users/${ login_ }`, [ login_ ])
  const repoUri = useMemo( () => `https://api.github.com/users/${ login_ }/repos`, [ login_ ])
  const repoReadmeUri = useMemo( () => `https://api.github.com/repos/${ login_ }/${ repo_ }/readme`, [ login_, repo_ ])

  // avoid state for cuz its computable
  const [ readmeText, setReadmeText ] = useState()

  const userFetch = useFetch( userUri )
  const repoFetch = useFetch( repoUri )

  const loadReadmeText = useCallback( async () => {
    try {
      const request = await fetch( repoReadmeUri )
      const { status } = request
      const response = await request.json()

      if ( [ 403, 404 ].includes( status ) ) {
        setReadmeText( 'no repo' )
        const { message } = response
        throw Error( `failed to load README file from ${ repo_ } repo. Error: ${ status }: ${ message }` )
      }

      const { download_url } = response
      const readmeContent = await (await fetch( download_url )).text()
      setReadmeText( readmeContent ) 
    } catch( error ) {
      console.warn( error )
    }
  }, [ repo_ ] )

  useEffect( () => {
    if ( !login_ || !repo_ ) return
    loadReadmeText()
  }, [ repo_ ] )

  return (
    <>
      <UserSearch handleSearch={ setUser } user={ login_ } />
      { userFetch.data && <UserDetails data={ userFetch.data } /> }
      { repoFetch.data && <RepoMenu onSelect={ setRepo } repositories={ repoFetch.data } login={ login_ } /> }
      <ReactMarkdown>{ readmeText }</ReactMarkdown>
    </>
  )
}
