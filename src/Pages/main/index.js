import React from "react"
import Ingredients from "../../Components/Ingredients/index"
import Steps from "../../Components/Steps/index"
import recipe from "../../Data/test_recipe.json"


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: recipe }
    }

    render() {
        console.log(this.props)
        return (
        <div>
            <Ingredients recipe={this.state.data}></Ingredients>
            <Steps recipe={this.state.data}></Steps>
            <p>{this.props.transcript.finalTranscript}</p>
        </div>
        )
    }
}