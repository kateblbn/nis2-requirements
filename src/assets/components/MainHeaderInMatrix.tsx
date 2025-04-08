import React from 'react'
import './MainHeaderInMatrix.css'
type MainHeaderInMatrixProps = {
    title: string
}
export default function MainHeaderInMatrix({title} : MainHeaderInMatrixProps) {
  return (
    <div className='header-matrix-container'>
        <h1>{title}</h1>
        </div>
  )
}
