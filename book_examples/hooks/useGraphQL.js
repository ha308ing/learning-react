import React, { useState, useEffect, useMemo, useCallback } from "react"
import { GraphQLClient } from "graphql-request"

export default function useGraphQL( login ) {
  const [ data, setData ] = useState( {
    login: null,
    name: null,
    location: null,
    avatar_url: null,
    reposQty: null,
    repos: null,
    message: "Loading",
    flag: -1
  } )
  const [ flag, setFlag ] = useState( -1 ) // -1 | 0 | 1 - loading | error | success

  const client = useMemo( (  ) => new GraphQLClient(
    "https://api.github.com/graphql",
    {
      headers: {
        Authorization: "bearer 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"
      }
    }
  ), [  ] )

  const query = `
    query getData( $login: String! ) {
      user( login: $login ) {
        login
        name
        location
        avatar_url: avatarUrl
        repositories( first: 100 ) {
          totalCount
          nodes {
            name
            stars: stargazerCount
            url
          }
        }
      }
    }
  `

  useEffect( (  ) => {
    if ( !login ) return
    setFlag( -1 )
    setData( {
      login: null,
      name: null,
      location: null,
      avatar_url: null,
      reposQty: null,
      repos: null,
      message: "Loading",
      flag: -1
    } )
    client.request( query, { login: login }).
    then( ( { user, status, message } ) => {
      console.info("USEGRAPHQL REQUEST RUN")
      if ( status && status !== 200 )
        throw ( {
          response: {
            status: "999" || status,
            message: "Uncatched error" || message
          }
        } )
      setData( {...user, repos:user.repositories.nodes, reposQty:user.repositories.totalCount, message: "Success", flag: 1 })
      setFlag( 1 )
    } ).
    catch( error => {
      const { status, message } = error.response
      console.log( { ...error } )
      console.warn( JSON.stringify( error, null, 2 ) )
      setData( {
        message: `Failed to execute request.\nError ${ status }: ${ message }`, flag: 0
      } )
      setFlag( 0 )
    } )
  }, [ login ] )

  return (
    {
      data,
      flag
    }
  )
}
