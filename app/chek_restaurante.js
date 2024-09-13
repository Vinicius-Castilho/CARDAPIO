//Verificar hora e manipular o card do horario

function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    const dia = data.getDay();

    // quinta a segunda ---> const isOpenDay = dia === 1 || dia === 0 || dia >= 4;
    const isOpenDay = dia >= 4 || dia === 0;
    const isOpenHour = hora >= 18 && hora < 23;
    return isOpenDay && isOpenHour
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
} else{
    spanItem.classList.add("bg-red-500")
    spanItem.classList.remove("bg-green-600")
}