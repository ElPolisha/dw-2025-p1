import { mostrarLogin } from "./dom/dom-auth.js";
import { mostrarListarUsuarios } from "./dom/dom-person.js";
import { hayToken } from "./services/api.js";
import { logout } from "./services/auth.js";

if (!hayToken()) mostrarLogin();
else mostrarListarUsuarios();

document.getElementById("btn-logout").addEventListener("click", () => {
    logout(),
        location.reload()
})
