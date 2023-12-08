const userUrl = 'http://localhost:8080/api/user';

async function getUserInfo() {
    await fetch(userUrl).then(response => response.json()
        .then(user => getInfo(user)));
}

function getInfo(user) {
    let dataOfUser = '';
    let userRole = user.roles.map(role => role.authority).join(', ');

    dataOfUser += `<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${userRole}</td>
            </tr>`;
    document.getElementById('tableBodyUser').innerHTML = dataOfUser;
}

getUserInfo();
