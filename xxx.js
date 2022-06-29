const user = {
    name: 'Valera',
    age: 40,
    status: true
}

function objectInfo(key, value) {
    console.log(user[key])

    user[key] = value
    console.log(user)


}


objectInfo('age', 21)