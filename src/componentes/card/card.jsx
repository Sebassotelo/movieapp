import React, { useState, useEffect } from "react";
import "./card.css";
import ReactPlayer from "react-player";
import { IoIosCloseCircle } from "react-icons/io";
import { GoUnmute, GoMute } from "react-icons/go";

function Card({ title, img, id, desc, puntaje, estreno }) {
  const [show, setShow] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [link, setLink] = useState("");
  const [mute, setMute] = useState(false);
  const [descrip, setDescrip] = useState(false);

  const popUp = () => {
    if (link !== "" || desc !== "") {
      setShow(!show);
    }
  };

  const videos = async () => {
    try {
      const video = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=e8002c635aacc458eb931614052b44af&language=en-US`
      );
      const datosVideo = await video.json();

      const trailer = datosVideo.results
        .filter((tra) => tra.type.toLowerCase().includes("trailer"))
        .map((elem) => ({
          llave: elem.key,
        }));
      // const trailer = datosVideo.results
      //   .filter((tra) => tra.type.toLowerCase().includes("trailer"))
      //   .map((elem) => ({
      //     llave: elem.key,
      //   }));

      // setVid(trailer.map((elem)=> ({
      //   llave: elem.key
      // })))

      setLink(trailer[0].llave);
    } catch (err) {
      console.log(err);
    }
  };

  const sonido = () => {
    setMute(!mute);
  };

  useEffect(() => {
    videos();

    if (link !== "") {
      setShowCard(true);
    }

    if (desc !== "") {
      setDescrip(true);
    }
  }, [show]);

  return (
    <div className={show ? "card" : ""}>
      <div
        className={show ? "card-container-not" : "card-container"}
        onClick={popUp}
      >
        <div className="title">
          <h1>{title}</h1>
        </div>
        <img src={`https://image.tmdb.org/t/p/w500/${img}`} alt="" />
      </div>

      {show && (
        <div className={show ? "popup-container" : "popup-not"}>
          {show ? (
            <div className="video">
              {showCard ? (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${link}`}
                  height={"100%"}
                  width={"100%"}
                  volume={0.05}
                  playing={true}
                  muted={mute}
                />
              ) : (
                <h4 className="no-video">NO HAY VIDEO</h4>
              )}
            </div>
          ) : (
            ""
          )}
          <div className={descrip ? "desc" : "no-desc"}>
            <div className="desc-cont">
              <p className="desc-estreno">Estreno: {estreno}</p>
              <p className="desc-puntaje">{puntaje}</p>
            </div>
            <h3 className="desc-title">{title}</h3>
            <p className="desc-desc">{desc}</p>

            {mute ? (
              <GoMute className="desc-mute" onClick={sonido} />
            ) : (
              <GoUnmute className="desc-mute" onClick={sonido} />
            )}
            <IoIosCloseCircle className="desc-close" onClick={popUp} />
          </div>
        </div>
      )}

      {/* <div className={show ? 'popup-container' : 'popup-not'} onClick={popUp}>
            {show ? <div className='video'> 
                      <ReactPlayer url={`https://www.youtube.com/watch?v=${link}`} height={'100%'} width={'100%'} playing={false} controls={false} volume={0.05} playing={true}/> 
                      </div> 
                      : ''}

               
              <h3>{title}</h3>
        </div>  */}
    </div>
  );
}

export default Card;
