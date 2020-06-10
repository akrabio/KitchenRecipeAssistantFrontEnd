import React from "react";
import axios from "axios";

import Ingredients from "../Ingredients";
import Steps from "../Steps";

const SHOW_INGREDIENTS = "ingredients";
const NEXT_STEP = "next_step";
const PREVIOUS_STEP = "previous_step";
const STEPS = "steps";

export default async function Recipe(recipe, transcript) {

    // const { transcript, recipe } = props;

    let showIngredients = true;
    let showStep = "None";
    if(transcript) {
        const response = await axios(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_SEND_TO_WA + transcript , {headers: {apikey: process.env.REACT_APP_APIKEY}});

        const intent = response.data.intent;
        const entity = response.data.entity;
        console.log(intent);
        console.log(entity)

        switch(intent) {
            case(SHOW_INGREDIENTS): {
                showIngredients = true;
                showStep = "None";
                break;
            }
            case(NEXT_STEP): {
                if(typeof(showStep) == 'number') {
                    showStep++;
                }
                break;
            } 
            case(PREVIOUS_STEP): {
                if(typeof(showStep) == 'number') {
                    showStep--;
                }
                break;
            }
            case(STEPS): {
                if(entity !== undefined) {
                    showStep = parseInt(entity.value);
                } else {
                    showStep = "All";
                }
                showIngredients = false;
                break;
            }
            default: {
                showStep = "None";
                showIngredients = true;
                break;
            }
        }
        console.log(showStep);
        console.log(showIngredients);
    }

    let steps = "";
    let ingredients = "";
    if(showStep !== "None") {
        steps = <Steps recipe={recipe} showStep={showStep}/>;
    }
    if(showIngredients) {
        ingredients = <Ingredients recipe={recipe}/>
    }
    return (
        <div>
            {steps}
            {ingredients}
        </div>
    );
}
