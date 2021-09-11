import React, { useEffect, useState, useMemo } from "react"
import SearchForm from "./SearchForm"
import GithubUser from "./GithubUser"
import UserRerositories from "./UserRepositories"
import RepositoryReadme from "./RepositoryReadme"
// import { GraphQLClient } from "graphql-request"
import ConditionalRender from "./ConditionalRender"
import List from "./List"
import renderStars from "./utils/renderStars"
import useGraphQL from "./hooks/useGraphQL"

export default function App() {
  const [ login, setLogin ] = useState( "moontahoe" )
  const [ repo, setRepo ] = useState( "quic" )

  // const [ gql_response, set_gql_response ] = useState(  )
  // const [ gql_state, set_gql_state ] = useState( "loading" )
  // const [ gql_error, set_gql_error ] = useState(  )
  // const [ gql_loading, set_gql_loading ] = useState( true )
  //
  // const queryGraphQL = `
  //   query getUser ( $login: String! ) {
  //     user ( login: $login ) {
  //       login
  //       name
  //       location
  //       avatar_url: avatarUrl
  //       repositories ( first: 10 ) {
  //         totalCount
  //         nodes {
  //           name
  //         }
  //       }
  //     }
  //   }
  // `
  //
  // const clientGraphQL = useMemo( (  ) => {
  //   return new GraphQLClient(
  //     "https://api.github.com/graphql",
  //     {
  //       headers: {
  //         Authorization: `bearer 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`
  //      }
  //     }
  //   )
  // }, [  ] )
  //
  // clientGraphQL.
  //   request( queryGraphQL, { login: "moontahoe" } ).
  //     then( results => JSON.stringify( results, null, 2 ) ).
  //     then( console.log ).
  //     catch( error => console.warn( JSON.stringify( error, null, 2 ) ) )
  //
  // useEffect(()=>{
  //   if (!login) return
  //   clientGraphQL.
  //     request( queryGraphQL, { login: login } ).
  //       then( response => {
  //         const { user } = response
  //         set_gql_loading( false )
  //         set_gql_error( false )
  //         set_gql_response( user )
  //         set_gql_state( "response" )
  //         return JSON.stringify( response, null, 2 )
  //       } ).
  //       catch( error => {
  //         const errorMessage = `Failed to do request.\nError: ${ error.status }: ${ error.message }`
  //         set_gql_error( errorMessage )
  //         set_gql_state( "error" )
  //         set_gql_loading( false )
  //         set_gql_response( "" )
  //       } )
  //   }, [ login ] )

  const status = useGraphQL( login )

  const handleSearch = login => {
    if ( login ) return setLogin(login)
    setLogin( "" )
    setRepo( "" )
  }

  if ( !login ) return <SearchForm value={ login } onSearch={ handleSearch } />

  return (
    <>
      <SearchForm value={ login } onSearch={ handleSearch } />
      <GithubUser login={ login } />
      <UserRerositories login={ login } repo={ repo } onSelect={ setRepo } />
      <RepositoryReadme login={ login } repo={ repo } /> 
      {/* {(()=>{
        switch(gql_state) {
          default:
          case "loading":return <p>Loading GraphQL..</p>
          case "error": return <pre>{ gql_error }</pre>
          case "response": return <List items={gql_response.repositories.nodes} renderItem={(item)=>item.name} />
          
        }})()
      } */}
      <ConditionalRender { ...status} >
        <img src={ status.data.avatar_url } width={ 100 } alt={ status.data.login } />
        <List
          items={ status.data.repos }
          renderItem={ ( { name, stars } ) => (
            <span
              style={ name === repo ? { color:"red" } : { cursor:"pointer" } }
              onClick={
                (  ) => name === repo ? alert( "hi" ) : setRepo( name ) } >{ name } { renderStars( stars ) }
            </span> )
          }
        />
      </ConditionalRender>
    </>
  )
}
