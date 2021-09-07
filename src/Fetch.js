import React from "react"
import { useFetch } from "./hooks/useFetch";

export default function Fetch ( {
  uri,
  renderSuccess,
  renderLoading = <p>Loading..</p>,
  renderError = error => <pre>Something went wrong... { error.message }</pre>
} ) {
  const { data, loading, error } = useFetch( uri );

  if ( error ) return renderError(error)

  if ( loading ) return renderLoading

  if ( data ) return renderSuccess( {data} )
}
