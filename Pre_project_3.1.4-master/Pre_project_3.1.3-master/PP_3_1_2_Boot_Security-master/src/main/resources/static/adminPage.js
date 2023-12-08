const url = 'http://localhost:8080/api/admin/users';

function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loadTable(data)
        })
}

function loadTable(listAllUsers) {
    let res = ``;
    let userRole

    for (let user of listAllUsers) {
        userRole = user.roles.map(role => role.authority).join(', ');

        res +=
            `<tr id="row" >
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${userRole}</td>
               <td>
                    <button id="button-edit" class="btn btn-info" type="button"
                    data-bs-toggle="modal" href="#editModal"
                    onclick="editModal(${user.id})">Edit</button></td>
                <td>
                    <button class="btn btn-danger" type="button"
                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                    onclick="deleteModal(${user.id})">Delete</button></td>
            </tr>`
    }

    document.getElementById('tableBodyAdmin').innerHTML = res;

}

function closeModal() {
    document.querySelectorAll(".btn-close").forEach((btn) => btn.click())
}

function editModal(id) {
    let editId = `${url}/${id}`;
    loadRolesForEdit();
    fetch(editId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('editId').value = user.id;
            document.getElementById('editName').value = user.username;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editAge').value = user.age;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPassword').value = user.password;
            document.getElementById('editRole').value = user.roles.map(role => role.authority).join(', ');
        })
    });
}

async function editUser() {
    let idValue = document.getElementById('editId').value;
    let nameValue = document.getElementById('editName').value;
    let lastNameValue = document.getElementById('editLastName').value;
    let ageValue = document.getElementById('editAge').value;
    let passwordValue = document.getElementById('editPassword').value;
    let  role = document.getElementById('editRole').value.
    split(' ').map(elem => ({role: elem, id: elem === 'ROLE_USER' ? 2 : 1, roles: [] }));

    let user = {
        id: idValue,
        username: nameValue,
        lastName: lastNameValue,
        age: ageValue,
        password: passwordValue,
        roles: role
    }
    await fetch(`${url}/${idValue}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });

    closeModal()
    getAllUsers()

}
// let formEdit = document.forms["modalEdit"];
// editUser();
// function editUser() {
//     formEdit.addEventListener("submit", ev => {
//         ev.preventDefault();
//         let rolesForEdit = [];
//         for (let i = 0; i < formEdit.roles.options.length; i++) {
//             if (formEdit.roles.options[i].selected) rolesForEdit.push({
//                 id: formEdit.roles.options[i].value,
//                 role: "ROLE_" + formEdit.roles.options[i].text
//             });
//         }
//
//         fetch(url + formEdit.id.value, {
//             method: 'PATCH',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 id: formEdit.id.value,
//                 username: formEdit.username.value,
//                 lastName: formEdit.lastName.value,
//                 age: formEdit.age.value,
//                 email: formEdit.email.value,
//                 password: formEdit.password.value,
//                 roles: rolesForEdit
//             })
//         }).then(() => {
//             closeModal();
//             getAllUsers();
//         });
//     });
// }

function loadRolesForEdit() {
    let selectEdit = document.getElementById("editRole");
    selectEdit.innerHTML = "";

    fetch("http://localhost:8080/api/admin/users/roles")
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                let option = document.createElement("option");
                option.value = role.id;
                option.text = role.authority;
                selectEdit.appendChild(option);
            });
        });
}

window.addEventListener("load", loadRolesForEdit);

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
            document.getElementById('deleteRoles').value = user.roles.map(role => role.authority).join(', ');
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

window.addEventListener("load", loadRolesForDelete);

getAllUsers()



