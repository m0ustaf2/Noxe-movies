import React from 'react'

export default function Disconnected() {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center">
    <div className="text-center text-danger alert alert-warning offline ">
    <i className="fa-solid fa-ban"></i>  Yor connection is not stable
    
    </div>
    </div>
    </>
  )
}
