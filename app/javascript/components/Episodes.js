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
        tracking: [],
        trackingComplete: false,
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
        // await this.setAllEpisodes();
        // await this.setAllSeasons(); // TODO: Inefficient that this will run every update when I only currently have the need to re-run setAllEpisodes.
        if (!this.state.trackingComplete) {
            await this.setTracking();
            await this.defaultTracking();
        }

        await this.setAllSeasons();
    }

    async defaultTracking() {
        var result = [];
        for (let i = 0; i < this.state.totalSeasons; i++) {
            result.push(this.state.tracking[i].map(function (el) {
                var o = Object.assign({}, el);
                o.isSelected = false;
                return o;
            }))
        }
        this.setState({tracking: result});
        this.setState({trackingComplete: true});
    }

    async setTracking() {
        var tracking = this.state.tracking;
        // TODO: Design a condition which only allows this to run if tracking state is empty (maybe place if statement in call to this function)
        await axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&Season=1`)
            .then(function (response) {
                this.setState({totalSeasons: response.data.totalSeasons});
                tracking.push(response.data.Episodes);
                // this.setState({tracking: tracking});
                // this.setState({tracking: response.data.Episodes});
            }.bind(this))
            .catch(e => {
                console.error(e);
            });
        for (let i = 2; i <= this.state.totalSeasons; i++) {
            // console.log(`Season number ${i} in forI loop.`); // FIXME: Remove this line, tested and works (even with single season shows).
            await axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&Season=${i}`)
                .then(function (response) {
                    tracking.push(response.data.Episodes);
                })
            // console.log(this.state.tracking);
        }
        this.setState({tracking: tracking});
        // console.log(this.state.tracking[0]);
        // console.log(this.state.tracking);
        // this.setState({trackingComplete: true});
    }

    async setAllEpisodes() {
        if (this.state.currentSeason) {
            await axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&Season=${this.state.currentSeason}`)
                .then(function (response) {
                    this.setState({totalSeasons: response.data.totalSeasons});
                    this.setState({allEpisodes: response.data.Episodes});
                    console.log(response.data.Episodes);
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

        this.state.tracking[this.state.currentSeason - 1][name - 1]['isSelected'] =
            !this.state.tracking[this.state.currentSeason - 1][name - 1]['isSelected'];

        this.componentDidMount();
    }

    createCheckbox = episode => (
        <Checkbox
            label={episode.Title}
            onBoxChange={this.handleBoxChange}
            key={episode.imdbID}
            isSelected={episode.isSelected}
            number={episode.Episode}
        />
    );

    // createCheckboxes = () => this.state.allEpisodes.map(this.createCheckbox);
    createCheckboxes = () => this.state.tracking[this.state.currentSeason - 1].map(this.createCheckbox);

    handleSeasonChange = async (changeEvent) => {
        const newSeason = parseInt(changeEvent.target.value);
        await this.setState({currentSeason: newSeason});
        // this.componentDidMount(); // TODO: Replace need to re-render with something that won't mutate tracking values.
    }

    render() {
        return (

            <React.Fragment>
                {this.state.trackingComplete &&
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
                }

                {this.state.trackingComplete &&
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
                }

            </React.Fragment>
        );
    }


}

Episodes.propTypes = {
    showName: PropTypes.string,
};


export default Episodes;