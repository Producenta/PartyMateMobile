'use strict';

var page = require("ui/page");
var view = require("ui/core/view");
var loader = require("nativescript-loading-indicator");
var sliderModule = require("ui/slider");

var services = require('../../services');
var vm = require('./clubPhotos-view-model');
var notifier = require("../../Helpers/notifier");
var globalConstants = require("../../globalConstants");
var navigate = require("../../Helpers/navigator");
var requester = require("../../Helpers/requester");
var camera = require("../../Helpers/camera");
var appSettings = require("application-settings");

var viewModel;

function pageNavigatedTo(args) {
    page = args.object;
    var club = args.context;
    viewModel = vm.create(club, services);
    page.bindingContext = viewModel;
    loadImages();
    var slider = new sliderModule.Slider();
    slider.maxValue = 5;
    slider.value = 3;
    slider.minValue = 1;
}

function loadImages() {
    loader.show();
    let vm = page.bindingContext;
    console.log(vm.clubId);
    requester.get(globalConstants.baseUrl + "api/Clubs/HiddenImages/" + vm.clubId)
        .then(function(resultImages) {
            for (var i = 0; i < resultImages.length; i++) {
                var imageToAdd = resultImages[i];
                console.dir(imageToAdd);
                if (imageToAdd !== undefined && imageToAdd.Path.length !== 0) {
                    console.dir(imageToAdd);
                    imageToAdd.Id = i;
                    vm.photos.push(imageToAdd);
                }
            }

            loader.hide();
        })
        .catch(function(err) {
            console.log("SOMETHING BAD FROM hidden images");
            console.dir(err);
            loader.hide();
            notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
        });
}


function backButtonTap() {
    navigate.navigateAnimated("./views/clubs/clubs");
}

function submitBtn() {
    var textView = view.getViewById(page, "userOpinion");
    var slider = view.getViewById(page, "sliderReview");
    console.dir(slider);
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    let vm = page.bindingContext;
    console.log("ID " + vm.clubId);
    if (textView.text !== undefined && textView.text.count !== 0) {
        var options = {
            data: {
                "ClubId": vm.clubId,
                "Content": textView.text,
                "Rating": 5
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
    

    requester.post(globalConstants.baseUrl + "api/Clubs/Review", options)
        .then(function(result) {
            console.log("Da");
            console.log(result);
            appSettings.setBoolean("isReviewed", true);
            notifier.notify("Club reviewed!", "That was important.");
        })
        .catch(function(err) {
            console.log(err.statusCode);
            console.dir(err);
            console.log("SOMETHING BAD FROM REVIEW CLUBS");
            // loader.hide();
            // notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
        });
    }
}

function dislikeTap(args) {
    var image = args.object;
    var item = image.bindingContext;

    services.images.rateClubImage(item.Id, -1)
        .then(function(result) {
            console.log("RES: " + result);
            this.item.likes = result;
            view.getViewById(page, "photosListView").refresh();
        })
        .catch(function(err) {
            console.log("ERR dislike");
            console.dir(err);
        });
}

function indexChange(args) {
    if (args.newIndex === 3) {
        var isReview = appSettings.getBoolean("isReviewed", true);
        if (isReview) {
            args.newIndex = 2;
        }
    }
}

function likeTap(args) {
    var image = args.object;
    var item = image.bindingContext;

    services.images.rateClubImage(item.Id, 1)
        .then(function(result) {
            console.log("RES: " + result);
            this.item.likes = result;
            view.getViewById(page, "photosListView").refresh();
        })
        .catch(function(err) {
            console.log("ERR like");
            console.dir(err);
        });
}

function openCameraTap() {
    camera.takePicture()
        .then(function(photo) {
            viewModel.addImagePreview = photo;
        });
}

function uploadImageTap() {
    camera.savePicture(page.bindingContext.addImagePreview)
        .then(function(link) {
            services.images.addImageLink(link)
                .then(function() {
                    notifier.notify("Yay!", "Image added!");
                    view.getViewById(page, "photosListView").refresh();
                })
                .catch(function() {
                    notifier.notify("Woah!", "Bad things happened!");
                });
        })
        .catch(function(err) {
            console.log("BAD ERROR FROM UPLOAD IMAGE TAP");
            console.dir(err);
        });
}

module.exports = {
    pageNavigatedTo,
    backButtonTap,
    dislikeTap,
    indexChange,
    likeTap,
    openCameraTap,
    uploadImageTap,
    submitBtn
};
