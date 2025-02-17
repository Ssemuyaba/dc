// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";

// Your Firebase configuration (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyAz7aIWCgjmsix9DCLyd3y4ERAGflySJhs",
    authDomain: "reflectdc1.firebaseapp.com",
    projectId: "reflectdc1",
    storageBucket: "reflectdc1.firebasestorage.app",
    messagingSenderId: "767361896569",
    appId: "1:767361896569:web:ebe3af646c4934b79dc4a8",
    measurementId: "G-8R7HD8WNCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Get elements
const likeButton = document.getElementById('likeButton');
const likeCountDisplay = document.getElementById('likeCount');
const shareButton = document.getElementById('shareButton');

if (!likeButton || !likeCountDisplay || !shareButton) {
    console.error("❌ Like or share button elements not found in the DOM!");
}

// Reference to Firestore document
const likeDocRef = doc(db, "likes", "globalLikeCount");

// 🔄 Fetch and Update Like Count in Real-Time
onSnapshot(likeDocRef, (docSnap) => {
    if (docSnap.exists()) {
        likeCountDisplay.textContent = docSnap.data().count;
    } else {
        likeCountDisplay.textContent = 0;
    }
}, (error) => {
    console.error("❌ Error fetching likes from Firestore:", error);
});

// ✅ Function to Update Likes in Firestore
async function updateLikes() {
    try {
        const docSnap = await getDoc(likeDocRef);

        if (docSnap.exists()) {
            const newCount = docSnap.data().count + 1;
            await updateDoc(likeDocRef, { count: newCount });
        } else {
            await setDoc(likeDocRef, { count: 1 });
        }

        console.log("✅ Like updated successfully!");
    } catch (error) {
        console.error("❌ Error updating likes:", error);
    }
}

// ✅ Click Event Listener for Like Button
likeButton?.addEventListener('click', updateLikes);

// 🔗 Share button functionality with Web Share API and fallback
shareButton?.addEventListener('click', async () => {
    const pageUrl = window.location.href;
    const shareText = "Check out this awesome page! ❤️";

    // Check if Web Share API is supported
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Check This Out",
                text: "Reflecting God's Mercy",
                url: pageUrl,
            });
            console.log("✅ Content shared successfully!");
        } catch (error) {
            console.error("❌ Sharing failed:", error);
        }
    } else {
        // Fallback for unsupported browsers
        alert("Your browser does not support the Web Share API. Please use the social media links below.");
        
        const socialLinks = {
            Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
            Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,
            WhatsApp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + pageUrl)}`,
            LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
            Reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(shareText)}`
        };

        // Open a share popup with links
        let sharePopup = window.open("", "_blank", "width=600,height=400");
        if (sharePopup) {
            let shareHTML = `<h3>Share this page:</h3><ul>`;
            for (let [name, url] of Object.entries(socialLinks)) {
                shareHTML += `<li><a href="${url}" target="_blank">${name}</a></li>`;
            }
            shareHTML += `</ul><button onclick="window.close()">Close</button>`;
            sharePopup.document.write(shareHTML);
        } else {
            console.error("❌ Popup blocked by browser!");
        }
    }
});
