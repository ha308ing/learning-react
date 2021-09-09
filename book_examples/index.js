import React, { useState } from "react"
import SearchForm from "./SearchForm"
import GithubUser from "./GithubUser"
import UserRerositories from "./UserRepositories"
import RepositoryReadme from "./RepositoryReadme"

export default function App() {
  const [ login, setLogin ] = useState(  )
  const [ repo, setRepo ] = useState(  )



  return (
    <>
      <SearchForm value={ login } onSearch={ handleSearch } />
      <GithubUser login={ login } />
      <UserRerositories login={ login } repo={ repo } onSelect={ setRepo } />
      <RepositoryReadme login={ login } repo={ repo } /> 
    </>
  )
}
