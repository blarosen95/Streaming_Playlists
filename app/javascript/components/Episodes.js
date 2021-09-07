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

        savingConcept: [],
        savingConceptShow: false,
        allSeasonsSaving: [],
        hidingNormals: false,
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
        if (!this.state.trackingComplete) {
            await this.setTracking();
            await this.defaultTracking();
        }
        if (!this.state.savingConceptShow) {
            await this.setAllSeasons();
        } else {
            await this.setAllSeasonsSavingDemo();
        }
    }

    async defaultTracking() {
        var result = [];
        for (let i = 0; i < this.state.totalSeasons; i++) {
            result.push(this.state.tracking[i].map(function (el) {
                var o = Object.assign({}, el);
                o.isSelected = false;
                o.seasonNumber = i + 1;
                return o;
            }))
        }
        this.setState({tracking: result});
        this.setState({trackingComplete: true});
    }

    async setTracking() {
        var tracking = this.state.tracking;
        await axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&Season=1`)
            .then(function (response) {
                this.setState({totalSeasons: response.data.totalSeasons});
                tracking.push(response.data.Episodes);
            }.bind(this))
            .catch(e => {
                console.error(e);
            });
        for (let i = 2; i <= this.state.totalSeasons; i++) {
            await axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&Season=${i}`)
                .then(function (response) {
                    tracking.push(response.data.Episodes);
                })
        }
        this.setState({tracking: tracking});
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
            // TODO: Replace with range call from lodash lib (edit: why? It's one more dependency I don't need.)
            let seasonsArr = [];
            for (let i = 1; i <= this.state.totalSeasons; i++) {
                seasonsArr.push(i);
            }
            this.setState({allSeasons: seasonsArr});
        }
    }

    async setAllSeasonsSavingDemo() {
        if (this.state.totalSeasons) {
            let seasonsArr = [];
            this.state.savingConcept.map(season => {
                if (season.length) {
                    seasonsArr.push(season[0].seasonNumber);
                }
            });
            this.setState({allSeasonsSaving: seasonsArr});
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

    createDemoLabel = episode => (
        <label className="form-check-label episode-label" key={episode.imdbID}>
            {episode.Title}
        </label>
    );

    createDemoLabels = () => this.state.savingConcept[this.state.currentSeason - 1].map(this.createDemoLabel);

    // createCheckboxes = () => this.state.allEpisodes.map(this.createCheckbox);
    createCheckboxes = () => this.state.tracking[this.state.currentSeason - 1].map(this.createCheckbox);

    handleSeasonChange = async (changeEvent) => {
        const newSeason = parseInt(changeEvent.target.value);
        await this.setState({currentSeason: newSeason});
    }

    handleSeasonChangeSaveConcept = async (changeEvent) => {
        const newSeason = parseInt(changeEvent.target.value);
        await this.setState({currentSeason: newSeason});
    }

    handleSaveConcept = async (changeEvent) => {
        var filtered = this.state.tracking.map(season => {
            return season.filter(episode => {
                return episode.isSelected;
            });
        });
        await this.setState({savingConcept: filtered});
        await this.setState({savingConceptShow: true});
        await this.setState({hidingNormals: true});

        this.componentDidMount();
    }

    render() {
        return (

            <React.Fragment>
                {/*{this.state.trackingComplete &&*/}
                {!this.state.hidingNormals && this.state.trackingComplete &&
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

                {this.state.savingConceptShow &&
                <div className="form-group d-flex flex-row pb-4 align-items-center justify-content-center">
                    <div className="season-select-wrapper">
                        <label htmlFor="season-selector" className="text-nowrap season-label">Season</label>
                        <select id="season-selector" className="season-select form-control"
                                onChange={this.handleSeasonChangeSaveConcept}>
                            {this.state.allSeasonsSaving.map((season) => {
                                return (<SeasonOptions val={season} key={season}/>);
                            })}
                        </select>
                    </div>
                </div>
                }

                {!this.state.hidingNormals && this.state.trackingComplete &&
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

                {this.state.trackingComplete &&
                <div className="demo-temp">
                    <span onMouseDown={this.handleSaveConcept}>Test Saves</span>
                </div>
                }

                {this.state.savingConceptShow &&
                <div className="episodes-flex">
                    <div className="pb-4" style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridTemplateRows: "auto",
                        gridRowGap: 20,
                        gridColumnGap: 60,
                        justifyItems: "start",
                    }}>
                        {this.createDemoLabels()}
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