console.log("From the public app")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')



weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

    const location = search.value

    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location + ' ----- '+  data.forecast 
                
            }

        })
    })

})