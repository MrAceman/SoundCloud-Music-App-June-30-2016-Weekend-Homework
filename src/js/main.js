import $ from "jquery";
import _ from "lodash";
import {sc_token} from "./credentials";

var baseURL = "https://api.soundcloud.com/tracks";
var node = $(".track-results");


function fetchTracks (artist) {
  return $.ajax({
    url: `${baseURL}/?q=${artist}${sc_token}`
    // url: `${baseURL}/?q=${artist}&client_id=${sc_token}`
  });
};

function createListing (listing){
  return `<div class="each-track">
  <img class="cover-art" src="${listing.artwork_url}">
  <ul><li class="listing-title"><a><audio src="${listing.stream_url}" controls="controls">${listing.title}</audio></a></li>
  <li class="listing-band">${listing.permalink}</li>`;
}

function gotoSoundCloud (event) {
  event.preventDefault();

  var artist_name = $(".art-search-text").val();
  console.log("Artist name is set to search text");

  fetchTracks(artist_name).then(function (data) {
    var track = data.map(createListing);
    node.append(track);
  });
}


$(".search-button").on("click", gotoSoundCloud);
