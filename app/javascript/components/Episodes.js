import React from "react"
import PropTypes from "prop-types"
import axios from "axios";
import Checkbox from "./Checkbox";
import SeasonButton from "./SeasonButton";
import SeasonOptions from "./SeasonOptions";
import {range} from "lodash";


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
        // episodesCount: useMemo(() => {allEpisodes.length}, [allEpisodes]),

        // currentPage: 1,
        // setCurrentPage: 1
    }
    /*
        currentEpisodesData = useMemo(() => {
            const firstPageIndex = (this.state.currentPage - 1) * pageSize;
            const lastPageIndex = firstPageIndex + pageSize;
            return this.state.allEpisodes.slice(firstPageIndex, lastPageIndex);
        }, [this.state.currentPage])
     */

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
        // await this.setTotalSeasons(); // TODO: Remove me, we do this in the setAllEpisodes
        await this.setAllEpisodes();
        await this.setAllSeasons(); // TODO: Inefficient that this will run every update when I only currently have the need to re-run setAllEpisodes.
    }

    // async componentDidUpdate() {
    //     await this.setAllEpisodes();
    // }

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
        // FIXME: The condition for the following if statement was just changed. It's better off removed once I at least get the upcoming commit past testing.
        if (this.state.currentSeason) {
            await axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&Season=${this.state.currentSeason}`)
                .then(function (response) {
                    // TODO: Remove above logging line, obviously. First, I'm taking some notes directly below
                    // The totalSeasons value for a show such as Homeland, which has officially ended, is correct.
                    // The totalSeasons value for a show such as Bob's Burgers, which is ongoing with an upcoming new season, is incorrect
                    // Bob's Burgers has a totalSeasons value of "13" when the upcoming season number is 12
                    // The value for Archer, which just recently released at least the first episode for its 12th season, is correct...
                    // I will just treat Bob's Burgers as an edge case here for now then... Will pretend all responses are accurate and add in some form of validation later on...
                    this.setState({totalSeasons: response.data.totalSeasons});
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

    // slicerooni = useMemo((jsonObject) => {
    //     var sliceable = [];
    //     for(var key in jsonObject) {
    //         if (!jsonObject.hasOwnProperty) {
    //             console.debug("key");
    //             continue;
    //         }
    //         sliceble.push(jsonObject[key])
    //     }
    //
    //     const firstPageIndex = (this.state.currentPage - 1) * pageSize;
    //     const lastPageIndex = firstPageIndex + pageSize;
    //     return sliceable.slice(firstPageIndex, lastPageIndex);
    // }, [this.state.currentPage]);

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

    verifyMemo = () => console.log(this.state.episodesCount);

    handleSeasonChange = async (changeEvent) => {
        const newSeason = parseInt(changeEvent.target.value);
        await this.setState({currentSeason: newSeason});
        this.componentDidMount(); // TODO: Can't currently find best practices here; revisit.
    }

    // handleSeasonSelect = async (selectEvent) => {
    //     console.log(`Event: ${selectEvent}`);
    // }

    // TODO: DEPRECATED
    createSeasonButton = seasonNum => (
        <SeasonButton
            label={seasonNum}
            onButtonClick={this.handleSeasonChange}
            key={seasonNum}
        />
    );

    // TODO: DEPRECATED
    createSeasonButtons = () => this.state.allSeasons.map(this.createSeasonButton);

    render() {
        return (

            <React.Fragment>
                <div className="form-ungroup d-flex flex-column align-items-center justify-content-center">
                    <div className="text-nowrap pb-4" style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridTemplateRows: "auto",
                        gridRowGap: 20,
                        gridColumnGap: 60,
                        justifyItems: "start",
                        paddingLeft: "15%",
                    }}>
                        {this.createCheckboxes()}
                    </div>
                    {/*<div className="season-buttons d-flex flex-row align-items-center justify-content-center">*/}
                    {/*<div className="season-buttons">*/}
                    {/*    {this.createSeasonButtons()}*/}
                </div>
                <div className="season-select-wrapper">
                    <label htmlFor="season-selector" className="text-nowrap">Change Seasons:</label>
                    <select id="season-selector" className="season-select" onChange={this.handleSeasonChange}>
                        {this.state.allSeasons.map((season) => {
                            return (<SeasonOptions val={season}/>);
                        })}
                    </select>
                </div>
                {/*</div>*/}
                {/*{this.verifyMemo()}*/}
                {/*<Pagination*/}
                {/*    className="pagination-bar"*/}
                {/*    currentPage={this.state.currentPage}*/}
                {/*    totalCount={this.state.allEpisodes.length}*/}
                {/*    paginateOn={pageSize}*/}
                {/*    onPageChange={page => this.slicerooni(page)}*/}
                {/*/>*/}
            </React.Fragment>
        );
    }


}

Episodes.propTypes = {
    showName: PropTypes.string,
    // episodesCount: PropTypes.number,
};


export default Episodes;