const IOS_USER_AGENT_REGEX = /ipad|iphone|ipod/i;
const PLUMPOP_APP_STORE_URL = "https://apps.apple.com/us/app/super-mario-run/id1145275343";

const ANDROID_USER_AGENT_REGEX = /android/i;
const PLUMPOP_GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.nintendo.zara&hl=en_US&gl=US";

window.addEventListener("DOMContentLoaded", function () {
    let showButton = false;
    const downloadAppButton = document.querySelector("a.download-app");

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
});
