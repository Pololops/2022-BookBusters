// Fichier de configuration globale pour axios
// avec la clé baseURL

import axios from "axios";

export default axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});
