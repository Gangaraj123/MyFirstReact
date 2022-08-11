import React from 'react'

export default function Header() {
  return (
    <div>
      <h4 className='top-heading border-secondary border-bottom'>Mathematics</h4>
      <div className='row '
        style={{ 'paddingBottom': 10 }}>
        <div className='col-sm-3'>
          <h5 className='text-bold p-0 m-0'>Actions</h5>
          <p className='p-0 m-0 text-secondary'>
            <small >
              Move, Indent, Outdent,Delete
            </small>
          </p>
        </div>
        <div className='col-sm-8'>
          <h5 className='text-bold p-0 m-0'>Standard</h5>
          <p className='p-0 m-0 text-secondary'>
            <small>
              The text of the standard
            </small>
          </p>
        </div>
      </div>
      <span className='border-secondary border-bottom w-100'>
      </span>
    </div>
  )
}
