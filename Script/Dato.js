document.addEventListener('DOMContentLoaded', function () {
    const tbody       = document.querySelector('#loadPersonaList tbody');
    const addBtn      = document.getElementById('addPersonaBtn');
    const modal       = document.getElementById('personaModal');
    const closeModal  = document.getElementById('closeModal');
    const form        = document.getElementById('personaForm');
    const title       = document.getElementById('modal-title');
    const apiUrl      = 'http://127.0.0.1:8000/Catalogo/dato/';

    // Campos del formulario
    const inpCodigo    = document.getElementById('codigo');
    const inpNombres   = document.getElementById('nombres');
    const inpApellido1 = document.getElementById('apellido1');
    const inpApellido2 = document.getElementById('apellido2');
    const inpDireccion = document.getElementById('direccion');
    const inpTelefono  = document.getElementById('telefono');

    let editarId = null;

    // Cargar personas
    function cargarPersonas() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                tbody.innerHTML = '';
                data.forEach(item => {
                    const tr = tbody.insertRow();
                    tr.insertCell(0).textContent = item.Codigo;
                    tr.insertCell(1).textContent = item.Nombres;
                    tr.insertCell(2).textContent = item.Apellido1;
                    tr.insertCell(3).textContent = item.Apellido2;
                    tr.insertCell(4).textContent = item.Direccion;
                    tr.insertCell(5).textContent = item.Telefono;

                    // Botón editar
                    const tdEdit = tr.insertCell(6);
                    const btnEdit = document.createElement('button');
                    btnEdit.classList.add('btn-edit');
                    btnEdit.innerHTML = '<i class="bx bx-edit"></i>';
                    btnEdit.addEventListener('click', () => abrirModal(item));
                    tdEdit.appendChild(btnEdit);

                    // Botón eliminar
                    const tdDel = tr.insertCell(7);
                    const btnDel = document.createElement('button');
                    btnDel.classList.add('btn-delete');
                    btnDel.innerHTML = '<i class="bx bx-trash"></i>';
                    btnDel.addEventListener('click', () => eliminarPersona(item.id));
                    tdDel.appendChild(btnDel);
                });
            });
    }

    // Abrir modal
    function abrirModal(persona = null) {
        editarId = persona ? persona.id : null;
        title.textContent = persona ? 'Editar Persona' : 'Agregar Persona';

        inpCodigo.value    = persona?.Codigo    || '';
        inpNombres.value   = persona?.Nombres   || '';
        inpApellido1.value = persona?.Apellido1 || '';
        inpApellido2.value = persona?.Apellido2 || '';
        inpDireccion.value = persona?.Direccion || '';
        inpTelefono.value  = persona?.Telefono  || '';

        modal.style.display = 'block';
    }

    // Cerrar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Botón agregar
    addBtn.addEventListener('click', () => abrirModal());

    // Guardar persona
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const payload = {
            Codigo:    inpCodigo.value.trim(),
            Nombres:   inpNombres.value.trim(),
            Apellido1: inpApellido1.value.trim(),
            Apellido2: inpApellido2.value.trim(),
            Direccion: inpDireccion.value.trim(),
            Telefono:  inpTelefono.value.trim()
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
            cargarPersonas();
        })
        .catch(err => {
            console.error(err);
            alert('Hubo un problema al guardar la persona.');
        });
    });

    // Eliminar persona
    function eliminarPersona(id) {
        if (!confirm('¿Seguro que deseas eliminar esta persona?')) return;
        fetch(`${apiUrl}${id}/`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Error al eliminar');
                cargarPersonas();
            })
            .catch(err => {
                console.error(err);
                alert('No se pudo eliminar la persona.');
            });
    }

    // Carga inicial
    cargarPersonas();
});

