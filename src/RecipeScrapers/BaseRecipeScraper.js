import ScrapeMako from "./makoScraper";
import ScrapeOogionet from "./oogionetScraper";



export default function RecipeScraper(url){
    let host = url.split('/')[5];
    
    if(host.includes("mako.co.il")) {
        return ScrapeMako(url);
    } else if( host.includes("oogio.net")) {
        return ScrapeOogionet(url);
    }
}