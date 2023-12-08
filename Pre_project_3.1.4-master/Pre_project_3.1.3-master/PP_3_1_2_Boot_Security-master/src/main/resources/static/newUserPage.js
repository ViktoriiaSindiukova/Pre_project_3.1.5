let formNew = document.getElementById("newUserForm");
newUser();
function newUser() {
    document.getElementById('newUserForm').addEventListener('submit', (e) => {
        e.preventDefault();

        let roles = [];
        for (let i = 0; i < formNew.roles.options.length; i++) {
            if (formNew.roles.options[i].selected)
                roles.push({
                    id: formNew.roles.options[i].value,
                    role: formNew.roles.options[i].text
                });
        }

        fetch("http://localhost:8080/api/admin/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                username: document.getElementById('usernameNew').value,
                lastName: document.getElementById('lastNameNew').value,
                age: document.getElementById('ageNew').value,
                email: document.getElementById('emailNew').value,
                password: document.getElementById('passwordNew').value,
                roles: document.getElementById('rolesNew').value.
                split(' ').map(elem => ({role: elem, id: elem === 'ROLE_USER' ? 2 : 1, roles: [] }))

            })
        })
            .then((response) => {
                if (response.ok) {
                    document.getElementById('usernameNew').value = '';
                    document.getElementById('lastNameNew').value = '';
                    document.getElementById('ageNew').value = '';
                    document.getElementById('emailNew').value = '';
                    document.getElementById('passwordNew').value = '';
                    document.getElementById('rolesNew').value = '';
                    document.getElementById('users-tab').click()

                    getAllUsers();

                }
            })
    })
}

function loadRoles() {
    let selectAdd = document.getElementById("rolesNew");

    selectAdd.innerHTML = "";

    fetch("http://localhost:8080/api/admin/users/roles")
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                let option = document.createElement("option");
                option.value = role.id;
                option.text = role.authority;
                selectAdd.appendChild(option);
            });
        });
}

window.addEventListener("load", loadRoles);