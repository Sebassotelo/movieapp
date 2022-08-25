import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./componentes/card/card";

function App() {
  const [peliculas, setPeliculas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pag, setPag] = useState(1);
  const [genero, setGenero] = useState("popular");

  const pelis = async () => {
    try {
      setIsLoading(true);
      const pelis = await fetch(
        `https://api.themoviedb.org/3/movie/${genero}?api_key=e8002c635aacc458eb931614052b44af&language=es-MX&page=${pag}&videos`
      );
      const datos = await pelis.json();
      setPeliculas(
        datos.results.map((pelicula) => ({
          title: pelicula.title,
          img: pelicula.poster_path,
          id: pelicula.id,
          desc: pelicula.overview,
          puntaje: pelicula.vote_average,
          estreno: pelicula.release_date,
        }))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    pelis();
  }, [pag, genero]);

  const pagSiguiente = () => {
    if (pag < 1000) {
      setPag(pag + 1);
      setIsLoading(false);
    }
  };
  const pagAnterior = () => {
    if (pag > 1) {
      setPag(pag - 1);
      setIsLoading(false);
    }
  };

  const pelisPuntuadas = () => {
    setGenero("top_rated");
    setPag(1);
  };
  const pelisPopulares = () => {
    setGenero("popular");
    setPag(1);
  };
  const pelisProx = () => {
    setGenero("now_playing");
    setPag(1);
  };

  return (
    <div className="App">
      <div className="navbar">
        <ul className="nav__ul">
          <li className="nav__li" onClick={pelisPuntuadas}>
            <p>Mejor Puntuadas</p>
          </li>
          <li className="nav__li" onClick={pelisPopulares}>
            <p>Populares</p>
          </li>
          <li className="nav__li" onClick={pelisProx}>
            <p>Estrenos</p>
          </li>
        </ul>
      </div>
      <div className="app__pelis">
        {isLoading === true ? (
          <p>Loading</p>
        ) : (
          peliculas?.map((m, i) => (
            <Card
              title={m.title}
              img={m.img}
              id={m.id}
              key={`k__${i}`}
              desc={m.desc}
              puntaje={m.puntaje}
              estreno={m.estreno}
            />
          ))
        )}
      </div>

      <div className="btn__pagina">
        <div className="btn__pagina__container">
          <button className="btn" onClick={pagAnterior}>
            Anterior
          </button>
          <p>{pag}</p>
          <button className="btn" onClick={pagSiguiente}>
            Siguiente
          </button>
        </div>
      </div>

      <div className="footer">
        <div className="footer__container">
          <p>
            Creado por
            <a href="https://portfolio-tan-delta.vercel.app/" target={"_blank"}>
              <strong> Sebas Sotelo</strong>
            </a>
            . 2022
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
