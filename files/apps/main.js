let selector = document.querySelector("#tel")
let im = new Inputmask("+7(999) 999-99-99")
im.mask(selector)

let validation = new JustValidate("form")

validation.addField("#name", [
  {
    rule: "required",
    errorMessage: "Введите имя!"
  },
  {
    rule: "minLength",
    value: 2,
    errorMessage: "Минимум 2 символа!"
  }
]).addField("#last-name", [
  {
    rule: "required",
    errorMessage: "Введите фамилию!"
  },
  {
    rule: "minLength",
    value: 2,
    errorMessage: "Минимум 2 символа!"
  }
]).addField("#tel", [
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length > 0)
    },
    errorMessage: 'Введите телефон'
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length === 10)
    },
    errorMessage: 'Введите телефон полностью'
  }
]).addField("#mail", [
  {
    rule: 'required',
    errorMessage: "Введите ваш E-mail!"
  },
  {
    rule: 'email',
    errorMessage: "Введите реальный E-mail!"
  }
]).addField("#check", [
  {
    rule: 'required',
    errorMessage: "Вы должны согласиться с политекой обработки данных!"
  }
]).onSuccess(async function () {
  let data = {
    name: document.getElementById("name").value,
    tel: selector.inputmask.unmaskedvalue(),
    lastname: document.getElementById("last-name").value,
    mail: document.getElementById("mail").value
  }

  let response = await fetch("files/php/mail.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })

  let result = await response.text()

  alert(result)
})
