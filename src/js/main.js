import $ from "jquery";
import _ from "lodash";
import {
    sc_token
} from "./credentials";

var baseURL = "https://api.soundcloud.com/tracks";
var node = $(".track-results");
var playnode = $(".audio-player");
var nowPlaying = $(".now-playing");
var currentSongResults = [];

function fetchTracks(artist){return $.ajax({
        url: `${baseURL}/?q=${artist}&client_id=${sc_token}`
    });
};

function createListing(listing) {
    node.empty();
    if (listing.artwork_url === null) {
        listing.artwork_url = "http://placecage.com/200/200";
    }
    return `<div class="eachtrack"><a class="taginfo" title="${listing.title}" href=${listing.stream_url}>
<img class="cover-art" src="${listing.artwork_url}">
<ul><li class="listing-title">${listing.title}</li>
<li class="listing-band">${listing.permalink}</li></a></div>`;
};

function playTrack(song, title) {
    var newsong = `<audio src=${song}?client_id=${sc_token} controls="controls" autoplay></audio>`;
    playnode.html(newsong);
    nowPlaying.html(`Now playing: ${title}`);
};

function playEventListener(track) {
    $(".taginfo").on("click", function(event) {
        event.preventDefault();
        var song = (event.delegateTarget.href);
        var title = (event.delegateTarget.title);
        playTrack(song, title);
    });
}

function gotoSoundCloud(event) {
    event.preventDefault();
    node.empty();
    nowPlaying.empty();
    var artist_name = $(".art-search-text").val();
    fetchTracks(artist_name).then(function(data) {
        currentSongResults = [data];
        var track = data.map(createListing);
        node.append(track);
        // Adds event listener for dynamically created content from this function
        playEventListener(track);
    });
};

// ********************************
// Hard mode sort function
// ********************************
// function sortResults(items){
//     console.log(items);
// }
//
// function sortSelector(event) {
//     event.preventDefault();
//     console.log($(".select-field").val());
//     if ($(".select-field").val() == 1) {
//       var sortOrder = "asc";
//       var sortedResultsObj = currentSongResults.map(sortResults(sortOrder));
//       node.append(sortedResultsObj);
//         // _.orderBy(currentSongResults, title, [asc]);
//
//     } else if ($(".select-field").val() == 2) {
//       var sortOrder = "desc";
//       var sortedResultsObj = currentSongResults.map(sortResults(sortOrder));
//       node.append(sortedResultsObj);
//       // _.orderBy(currentSongResults, title, [desc]);
//     };
// }
// // Event listener for sort
// $(".sort-button").on("click", sortSelector);


// Connects to SoundCloud
$(".search-button").on("click", gotoSoundCloud);
