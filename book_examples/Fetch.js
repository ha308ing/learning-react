import React from "react"
import { useFetch } from "./hooks/useFetch";

export default function Fetch ( {
  uri,
  renderSuccess,
  renderLoading = <p>Loading..</p>,
  renderError = error => <pre>{ JSON.stringify( error, null, 2 ) }</pre>
} ) {
  const { data, loading, error } = useFetch( uri );

  if ( loading ) return renderLoading

  if ( error ) return renderError(error)

  if ( data ) return renderSuccess( { data } )
}
