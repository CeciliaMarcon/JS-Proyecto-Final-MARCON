const shopContent = document.getElementById("shopContent");
const cart = [];

fetch("data.json")
  .then((response) => response.json())
  .then((productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));

    productos.forEach((product) => {
      const content = document.createElement("div");
      content.className = "card";
      content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.descripcion}</p>
        <b class="price">$${product.precio}</b>
      `;
      shopContent.append(content);

      const botonDeCompra = document.createElement("button");
      botonDeCompra.innerText = "Comprar";
      content.append(botonDeCompra);

      botonDeCompra.addEventListener("click", () => {
        const repeticion = cart.some(
          (repeticionProductos) => repeticionProductos.id === product.id
        );

        if (repeticion) {
          cart.map((prod) => {
            if (prod.id === product.id) {
              prod.cantidad++;
              displayCartContador();
            }
          });
        } else {
          cart.push({
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            cantidad: product.cantidad,
            img: product.img,
          });
          displayCartContador();
        }
      });
    });
  })
  .catch((error) => console.error("Error al obtener los datos:", error));
