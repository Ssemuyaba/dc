// Get Share Elements
const shareButton = document.getElementById("shareButton");
const shareMenu = document.getElementById("shareMenu");
const closeShare = document.getElementById("closeShare");

// URLs
const pageUrl = window.location.href;
const shareText = "Check out this awesome page! ❤️";

// Open Share Menu
shareButton.addEventListener("click", () => {
    shareMenu.style.display = "block"; // Show modal
});

// Close Share Menu
closeShare.addEventListener("click", () => {
    shareMenu.style.display = "none"; // Hide modal
});

// Social Media Share Links
document.getElementById("shareFacebook").href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
document.getElementById("shareTwitter").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
document.getElementById("shareWhatsApp").href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + pageUrl)}`;
document.getElementById("shareLinkedIn").href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
document.getElementById("shareReddit").href = `https://www.reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(shareText)}`;
