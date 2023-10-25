document.addEventListener("DOMContentLoaded", function () {
  const responseDiv = document.getElementById("response");

  // Fungsi untuk menampilkan pesan ke dalam div respons
  function displayMessage(message) {
    responseDiv.innerHTML = message;
  }

  // Fungsi untuk mengirim permintaan HTTP ke endpoint backend
  async function sendRequest(url, method, data) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        displayMessage(JSON.stringify(result, null, 2));
      } else {
        const error = await response.json();
        displayMessage(JSON.stringify(error, null, 2));
      }
    } catch (error) {
      displayMessage("Terjadi kesalahan: " + error.message);
    }
  }

  // Handle form submit for registration
  document
    .getElementById("register-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const nama = document.getElementById("nama").value;
      const NIS = document.getElementById("NIS").value;
      const password = document.getElementById("password").value;
      sendRequest("/register", "POST", { nama, NIS, password });
    });

  // Handle form submit for login
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const NIS = document.getElementById("loginNIS").value;
      const password = document.getElementById("loginPassword").value;
      sendRequest("/login", "POST", { NIS, password });
    });

  // Handle form submit for checking token
  document
    .getElementById("check-token-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const token = document.getElementById("token").value;
      sendRequest("/checkToken", "POST", { token });
    });

  // Handle form submit for logout
  document
    .getElementById("logout-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const token = document.getElementById("logoutToken").value;
      sendRequest("/logout", "POST", { token });
    });
});
