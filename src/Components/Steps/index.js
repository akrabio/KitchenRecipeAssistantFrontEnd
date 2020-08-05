import React from "react";
import { Table, ListGroup, Button } from "react-bootstrap";

export default function Steps(props) {

    const { recipe, showStep, setStep } = props;
    const steps = recipe.steps;
    const ingredients = recipe.ingredients;
    let stepIngredients = [];
    let items = [];
    let nextButton = "";
    let previousButton = "";
    if(showStep && showStep !== "All" && showStep !== "None") {
        items.push(
            <tr key={0} style={{'direction': 'rtl', 'textAlign': 'right', 'color': 'white'}}>
            <td>{steps[showStep]}</td>
            <td>{showStep}</td>
        </tr>
        )
    loop1:
        for(let i=0; i < ingredients.length; ++i) {
            const stepArray = steps[showStep].split(" ");
            for(let j=0; j < stepArray.length; ++j) {
                const splitIngredients = ingredients[i].replace(/[,.\n]/, "").split(" ");
                const stepPart = stepArray[j].replace(/[,.\n]/, "");
                if((splitIngredients.includes(stepPart) || splitIngredients.includes(stepPart.replace(/^ו/, "")))) {
                    stepIngredients.push(<ListGroup.Item key={j} style={{'textAlign': 'right', 'direction': 'rtl', 'color': 'black'}}>{ingredients[i]}</ListGroup.Item>)
                   continue loop1;
                }
            }
        }
        nextButton = <Button onClick={() => { console.log(getNextIndex(showStep, 1, steps));setStep(getNextIndex(showStep, 1, steps)) } }> Next Step </Button>;
        previousButton = <Button onClick= {() => { console.log(getNextIndex(showStep, -1, steps));setStep(getNextIndex(showStep, -1, steps)) } }> Previous Step </Button>;
    } else {
        for(let index in steps) {
            items.push(
            <tr key={index} style={{'direction': 'rtl', 'textAlign': 'right', 'color': 'white'}}>
                <td>{steps[index]}</td>
                <td><Button onClick={() => { setStep(index) }}>{index}.</Button></td>
            </tr>
                )
        }
    }
    return (
        createTableList(items, stepIngredients, nextButton, previousButton)
    )
}

const createTableList =  (items, stepIngredients, nextButton, previousButton) => {
    return(
         <div>
            <div>
                <Table striped bordered hover size="sm">
                    <tbody>
                        {items}
                    </tbody>
                </Table>
                <ListGroup>
                    {stepIngredients}
                </ListGroup>
            </div>
            <div>
                {nextButton}
                {previousButton}
            </div>
        </div>
    )
}


const getNextIndex = (current, change, total) => {
    const totalLength = Object.keys(total).length;
    const currentNumber = Number(current);

    const result = currentNumber + change;

    return result === 0 ? 1 : result === totalLength + 1 ? totalLength : result;
}

