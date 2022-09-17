import RepoCard from 'components/repoCard/RepoCard'
import React, { useEffect, useState } from 'react'
import "./userDetails.scss"
import axios from "axios"
import notFound from "../../static/404.png"
import PaginatedItems from 'components/paginatedItems/PaginatedItems'

interface UserDetailsState {
    name?: string;
    avatar_url?: string;
    html_url?: string;
    location?: string;
    bio?: string;
    twitter_username?: string;
}

const UserDetails = () => {

    const [profile, setprofile] = useState<UserDetailsState>({})
    const [error, setProfileError] = useState<boolean>(true)
    const [initial, setinitial] = useState(true)
    const [repos, setRepos] = useState([])
    const [loaders, setLoaders] = useState(false)

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            setLoaders(true)
            const config = { headers: { Accept: "application/json" } }
            const details = await axios.get(`https://api.github.com/users/${evt.target[1].value}`, config)
            const repos = await axios.get(`https://api.github.com/users/${evt.target[1].value}/repos`, config)
            setprofile(details.data)
            setRepos(repos.data)
            setinitial(false)
            setProfileError(false)
            setLoaders(false)
        } catch (error) {
            setinitial(false)
            setProfileError(true)
        }
    }

    return (
        <div className='user'>

            <header className="header" onSubmit={handleSubmit}>
                <div className="search" >
                    <form className="search__form">
                        <button type='submit' className="search__iconButton">
                            <svg className="search__icon">
                                <use href="/icons/symbol-defs.svg#icon-search"></use>
                            </svg>
                        </button>
                        <input required type="text" className="search__input" placeholder="Search valid username whos account is present on github such as yashfalke77, yash etc ..." />
                    </form>
                </div>
            </header>

            {loaders && (<div className='loader-container'> <div className="lds-ripple"><div></div><div></div></div></div>)}

            {error ? (
                <div className='error'>
                    <img className='error__img' src={notFound} alt="" />
                    <p className='error__description'> {initial ? "Find the valid user informtion from above search bar" : `No user found with such username!!!!!`} </p>
                </div>
            ) : (
                <div>
                    <section className='details'>
                        <div className="details__left">
                            <img className='details__img' src={profile.avatar_url} alt="" />
                        </div>
                        <div className="details__right">
                            <div className="details__profile">
                                <ul className='details__list'>
                                    <li className='details__items'>
                                        <h2 className='details__headingSecondary'>{profile.name}</h2>
                                    </li>
                                    <li className='details__items'>
                                        {profile.bio}
                                    </li>
                                    {profile.location && (
                                        <li className='details__items details__location '>
                                            <svg className="details__locationIcon">
                                                <use href="/icons/symbol-defs.svg#icon-location-pin"></use>
                                            </svg>
                                            <span className='details__locationText'>{profile.location}</span>
                                        </li>
                                    )}
                                    <li className='details__items details__githubLink'>
                                        <svg className="details__githubLinkIcon">
                                            <use href="/icons/symbol-defs.svg#icon-link"></use>
                                        </svg>
                                        <a href={profile.html_url} target="_blank" rel='noreferrer' className='details__githubLinkText'>{profile.html_url}</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="details__impRef">
                                <a href={profile.html_url} target="_blank" rel='noreferrer' className='details__btnPrimary'>view</a>
                                <a target="_blank" rel='noreferrer' href={profile.twitter_username ? `https://twitter.com/${profile.twitter_username}` : "https://twitter.com"} className='details__btnOutline'>
                                    <svg className="details__twitter">
                                        <use href="/icons/symbol-defs.svg#icon-twitter"></use>
                                    </svg>
                                    Twitter
                                </a>
                            </div>
                        </div>
                    </section>
                    <div className="line"></div>
                    < PaginatedItems repos={repos} />
                </div>
            )}

        </div>
    )
}

export default UserDetails