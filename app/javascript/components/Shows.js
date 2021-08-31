import React from "react"
import Episodes from "./Episodes";

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
                    />
                </div>
                <div className="form-group d-flex flex-row pb-4 align-items-center">
                    <label className="text-nowrap px-4" htmlFor="showNameLock">Lock Show Name?</label>
                    <input required={true} className="form-check-input" name="showNameLock" type="checkbox"
                           onChange={(e) => {
                               this.setState({
                                   showName: document.getElementById("show_set_show_name").value,
                                   episodesCount: this.state.episodesCount + 1
                               });
                               document.getElementById("show_set_show_name").disabled = true;
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
                    <input type="checkbox" name="temp" className="form-check-input"/>
                </div>
                {this.state.episodesCount >= 1 && <Episodes showName={this.state.showName}/>}
            </React.Fragment>
        );
    }

}

export default Shows
