import React from "react"
import { ListGroup } from "react-bootstrap"

export default function Ingredients(props) {

    const { recipe } = props;

    const ingredients = recipe.ingredients;

    let items = [];
    for(let i=0; i < ingredients.length; ++i) {
        items.push(<ListGroup.Item>{ingredients[i]}</ListGroup.Item>)
    }


    return (
    <div>
        <ListGroup>
            {items}
        </ListGroup>

    </div>
    )
}