import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import RecipeScraper from "../../RecipeScrapers/BaseRecipeScraper";
import Recipe from "../../Components/Recipe";
import NoSleep from 'nosleep.js'



export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            recipe: "",
            url: '',
            currentStep: "None",
            loading: false,
            noSleep: new NoSleep()
        }
    }

    async setRecipe(transcript) {
        let res = ["", this.state.currentStep]
        res = await Recipe(this.state.data, transcript, this.state.currentStep)
            this.setState({
                recipe: res[0],
                currentStep: res[1]
            })
    }


    async componentDidUpdate() {
        let finalTranscript = this.props.transcript.finalTranscript;
        if (this.state.data && finalTranscript !== '') {
            this.props.transcript.stopListening();
            this.props.transcript.resetTranscript();
            await this.setRecipe(finalTranscript);
            this.props.transcript.startListening();
        }
    }

    async onUrlClick(event) {
        this.setState({
            loading: true
        });
        event.preventDefault();
        const url = this.state.url;
        let data = await RecipeScraper(url);
        let res = await Recipe(data, "", this.state.currentStep)
        this.props.transcript.startListening();
        this.state.noSleep.enable();
        this.setState({
            data: data,
            recipe: res[0],
            currentStep: res[1],
            loading: false
        })
    }

    render() {
        let input = "";
        let name = "";
        let recipe = "";
        let startMicrophone = '';
        let loading = '';
        let showIngredients = '';
        let showSteps = '';
        if(this.state.loading) {
            loading = <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
        } else {
            if(!this.props.transcript.listening && this.state) {
            }
            if (this.state.data) {
                recipe = this.state.recipe;
                name = <h2>{this.state.data.name}</h2>
                showIngredients = <Button onClick={() => this.setRecipe("show ingredients")}>Ingredients</Button>;
                showSteps = <Button onClick={() => this.setRecipe("show steps")}>Steps</Button>
                if(this.props.transcript.browserSupportsSpeechRecognition){
                    startMicrophone = !this.props.transcript.listening ? <Button onClick={() => {this.props.transcript.startListening();}}>Start Mic</Button> : <Button onClick={() => {this.props.transcript.stopListening();}}>Stop Mic</Button>
                }
            } else {
                input =
                    <Form onSubmit={this.onUrlClick.bind(this)}>
                        <Form.Group controlId="Recipe URL">
                            <Form.Control type="text" placeholder="Enter url" onChange={(e) => this.setState({ url: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Get Recipe</Button>
                    </Form>
            }
        }
        return (
            <div>
                <div>
                    {name}
                    {recipe}
                    {input}
                    {loading}
                    {showIngredients}
                    {showSteps}
                </div>
                <div>
                    <Button onClick={() => {
                        this.state.noSleep.disable();
                        this.setState({ data: undefined, url: '', recipe: '', currentStep: "None" })
                    }
                    }>Reset</Button>
                    {startMicrophone}
                </div>
            </div>
        )
    }
}