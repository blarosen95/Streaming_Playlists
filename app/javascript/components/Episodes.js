import React from "react"
import PropTypes from "prop-types"
import axios from "axios";
import ReactDOM from "react-dom";
import Checkbox from "./Checkbox";

// const [state, setState] = useState({
//     headers: [
//         {text: "Title", value: "Title"},
//         {text: "Date", value: "Released"},
//         {text: "Episode", value: "Episode"},
//         {text: "IMDB ID", value: "imdbID"}
//     ],
//     showName: '',
//     totalSeasons: 0,
//     allEpisodes: []
// });

class Episodes extends React.Component {
    state = {
        headers: [
            {text: "Title", value: "Title"},
            {text: "Date", value: "Released"},
            {text: "Episode", value: "Episode"},
            {text: "IMDB ID", value: "imdbID"}
        ],
        showName: '',
        totalSeasons: 0,
        allEpisodes: [],
    }

    headers = [
        {text: "Title", value: "Title"},
        {text: "Date", value: "Released"},
        {text: "Episode", value: "Episode"},
        {text: "IMDB ID", value: "imdbID"}
    ];
    showName = '';
    totalSeasons = 0;
    allEpisodes = [];

    async componentDidMount() {
        await this.setTotalSeasons();
        await this.setAllEpisodes();
    }

    async setTotalSeasons() {
        await axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&type=series`)
            .then(function (response) {
                this.setState({totalSeasons: response.data.totalSeasons});
            }.bind(this))
            .catch(e => {
                console.error(e);
            });
    }

    async setAllEpisodes() {
        // TODO: This is only going to grab Season 1 of a given show for now. Will deliberate on what/who should be looping this for us here.

        // TODO: Note that the current value for totalSeasons from the REST API is "13" for a show that will have a first episode in season 12 come out in roughly 1 month from now.

        // TODO: Interestingly enough, getting a given Season also lists the total seasons count in the response body! We may save a single API call knowing this.
        if (this.state.totalSeasons) {
            await axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&Season=${1}`)
                .then(function (response) {
                    this.setState({allEpisodes: response.data.Episodes});
                }.bind(this))
                .catch(e => {
                    console.error(e);
                });
        } else {
            console.error("Could not set state for allEpisodes. Else statement reached!");
            // TODO: Revisit once the output of successful GETs are being utilized properly. We will then want this to provide our "sorry nothing found" verbiage and state values as needed.
        }
    }

    handleBoxChange = changeEvent => {
        const {name} = changeEvent.target;
        console.debug(`${name}: TODO!`);
    }

    createCheckbox = episode => (
        <Checkbox
        label={episode.Title}
        isChecked={false}
        onBoxChange={this.handleBoxChange}
        key={episode.imdbID}
        />
    );

    createCheckboxes = () => this.state.allEpisodes.map(this.createCheckbox);

    render() {
        return (

            <React.Fragment>
                <div className="form-group d-flex flex-column align-items-center">
                    {/*{this.state.allEpisodes.map(episode => <label className="text-nowrap px-3" htmlFor={episode.imdbID}>{episode.Title}</label>)}*/}
                    {/*{this.state.allEpisodes.map(episode => <input type="checkbox" name={episode.imdbID} value={episode.Title}/>)}*/}
                    {/*{this.state.allEpisodes.map(episode =>*/}
                    {/*        <label className="text-nowrap px-3" htmlFor={episode.imdbID}>{episode.Title}</label>,*/}
                    {/*    this.state.allEpisodes.map(episode => <input type="checkbox" name={episode.imdbID}*/}
                    {/*                                                 value={episode.Title}/>))}*/}
                    {this.createCheckboxes()}
                </div>

            </React.Fragment>
        );
    }


}

Episodes.propTypes = {
    showName: PropTypes.string,
    episodesCount: PropTypes.number,
};


export default Episodes;