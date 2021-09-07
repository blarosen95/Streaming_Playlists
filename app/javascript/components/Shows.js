import React from "react"
import Episodes from "./Episodes";

class Shows extends React.Component {

    state = {
        showName: "",
        showsCount: 1, // TODO: This would be helpful in a new "Shows" component which renders this component
        // (TODO Continued) (by then, this one would be called something like "Show" instead of "Shows") X times.
        episodesCount: 0, // TODO: This will not be part of the approach used in conditionally rendering the OldEpisodes component for a given Show.
        isShowLocked: false,
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

                {this.state.isShowLocked && <Episodes showName={this.state.showName}/>}
            </React.Fragment>
        );
    }

}

export default Shows
