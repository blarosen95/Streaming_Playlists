import React from "react"
import Episodes from "./Episodes";

class Shows extends React.Component {

    state = {
        showName: "",
        showsCount: 1, // TODO: This would be helpful in a new "Shows" component which renders this component
        // (TODO Continued) (by then, this one would be called something like "Show" instead of "Shows") X times.
        episodesCount: 0, // TODO: This will not be part of the approach used in conditionally rendering the OldEpisodes component for a given Show.
        isShowLocked: false,
        episodesSerial: [],

        showNumber: 1,
        showsSerial: [],
        playlistTitle: "",
        playlistSerial: [],
    }

    // TODO: Handle changes in OldEpisodes.js like this so that I don't need to call the update myself (might already work)
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

    handleEpisodesSave = async (saveSerial, playlistTitle) => {
        await this.setState({episodesSerial: saveSerial});
        console.log(this.state.episodesSerial);
        // console.log(typeof this.state.episodesSerial);

        // console.log(playlistTitle);

        // var epSerial = this.state.episodesSerial; // FIXME: passes by ref (more an FYI than a fixme)
        var showSerial = saveSerial;
        showSerial['show_name'] = this.state.showName;
        await this.setState({showsSerial: showSerial});
        console.log(this.state.showsSerial);

        // TODO: The following should be on the outer-most node of the final serial object, whereas the showName should be one node deeper in.
        var playlistSerial = saveSerial;
        // playlistSerial.playlist_title = playlistTitle;
        // playlistSerial.show_name = this.state.showName;
        playlistSerial['playlist_title'] = playlistTitle;
        playlistSerial['show_name'] = this.state.showName;
        await this.setState({playlistSerial: playlistSerial});
        console.log(this.state.playlistSerial);

        var altSerial = {};
        altSerial['playlist_title'] = playlistTitle;
        // TODO: The following column creation will need to be run in a loop against each show in the playlist being saved (once I get multiple shows feature implemented, this can be fixed)
        // TODO ALT: Alternatively, we could insert first with just the DB's playlist function, then we can submit each show individually? It's more calls to DB, if possible I would prefer to keep our calls from app to DB to one per action
        altSerial['show_name'] = this.state.showName;

        // altSerial['Seasons'] = {saveSerial};

        altSerial['Seasons'] = saveSerial;

        console.log(altSerial);
    }


    render() {
        return (
            <React.Fragment>
                <div className="d-flex flex-column align-items-center justify-content-center py-4">
                    <div
                        className="form-group d-flex flex-row pb-4 align-items-center justify-content-center form-lock">
                        <label className="text-nowrap px-4 show-label" htmlFor="show_set_show_name">Show Name</label>
                        <input required={true} className="form-control" type="text" name="show_set[show_name]"
                               id="show_set_show_name"
                        />
                        <input required={true} className="form-check-input" id="showNameLock" name="showNameLock"
                               type="checkbox" onChange={this.handleShowLock}
                        />
                        <label className="fa text-nowrap" htmlFor="showNameLock"/>
                    </div>

                </div>

                {/*TODO: The following is the initial implementation of a showNumber value. I want it to increment by 1 for each show in the playlist (to be handled by the real Shows component, once this becomes just Show)*/}
                {this.state.isShowLocked && <Episodes showName={this.state.showName} showNumber={this.state.showNumber}
                                                      handleEpisodesSave={this.handleEpisodesSave}/>}
            </React.Fragment>
        );
    }

}

export default Shows
