// Fichier de configuration globale pour axios
// avec la clé baseURL

import axios from "axios";

export default axios.create({
	baseURL: 'https://bookbusters-api.eu-west-3.elasticbeanstalk.com/'
});
