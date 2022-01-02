import { AddCircle } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import "./profile.scss";

export default function Profile() {
    return (
        <div className="profile">
            <div className="logoSection">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                    alt=""
                />
                <Link to="/" className="link">
                    <button>Home</button>
                </Link>
            </div>

            <div className="container">
                <img
                    src="https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                    alt=""
                />
                <label>
                    <p>User name</p>
                    <input name="name" placeholder=" Input name ..." />
                </label>
                <label>
                    <p>Email</p>
                    <input name="email" placeholder=" Input email ..." />
                </label>
                <label>
                    <p>Password</p>
                    <input name="password" placeholder=" Input pasword ..." />
                </label>
                <button>Update</button>
            </div>

        </div>
    )
}
