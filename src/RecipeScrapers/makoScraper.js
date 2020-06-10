import axios from "axios";
import cheerio from "cheerio";
import Recipe from "../Model/Recipe";
import dotenv from "dotenv";

dotenv.config();

export default async function ScrapeMako(url) {
    const response = await axios.get(url, {headers: {apikey: process.env.REACT_APP_APIKEY}});
    const html = decodeURIComponent(response.data);
    const $ = cheerio.load(html);
    const name = $('.articleHeader > h1').text();
    if(!name) {
        return new Recipe("Error getting recipe", [], {});
    }
    const ingredientsTable = $('.recipeIngredients > li > span');
    let ingredients = []
    ingredientsTable.each(index => {
        ingredients.push(ingredientsTable[index].children[0].data)
    })
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