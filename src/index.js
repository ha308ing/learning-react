import React from "react"
import ReactDOM from "react-dom"
import GithubUsers from "./GithubUsers"
import RepoMenu from "./RepoMenu"
// import App from "../book_examples/VirtualizedLists.books"
// import GithubUser from "../book_examples/GithubUser_"
import GithubUser from "./GithubUser"

export default function App() {
  // return (
  //   <GithubUsers
  //     users={[ "stoically", "rkodey", "sbine" , "VadAbel" ]}
  //   />
  // )

  return <GithubUser login="moontahoe"/>
}

ReactDOM.render( <App />, document.querySelector( "#root" ) )
