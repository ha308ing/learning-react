import React from "react"
import ReactDOM from "react-dom"
import GithubUser from "./GithubUser"


export default function App() {
  return <GithubUser login="moonhighway" />
}

ReactDOM.render(<App />, document.querySelector("#root"))
