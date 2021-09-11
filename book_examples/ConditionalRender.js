import React from "react"

export default function ConditionalRender( {
  data,
  loading=<p>Loading..</p>,
  error=<p>Failed to load.</p>,
  children
} ) {
  switch( data.flag ) {
    case -1: return loading
    case 0: return error
    case 1: return children
    default: return null
  }
}
