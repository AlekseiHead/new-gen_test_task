/*----Мой вариант кода----*/

class UserService {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static authenticateUser(user) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://examples.com/api/user/authenticate?username=${user.username}&password=${user.password}`
      );
      xhr.responseType = "json";
      xhr.onload = function () {
        if (xhr.status != 200) {
          reject("Error" + xhr.status);
        } else {
          resolve(xhr.response);
        }
      };
      xhr.onerror = function () {
        reject(new Error("Network Error"));
      };
      xhr.send();
    });
  }
}

$("form #login").click(function () {
  const username = $("#username").val();
  const password = $("#password").val();

  UserService.authenticateUser({ username, password })
    .then((response) => {
      document.location.href = "/home";
    })
    .catch((error) => {
      alert(error);
    });
});
