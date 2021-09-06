import React from "react"
import GithubUser from "./GithubUser"
import RepoMenu from "./RepoMenu"

export default function GithubUsers( {users} ) {
  return (
    <>
      {
        users.map( ( u, i ) =>
          <GithubUser
            key={ i }
            login={ u }
            renderLoading={ <h2>Loading now.</h2> }
            renderData={ data =>
              <div
                style={{
                  color: "pink",
                  display: "flex",
                  margin: "15px 5px",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <img
                  src={ data.avatar_url }
                  alt={ data.login }
                  style={ {
                    width:"100px",
                    heihgt:"100px",
                    clipPath:"circle(50px)"
                  } }
                />
                <div>
                  <h1>{ data.login }</h1>
                  { data.name && <p>{ data.name }</p> }
                  { data.location && <p>{ data.location }</p> }
                  { data.public_repos && <RepoMenu login={data.login} /> }
                </div>
              </div>
            }
            renderError = {
              error => <pre style={ { color: "red" } }>{ error }</pre>
            }
          />
        )
      }
    </>
  )
}
