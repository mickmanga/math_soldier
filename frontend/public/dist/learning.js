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
  var getUser = (userId) => __async(void 0, null, function* () {
    try {
      const response = yield fetch(`http://localhost:3000/api/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const user2 = yield response.json();
      console.log(user2);
      return user2;
    } catch (error) {
      console.error("Failed to fetch the user:", error);
    }
  });
  var user = getUser("670e55bccfad7de8becf1414");
})();
//# sourceMappingURL=learning.js.map
