const form = document.getElementById('userForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit',async (e)=>{
    e.preventDefault()

    const formData = new FormData(form)

    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const res = await fetch('http://localhost:3001/add-user',{
            method: 'POST',
            headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const message = await res.text();
    messageDiv.style.display = "block";
    messageDiv.className = "success";
    messageDiv.textContent = message;

    form.reset()

     //Hide message after 3 seconds
    // setTimeout(() => {
    //   messageDiv.style.display = "none";
    // }, 3000);
    } catch (err) {
        messageDiv.style.display = "block";
    messageDiv.className = "error";
    messageDiv.textContent = "Something went wrong!";
    }

})