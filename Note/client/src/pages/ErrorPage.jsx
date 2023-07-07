import React from "react";
import {useRouteError} from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div id='error-pgate'>
      <i>{error.statusText || error.message}</i>
    </div>
  )
}