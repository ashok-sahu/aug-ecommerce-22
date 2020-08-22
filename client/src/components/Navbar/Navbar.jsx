import React from 'react'
import Container from '../../container/Container'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <Container>
            <nav className="navbar">
                <div className='flex justify-between w-full md:w-12 items-center'>
                    <Link to="/" className='logo w-16 animate'>
                    </Link>
                </div>
            </nav>
        </Container>
    )
}

export default Navbar
