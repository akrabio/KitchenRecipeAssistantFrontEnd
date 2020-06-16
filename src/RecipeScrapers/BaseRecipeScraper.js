import ScrapeMako from "./makoScraper";
import ScrapeOogionet from "./oogionetScraper";
import dotenv from "dotenv"

dotenv.config()

export default function RecipeScraper(url){
    let host = url.split('/')[2];
    let base = process.env.REACT_APP_LOCAL_API || process.env.REACT_APP_API_BASE_URL;
    url = base + process.env.REACT_APP_API_GET_URL + encodeURIComponent(url);
    if(host.includes("mako.co.il")) {
        return ScrapeMako(url);
    } else if( host.includes("oogio.net")) {
        return ScrapeOogionet(url);
    }
}