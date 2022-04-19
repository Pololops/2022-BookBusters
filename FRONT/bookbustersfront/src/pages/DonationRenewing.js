import { donationRenewing } from "../api/fetchApi";
import Header from "../components/Header/Header";
import "../styles/DonationRenewing.scss";
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
//const token = req.params.token

console.log(window.location.pathname);
console.log(params.token)
//donationRenewing(token)

const DonationRenewing = () => {
    return (
        <div>
            <Header />
            <p className="renewing">La disponibilité de votre livre au don a été renouvellée.</p>
            <p className="renewing">L'équipe BookBusters vous remercie.</p>
        </div>
       
    );
};

export default DonationRenewing;