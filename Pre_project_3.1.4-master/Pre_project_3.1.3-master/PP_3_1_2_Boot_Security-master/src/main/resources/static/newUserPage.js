const formNewUser = document.getElementById('newUserForm');
let newRole = document.querySelector('#rolesNew').selectedOptions;

// formNewUser.addEventListener('submit', newUser => {
//     newUser.preventDefault()
//     let roles = []
//     for (let i = 0; i < newRole.length; i++) {
//         roles.push({
//             id: newRole[i].value
//         })
//     }
//     let method = {
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             username: formNewUser.username.value,
//             name: formNewUser.name.value,
//             age: formNewUser.age.value,
//             email: formNewUser.email.value,
//             password: formNewUser.password.value,
//             roles: roles
//         })
//     }
//     fetch(url, method).then(() => {
//         formNewUser.reset();
//         getAllUsers();
//     })
// });

function newUser() {
    //document.getElementById('rolesNew').value

    let roles = []
    for (let i = 0; i < newRole.length; i++) {
        roles.push({
            id: newRole[i].value
        })
    }
    document.getElementById('newUserForm').addEventListener('submit', (e) => {
        e.preventDefault()

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: document.getElementById('usernameNew').value,
                lastname: document.getElementById('lastNameNew').value,
                age: document.getElementById('ageNew').value,
                userPassword: document.getElementById('passwordNew').value,
                roles: roles
            })
        })
            .then((response) => {
                if (response.ok) {
                    document.getElementById('nameNew').value = '';
                    document.getElementById('lastNameNew').value = '';
                    document.getElementById('ageNew').value = '';
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