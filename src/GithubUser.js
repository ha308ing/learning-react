import React from "react"
import { useFetch } from "./useFetch"


export default function GithubUser( { login, renderLoading, renderData, renderError } ) {
  const { data, loading, error } = useFetch( `https://api.github.com/users/${ login }` )

  return (
    <>
      { loading && renderLoading }
      { data && renderData( data ) }
      { error && renderError( error )}
    </>
  )
}
