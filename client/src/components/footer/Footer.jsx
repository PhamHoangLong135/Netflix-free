
import React from 'react'
import "./footer.scss"

import { Link } from 'react-router-dom';

import bg from "../../imgs/footer-bg.jpg";
import { Facebook, Instagram, LinkedIn, Twitter } from '@material-ui/icons';

const Footer = () => {
    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="container">

                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                    alt=""
                />

                <div className="contentMenus">
                    <div className="contentMenu">
                        <li>Home</li>
                        <li>Contact us</li>
                        <li>Term of services</li>
                        <li>About us</li>
                    </div>
                    <div className="contentMenu">
                        <li>Live</li>
                        <li>FAQ</li>
                        <li>Premium</li>
                        <li>Pravacy policy</li>
                    </div>
                    <div className="contentMenu">
                        <li>You must watch</li>
                        <li>Recent release</li>
                        <li>Top IMDB</li>
                    </div>
                </div>


                <div className="social">
                    <>
                        <span><Facebook /></span>
                        <span><Instagram /></span>
                        <span><Twitter /></span>
                        <span><LinkedIn /></span>
                    </>

                </div>
            </div>

        </div>
    )
}
export default Footer;

