import ScrapeMako from "./makoScraper";
import ScrapeOogionet from "./oogionetScraper";
import dotenv from "dotenv"

dotenv.config()

export default function RecipeScraper(url){
    const host = url.split('/')[2];
    const base = process.env.REACT_APP_LOCAL_API || process.env.REACT_APP_API_BASE_URL;
    const encodedUrl = base + process.env.REACT_APP_API_GET_URL + encodeURIComponent(url);
    if(host.includes("mako.co.il")) {
        return ScrapeMako(encodedUrl);
    } else if( host.includes("oogio.net")) {
        return ScrapeOogionet(encodedUrl);
    }
}