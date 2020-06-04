import React from "react"
import { Table } from "react-bootstrap"

export default function Ingredients(props) {

    const { recipe } = props;

    const steps = recipe.steps;

    let items = [];
    for(let index in steps) {
        items.push(
        <tr>
            <td>{index}</td>
            <td>{steps[index]}</td>
        </tr>
            )
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