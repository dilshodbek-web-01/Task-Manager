"use strict";

let baseURL = "https://task.samid.uz/v1/user";

// ==================== REGISTRATION FORM start ================= //

const registration = (e) => {

    e.preventDefault();

    const userName = $("#userNameRegistration").value.trim();
    const userEmail = $("#userEmailRegistration").value.trim();
    const userPassword = $("#userPasswordRegistration").value.trim();

    const params = {
        username: userName,
        email: userEmail,
        password: userPassword,
    };

    if (userName.length === 0 || userEmail.length === 0 || userPassword.length === 0) {
        alert("Please enter your username and email address");
    } else {
        fetch(`${baseURL}/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
            .then((resolve) => resolve.json())
            .then((result) => {
                if(result.code === 1) {
                    alert(result.message)
                    setTimeout(() => {
                        window.location.replace("./login.html")
                    }, 2000)
                } else {
                    alert(result.errors.username)
                }
            })
    }

}



$("#registration").addEventListener("submit", (e) => {
    registration(e);
})

// ==================== REGISTRATION FORM end ================= //

