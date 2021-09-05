import React from "react"
import ReactDOM from "react-dom"
import GithubUsers from "./GithubUsers"
import App from "../book_examples/VirtualizedLists.books"

// export default function App() {
//   return (
//     <GithubUsers
//       users={[ "stoically", "rkodey", "sbine" , "VadAbel" ]}
//     />
//   )
// }

ReactDOM.render( <App />, document.querySelector( "#root" ) )
