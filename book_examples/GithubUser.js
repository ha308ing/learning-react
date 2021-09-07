import React from "react"
import Fetch from "./Fetch"
import UserDetails from "./UserDetails"

export default function GithubUser( {login} ) {
  return (
    <Fetch
      uri={ `https://api.github.com/users/${ login }` }
      renderSuccess={ UserDetails } />
  )
}
