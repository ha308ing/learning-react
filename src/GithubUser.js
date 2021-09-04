import React from "react"
import { useFetch } from "./useFetch"


export default function GithubUser( { login, renderLoader, renderData } ) {
  const { data, loader, error } = useFetch( `https://api.github.com/users/${ login }` )


  return (
    <>
      { loader && renderLoader }
      { data && renderData( data ) }
      { error && <pre style={ { color: "red" } }>{ error }</pre> }
    </>
  )
}
