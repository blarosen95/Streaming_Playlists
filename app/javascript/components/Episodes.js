import React from "react"
import PropTypes from "prop-types"
import axios from "axios";
import Checkbox from "./Checkbox";
import SeasonOptions from "./SeasonOptions";


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
        allSeasons: [],
        currentSeason: 1,
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
        await this.setAllEpisodes();
        await this.setAllSeasons(); // TODO: Inefficient that this will run every update when I only currently have the need to re-run setAllEpisodes.
    }

    async setAllEpisodes() {
        if (this.state.currentSeason) {
            await axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&Season=${this.state.currentSeason}`)
                .then(function (response) {
                    this.setState({totalSeasons: response.data.totalSeasons});
                    this.setState({allEpisodes: response.data.Episodes});
                }.bind(this))
                .catch(e => {
                    console.error(e);
                });
        }
    }

    async setAllSeasons() {
        if (this.state.totalSeasons) {
            // TODO: Replace with range call from lodash lib
            let seasonsArr = [];
            for (let i = 1; i <= this.state.totalSeasons; i++) {
                seasonsArr.push(i);
            }
            this.setState({allSeasons: seasonsArr});
        }
    }

    handleBoxChange = changeEvent => {
        const {name} = changeEvent.target;
        console.debug(`${name}: TODO!`);
        // TODO: Normally we could get away with just submitting these values in form post.
        //  However, that could get messy when multiple seasons are at play; simpler (to think about, at least) to just
        //  push onto an array which gets submitted. TO-DO: data modeling on this array concept
    }

    createCheckbox = episode => (
        <Checkbox
            label={episode.Title}
            onBoxChange={this.handleBoxChange}
            key={episode.imdbID}
        />
    );

    createCheckboxes = () => this.state.allEpisodes.map(this.createCheckbox);

    handleSeasonChange = async (changeEvent) => {
        const newSeason = parseInt(changeEvent.target.value);
        await this.setState({currentSeason: newSeason});
        this.componentDidMount();
    }

    render() {
        return (

            <React.Fragment>

                <div className="form-group d-flex flex-row pb-4 align-items-center justify-content-center">
                    <div className="season-select-wrapper">
                        <label htmlFor="season-selector" className="text-nowrap season-label">Season</label>
                        <select id="season-selector" className="season-select form-control"
                                onChange={this.handleSeasonChange}>
                            {this.state.allSeasons.map((season) => {
                                return (<SeasonOptions val={season} key={season}/>);
                            })}
                        </select>
                    </div>
                </div>

                <div className="episodes-flex">
                    <div className="pb-4" style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridTemplateRows: "auto",
                        gridRowGap: 20,
                        gridColumnGap: 60,
                        justifyItems: "start",
                    }}>
                        {this.createCheckboxes()}
                    </div>
                </div>

            </React.Fragment>
        );
    }


}

Episodes.propTypes = {
    showName: PropTypes.string,
};


export default Episodes;