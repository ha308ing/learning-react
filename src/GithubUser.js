import React, { useState } from "react"
import UserSearch from "./UserSearch"
import UserDetails from "./UserDetails"
import Fetch from "./Fetch"

export default function GithubUser( { login = "eve" } ) {
  const [ login_, setUser ] = useState( login )

  return (
    <>
      <UserSearch handleSearch={ setUser } user={ login_ } />
      <Fetch
        uri={ `https://api.github.com/users/${ login_ }` }
        renderSuccess={ UserDetails }
      />
    </>
  )
}
