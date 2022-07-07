// Fichier de configuration globale pour axios
// avec la clé baseURL

import axios from "axios";

export default axios.create({
    baseURL: (process.env.NODE_ENV === 'production') ? 'https://bookbusters-server.herokuapp.com/' : 'http://localhost:5000/',
});
