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
                <div className="d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="form-group d-flex flex-row pb-4 align-items-center justify-content-center">
                        <label className="text-nowrap px-4" htmlFor="show_set_show_name">Show Name</label>
                        <input required={true} className="form-control" type="text" name="show_set[show_name]"
                               id="show_set_show_name"
                        />
                    </div>
                    <div className="form-group-box d-flex flex-row pb-4 justify-content-center align-items-center">
                        <label className="text-nowrap px-4" htmlFor="showNameLock">Lock Show?</label>
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
                </div>

                {/*<div className="form-submit-button d-flex justify-content-end">*/}
                {/*    <span className="addEpisode btn-5" id="addEpisode" onClick={*/}
                {/*        (e) => {*/}
                {/*            this.setState({*/}
                {/*                episodesCount: this.state.episodesCount + 1*/}
                {/*            });*/}
                {/*            console.debug(this.state.episodesCount);*/}
                {/*        }}>*/}
                {/*        Episode*/}
                {/*    </span>*/}
                {/*</div>*/}

                <div className="form-group d-flex flex-row pb-4 align-items-center justify-content-center">
                    {this.state.episodesCount >= 1 && <Episodes showName={this.state.showName}/>}
                </div>
            </React.Fragment>
        );
    }

}

export default Shows
