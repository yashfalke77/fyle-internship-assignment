import React from 'react'
import "./repoCard.scss"

interface RepoCardsProps {
    name: string;
    description: string;
    url: string;
    topic: string[];
    key: string;

}

function RepoCard({ name, description, topic, url }: RepoCardsProps) {

    const string = description ? description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam voluptatibus asperiores, aperiam nostrum rem quisquam magni facere, cumque quam ut sapiente, impedit accusamus laboriosam optio esse sint deserunt eveniet!"
    const array = topic.length > 1 ? topic.slice(1, 5) : ["github"]

    console.log(array)


    return (
        <div className='card'>
            <a href={url} target="_blank" rel='noreferrer' className="card__url">
                <h1 className="card__title">
                    {name.substring(0, 25)}
                </h1>
            </a>
            <p className='card__description'>
                {string.substring(0, 150)}  ...
            </p>
            <div className='card__tags'>
                {array.map((t, idx) => (
                    <span className="card__tag">{t}</span>
                ))}
            </div>
        </div>
    )
}

export default RepoCard