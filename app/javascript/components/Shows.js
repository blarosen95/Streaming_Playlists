import React from "react"
import PropTypes from "prop-types"
import Episodes from "./Episodes";
import {useState} from "react";

// const [state, setState] = useState('start')

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
                               console.debug(e.currentTarget.value);
                               this.setState({
                                   showName: e.currentTarget.value,
                                   episodesCount: this.state.episodesCount + 1
                               });
                           }}
                    />

                    {this.state.episodesCount >= 1 && <Episodes showName={this.state.showName}/>}
                </div>
            </React.Fragment>
        );
    }

    // componentDidMount() {
    //     console.debug("Mounted");
    //     // window.addEventListener("DOMContentLoaded", function () {
    //     document.getElementById("show_set_show_name").addEventListener("focus", function () {
    //         console.debug("Hello?");
    //     });
    //     // });
    // }

}

export default Shows
