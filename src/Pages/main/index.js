import React from "react"
import Ingredients from "../../Components/Ingredients/index"
import Steps from "../../Components/Steps/index"
import recipe from "../../Data/test_recipe.json"


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: recipe,
            finalTranscript: "",
            showStep: "All",
            showIngredients: true
    
        }
    }

    componentDidUpdate() {
        let finalTranscript = this.props.transcript.finalTranscript;
        if (finalTranscript) {
            let showStep = this.state.showStep;
            let showIngredients = this.state.showIngredients;
            if(finalTranscript.includes("step")) {
                showStep = "All";
                showIngredients = false;
            } else if(finalTranscript.includes("ingredients")) {
                showStep = "None";
                showIngredients = true
            }

            this.setState({
                finalTranscript: finalTranscript,
                showIngredients: showIngredients,
                showStep: showStep
            })
            this.props.transcript.resetTranscript();
        }
    }

    render() {
        let step = "";
        let ingredients = ""
        if(this.state.showStep !== "None") {
            step = <Steps recipe={this.state.data} showStep={this.state.showStep}></Steps>;
        } else if(this.state.showIngredients) {
            ingredients = <Ingredients recipe={this.state.data}></Ingredients>;
        }
        return (
            <div>
                {ingredients}
                {step}
            </div>
        )
    }
}