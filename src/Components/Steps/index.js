import React from "react";
import { Table } from "react-bootstrap";

export default function Ingredients(props) {

    const { recipe, showStep } = props;

    const steps = recipe.steps;

    let items = [];
    if(showStep && showStep !== "All" && showStep !== "None") {
        items.push(
            <tr key={0} style={{'direction': 'rtl', 'textAlign': 'right'}}>
            <td>{steps[showStep]}</td>
            <td>{showStep}</td>
        </tr>
        )
    } else {
        for(let index in steps) {
            items.push(
            <tr key={index} style={{'direction': 'rtl', 'textAlign': 'right'}}>
                <td>{steps[index]}</td>
                <td>{index}.</td>
            </tr>
                )
        }
    }

    return (
    <div>
        <Table striped bordered hover>
            <tbody>
                {items}
            </tbody>
        </Table>

    </div>
    )
}