import React from "react";
import { Form, Button } from "react-bootstrap";
import Ingredients from "../../Components/Ingredients/index";
import Steps from "../../Components/Steps/index";
import RecipeScraper from "../../RecipeScrapers/BaseRecipeScraper";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            finalTranscript: "",
            showStep: "None",
            showIngredients: true,
            url: ''
    
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

    async onUrlClick(event) {
        event.preventDefault();
        const url = this.state.url;
        let recipe = await RecipeScraper(url)
        this.setState({
            data: recipe
        })
    }

    render() {
        let step = "";;
        let ingredients = "";
        let input = ""
        let name = ""
        if(this.state.data) {
            name = <h2>{this.state.data.name}</h2>
            if(this.state.showStep !== "None") {
                step = <Steps recipe={this.state.data} showStep={this.state.showStep}></Steps>;
            } else if(this.state.showIngredients) {
                ingredients = <Ingredients recipe={this.state.data}></Ingredients>;
            }
        } else {
            input = 
            <Form onSubmit={this.onUrlClick.bind(this)}>
                <Form.Group controlId="Recipe URL">
                    <Form.Control type="text" placeholder="Enter url" onChange= {(e) => this.setState({url: e.target.value})}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Get Recipe
                </Button>
            </Form>
        }
        return (
            <div>
                {name}
                {ingredients}
                {step}
                {input}
                <Button onClick={()=> this.setState({data: undefined})}>Reset</Button>
            </div>
        )
    }
}