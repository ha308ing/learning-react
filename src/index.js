import React from "react"
import ReactDOM from "react-dom"
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
