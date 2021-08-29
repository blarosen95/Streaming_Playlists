<template>
  <v-data-table :items-per-page="10" :headers="headers" :items="allEpisodes">
    <template v-slot:top>
      <v-tooolbar flat color="white">
        <v-text-field
            label="Show Name"
            v-model="showName"
            @input="getCurrentData">
        </v-text-field>
      </v-tooolbar>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  name: "Episodes",
  data() {
    return {
      headers: [
        {text: "Title", value: "Title"},
        {text: "Date", value: "Released"},
        {text: "Episode", value: "Episode"},
        {text: "IMDB ID", value: "imdbID"}
      ],
      showName: "",
      totalSeasons: 0,
      allEpisodes: [],
    };
  },

  methods: {
    // getCurrentData(showName) {
    getCurrentData() {
      this.setTotalSeasons(this.showName);
      this.setAllEpisodes(this.showName);
    },

    setTotalSeasons(showName) {
      return axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${showName}&type=series`)
          .then(response => {
            this.totalSeasons = response.data.totalSeasons;
          })
          .catch(e => {
            console.error(e);
          });
    },

    setAllEpisodes(showName) {
      // This is only going to grab Season 1 of a given show for now. Will deliberate on what/who should be looping this for us here.

      // TODO: Interestingly enough, getting a given Season also lists the total seasons count in the response body! We may save a single API call knowing this.
      if (this.totalSeasons) {
        return axios.get(`http://www.omdbapi.com/?apikey=6c68744e&t=${showName}&Season=${1}`)
            .then(response => {
              this.allEpisodes = response.data.Episodes;
            })
            .catch(e => {
              console.error(e);
            });
      }
    },

  }
}

</script>