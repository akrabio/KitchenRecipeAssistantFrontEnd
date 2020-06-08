export default class Recipe {
    constructor(name: string, ingredients: Array<string>, steps: object) {
        this.name = name;
        this.ingredients = ingredients;
        this.steps = steps;
    }


    name: string;
    ingredients: Array<string>;
    steps: object;
}