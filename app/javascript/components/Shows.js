import React from "react"
import PropTypes from "prop-types"
import Episodes from "./Episodes";
import {times} from 'lodash';

class Shows extends React.Component {

    state = {
        showName: "",
        showsCount: 1,
        episodesCount: 0,
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-group d-flex flex-row pb-4 align-items-center">
                    <label className="text-nowrap px-4" htmlFor="show_set_show_name">Show Name</label>
                    <input required={true} className="form-control" type="text" name="show_set[show_name]"
                           id="show_set_show_name"
                           onBlur={(e) => {
                               this.setState({
                                   showName: e.currentTarget.value,
                                   episodesCount: this.state.episodesCount + 1 // TODO: We add in more than one place!! This may be debug gold later on.
                               });
                           }}
                    />
                </div>
                <div className="form-submit-button d-flex justify-content-end">
                    <span className="addEpisode btn-5" id="addEpisode" onClick={
                        (e) => {
                            this.setState({
                                episodesCount: this.state.episodesCount + 1
                            });
                            console.debug(this.state.episodesCount);
                        }}>
                        Episode
                    </span>
                </div>
                {this.state.episodesCount >= 1 && <Episodes showName={this.state.showName}/>}
                {/*<div id="episodesDiv">*/}
                {/*    {times(this.state.episodesCount, () => {*/}
                {/*        <Episodes showName={this.state.showName}/> // TODO: This is subpar API usage. Every single one of these will run up the API Usage by 1, consider refactor such that API is called in Shows (this) instead!*/}
                {/*        console.debug("Hello");*/}
                {/*    })}*/}
                {/*</div>*/}
            </React.Fragment>
        );
    }

}

export default Shows
