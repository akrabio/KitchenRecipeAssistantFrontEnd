import React from "react"
import Ingredients from "../../Components/Ingredients/index"
import Steps from "../../Components/Steps/index"
import recipe from "../../Data/test_recipe.json"


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: recipe,
            finalTranscript: ""
        }
    }

    componentDidUpdate() {
        if (this.props.transcript.finalTranscript) {
            this.setState({
                finalTranscript: this.props.transcript.finalTranscript
            })
            this.props.transcript.resetTranscript();
        }
    }

    render() {
        return (
            <div>
                <Ingredients recipe={this.state.data}></Ingredients>
                <Steps recipe={this.state.data}></Steps>
            </div>
        )
    }
}