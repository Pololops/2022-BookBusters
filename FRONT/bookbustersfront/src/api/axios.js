// Fichier de configuration globale pour axios
// avec la clé baseURL

import axios from "axios";

export default axios.create({
	baseURL: 'http://bookbustersapi-env.eba-tif7y2yb.eu-west-3.elasticbeanstalk.com/'
});
