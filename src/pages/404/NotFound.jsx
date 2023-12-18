import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/404-2.jpg';

export default function NotFound() {
  return (
    <div className='text-center p-4'>
        
       {/* <h3 className='text-danger'>Page Not Found 404!</h3> */}
       <img src={errorImage} class="img-fluid" alt="404-img" />
              <h4 className='mt-4'><Link to='' className='text-light'>Back To Home Page</Link></h4>
        
    </div>
  )
}
