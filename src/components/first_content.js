import React from 'react'
import img from './assets/fm1.png';
import './content.css'


function first_content() {
  return (
    <div className='first_content'>
        <div className='left-side'>
            <ul>
                <li>Womans's Fashion</li>
                <li>Men's Fashion</li>
                <li>Electronics</li>
                <li>Home & Lifestyle</li>
                <li>Medicine</li>
                <li>Sports & Outdoor</li>
                <li>Body's & Toys</li>
                <li>Health & Beauty</li>
            </ul>
        </div>
        <div className='right-side'>
            <img src={img} alt=''/>
        </div>
    </div>
  )
}

export default first_content
