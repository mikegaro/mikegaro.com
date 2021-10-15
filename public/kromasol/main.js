// -----------------INICIANDO LA API-----------------------------
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
//-----------------------------------------------------------------


const firebaseConfig = {
    apiKey: "AIzaSyCXg2V9cVItlCiDFB5bVnrq88T3sOArUCk",
    authDomain: "mikegaro-ffa1b.firebaseapp.com",
    projectId: "mikegaro-ffa1b",
    storageBucket: "mikegaro-ffa1b.appspot.com",
    messagingSenderId: "848314180988",
    appId: "1:848314180988:web:45bc041e953847d93830f9",
    measurementId: "G-0S3M0M5EDQ"
};

const app = initializeApp(firebaseConfig);

// - ESTO SIEMPRE DEBE IR PRIMERO CUANDO SE QUIERA CONECTAR A FIREBASE------


// -------- CONECTANDO CON FIREBASE AUTH ---------------------
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
const auth = getAuth()

///---------------------------------------------------------------


//------------- VARIABLES LOCALES -----------------
var path = window.location.pathname;
var page = path.split("/").pop()


///----------------------- PAGINA INDEX - EVERYONE -------------------------
if (page == 'kromasol') {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid)
            // ...
        } else {
            window.location.href = "sign-in.html"
        }
    });
    // Create a reference to the file we want to download
    var storage = app.storage();
    // Create a storage reference from our storage service
    var storageRef = storage.ref();
    var starsRef = storageRef.child('videos-kromasol');
    // Get the download URL
    starsRef.getDownloadURL().then(function (url) {

    }).catch(function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object-not-found':
                // File doesn't exist
                break;

            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

            case 'storage/canceled':
                // User canceled the upload
                break;

            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
        }
    });

}


///---------------------- PAGINA DE CAPACITADORES - ADMIN --------------------
if (page == 'capacitadores') {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid)
            // ...
        } else {
            window.location.href = "sign-in.html"
        }
    });

    console.log("Inciando proceso Javascript...")

    const logout_id = document.querySelector("#logout");
    logout_id.addEventListener('click', e => {
        e.preventDefault();
        auth.signOut().then(() => {
            console.log('CERRANDO SESION....')
            setTimeout(() => {
                window.location.href = "sign-in.html";
            }, 4000);
        })
    })

    const signupForm = document.querySelector('#signup-form')
    signupForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const email = document.querySelector('#signup-email').value;
        const password = document.querySelector('#signup-password').value;

        createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
            signupForm.reset();
            $("#signUpModal").modal('hide');
            console.log('El usuario se registró con exito')
        })
        console.log(email, password)
    })
}


//----------------------- PAGINA DE INICIAR SESION - LOGIN - EVERYONE -----------
if (page == 'sign-in') {
    $("#Error").hide()
    console.log(page)
    console.log("Iniciando proceso Javascript...")
    const signinForm = document.querySelector('#signin-form');
    signinForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.querySelector('#login-email').value;
        const password = document.querySelector('#login-password').value;
        console.log(email)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential;
                // ...
                console.log("Success")
                console.log("Provedor: ", userCredential.providerId)
                console.log("Usuario: ", userCredential.user)
                window.location.href = "capacitadores.html";
            })
            .catch((error) => {

                var codigosDeError = {
                    "auth/claims-too-large": "Hubo un error al ingresar, porfavor contacta a tu equipo de soporte (auth/claims-too-large)",
                    "auth/invalid-email": "El correo proporcionado no está registrado. Contactar a soporte (auth/invalid-email)",
                    "auth/invalid-password": "La contraseña es invalida.",
                    "auth/wrong-password": "La contraseña es incorrecta. Intente de nuevo.",
                    "auth/too-many-requests": "El acceso a esta cuenta ha sido temporalmente bloqueado debido a multiples intentos fallidos. Favor de contactar a soporte."
                }

                console.log("Errores:")
                document.getElementById('login-email').value = "";
                document.getElementById('login-password').value = "";
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Codigo: ", errorCode);
                console.log("Mensaje", errorMessage);
                document.getElementById('Error').innerHTML = '<strong>Error: </strong>' + codigosDeError[errorCode];
                $("#Error").show()
                setTimeout(() => {
                    $("#Error").hide()
                }, 4000);
            });
    })
}