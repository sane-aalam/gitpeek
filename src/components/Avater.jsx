import "./Avater.css"

const Avatar = ({ imageUrl, Name, htmlFor = "#" }) => {
    return (
        <div className='avater-flowers'>
            <img src={imageUrl} height={"200px"} width={"200px"} alt="avatar" className="avater-img" />
            <h2 className="avater-name">{Name}</h2>
            <a href={htmlFor} target="_blank" className="avater-link">
                Visit
            </a>
        </div>
    )
}

export default Avatar