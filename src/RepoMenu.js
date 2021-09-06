import React, { useState, useEffect } from "react"
import { useIterator } from "./useIterator"
import {Fetch}  from "./Fetch"
import { useFetch } from "./useFetch"

export function CurrentRepo({repoArray}) {
  console.log(repoArray[0].name)
  const [ {currentRepo}, next, prev ] = useIterator(repoArray, 0)
  return (
    <>
    <span onClick={()=>prev()}>&lt;</span>
    <span>{currentRepo.name}</span>
    <span onClick={()=>next()}>&gt;</span>
    </>
  )
}

export default function RepoMenu() {
  const login = "moontahoe"
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}/repos`}
      renderData={({data})=><CurrentRepo repoArray={data} />}
    />
  )
}

