import React from "react";
import { Form, Button } from "react-bootstrap";
import RecipeScraper from "../../RecipeScrapers/BaseRecipeScraper";
import Recipe from "../../Components/Recipe";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            recipe: "",
            url: '',
            currentStep: "None"
        }
    }

    async componentDidUpdate() {
        let finalTranscript = this.props.transcript.finalTranscript;
        let res = ["", this.state.currentStep];
        console.log(finalTranscript)
        if (this.state.data && finalTranscript !== '') {
            this.props.transcript.stopListening();
            this.props.transcript.resetTranscript();
            res = await Recipe(this.state.data, finalTranscript, this.state.currentStep)
            this.setState({
                recipe: res[0],
                currentStep: res[1]
            })
            this.props.transcript.startListening();
        }
    }

    async onUrlClick(event) {
        event.preventDefault();
        const url = this.state.url;
        let data = await RecipeScraper(url);
        let res = await Recipe(data, "", this.state.currentStep)
        this.props.transcript.startListening();
        this.setState({
            data: data,
            recipe: res[0],
            currentStep: res[1]
        })
    }

    render() {
        let input = "";
        let name = "";
        let recipe = "";
        if (this.state.data) {
            recipe = this.state.recipe;
            name = <h2>{this.state.data.name}</h2>
            // if(this.state.showStep !== "None") {
            //     step = <Steps recipe={this.state.data} showStep={this.state.showStep}></Steps>;
            // } else if(this.state.showIngredients) {
            //     ingredients = <Ingredients recipe={this.state.data}></Ingredients>;
            // }
        } else {
            input =
                <Form onSubmit={this.onUrlClick.bind(this)}>
                    <Form.Group controlId="Recipe URL">
                        <Form.Control type="text" placeholder="Enter url" onChange={(e) => this.setState({ url: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Get Recipe
                </Button>
                </Form>
        }
        return (
            <div>
                {name}
                {recipe}
                {input}
                <Button onClick={() => this.setState({ data: undefined, url: '', recipe: '', currentStep: "None" })}>Reset</Button>
            </div>
        )
    }
}