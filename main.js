const initApp = () => {
    const droparea = document.querySelector('#droparea');

    // prevents default behaviour for drag and drop events
    const prevents = (e) => e.preventDefault();
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, prevents);
    });

    droparea.addEventListener("drop", handleDrop);
}

document.addEventListener("DOMContentLoaded", initApp);
let uploadedImageSrc = null;
// Helper function to update the upload icon image and classes
const updateUploadIcon = (file) => {
    const uploadIcon = document.querySelector('#icon-upload');
    const imgsrc = URL.createObjectURL(file);
    uploadIcon.classList.remove("icon-reset");
    uploadIcon.classList.add("icon-image");
    uploadIcon.src = imgsrc;
    uploadedImageSrc = imgsrc;
}

// Function to update UI elements after upload or drop
const updateUIAfterUpload = () => {
    const uploadText = document.querySelector('#text-upload');
    const uploadedImageOptions = document.querySelector('#uploaded-image-options');
    const uploadImageInput = document.querySelector('#upload-image-input');

    uploadText.querySelector('#droparea-label').style.display = "none";
    if (uploadImageInput) uploadImageInput.remove();
    uploadedImageOptions.style.display = "flex";

    // Remove image button setup
    const removeImageBtn = document.querySelector('#remove-image');
    const removeImage = () => {
        const uploadIcon = document.querySelector('#icon-upload');
        uploadIcon.src = '/assets/images/icon-upload.svg';
        uploadIcon.classList.remove("icon-image");
        uploadIcon.classList.add("icon-reset");
    }
    removeImageBtn.addEventListener('click', removeImage);

    // Change image handlers
    const changeImageBtn = document.querySelector('#change-image');
    const changeImageInput = document.querySelector('#change-image-input');

    const changeImage = () => changeImageInput.click();

    const uploadChangedImage = (e) => {
        const files = e.target.files;
        const file = files[0];
        updateUploadIcon(file);
    }

    changeImageBtn.addEventListener('click', changeImage);
    changeImageInput.addEventListener('change', uploadChangedImage);
}

const handleDrop = (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    const file = files[0];

    updateUploadIcon(file);
    updateUIAfterUpload();
}

// Handle manual file input upload (outside drop area)
const fileUpload = (e) => {
    const files = e.target.files;
    const file = files[0];
    updateUploadIcon(file);
    updateUIAfterUpload();
}

const uploadImageInput = document.querySelector('#upload-image-input');
uploadImageInput.addEventListener('change', fileUpload);


// Everything below is for ticket generation

// form value gathering
const ticketForm = document.querySelector('#ticket-form');
const ticketContainer = document.querySelector('.ticket-container');

const fullNameInput = document.querySelector('#full-name');
const emailAddressInput = document.querySelector('#email-address');
const githubUsernameInput = document.querySelector('#github-username');

// congrats text
const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');


const generateTicket = () => {
    const fullNameValue = fullNameInput.value;
    const emailAddressValue = emailAddressInput.value;
    const githubUsernameValue = githubUsernameInput.value;

    const fullNameText = document.querySelector('#ticket-full-name');
    const githubUsernameText = document.querySelector('#ticket-github-username')

    const ticketAvatar = document.querySelector('#ticket-avatar');
    // page changes
    ticketForm.style.display = "none";
    ticketContainer.style.display = "flex";

    // title changes
    title.innerHTML = `Congrats, <span class="gradient">${fullNameValue}</span>! Your ticket is ready.`
    subtitle.innerHTML = `We've emailed your ticket to <span style ="color: var(--orange-500)">${emailAddressValue}</span> and will send updates in the run up to the event.`

    // ticket changes
    ticketAvatar.src = uploadedImageSrc;
    
    fullNameText.textContent = `${fullNameValue}`;
    githubUsernameText.textContent = `${githubUsernameValue}`;
    
}


ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();
    generateTicket();
});


