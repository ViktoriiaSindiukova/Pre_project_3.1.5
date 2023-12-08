const formEditUser = document.getElementById('modalEdit')
let editRole = document.querySelector('#editRole').selectedOptions

function editModal(id) {
    loadRolesForEdit();
    fetch("api/admin/users/" + id).then(res => {
        res.json().then(user => {
            document.getElementById('editId').value = user.id;
            document.getElementById('editName').value = user.username;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editAge').value = user.age;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPassword').value = user.password;
        })
    });
}

formEditUser.addEventListener('submit', editUser => {
    editUser.preventDefault()
    let roles = []
    for (let i = 0; i < editRole.length; i++) {
        roles.push({
            id: editRole[i].value
        })
    }
    let method = {
        method: 'PATCH',
        headers: {"Content-Type": "application/json",
            "Accept": "application/json"},
        body: JSON.stringify({
            id: formEditUser.idEdit.value,
            username:formEditUser.username.value,
            name:formEditUser.lastName.value,
            age:formEditUser.age.value,
            email:formEditUser.email.value,
            password:formEditUser.password.value,
            roles:roles
        })
    }
    fetch(url+ formEditUser.idEdit.value,method).then(() => {
        document.getElementById("editClose").click();
        getAllUsers();
    })
});

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