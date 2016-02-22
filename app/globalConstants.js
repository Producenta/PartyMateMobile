'use strict';

let globalConstantsModule = {
	rangeForClubsInMeters: 200,
	defaultNoClubImageUrl: "http://vignette2.wikia.nocookie.net/horrormovies/images/e/e3/No_Image.png/revision/latest?cb=20140329231046",
	startUpView: './views/clubs/clubs',
	baseUrl: 'http://partymate.apphb.com/',
	OKButtonText: 'OK',
	noConnectionTitle: "Sorry..",
	noConnectionMessage: "You are not connected to the internet!",
	noConnectionTapRefreshMessage: "You are not connected to the internet! Tap Refresh icon when you are ready. :)",
	noClubAvailableTitle: ":(",
	noClubAvailableMessage: "You are not in club at the moment. Use the Refresh icon when you are somewhere else.",
	noGPSTitle: "Whoops..",
	noGPSMessage: "Location Services are not enabled at the moment.",
	noGPSMessage: "Will enable Location Services. Please Tap Refresh icon again after it. :)",
	noGPSTapRefreshMessage: "Location Services are not enabled at the moment. Tap Refresh icon to enable them.",
	willStartWorkingWithDataTitle: "Connecting to our server.",
	willStartWorkingWithDataMessage: "Please be patient...",
	somethingBadHappenedTitle: "Something Baad happened!",
	somethingBadHappenedMessage: "Please try again later.",
	fetchingClubsFromServerMessage: "Will Fetch our Clubs! :)",
	updatingCurrentClubPositionMessage: "Will update your position and find club near you! :)",

	defaultNoClubDetailsName: "PartyMate",
	defaultNoClubDetailsSiteUrl: baseUrl,
	defaultNoClubDetailsProfileImageUrl: "",
	defaultNoClubDetailsPhoto1Url: "",
	defaultNoClubDetailsPhoto2Url: ""
}; 
 
module.exports = globalConstantsModule;