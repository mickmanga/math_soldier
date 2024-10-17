"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/login.ts
  var loginForm = document.getElementById("loginForm");
  var errorMessage = document.getElementById("errorMessage");
  loginForm.addEventListener("submit", (event) => __async(void 0, null, function* () {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      const response = yield fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: username,
          password
        })
      });
      const data = yield response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "http://localhost:3001/choice";
      } else {
        errorMessage.textContent = data.message;
      }
    } catch (err) {
      errorMessage.textContent = "Error logging in. Please try again later.";
    }
  }));
})();
//# sourceMappingURL=login.js.map
