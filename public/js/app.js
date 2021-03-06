const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchElement.value;
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = '';

    fetch('/weather?search=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                console.log(data );
                messageTwo.textContent = 'It is currently ' + data.forecast.temperature + '°C . It feels like ' +  data.forecast.feelslike + '°C. The humditiy is ' + data.forecast.humidity + '%';
            }
        })
    })
})