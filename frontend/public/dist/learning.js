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
      const response = yield fetch("http://localhost:3000/api/chapters/6745f0ee352dc4f203f01b99", {
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
          courseContainer.innerHTML += "</n> <a href='http://localhost:3001/challenge?mode=hard&challengeId=" + data.challenge + "'><button>Lancer un challenge </b> </n></a>";
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  });
  window.onload = () => {
    getChapters();
  };
})();
//# sourceMappingURL=learning.js.map
