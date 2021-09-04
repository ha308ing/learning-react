import React from "react"
import ReactDOM from "react-dom"
import GithubUser from "./GithubUser"

export default function App() {
  return (
    <GithubUser
      login="moonhighway"
      renderLoader={ <h2>Loading now.</h2> }
      renderData={ data =>
        <div
          style={{
            color: "pink",
            display: "flex",
            height: "150px",
            margin: "15px 5px",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <img src={ data.avatar_url } height={150} width={150} />
          <div>
            <h3>{ data.name }</h3>
            <p>{ data.location }</p>
          </div>
        </div>
      }
    />
  )
}

ReactDOM.render( <App />, document.querySelector( "#root" ) )
