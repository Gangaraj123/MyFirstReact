import React from 'react'

export default function Header(props) {
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
        <div className='col-sm-6'>
          <h5 className='text-bold p-0 m-0'>Standard</h5>
          <p className='p-0 m-0 text-secondary'>
            <small>
              The text of the standard
            </small>
          </p>
        </div>
        <div className='col-sm d-flex'>
          <div>
            <button className='btn btn-success mx-2' onClick={props.loadFunc}>
              <i className='fa fa-upload px-1'></i>
              load</button>
            <button className='btn btn-success' onClick={props.saveFunc}>
              <i className='fa fa-download px-1'></i>
              save</button>
          </div>
        </div>
      </div>
      <span className='border-secondary border-bottom w-100'>
      </span>
    </div>
  )
}
