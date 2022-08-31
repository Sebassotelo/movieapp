import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./componentes/card/card";
import { AiOutlineSearch } from "react-icons/ai";

function App() {
  const [peliculas, setPeliculas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pag, setPag] = useState(1);
  const [genero, setGenero] = useState("popular");
  const [input, setInput] = useState("");
  const [searchOn, setSearchOn] = useState(false);

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

  const busqueda = async (event) => {
    busquedaOn();
    event.preventDefault();
    const search = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=e8002c635aacc458eb931614052b44af&language=es-MX&query=${input}`
    );
    const datosSearch = await search.json();
    console.log(datosSearch.results);
    setPeliculas(
      datosSearch.results.map((pelicula) => ({
        title: pelicula.title,
        img: pelicula.poster_path,
        id: pelicula.id,
        desc: pelicula.overview,
        puntaje: pelicula.vote_average,
        estreno: pelicula.release_date,
      }))
    );
  };

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
    pelis();
    setPag(1);
  };
  const pelisPopulares = () => {
    setGenero("popular");
    pelis();
    setPag(1);
  };
  const pelisProx = () => {
    setGenero("now_playing");
    pelis();
    setPag(1);
  };

  const manejarForm = (event) => {
    setInput(event.target.value);
    console.log(input);
  };

  const busquedaOn = () => {
    setSearchOn(!searchOn);
  };

  return (
    <div className="App">
      <div className="navbar">
        <div className={searchOn ? "search" : "search-not"}>
          <form onSubmit={busqueda}>
            <input
              value={input}
              onChange={manejarForm}
              required
              className="search__input"
              placeholder="Ingrese el Titulo"
            />
            <button className="search__button">Buscar</button>
          </form>
        </div>
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

        <AiOutlineSearch className="search__icon" onClick={busquedaOn} />
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
