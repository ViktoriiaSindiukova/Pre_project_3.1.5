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

getAllUsers()



