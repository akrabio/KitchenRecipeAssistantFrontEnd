import axios from "axios";
import cheerio from "cheerio";

import Recipe from "../Model/Recipe";


export default async function ScrapeMako(url) {
    
    const response = await axios(url)
    const html = response.data;
    const $ = cheerio.load(html);
    const name = $('.articleHeader > h1').text();
    const ingredients = $('.recipeIngredients > li').text();
    const stepsTable = $('.recipeInstructions')[0].children;
    let steps = {};
    stepsTable.forEach( element => {
        if(element.name === "p") {
            let children = element.children;
            if(children[0].name === "small") {
                steps[children[0].children[0].data] = children[1].data;
            }
        }
    })
    return new Recipe(name, ingredients, steps);
}