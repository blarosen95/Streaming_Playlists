import React from "react"
import Episodes from "./Episodes";
import EpisodesAlt from "./EpisodesAlt";

class Shows extends React.Component {

    state = {
        showName: "",
        showsCount: 1, // TODO: This would be helpful in a new "Shows" component which renders this component
        // (TODO Continued) (by then, this one would be called something like "Show" instead of "Shows") X times.
        episodesCount: 0, // TODO: This will not be part of the approach used in conditionally rendering the Episodes component for a given Show.
        isShowLocked: false,
    }

    // TODO: Handle changes in Episodes.js like this so that I don't need to call the update myself (might already work)
    handleShowLock = async (changeEvent) => {
        const showNameInput = document.getElementById("show_set_show_name");
        if (!showNameInput.value) {
            return;
        }

        await this.setState({showName: showNameInput.value});
        const isLocked = changeEvent.target.checked;
        await this.setState({isShowLocked: isLocked});
        showNameInput.disabled = this.state.isShowLocked;
    };

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
                               onChange={this.handleShowLock}
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

                {/* TODO: The following div wrapper is indeed the culprit for allowing the Season select input to shift left and right. Removal required for PR Approval. */}
                {/*<div className="form-group d-flex flex-row pb-4 align-items-center justify-content-center potential-culprit">*/}
                {/*    {this.state.isShowLocked && <Episodes showName={this.state.showName}/>} TODO: Commented out to test EpisodesAlt with line below. */}
                    {this.state.isShowLocked && <EpisodesAlt showName={this.state.showName}/>}
                {/*</div>*/}
            </React.Fragment>
        );
    }

}

export default Shows
