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

  // src/learning.ts
  var getChapters = () => __async(void 0, null, function* () {
    try {
      const courseContainer = document.getElementById("course_container_b");
      const response = yield fetch("http://localhost:3000/api/chapters/677e814577322467895fd23e", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chapters");
      }
      const knowledgeData = yield response.json();
      console.log("data:", knowledgeData);
      knowledgeData.forEach(
        (data) => {
          console.log(data);
          courseContainer.innerHTML = (courseContainer == null ? void 0 : courseContainer.innerHTML) + data.data;
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  });
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "g") {
        document.getElementById("interface_container").style.opacity = "1";
      }
    }
  );
  window.onload = () => {
    getChapters();
  };
})();
//# sourceMappingURL=learning.js.map
