alert("Hello World");
document.getElementById("contact-form").onsubmit = (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    let fname = document.getElementById("fname").value.trim();
    if (!fname) {
        document.getElementById("err-fname").textContent = "First name is required";
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    let lname = document.getElementById("lname").value.trim();
    if (!lname) {
        document.getElementById("err-lname").textContent = "Last name is required";
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    let meet = document.getElementById("meet").value;
    if (meet === "") {
        document.getElementById("err-meet").textContent = "Please select how we met";
        document.getElementById("err-meet").style.display = "block";
        isValid = false;
    }
    
    let linkedin = document.getElementById("linkedin").value.trim();
    if (linkedin && !linkedin.startsWith("https://linkedin.com/in/")) {
        document.getElementById("err-linkedin").textContent = "LinkedIn URL must start with https://linkedin.com/in/";
        document.getElementById("err-linkedin").style.display = "block";
        isValid = false;
    }

    let email = document.getElementById("email").value.trim();
    let mailingList = document.getElementById("mailingList").checked;

    if (mailingList && !email) {
        document.getElementById("err-email").textContent = "Email is required for mailing list";
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    if (email && (!email.includes("@") || !email.includes("."))) {
        document.getElementById("err-email").textContent = "Please enter a valid email address";
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted!");
        
    }

    return isValid;
};

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
        errors[i].textContent = "";
    }
}