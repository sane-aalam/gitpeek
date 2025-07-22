import React, { useState } from 'react'
import axios from 'axios';
import './GithubSearch.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiBuildingsFill } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import Avatar from './Avater';

const GithubSearch = () => {

    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [followers, setFollowers] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setProfile(response.data);
            setError(null);
            setFollowers([]);
        } catch (error) {
            setProfile(null);
            setError('User Not Found');
        }
    };

    const onFetchFollowers = async (e) => {
        e.preventDefault();
        try {
            setIsPending(true);
            const res = await fetch(
                `https://api.github.com/users/${username}/followers`
            );
            const data = await res.json();
            setFollowers(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className='main-container'>
            <h1 className='main-heading'>GitHub User Finder</h1>
            <form onSubmit={handleSubmit} className='search-form'>
                <input type='text' placeholder='Enter Github Username....' value={username} className='search-input' onChange={(e) => setUsername(e.target.value)}></input>
                <button type='submit' className='search-btn'>Search</button>
            </form>

            {error && <p className='error-msg'>{error}</p>}
            {profile && (
                <div className='profile-container'>
                    <div className='profile-content'>
                        <div className='profile-img'>
                            <img src={profile.avatar_url} alt='Avatar' className='profile-avatar'></img>
                        </div>
                        <div className='profile-details'>

                            <div className='profile-des'>
                                <h2 className='profile-name'>{profile.name}</h2>
                                <p className='profile-created'>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
                            </div>

                            <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-username'>@{profile.login}</a>
                            <p className='profile-bio'>{profile.bio}</p>

                            <div className='profile-stats'>
                                <p className='profile-repos'>Repositories<br /><span className='stats'>{profile.public_repos}</span></p>
                                <p className='profile-followers'>Followers<br /><span className='stats'>{profile.followers}</span></p>
                                <p className='profile-following'>Following<br /><span className='stats'>{profile.following}</span></p>
                            </div>

                            <div className='profile-info'>
                                <p className='profile-location'><FaMapMarkerAlt /> {profile.location}</p>
                                <p className='profile-company'><PiBuildingsFill /> {profile.company}</p>
                            </div>

                            <div className='profile-links'>
                                <a href={`https://twitter.com/${profile.twitter_username}`} target='_blank' rel="noreferrer" className='twitter-link'><FaXTwitter />{profile.twitter_username}</a>
                                <a href={profile.html_url} target='_blank' rel="noreferrer" className='profile-url'><FaGithub />View Profile</a>
                            </div>
                        </div>
                    </div>
                    <div className='folowers-container'>
                        <button
                            onClick={onFetchFollowers}
                            className="fetech-followers-btn"
                        >
                            Fetch Followers
                        </button>
                        <div className="show-followers">
                            {

                                followers.map((follower, index) => (
                                    <Avatar key={index} imageUrl={follower.avatar_url} Name={follower.login} htmlFor={follower.html_url} />
                                ))
                            }
                        </div>

                    </div>

                </div>
            )}
        </div>
    )
}

export default GithubSearch