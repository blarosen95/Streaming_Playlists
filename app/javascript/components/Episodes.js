import React from "react"
import PropTypes from "prop-types"
import axios from "axios";

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
        allEpisodes: []
    }

    componentDidMount() {
        this.setState(this.setTotalSeasons);
        // console.log(this.state);
        this.setAllEpisodes();
    }

    SetEps() {
        axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&type=series`)
            .then(response => {
                const totalSeasons = response.data.totalSeasons;
                this.setState({totalSeasons});

            })
            .catch(e => {
                console.error(e);
            });
    }

    // setTotalSeasons() {
    //     axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${this.props.showName}&type=series`)
    //         .then(response => {
    //             const totalSeasons = response.data.totalSeasons;
    //             this.setState({totalSeasons});
    //             // console.log(this.state);
    //             return {totalSeasons};
    //         })
    //         .catch(e => {
    //             console.error(e);
    //         });
    // }

    setAllEpisodes() {
        // This is only going to grab Season 1 of a given show for now. Will deliberate on what/who should be looping this for us here.
        // console.log(this.state);

        // TODO: Interestingly enough, getting a given Season also lists the total seasons count in the response body! We may save a single API call knowing this.
        if (this.totalSeasons) {
            axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${showName}&Season=${1}`)
                .then(response => {
                    // console.log(response.data.Episodes);
                    const episodes = response.data.Episodes;
                    this.setState({episodes});
                    return this.state;
                })
                .catch(e => {
                    console.error(e);
                });
        }
    }

    render() {
        return (
            <ul>
                {this.state.allEpisodes.map(episode => <li>{episode.Title}</li>)}
            </ul>
            // <React.Fragment>
            //     Show Name: {this.props.showName}
            // </React.Fragment>
        );
    }
}

Episodes.propTypes = {
    showName: PropTypes.string,
    headers: [
        {text: "Title", value: "Title"},
        {text: "Date", value: "Released"},
        {text: "Episode", value: "Episode"},
        {text: "IMDB ID", value: "imdbID"}
    ],
    totalSeasons: 0,
    allEpisodes: []
};


export default Episodes;