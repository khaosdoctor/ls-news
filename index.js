window.onload = function () {
  document.querySelector('footer>span>strong').innerText = `© ${new Date().getFullYear()}`
  document.querySelector('form.form').addEventListener('submit', sendMagicLink)
}

async function sendMagicLink (e) {
  e.preventDefault()
  const emailInput = document.querySelector('#input-submit-email')
  const titleElement = document.querySelector('.main-text')
  const formElement = document.querySelector('.form')
  const buttonElement = document.querySelector('#button-submit')
  emailInput.setAttribute('disabled', true)
  buttonElement.setAttribute('disabled', true)
  buttonElement.innerText = 'Enviando...'

  const email = emailInput.value
  const url = 'https://blog.lsantos.dev/members/api/send-magic-link'
  const payload = {
    email,
    name: email,
    requestSrc: 'landing-page'
  }

  if (window.fetch) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })


    if (response.status === 201) {
      formElement.setAttribute('style', 'display: none')
      titleElement.innerHTML = 'Quase lá! Acesse o seu e-mail para confirmar sua incrição.<p class="bold green-bg">Muito obrigado por se inscrever!</p>'
      return
    }
    return
  }
}
