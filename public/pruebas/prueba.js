const db = firebase.firestore();

const crearElemeto = document.getElementById("crearElemento");
const listaFirebase = document.getElementById("lista-firebase");

thingsRef = db.collection("cosas");

crearElemeto.onclick = () => {
  thingsRef.add({
    nombre: "ruth",
    apellido: "moreno",
  });
};

unsubscribe = thingsRef.orderBy("apellido").onSnapshot((querySnapshot) => {
  const items = querySnapshot.docs.map((doc) => {
    return `<li>${doc.data().nombre + " " + doc.data().apellido}</li>`;
  });

  listaFirebase.innerHTML = items.join("");
});
