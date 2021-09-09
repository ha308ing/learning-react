import React from "react"
import ReactDOM from "react-dom"
import App from "../book_examples/index"

export default function Default() {
  // return (
  //   <GithubUsers
  //     users={[ "stoically", "rkodey", "sbine" , "VadAbel" ]}
  //   />
  // )

  // return <GithubUser login="moontahoe"/>
  return <App />
}

ReactDOM.render( <Default />, document.querySelector( "#root" ) )
