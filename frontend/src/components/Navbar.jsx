import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Navbar.module.css'

const Navbar = () => {
    const navigate = useNavigate()

    function goHome(e) {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div >
            {/* title */}
            <nav className={styles.nav}>
                <ul>
                    <li className={styles.title} onClick={goHome}>
                        <div>
                            <img src='/investaLogo.png' alt='logo' className={styles.logo} />
                            <div><span className={styles.invest}>Investa</span><span className={styles.view}>View</span></div>

                        </div>
                    </li>
                    <li className={styles.subtitle}>
                        Dashboard
                    </li>
                    <li className={styles.subtitle}>
                        About Us
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar