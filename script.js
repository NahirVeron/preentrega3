
//Libreria slide

var swiper = new Swiper("mySwiper", {
    slidesPerView:4,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination:{
        el:".swiper-pagination",
        clickable: true,
    },
    navigation:{
        nextEl: ".swiper-button-next",
        prevEl:".swiper-button-prev",
    
}, 
breakpoints:{
    0:{
        slidesPerView:1
    }
}
})
 //carrito

 const carrito = document.getElementById("carrito");
 const elementos = document.getElementById("lista-1");
 const elementos2 = document.getElementById("lista-2");
 const lista= document.querySelector("#lista-carrito tbody");
 const vaciarCarritoBtn =  document.getElementById("vaciar-carrito");

 cargarEventListeners();

 function  cargarEventListeners(){
    elementos.addEventListener("click" , comprarElemento);
    elementos2.addEventListener("click" , comprarElemento);

    carrito.addEventListener("click", eliminarElemento);

    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

    document.addEventListener("DOMContentLoaded ", leerLocalStorage);

 }


 function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const  elemento =  e.target.parentElement.parentElement;
        leerDatosElementos(elemento);
    }
 }

  function leerDatosElementos(elemento){
    const  infoElemento = {
        imagen : elemento.querySelector("img").src,
        titutlo : elemento.querySelector("h3").textContent,
        precio:  elemento.querySelector(".precio").textContent,
        id:  elemento.querySelector("a").getAttribute("data-id")
    }


    insetarCarrito(infoElemento);

  }

  function insetarCarrito(elemento){
     const row  =  document.createElement("tr");
     row.innerHTML = `
     <td>
        <img src ="${elemento.imagen}" width=100>
        </td>

    <td>
    
    ${elemento.titulo}
    </td>
    <td>
    ${elemento.precio}
    </td>
    <td>
       <a  herf="a" class"borrar"  data-id="${elemento.id}">X</a>
    
    </td>

     
     `;
     lista.appendChild(row);
     guardarElementoLocalStorage(elemento);

  }

   function eliminarElemento(e){
    e.preventDefault();

    let elemento,
    elementoId;

    if(e.target.classList.contains("borrar")){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector("a").getAttribute("data-id");

    }

     eliminarElementoLocalStorage(elementoId)
   }

   function vaciarCarrito(){
    while(lista.firsChild){
        lista.removeChild(lista.firstChild);
    }

     vaciarLocalStorage();
     return false;
   }
   function guardarElementoLocalStorage(elemento){
    let elementos;
    elementos = obtenerelementosLocalStorage();
    elementos.push(elemento);
    localStorage.setItem("elementos",  JSON.stringify(elementos));
   }