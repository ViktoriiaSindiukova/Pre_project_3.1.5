function deleteModal(id) {
    let delId = `${url}/${id}`;
    loadRolesForDelete(id);
    fetch(delId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('deleteId').value = user.id;
            document.getElementById('deleteName').value = user.username;
            document.getElementById('deleteLastName').value = user.lastName;
            document.getElementById('deleteAge').value = user.age;
            document.getElementById('deleteEmail').value = user.email;
            document.getElementById('deleteRoles').value = user.roles;
        })
    });
}

async function deleteUser() {
    const id = document.getElementById('deleteId').value
    let urlDel = `${url}/${id}`;

    let method = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(urlDel, method).then(() => {
        closeModal()
        getAllUsers()
    })
}

function loadRolesForDelete(id) {
    let selectDelete = document.getElementById("deleteRoles");
    selectDelete.innerHTML = "";
    let delId = `${url}/roles/${id}`;

    fetch(delId)
        .then(res => res.json())
        .then(user => {
            user.forEach(role => {
                let option = document.createElement("option");
                option.value = role.id;
                option.text = role.authority;
                selectDelete.appendChild(option);
            });
        });
}