let clientes = [
    { nombre: "Ana García", email: "ana.garcia@email.com" },
    { nombre: "Carlos Rodríguez", email: "carlos.rodriguez@email.com" },
    { nombre: "María López", email: "maria.lopez@email.com" },
    { nombre: "Juan Martínez", email: "juan.martinez@email.com" },
    { nombre: "Laura Sánchez", email: "laura.sanchez@email.com" }
];

let empleados = [
    { nombre: "Pedro Gómez", cargo: "Vendedor" },
    { nombre: "Sofía Fernández", cargo: "Gerente" },
    { nombre: "Diego Ruiz", cargo: "Cajero" },
    { nombre: "Elena Torres", cargo: "Asistente" },
    { nombre: "Javier Morales", cargo: "Vendedor" }
];

let productos = [
    { nombre: "Laptop", precio: "999.99" },
    { nombre: "Smartphone", precio: "599.99" },
    { nombre: "Tablet", precio: "299.99" },
    { nombre: "Auriculares", precio: "79.99" },
    { nombre: "Monitor", precio: "249.99" }
];

let ordenes = [
    { 
        cliente: "Ana García", 
        productos: [
            { nombre: "Laptop", precio: "999.99", cantidad: 1 },
            { nombre: "Auriculares", precio: "79.99", cantidad: 2 }
        ],
        total: 1159.97
    },
    { 
        cliente: "Carlos Rodríguez", 
        productos: [
            { nombre: "Smartphone", precio: "599.99", cantidad: 1 }
        ],
        total: 599.99
    },
    { 
        cliente: "María López", 
        productos: [
            { nombre: "Tablet", precio: "299.99", cantidad: 1 },
            { nombre: "Auriculares", precio: "79.99", cantidad: 1 }
        ],
        total: 379.98
    },
    { 
        cliente: "Juan Martínez", 
        productos: [
            { nombre: "Monitor", precio: "249.99", cantidad: 2 }
        ],
        total: 499.98
    },
    { 
        cliente: "Laura Sánchez", 
        productos: [
            { nombre: "Laptop", precio: "999.99", cantidad: 1 },
            { nombre: "Smartphone", precio: "599.99", cantidad: 1 }
        ],
        total: 1599.98
    }
];

// Función para actualizar las listas con los datos precargados
function actualizarListasPrecargadas() {
    actualizarLista(clientes);
    actualizarLista(empleados);
    actualizarLista(productos);
    actualizarLista(ordenes);
    actualizarSelectOrdenes();
}

actualizarListasPrecargadas();

function mostrarSeccion(seccion) {
    document.querySelectorAll('.seccion').forEach(s => s.style.display = 'none');
    document.getElementById(seccion).style.display = 'block';
}

function agregarElemento(lista, elemento) {
    lista.push(elemento);
    actualizarLista(lista);
}

function eliminarElemento(lista, index) {
    lista.splice(index, 1);
    actualizarLista(lista);
}

function actualizarLista(lista) {
    const listaNombre = lista === clientes ? 'listaClientes' :
                        lista === empleados ? 'listaEmpleados' :
                        lista === productos ? 'listaProductos' : 'listaOrdenes';
    
    const contenedor = document.getElementById(listaNombre);
    contenedor.innerHTML = '';
    
    lista.forEach((elemento, index) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        let iconoClase, titulo, detalles;
        
        if (lista === clientes) {
            iconoClase = 'fa-user';
            titulo = elemento.nombre;
            detalles = [
                { icono: 'fa-envelope', texto: elemento.email }
            ];
        } else if (lista === empleados) {
            iconoClase = 'fa-id-badge';
            titulo = elemento.nombre;
            detalles = [
                { icono: 'fa-briefcase', texto: elemento.cargo }
            ];
        } else if (lista === productos) {
            iconoClase = 'fa-box';
            titulo = elemento.nombre;
            detalles = [
                { icono: 'fa-tag', texto: `$${elemento.precio}` }
            ];
        } else if (lista === ordenes) {
            iconoClase = 'fa-shopping-cart';
            titulo = `Orden de ${elemento.cliente}`;
            detalles = [
                { icono: 'fa-list', texto: `${elemento.productos.length} productos` },
                { icono: 'fa-dollar-sign', texto: `Total: $${elemento.total.toFixed(2)}` }
            ];
        }
        
        card.innerHTML = `
            <div class="item-header">
                <i class="item-icon fas ${iconoClase}"></i>
                <span class="item-title">${titulo}</span>
            </div>
            <div class="item-details">
                ${detalles.map(detalle => `
                    <div class="item-detail">
                        <i class="detail-icon fas ${detalle.icono}"></i>
                        <span>${detalle.texto}</span>
                    </div>
                `).join('')}
            </div>
            <div class="item-actions">
                <button onclick="eliminarElemento(${lista === clientes ? 'clientes' : 
                                                    lista === empleados ? 'empleados' : 
                                                    lista === productos ? 'productos' : 'ordenes'}, ${index})">
                    <i class="fas fa-trash-alt"></i> Eliminar
                </button>
            </div>
        `;
        
        contenedor.appendChild(card);
    });

    if (lista === clientes || lista === productos) {
        actualizarSelectOrdenes();
    }
}

function actualizarSelectOrdenes() {
    const selectCliente = document.getElementById('ordenCliente');
    const productosSelects = document.querySelectorAll('.ordenProducto');
    
    selectCliente.innerHTML = '<option value="">Seleccione un cliente</option>';
    
    clientes.forEach((cliente, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = cliente.nombre;
        selectCliente.appendChild(option);
    });
    
    productosSelects.forEach(select => {
        select.innerHTML = '<option value="">Seleccione un producto</option>';
        productos.forEach((producto, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${producto.nombre} - $${producto.precio}`;
            select.appendChild(option);
        });
    });
}

function calcularTotal() {
    let total = 0;
    const productosSelects = document.querySelectorAll('.ordenProducto');
    const cantidades = document.querySelectorAll('.ordenCantidad');

    productosSelects.forEach((select, index) => {
        const productoIndex = select.value;
        const cantidad = parseInt(cantidades[index].value) || 0;
        if (productoIndex !== "" && cantidad > 0) {
            const precio = parseFloat(productos[productoIndex].precio);
            total += precio * cantidad;
        }
    });

    document.getElementById('totalOrden').textContent = total.toFixed(2);
}

document.getElementById('clienteForm').onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('clienteNombre').value;
    const email = document.getElementById('clienteEmail').value;
    agregarElemento(clientes, { nombre, email });
    e.target.reset();
};

document.getElementById('empleadoForm').onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('empleadoNombre').value;
    const cargo = document.getElementById('empleadoCargo').value;
    agregarElemento(empleados, { nombre, cargo });
    e.target.reset();
};

document.getElementById('productoForm').onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('productoNombre').value;
    const precio = document.getElementById('productoPrecio').value;
    agregarElemento(productos, { nombre, precio });
    e.target.reset();
};

document.getElementById('ordenForm').onsubmit = (e) => {
    e.preventDefault();
    const clienteIndex = document.getElementById('ordenCliente').value;
    const productosOrden = [];
    const productosSelects = document.querySelectorAll('.ordenProducto');
    const cantidades = document.querySelectorAll('.ordenCantidad');

    productosSelects.forEach((select, index) => {
        const productoIndex = select.value;
        const cantidad = parseInt(cantidades[index].value);
        if (productoIndex !== "" && cantidad > 0) {
            const producto = productos[productoIndex];
            productosOrden.push({ 
                nombre: producto.nombre, 
                precio: producto.precio, 
                cantidad: cantidad 
            });
        }
    });

    if (clienteIndex && productosOrden.length > 0) {
        const cliente = clientes[clienteIndex];
        const total = parseFloat(document.getElementById('totalOrden').textContent);
        agregarElemento(ordenes, { 
            cliente: cliente.nombre, 
            productos: productosOrden,
            total: total
        });
    }
    
    e.target.reset();
    document.getElementById('productosOrden').innerHTML = `
        <div class="producto-orden">
            <select class="ordenProducto" required>
                <option value="">Seleccione un producto</option>
            </select>
            <input type="number" class="ordenCantidad" placeholder="Cantidad" required min="1">
        </div>
    `;
    actualizarSelectOrdenes();
    calcularTotal();
};

document.getElementById('agregarProducto').onclick = () => {
    const nuevoProducto = document.createElement('div');
    nuevoProducto.className = 'producto-orden';
    nuevoProducto.innerHTML = `
        <select class="ordenProducto" required>
            <option value="">Seleccione un producto</option>
        </select>
        <input type="number" class="ordenCantidad" placeholder="Cantidad" required min="1">
    `;
    document.getElementById('productosOrden').appendChild(nuevoProducto);
    actualizarSelectOrdenes();
};

document.getElementById('productosOrden').addEventListener('change', calcularTotal);
document.getElementById('productosOrden').addEventListener('input', calcularTotal);


// Inicializar la página
mostrarSeccion('clientes');
actualizarListasPrecargadas();
//actualizarSelectOrdenes();
// Llamar a la función de actualización al final del script
