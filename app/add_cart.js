let cart= [];


// Coletando name and price ao clicar no icone de add
menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-too-cart-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name,price)
        Toastify({
            text: "Item Adicionado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();

    }
// Coletando name and price ao clicar no icone de add


})

// Adicionar item ao carrinho

//Função add cart
function addToCart(name,price){
    const existingItem = cart.find(item => item.name === name) //Conferencia se já existe o mesmo item no carrinho atravez do nome
    
    if(existingItem){
        existingItem.quantity += 1; //Add +1 apenas a quantidade ao repetir item
        return;
    }
    cart.push({
        name,
        price,
        quantity: 1,
    })

    updateCartModal()
}

//Atualizar Carrinho CSS+HTML
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item =>{
        const creatItemElement = document.createElement("div");
        creatItemElement.classList.add("flex","justify-between", "mb-2", "flex-col", "max-h-72",)

        creatItemElement.innerHTML = `
            <div class="flex items-center justify-between border-solid border-2 border-black-500/100 rounded-lg  ">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p class="font-medium">Quantidade: ${item.quantity}</p>
                    <p class="font-medium">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
               
            </div>
        
        `

        total += item.price * item.quantity
        cartItemsContainer.appendChild(creatItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}
// Adicionar item ao carrinho

// Remover item ao carrinho
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    
    if(index !== -1){
        const item = cart[index];
    

        if(item.quantity > 1){
        item.quantity -=1;
        updateCartModal();
        return;
        }

        cart.splice(index, 1);
        updateCartModal()
    }   
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("borde-red-500")
        addressWarn.classList.add("hidden")
    }
})

// chekoutBtn.addEventListener("click", function(){

//     //Impedir de enviar pedidos com restaurante fechado
//     // const isOpen = checkRestaurantOpen();
//     // if(!isOpen){
//     //     alert("DELIVERY FECHADO!")
//     //     return;
//     // }

//     if(cart.length === 0) return;
//     if(addressInput.value === ""){
//         addressWarn.classList.remove("hidden")
//         addressInput.classList.add("border-red-500")
//         return;
//     }

//     //Enviar Pedido para api whats
//     const cartItem = cart.map((item) => {
//         return (
//             `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price.toFixed(2)} |`
//         )
//     }).join("%0A") //%0A para quebrar linha entre itens 

//     const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//     const message = encodeURIComponent(
//         `*Pedido de Delivery*%0A%0A${cartItems}%0A%0A*Valor Total:* R$${total.toFixed(2)}%0A%0A*Endereço de Entrega:* ${addressInput.value}`
//     );
//     const phone = "81991391806";

//     window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

//     // const message = encodeURIComponent(cartItem)
//     // const phone = "81991391806"

//     // window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

//     cart =[]
//     updateCartModal();
// })

chekoutBtn.addEventListener("click", function() {

    //Impedir de enviar pedidos com restaurante fechado
     const isOpen = checkRestaurantOpen();
    //  if(!isOpen){
    //     Toastify({
    //         text: "Delivery Fechado! :(",
    //         duration: 3000,
    //         close: true,
    //         gravity: "top", // `top` or `bottom`
    //         position: "right", // `left`, `center` or `right`
    //         stopOnFocus: true, // Prevents dismissing of toast on hover
    //         style: {
    //           background: "#ed4444",
    //         },
    //         onClick: function(){} // Callback after click
    //       }).showToast();

    //       return;
    // }


    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    // Gerar a mensagem do pedido formatada
    const cartItems = cart.map((item) => {
        return `- ${item.name} | Quantidade: ${item.quantity} | Preço Unitário: R$${item.price.toFixed(2)}`;
    }).join("\n"); // Quebra de linha entre os itens usando "\n"

    // Calcular o valor total do carrinho
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Criar a mensagem completa com formatação
    const message = `Pedido de Delivery\n\n${cartItems}\n\n*Valor Total:* R$${total.toFixed(2)}\n\n*Endereço de Entrega:* ${addressInput.value}`;
    const encodedMessage = encodeURIComponent(message);
    const phone = "8191391806";

    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

    cart = [];
    updateCartModal();
});
