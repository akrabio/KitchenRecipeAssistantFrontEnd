import React from "react";
import axios from "axios";

import Ingredients from "../Ingredients";
import Steps from "../Steps";

const SHOW_INGREDIENTS = "ingredients";
const NEXT_STEP = "next_step";
const PREVIOUS_STEP = "previous_step";
const STEPS = "steps";

export default async function Recipe(recipe, transcript, currentStep) {
    const upperLimit = Object.keys(recipe.steps).length + 1;
    const lowerLimit = 1;
    let showStep = currentStep;
    if(transcript) {
        const response = await axios(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_SEND_TO_WA + transcript , {headers: {apikey: process.env.REACT_APP_APIKEY}});

        const intent = response.data.intent;
        const entity = response.data.entity;

        switch(intent) {
            case(SHOW_INGREDIENTS): {
                showStep = "None";
                break;
            }
            case(NEXT_STEP): {
                if(typeof(showStep) == 'number') {
                    showStep = (showStep + 1) % upperLimit;
                }
                break;
            } 
            case(PREVIOUS_STEP): {
                if(typeof(showStep) == 'number') {
                    showStep--;
                    showStep = showStep < lowerLimit ? lowerLimit : showStep;
                }
                break;
            }
            case(STEPS): {
                if(entity !== undefined && lowerLimit <= parseInt(entity.value) && parseInt(entity.value) <= upperLimit) {
                    showStep = parseInt(entity.value);
                } else {
                    showStep = "All";
                }
                break;
            }
            default:
                break;
        }
    }

    let steps = "";
    let ingredients = "";
    if(showStep !== "None") {
        steps = <Steps recipe={recipe} showStep={showStep}/>;
    } else {
        ingredients = <Ingredients recipe={recipe}/>
    }
    return ([
        <div>
            {steps}
            {ingredients}
        </div>
        ,showStep]
    );
}
