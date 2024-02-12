const modalOverlay = document.getElementById("modal-overlay");
const modalContainer = document.getElementById("modal-container");

const cartBtn = document.getElementById("cart-btn");
const cartContador = document.getElementById("cart-contador"); 

const displayCart = () => {
  modalContainer.innerHTML = "";

  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  const modalHeader = document.createElement("div");

  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";

  modalHeader.append(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "carrito";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);

  modalContainer.append(modalHeader);

  if (cart.length >0){

  

  cart.forEach((product) => {
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.innerHTML = `
    <div class= "product">
      <img class="product-img" src"${product.img}"/>
      <div class= "product-info">
      <h4>${product.nombre}</h4>
    </div>

    <div class= "cantidad">
      <span class= "cantidad-btn-decrese">-</span>
      <span class= "cantidad-input">${product.cantidad}</span>
      <span class= "cantidad-btn-increse">+</span>
    </div>

      <div class= "price">$${product.precio * product.cantidad}</div>
      <div class= "delete-product">❌</div>
    </div>

    `;
    modalContainer.append(modalBody);

    const decrese = modalBody.querySelector(".cantidad-btn-decrese");
    decrese.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
        displayCart();
        
      }
      displayCartContador ();
    });

    const increse = modalBody.querySelector(".cantidad-btn-increse");
    increse.addEventListener("click", () => {
      product.cantidad++;
      displayCart();
      displayCartContador ();
    });


    const deleteProduct = modalBody.querySelector(".delete-product");
    deleteProduct.addEventListener("click", () =>{
      deleteCartProduct(product.id)

    })
  });


  const total = cart.reduce((acumulador, elementos) => acumulador + elementos.precio * elementos.cantidad, 0)

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `

  <div class= "total-price">Total: ${total}</div>
  `;

  modalContainer.append(modalFooter);
}else{
  const modalText = document.createElement("h3");
  modalText.className = "modal-body";
  modalText.innerText = "Su carrito esta vacío";
  modalContainer.append(modalText);
};
}

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
  const encontrarId = cart.findIndex((element)=> element.id === id);
  cart.splice(encontrarId, 1);
  displayCart();
  displayCartContador ();

}

const displayCartContador = () =>{
  
  const cartLength = cart.reduce((acumulador, elementos) => acumulador + elementos.cantidad, 0);
  cartContador.style.display = "block";
  cartContador.innerText = cartLength;


}