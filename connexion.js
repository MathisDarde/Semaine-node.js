const formulaire = document.getElementById("formLogin");

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("emaillogin").value;
  const password = document.getElementById("passwordlogin").value;
  const error = document.getElementById("error-message");

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 404) {
    error.innerHTML = `Mauvais email`;
  } else if (response.status === 401) {
    error.innerHTML = `Mauvais mot de passe`;
  } else {
    error.innerHTML = ``;
    const data = await response.json();
    const token = data.token;

    localStorage.setItem("token", token);
    window.location.href = "./main.html";
  }
});
