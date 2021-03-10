// alert('Test')

function onFormSubmit(){
    // e.preventDefault()
    // if(e.target.elements['gender'][0].checked == true  || e.target.elements['gender'][1].checked == true){
    //     console.log('Ok')
    // }
    // return false
    const name = document.querySelector('#name').value
    const email = document.querySelector('#name').value
    // const email = document.querySelector('#email').value
    // const gender = document.querySelector('#email').value
    if(!name || !email){
        alert("Please fill all the fields")
        return false
    }
}

