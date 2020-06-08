import React from "react"
import { Table } from "react-bootstrap"

export default function Ingredients(props) {

    const { recipe, showStep } = props;

    const steps = recipe.steps;

    let items = [];
    if(showStep && showStep !== "All" && showStep !== "None") {
        items.push(
            <tr style={{'direction': 'rtl', 'text-align': 'right'}}>
            <td>{steps[parseInt(showStep)]}</td>
            <td>{showStep}</td>
        </tr>
        )
    } else {
        for(let index in steps) {
            items.push(
            <tr style={{'direction': 'rtl', 'text-align': 'right'}}>
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