# Book Notes
- [Book Notes](#book-notes)
  - [1. Sending Data with a request](#1-sending-data-with-a-request)
  - [2. Uploading Files with Fetch](#2-uploading-files-with-fetch)
  - [3. Authorized Requests](#3-authorized-requests)
  - [4. Saving Data Locally](#4-saving-data-locally)
  - [5. Entire Component](#5-entire-component)
  - [6. Use HTTP Header for cache](#6-use-http-header-for-cache)

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
