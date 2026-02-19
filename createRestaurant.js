import { db } from "./firebase.js";
import { doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Configuración de productos iniciales (demo)
const defaultProducts = [
  { name: "Burger Clásica", price: 1200, image: "burger1.jpg", promo: false },
  { name: "Burger Premium", price: 1800, image: "burger2.jpg", promo: false },
  { name: "Pizza Margherita", price: 1500, image: "pizza1.jpg", promo: true },
  { name: "Pizza Pepperoni", price: 1800, image: "pizza2.jpg", promo: false }
];

// Función para crear restaurante demo
export async function createRestaurant(name) {
  const restID = name.toLowerCase().replace(/\s+/g, '');

  console.log(`Creando restaurante: ${restID}`);

  // Crear productos
  for (let p of defaultProducts) {
    await setDoc(doc(db, "restaurants", restID, "products", p.name), p);
  }

  // Crear documentos vacíos de orders y sales
  await setDoc(doc(db, "restaurants", restID, "orders", "_init"), { init: true });
  await setDoc(doc(db, "restaurants", restID, "sales", "_init"), { init: true });

  // Mensajes de confirmación
  console.log(`✅ Restaurante ${restID} creado`);
  console.log(`Links:`)
  console.log(`- Menú: menu.html?rest=${restID}`);
  console.log(`- Cocina: kitchen.html?rest=${restID}`);
  console.log(`- Admin: admin.html?rest=${restID}`);
  console.log(`- Mozo: waiter.html?rest=${restID}`);
  console.log(`- QR mesa: qr.html?mesa=1&rest=${restID}`);
}