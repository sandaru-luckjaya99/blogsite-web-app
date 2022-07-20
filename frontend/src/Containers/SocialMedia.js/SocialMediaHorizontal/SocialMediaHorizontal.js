import React from 'react'

// editors social media accounts

function SocialMediaHorizontal() {
    return (
        <div className="mobile-only">
            <div className="footer-icons">
                <ul className="navbar-nav ">
                    <li className="nav-item inline-block">
                        <a href="https://github.com/sandaru-luckjaya99" aria-label="Github" className="nav-link text-github">
                            <i className="fa fa-github"></i>
                        </a>
                    </li>
                    <li className="nav-item inline-block">
                        <a href="https://www.facebook.com/profile.php?id=100005601079219" aria-label="Medium" className="nav-link">
                            <span>
                                <i className='fa fa-facebook'></i>
                            </span>
                        </a>
                    </li>
                    <li className="nav-item inline-block">
                        <a href="https://www.instagram.com/sandaruwan_dahanake/" aria-label="Insagram" className="nav-link">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </li>

                    <li className="nav-item inline-block">
                        <a href="https://www.linkedin.com/in/isuru-sandaruwan-dahanake-066a471b2/" aria-label="LinkedIn" className="nav-link">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default SocialMediaHorizontal
