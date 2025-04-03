import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
    const [memeText, setMemeText] = useState({
        bottomText: "Walk into Mordor",
        topText: "One does not simply",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const url = 'https://api.imgflip.com/get_memes';
    const [memesData, setMemesData] = useState([])
    const [error, setError] = useState(null);


    const updateMeme = (e) => {
        const { name, value } = e.target;
        setMemeText(prevInfo => ({ ...prevInfo, [name]: value }))
    }

    useEffect(() => {
        const getMemes = async () => {
            setError(null);
            try {
                const response = await axios.get(url);
                setMemesData(response.data.data.memes);
            } catch (e) {
                setError(e.message)
            }

        }
        getMemes();

    }, [])

    const getMemeImage = (e) => {
        e.preventDefault();
        const randomIndex = Math.floor(Math.random() * memesData.length);
        const memeImage = memesData[randomIndex].url;
        setMemeText(prevState => ({ ...prevState, imageUrl: memeImage }))

    }

    return (
        <main>
            <div className="form">
                <form onSubmit={getMemeImage}>
                    <label>Top Text
                        <input
                            type="text"
                            placeholder="One does not simply"
                            name="topText"
                            value={memeText.topText}
                            onChange={updateMeme}
                        />
                    </label>

                    <label>Bottom Text
                        <input
                            type="text"
                            placeholder="Walk into Mordor"
                            name="bottomText"
                            value={memeText.bottomText}
                            onChange={updateMeme}
                        />
                    </label>
                    <button type="submit">Get a new meme image 🖼</button>
                </form>
            </div>
            <div className="meme">
                {error && <p>{error}</p>}
                <img src={memeText.imageUrl} />
                <span className="top">{memeText.topText}</span>
                <span className="bottom">{memeText.bottomText}</span>

            </div>

        </main>
    )
}

export default Main;