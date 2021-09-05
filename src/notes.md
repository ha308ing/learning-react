# Book Notes
- [Book Notes](#book-notes)
  - [1. Sending Data with a request](#1-sending-data-with-a-request)
  - [2. Uploading Files with Fetch](#2-uploading-files-with-fetch)
  - [3. Authorized Requests](#3-authorized-requests)
  - [4. Saving Data Locally](#4-saving-data-locally)
  - [5. Entire Component](#5-entire-component)
  - [6. Use HTTP Header for cache](#6-use-http-header-for-cache)
  - [7. Handling Promise State](#7-handling-promise-state)
  - [8. Render Props](#8-render-props)
  - [9. Virtualized Lists](#9-virtualized-lists)
  - [10. Fetch Hook](#10-fetch-hook)
  - [11. Fetch Component](#11-fetch-component)

## 1. Sending Data with a request

```
    fetch("/create/user/", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        bio})
    })

    fetch("/user/edit/", {
      method: "PUT",
      body: JSON.stringify({
        username,
        password,
        email
      })
    })
```

## 2. Uploading Files with Fetch

```
    const formData = new FormData();
      formData.append("username", "user");
      formData.append("name", "Alex Blake");
      formData.append("avatar", imgFile);

    fetch("/create/user/", {
      method: "POST",
      body: formData
    })
```

## 3. Authorized Requests

```
    fetch(`https://api.github.com/users/${login}`, {
      method: "GET",
      headers: {
        Authorizarion: `Bearer ${token}`
      }
    })
```

## 4. Saving Data Locally

```
    const loadJSON = (key) =>
      key && JSON.parse(localStorage.getItem(key))

    const saveJSON = (key, data) =>
      localStorage.setItem(key, JSON.stringify(data))

    const [data, setData] = useState(loadJSON(`user:${login}`))

    useEffect(()=>{
      if (!data) return

      if (data.login === login) return

      const {name, avatar_url, location} = data
      saveJSON(`user:${login}`,{
        name,
        login,
        avatar_url,
        location
      })
    },[data])
```

## 5. Entire Component

```
  import React, { useState, useEffect } from "react"

  const loadJSON = (key) =>
    key && JSON.parse(localStorage.getItem(key))
  
  const saveJSON = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data))

  export default function GithubUser({login}) {
    const [data, setData] = useState(loadJSON(`user:${login}`))
    useEffect(()=>{
      if (!data) return
      if (data.login === login) return
      const {name, avatar_url, location} = data
      saveJSON(`user:${login}`, {
        name,
        login,
        avatar_url
        location
      })
    },[data])

    useEffect(()=>
      fetch(`https://api.github.com/users/${login}`).
        then(response => response.json()).
        then(setData).
        catch(console.error)
    ,[login])


    if (data) 
      return <pre>{JSON.stringify(data, null, 2)}</pre>
    
    return null
  }
```

## 6. Use HTTP Header for cache

Set header for expiration date of content: `Cache-Control: max-age=<EXP_DATE>`

## 7. Handling Promise State

```
import React, { useState, useEffect } from "react"

export default function GithubUser( { login } ) {
  const [ data, setData ] = useState()
  const [ loading, setLoading ] = useState()
  const [ error, setError ] = useState()

  useEffect( () => {
    if (!login) return
    setLoading(true)
    fetch( `https://api.github.com/users/${ login }` ).
      then( response => response.json() ).
      then( setData ).
      then( () => setLoading(false) ).
      catch(setError)
   }, [login] )

  if ( loading ) return <h1>Loading..</h1>

  if ( error ) return <pre>JSON.stingify(error, null, 2)</pre>

  if (!data) return null

  return (
    <div className="githubUser" style={{display:"flex", height:"150px"}}>
      <img
        src={ data.avatar_url }
        alt={ data.login }
        style={{width:200}} />
      <div>
        <h1>{data.login}</h1>
        { data.name && <p>{ data.name }</p> }
        { data.location && <p>{ data.location }</p> }
      </div>
    </div>
  )

}
```

## 8. Render Props

## 9. Virtualized Lists

Windowing or virualization.
Show at least 5 reults an prepare 6 off screen (3 on top + 3 on bottom). So 11 to load.
Unmount viewed results.
[![image.png](https://i.postimg.cc/Yq9HqSNR/image.png)](https://postimg.cc/Z01gw4Mv "Windowing/Virtualization")

```
import React from "react"
import { FixedSizeList } from "react-window"
import faker from "faker"

const users = [...Array(5000)].map( () => 
  ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar()
  })
)

const renderItem = ( { index, style } ) =>
  <div style={{...style, ...{ display: "flex", margin: ".3rem .5rem", alignItems: "center" }}}>
    <img src={ users[index].avatar } alt={ users[index].login } width={ 60 } />
    <p>{ users[index].name } - { users[index].email }</p>
  </div>

export default function App(  ) {
  return (
    <FixedSizeList
      width={ 500 }
      height={ 500 }
      itemCount={ users.length }
      itemSize={ 70 }
    >
      { renderItem }
    </FixedSizeList>
  )
}
```

## 10. Fetch Hook

```
import React, { useState, useEffect } from "react"

export const UseFetch = ( uri ) => {
  const [ data, setData ] = useState()
  const [ loading, setLoading ] = useState( true )
  const [error, setError ] = useState()

  useEffect( () => {
    if ( !uri ) return
    fetch( uri ).
      then( response => response.json() ).
      then( setData ).
      then( () => setLoading( false ) ).
      catch( setError )
  }, [ uri ] )

  return {
    loading,
    data,
    error
  }
}

export const GithubUser = ( { login } ) => {
  const { loading, data, error } = UseFetch( `https://api.github.com/users/${login}`)

  if ( loading ) return <h1>Loading..</h1>

  if ( error ) return <pre>JSON.stringify(error, null, 2)</pre>

  if ( data ) return (
    <div className="githubUser" >
      <img src={ data.avatar_url } alt={ data.login } width={200} />
      <div>
        <h1>{ data.login }</h1>
        { data.name && <p>{ data.name }</p> }
        { data.location && <p>{ data.location }</p> }
      </div>
    </div>
  )

  return null
}

export const UserSearch = ( { value, handleSubmit } ) => {
  const [ user, setUser ] = useState(value)

  return (
    <form onSubmit={e=>{e.preventDefault();handleSubmit(user)}}>
      <input type="text" value={ user } onChange={(e)=>setUser(e.target.value)} />
      <input type="submit" value="Search" />
    </form>
  )
}

export default function App() {
  const [user, setUser] = useState("moontahoe")

  return (
    <>
      <UserSearch value={user} handleSubmit={setUser} />
      <GithubUser login={user} />
    </>
  )
}
```

## 11. Fetch Component

```
export const Fetch = ( {
    uri,
    renderData,
    renderLoading = <p>Loading..</p>,
    renderError = error => <pre>Something went wrong... {error.message}</pre>
  } ) => {
    const { data, loading, error } = useFetch( uri );

    if ( loading ) return renderLoading

    if ( error ) return renderError(error)

    if ( data ) return renderData( { data } )

}
```

```
import React from "react"

const renderUser = ( { data } ) =><div><h1>{data.login}</h1><div>{data.name && <p>{data.name}</p>}{data.location && <p>{data.location}</p>}</div></div>

export const GithubUser = ( { login } ) => {
  return (
    <Fetch
      uri={ `https://api.github.com/users/${ login }` }>
      renderData={ renderUser }
      renderLoading={<LoadingSpinner />}
    />
  )
}
```
