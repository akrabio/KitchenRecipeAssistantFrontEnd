import React from "react";
import { Table, ListGroup } from "react-bootstrap";

export default function Steps(props) {

    const { recipe, showStep } = props;

    const steps = recipe.steps;
    const ingredients = recipe.ingredients;
    let stepIngredients = [];
    let items = [];
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
    } else {
        for(let index in steps) {
            items.push(
            <tr key={index} style={{'direction': 'rtl', 'textAlign': 'right', 'color': 'white'}}>
                <td>{steps[index]}</td>
                <td>{index}.</td>
            </tr>
                )
        }
    }
    return (
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
    )
}