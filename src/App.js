import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "./components/Header.js";
import Characters from "./pages/Characters/Characters";
import CharacterId from "./pages/CharacterId/CharacterId";
import Comics from "./pages/Comics/Comics";
import Favourites from "./pages/Favourites/Favourites";
import Signup from "./pages/Sign/Signup";
import Signin from "./pages/Sign/Signin";
import NotFound from "./pages/NotFound/NotFound";
import axios from "axios";
import { BACKEND_URL } from "./static/constantes";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [searchComics, setSearchComics] = useState("");
  const [searchCharacters, setSearchCharacters] = useState("");
  const [favorites, setFavorites] = useState({ character: [], comic: [] });
  const [updateFavorites, setUpdateFavorites] = useState(true);

  useEffect(() => {
    if (updateFavorites) {
      async function fetchFavorites() {
        const responseCharacters = await axios.get(
          `${BACKEND_URL}/favourite/characters`,
          { headers: { authorization: "Bearer " + token } }
        );
        const responseComics = await axios.get(
          `${BACKEND_URL}/favourite/comics`,
          { headers: { authorization: "Bearer " + token } }
        );
        setFavorites({
          character: responseCharacters.data,
          comic: responseComics.data,
        });
      }

      fetchFavorites();
      setUpdateFavorites(false);
    }
  }, [updateFavorites, token]);

  const handleConnect = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 1 });
    } else {
      Cookies.remove("token");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header
        handleConnect={handleConnect}
        token={token}
        setSearchCharacters={setSearchCharacters}
        setSearchComics={setSearchComics}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              setUpdateFavorites={setUpdateFavorites}
              searchCharacters={searchCharacters}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/character/:_id"
          element={
            <CharacterId
              favorites={favorites}
              setUpdateFavorites={setUpdateFavorites}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              setUpdateFavorites={setUpdateFavorites}
              searchComics={searchComics}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              favorites={favorites}
              setUpdateFavorites={setUpdateFavorites}
            />
          }
        />
        <Route
          path="/join"
          element={<Signup handleConnect={handleConnect} />}
        />
        <Route
          path="/signin"
          element={<Signin handleConnect={handleConnect} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
