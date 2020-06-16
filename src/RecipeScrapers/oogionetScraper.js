import axios from "axios";
import cheerio from "cheerio";
import Recipe from "../Model/Recipe";
import dotenv from "dotenv"
import { NavItem } from "react-bootstrap";

dotenv.config()

export default async function ScrapeOogionet(url) {
    const response = await axios.get(url, {headers: {apikey: process.env.REACT_APP_APIKEY}});
    const html = response.data;
    const $ = cheerio.load(html);
    const name = $('title').text();
    if(!name) {
        return new Recipe("Error getting recipe", [], {});
    }
    const perliminaryTable = $('p');
    let ingredientsTable = [];
    perliminaryTable.each(index => {
        if(perliminaryTable[index].children[0].name === "u"){
            ingredientsTable.push(perliminaryTable[index].children);
        }
    })
    let ingredients = [];
    ingredientsTable.forEach(list => {
        for(let i=0; i < list.length; ++i) {
            if(list[i].children && list[i].children[0]) {
                ingredients.push(list[i].children[0].data);
            } else if(list[i].data) {
                ingredients.push(list[i].data);
            }
        }
        
    })
    let steps = {};
    let i = 0;
    const stepsTable = $('ol')[0].children;
    stepsTable.forEach(element => {
        if(element.name === "li") {
            steps[++i] = element.children[0].data;
        }
    })

    return new Recipe(name, ingredients, steps);
}