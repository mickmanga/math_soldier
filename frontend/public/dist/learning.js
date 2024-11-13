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
      const response = yield fetch("http://localhost:3000/api/challenges", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chapters");
      }
      const chapters = yield response.json();
      console.log("Chapters:", chapters);
    } catch (error) {
      console.error("Error:", error);
    }
  });
  window.onload = () => {
    getChapters();
  };
})();
//# sourceMappingURL=learning.js.map
