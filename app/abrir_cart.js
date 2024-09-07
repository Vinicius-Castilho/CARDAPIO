// Abrir o carrinho ao click

cartBtn.addEventListener("click", function(){
    updateCartModal()
    cartModal.style.display="flex"
    
})

// Abrir o carrinho ao click


// Fechar o carrinho ao click fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})
// Fechar o carrinho ao click fora

// Fechar o carrinho ao click BTN
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display ="none"
})
// Fechar o carrinho ao click BTN


