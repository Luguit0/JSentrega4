//variables
let contenedorcarta = document.querySelector('.products');
let contenedorcompra = document.querySelector('.card-items');
let preciototal = document.querySelector('.price-total');
let cantidad = document.querySelector('.count-product');


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalproductos = 0;
let cantidadproductos = 0;

//funciones
loadEventListenrs();
function loadEventListenrs() {
    contenedorcarta.addEventListener('click', agregarProducto);

    contenedorcompra.addEventListener('click', quitarProducto);
}

//Agregando producto
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selecionarProducto = e.target.parentElement;
        leerContenido(selecionarProducto);
        Swal.fire({
            title: `Agregado a la Lista!`,
            text: `Aprovecha los descuentos y combos en productos seleccionados.`,
            width: 400,
            showConfirmButton: false,
            timer: 3000,
            background: `#f0e8e8`,
            ///color: ``,
            showClass: {
                popup: "animate__animated animate__flip",
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutTopRight",
            },
        });
        //LocalStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

// Quitando producto
function quitarProducto(e) {
    if (e.target.classList.contains('delete-product')) {
        const quitarId = e.target.getAttribute('data-id');
        Swal.fire({
            title: `Removido Correctamente!`,
            text: `Aprovecha los descuentos y combos en productos seleccionados.`,
            width: 400,
            showConfirmButton: false,
            timer: 3000,
            background: `#f0e8e8`,
            ///color: ``,
            showClass: {
                popup: "animate__animated animate__flip",
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutTopRight",
            },
        });
        carrito.forEach(value => {
            if (value.id == quitarId) {
                let precioR = parseFloat(value.precio) * parseFloat(value.cant);
                totalproductos = totalproductos - precioR;
                totalproductos = totalproductos.toFixed(2);
            }
        });
        carrito = carrito.filter(producto => producto.id !== quitarId);

        cantidadproductos--;
            //storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    if (carrito.length === 0) {
        preciototal.innerHTML = 0;
        cantidad.innerHTML = 0;
    }
    loadHtml();
    console.log(infoProducto);
}

//obtengo info del producto agregado
function leerContenido(producto) {
    const infoProducto = {
        imagen: producto.querySelector('div img').src,
        titulo: producto.querySelector('.title').textContent,
        precio: producto.querySelector('div p span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cant: 1
    }
    
    totalproductos = parseFloat(totalproductos) + parseFloat(infoProducto.precio);
    totalproductos = totalproductos.toFixed(2);

    const existir = carrito.some(producto => producto.id === infoProducto.id);
    if (existir) {
        const debe = carrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cant++;
                return producto;
            } else {
                return producto
            }
        });
        carrito = [...debe];
    } else {
        carrito = [...carrito, infoProducto]
        cantidadproductos++;
    }
    loadHtml();
}

function loadHtml() {
    clearHtml();
    carrito.forEach(producto => {
        const { imagen, titulo, precio, cant, id } = producto;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${imagen}" alt="">
            <div class="item-content">
                <h5>${titulo}</h5>
                <h5 class="cart-price">${precio}$</h5>
                <h6>Cantidad: ${cant}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        
        contenedorcompra.appendChild(row);

        preciototal.innerHTML = totalproductos;

        cantidad.innerHTML = cantidadproductos;
    })
}
function clearHtml() {
    contenedorcompra.innerHTML = '';
    
}

//Boton Compra FINAL
btnFinalCompra.onclick = () => {
    if (carrito.length == 0) {
        Swal.fire({
            title: 'LO SENTIMOS',
            text: 'Tu carro está vacío',
            background: 'f0e8e8',
        })
    } else {
        carrito = [];
        totalproductos = 0;
        cantidadproductos = 0;
        cantidad.innerHTML = 0;
        document.getElementById("totalPagar").innerText = "0";
        document.getElementById("prod-carro").innerHTML = '';
        localStorage.removeItem("carrito");
        sessionStorage.clear();
        console.clear();
        Swal.fire({
            title: `Gracias por tu compra!`,
            text: `En breve nos comunicaremos contigo`,
            width: 400,
            showConfirmButton: false,
            timer: 3000,
            background: `#f0e8e8`,
            ///color: ``,
            showClass: {
                popup: "animate__animated animate__flip",
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutTopRight",
            },
        });
    }
}

// Efecto de Movimiento
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    reveals.forEach((reveal) => {
        var windowHeight = window.innerHeight;
        var elementTop = reveal.getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add("active");
        } else {
            reveal.classList.remove("active");
        }
    });
}
window.addEventListener("scroll", reveal);

