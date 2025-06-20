document.addEventListener('DOMContentLoaded', function () {
    const tbody         = document.querySelector('#loadMarcaList tbody');
    const addBtn        = document.getElementById('addMarcaBtn');
    const modal         = document.getElementById('marcaModal');
    const closeModal    = document.getElementById('closeMarcaModal');
    const form          = document.getElementById('marcaForm');
    const title         = document.getElementById('modal-title');
    const apiUrl        = 'http://127.0.0.1:8000/Catalogo/marcas/';

    const inpCodigo     = document.getElementById('codigo');
    const inpDescripcion = document.getElementById('descripcion');

    let editarId = null;

    function cargarMarcas() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                tbody.innerHTML = '';
                data.forEach(item => {
                    const tr = tbody.insertRow();
                    tr.insertCell(0).textContent = item.CodigoMarca;
                    tr.insertCell(1).textContent = item.DescripcionMarca;

                    // Botón editar
                    const tdEdit = tr.insertCell(2);
                    const btnEdit = document.createElement('button');
                    btnEdit.classList.add('btn-edit');
                    btnEdit.innerHTML = '<i class="bx bx-edit"></i>';
                    btnEdit.addEventListener('click', () => abrirModal(item));
                    tdEdit.appendChild(btnEdit);

                    // Botón eliminar
                    const tdDel = tr.insertCell(3);
                    const btnDel = document.createElement('button');
                    btnDel.classList.add('btn-delete');
                    btnDel.innerHTML = '<i class="bx bx-trash"></i>';
                    btnDel.addEventListener('click', () => eliminarMarca(item.id));
                    tdDel.appendChild(btnDel);
                });
            });
    }

    function abrirModal(marca = null) {
        editarId = marca ? marca.id : null;
        title.textContent = marca ? 'Editar Marca' : 'Agregar Marca';

        inpCodigo.value     = marca?.CodigoMarca     || '';
        inpDescripcion.value = marca?.DescripcionMarca || '';

        modal.style.display = 'block';
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    addBtn.addEventListener('click', () => abrirModal());

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const payload = {
            CodigoMarca: inpCodigo.value.trim(),
            DescripcionMarca: inpDescripcion.value.trim()
        };

        const url = editarId ? `${apiUrl}${editarId}/` : apiUrl;
        const method = editarId ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) throw new Error('Error al guardar');
            modal.style.display = 'none';
            cargarMarcas();
        })
        .catch(err => {
            console.error(err);
            alert('Hubo un problema al guardar la marca.');
        });
    });

    function eliminarMarca(id) {
        if (!confirm('¿Seguro que deseas eliminar esta marca?')) return;
        fetch(`${apiUrl}${id}/`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Error al eliminar');
                cargarMarcas();
            })
            .catch(err => {
                console.error(err);
                alert('No se pudo eliminar la marca.');
            });
    }

    cargarMarcas();
});
