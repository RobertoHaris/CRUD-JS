function ValidateForm() {
    let name = document.querySelector('#name').value
    let age = document.querySelector('#age').value
    let address = document.querySelector('#address').value
    let email = document.querySelector('#email').value

    if (name === "") {
        alert("Name is required")
        return false
    }

    if (age === "") {
        alert('Age is required')
        return false
    } else if (age < 1) {
        alert('Age must be 1 or greater')
        return false
    }

    if (address === "") {
        alert('Address is required')
        return false
    }

    if (email === "") {
        alert('Email is required')
        return false
    } else if (!email.includes("@")) {
        alert('Invalid email address')
        return false
    }

    return true
}

function showData() {
    let peopleList = JSON.parse(localStorage.getItem('peopleList')) || []

    let html = ""
    peopleList.forEach((element, index) => {
        html += "<tr>"
        html += "<td>" + element.name + "</td>"
        html += "<td>" + element.age + "</td>"
        html += "<td>" + element.address + "</td>"
        html += "<td>" + element.email + "</td>"
        html += `<td><button onclick="updateData(${index})" class="btn btn-warning m-2">Edit</button><button onclick="deleteData(${index})" class="btn btn-danger">Delete</button></td>`
        html += "</tr>"
    })
    document.querySelector("#crudTable tbody").innerHTML = html
}

document.onload = showData()

function AddData() {
    if (ValidateForm()) {
        let name = document.querySelector('#name').value
        let age = document.querySelector('#age').value
        let address = document.querySelector('#address').value
        let email = document.querySelector('#email').value

        let peopleList = JSON.parse(localStorage.getItem('peopleList')) || []
        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email
        })
        localStorage.setItem('peopleList', JSON.stringify(peopleList))
        showData()
        document.querySelector('#name').value = ""
        document.querySelector('#age').value = ""
        document.querySelector('#address').value = ""
        document.querySelector('#email').value = ""
    }
}

function deleteData(index) {
    let peopleList = JSON.parse(localStorage.getItem('peopleList')) || []
    peopleList.splice(index, 1)
    localStorage.setItem('peopleList', JSON.stringify(peopleList))
    showData()
}

function updateData(index) {
    document.querySelector('#submit').style.display = "none"
    document.querySelector('#update').style.display = "block"

    let peopleList
    if(localStorage.getItem("peopleList") == null) {
        peopleList = []
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }
    document.querySelector('#name').value = peopleList[index].name
    document.querySelector('#age').value = peopleList[index].age
    document.querySelector('#address').value = peopleList[index].address
    document.querySelector('#email').value = peopleList[index].email

    document.querySelector('#update').onclick = () =>{
        if (ValidateForm() == true) {
            peopleList[index].name = document.querySelector("#name").value
            peopleList[index].age = document.querySelector("#age").value
            peopleList[index].address = document.querySelector("#address").value
            peopleList[index].email = document.querySelector("#email").value

            localStorage.setItem('peopleList' , JSON.stringify(peopleList))
            showData()

            document.querySelector('#name').value = ""
            document.querySelector('#age').value = ""
            document.querySelector('#address').value = ""
            document.querySelector('#email').value = ""

            document.querySelector('#submit').style.display = "block"
            document.querySelector('#update').style.display = "none"

        }
    }
}
