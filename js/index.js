const IOS_USER_AGENT_REGEX = /ipad|iphone|ipod/i;
const PLUMPOP_APP_STORE_URL = "";

const ANDROID_USER_AGENT_REGEX = /android/i;
const PLUMPOP_GOOGLE_PLAY_URL = "";

function initDownloadAppButtonSmallScreen() {
    let showButton = false;
    const downloadAppButton = document.querySelector("a.download-app-small");

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (IOS_USER_AGENT_REGEX.test(userAgent) && !window.MSStream) {
        downloadAppButton.href = PLUMPOP_APP_STORE_URL;
        showButton = true;
    } else if (ANDROID_USER_AGENT_REGEX.test(userAgent)) {
        downloadAppButton.href = PLUMPOP_GOOGLE_PLAY_URL;
        showButton = true;
    }

    if (showButton) {
        downloadAppButton.style.visibility = "visible";
    }
}

function initDownloadAppButtonsMediumScreen() {
    const downloadIOSAppButton = document.querySelector("a#download-ios-app-medium");
    downloadIOSAppButton.href = PLUMPOP_APP_STORE_URL;

    const downloadAndroidAppButton = document.querySelector("a#download-android-app-medium");
    downloadAndroidAppButton.href = PLUMPOP_GOOGLE_PLAY_URL;
}

window.addEventListener("DOMContentLoaded", function () {
    initDownloadAppButtonSmallScreen();
    initDownloadAppButtonsMediumScreen();
});
