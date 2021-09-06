import React from "react"
import { useFetch } from "./useFetch";

export const Fetch = ( {
  uri,
  renderData,
  renderLoading = <p>Loading..</p>,
  renderError = error => <pre>Something went wrong... {error.message}</pre>
} ) => {
  const { data, loading, error } = useFetch( uri );

  if ( loading ) return renderLoading

  if ( error ) return renderError(error)

  if ( data ) return renderData( {data} )

}
