import React, { useState, useEffect } from "react"
import Fetch from "./Fetch"
import UserDetails from "./UserDetails"
import UserRepositories from "./UserRepositories"

export default function GithubUser( {login} ) {

  return (
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails} />
  )
}
