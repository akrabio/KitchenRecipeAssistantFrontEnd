import axios from "axios";
import cheerio from "cheerio";
import Recipe from "../Model/Recipe";
import dotenv from "dotenv"

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
        if(perliminaryTable[index].children[0].name === "u" || perliminaryTable[index].children[0].name === "span"){
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
    const stepsHeaders = $('h5');
    const stepsTable = $('ol');
    let stepIndex = 0;
    for(let i=0; i < stepsTable.length - 1; ++i){
        if(stepsHeaders[i]) {
            steps[++stepIndex] = stepsHeaders[i].children[0].data;
        }
        stepsTable[i].children.forEach(element => {
            if(element.name === "li") {
                steps[++stepIndex] = element.children[0].data;
            }
        });
    }

    return new Recipe(name, ingredients, steps);
}