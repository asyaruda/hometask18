const products = [
    { id: 1, name: 'Iphone 11 Pro Max', 
    categoryId: 1,
     description: 'Потужний смартфон з великим дисплеєм та потрійною камерою.' },

    { id: 2, name: 'Iphone 14 Pro Max', 
    categoryId: 1, 
    description: 'Остання модель iPhone з найновішими технологіями.' },

    { id: 3, name: 'Asus x515',
     categoryId: 2, 
     description: 'Легкий і потужний ноутбук для роботи та розваг.' },

    { id: 4, name: 'MacBook Pro',
     categoryId: 2, 
     description: 'Популярний ноутбук для професіоналів з екраном Retina.' },

    { id: 5, name: 'ipad Mini 10', 
    categoryId: 3, 
    description: 'Компактний планшет з підтримкою Apple Pencil.' },

    { id: 6, name: 'Samsung Galaxy Tablet 10', 
    categoryId: 3, 
    description: 'Планшет на базі Android з високоякісним дисплеєм.' }
]

function showProducts(categoryId) {
    const productsContainer = document.getElementById('products-container')
    productsContainer.innerHTML = ''

    const filteredProducts = products.filter((product) => product.categoryId === categoryId)

    filteredProducts.forEach((product) => {
        const productElement = document.createElement('li')
        productElement.innerHTML = product.name
        productElement.addEventListener('click', () => {
            showProductInfo(product)
        })

        productsContainer.appendChild(productElement);
    })
}

function showProductInfo(product) {
    const productInfoContainer = document.getElementById('product-info-container')
    productInfoContainer.innerHTML = ''

    const productInfo = document.createElement('div')
    productInfo.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
    `

    const buyButton = document.createElement('button')
    buyButton.innerHTML = 'Buy'
    buyButton.addEventListener('click', () => {
        showOrderForm(product)
    })

    productInfo.appendChild(buyButton)

    productInfoContainer.appendChild(productInfo)
}

function showOrderForm(product) {
    const orderFormContainer = document.getElementById('order-form-container')
    orderFormContainer.innerHTML = ''

    const orderForm = document.createElement('form')
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const isValid = validateOrderForm()
        if (isValid) {
            const orderInfo = getOrderInfo(product)
            displayOrderInfo(orderInfo)
        }
    })

    const nameLabel = document.createElement('label')
    nameLabel.innerHTML = 'ПІБ покупця:'
    const nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('name', 'name')
    nameInput.setAttribute('required', true)
    nameLabel.appendChild(nameInput)

    const cityLabel = document.createElement('label')
    cityLabel.innerHTML = 'Місто:'
    const citySelect = document.createElement('select')
    citySelect.setAttribute('name', 'city')
    citySelect.setAttribute('required', true)
    const cityOption1 = document.createElement('option')
    cityOption1.innerHTML = 'Київ'
    const cityOption2 = document.createElement('option')
    cityOption2.innerHTML = 'Львів'
    const cityOption3 = document.createElement('option')
    cityOption3.innerHTML = 'Одеса'
    const cityOption4 = document.createElement('option')
    cityOption4.innerHTML = 'Павлоград'
    const cityOption5 = document.createElement('option')
    cityOption5.innerHTML = 'Харків'

    citySelect.appendChild(cityOption1)
    citySelect.appendChild(cityOption2)
    citySelect.appendChild(cityOption3)
    citySelect.appendChild(cityOption4)
    citySelect.appendChild(cityOption5)
    cityLabel.appendChild(citySelect)

    const deliveryLabel = document.createElement('label')
    deliveryLabel.innerHTML = 'Склад Нової пошти для надсилання:'
    const deliveryInput = document.createElement('input')
    deliveryInput.setAttribute('type', 'text')
    deliveryInput.setAttribute('name', 'delivery')
    deliveryInput.setAttribute('required', true)
    deliveryLabel.appendChild(deliveryInput)

    const paymentLabel = document.createElement('label')
    paymentLabel.innerHTML = 'Післяплата або оплати банківської картки:'
    const paymentSelect = document.createElement('select')
    paymentSelect.setAttribute('name', 'payment')
    paymentSelect.setAttribute('required', true)
    const paymentOption1 = document.createElement('option')
    paymentOption1.value = 'cash_on_delivery'
    paymentOption1.innerHTML = 'Cash on Delivery'
    const paymentOption2 = document.createElement('option')
    paymentOption2.value = 'credit_card'
    paymentOption2.innerHTML = 'Credit Card'

    paymentSelect.appendChild(paymentOption1)
    paymentSelect.appendChild(paymentOption2)
    paymentLabel.appendChild(paymentSelect)

    const quantityLabel = document.createElement('label')
    quantityLabel.innerHTML = 'Кількість продукції, що купується:'
    const quantityInput = document.createElement('input')
    quantityInput.setAttribute('type', 'number')
    quantityInput.setAttribute('name', 'quantity')
    quantityInput.setAttribute('required', true)
    quantityLabel.appendChild(quantityInput)

    const commentLabel = document.createElement('label')
    commentLabel.innerHTML = 'Коментар до замовлення:'
    const commentInput = document.createElement('textarea')
    commentInput.setAttribute('name', 'comment')
    commentLabel.appendChild(commentInput)

    const submitButton = document.createElement('button')
    submitButton.innerHTML = 'Submit'
    submitButton.setAttribute('type', 'submit')

    orderForm.appendChild(nameLabel)
    orderForm.appendChild(cityLabel)
    orderForm.appendChild(deliveryLabel)
    orderForm.appendChild(paymentLabel)
    orderForm.appendChild(quantityLabel)
    orderForm.appendChild(commentLabel)
    orderForm.appendChild(submitButton)

    orderFormContainer.appendChild(orderForm)
}

function validateOrderForm() {
    const nameInput = document.querySelector('input[name="name"]')
    const citySelect = document.querySelector('select[name="city"]')
    const deliveryInput = document.querySelector('input[name="delivery"]')
    const paymentSelect = document.querySelector('select[name="payment"]')
    const quantityInput = document.querySelector('input[name="quantity"]')
    const commentInput = document.querySelector('textarea[name="comment"]')

    if (
        nameInput.value.trim() === '' ||
        citySelect.value.trim() === '' ||
        deliveryInput.value.trim() === '' ||
        paymentSelect.value.trim() === '' ||
        quantityInput.value.trim() === '' ||
        commentInput.value.trim() === ''
    ) {
        alert('Please fill in all required fields.')
        return false;
    }

    const quantityValue = parseInt(quantityInput.value)
    if (isNaN(quantityValue) || quantityValue < 0) {
        alert('Quantity must be a non-negative number.')
        return false
    }

    return true
}

function displayOrderInfo(orderInfo) {
    const orderInfoContainer = document.getElementById('order-info-container');
    orderInfoContainer.innerHTML = ''

    const orderInfoHeading = document.createElement('h3')
    orderInfoHeading.textContent = 'Order Information'
    orderInfoContainer.appendChild(orderInfoHeading)

    const productInfoHeading = document.createElement('h4')
    productInfoHeading.textContent = 'Product Information'
    orderInfoContainer.appendChild(productInfoHeading)

    const productName = document.createElement('p')
    productName.textContent = `Product Name: ${orderInfo.productName}`
    orderInfoContainer.appendChild(productName)

    const productDescription = document.createElement('p')
    productDescription.textContent = `Product Description: ${orderInfo.productDescription}`
    orderInfoContainer.appendChild(productDescription)

    const orderDetailsHeading = document.createElement('h4')
    orderDetailsHeading.textContent = 'Order Details'
    orderInfoContainer.appendChild(orderDetailsHeading)

    const name = document.createElement('p')
    name.textContent = `Name: ${orderInfo.name}`
    orderInfoContainer.appendChild(name)

    const city = document.createElement('p')
    city.textContent = `City: ${orderInfo.city}`
    orderInfoContainer.appendChild(city)

    const delivery = document.createElement('p')
    delivery.textContent = `Delivery: ${orderInfo.delivery}`
    orderInfoContainer.appendChild(delivery)

    const payment = document.createElement('p')
    payment.textContent = `Payment: ${orderInfo.payment}`
    orderInfoContainer.appendChild(payment)

    const quantity = document.createElement('p')
    quantity.textContent = `Quantity: ${orderInfo.quantity}`
    orderInfoContainer.appendChild(quantity)

    const comment = document.createElement('p')
    comment.textContent = `Comment: ${orderInfo.comment}`
    orderInfoContainer.appendChild(comment)
}

function getOrderInfo(product) {
    const nameInput = document.querySelector('input[name="name"]')
    const citySelect = document.querySelector('select[name="city"]')
    const deliveryInput = document.querySelector('input[name="delivery"]')
    const paymentSelect = document.querySelector('select[name="payment"]')
    const quantityInput = document.querySelector('input[name="quantity"]')
    const commentInput = document.querySelector('textarea[name="comment"]')

    const orderInfo = {
        productName: product.name,
        productDescription: product.description,
        name: nameInput.value,
        city: citySelect.value,
        delivery: deliveryInput.value,
        payment: paymentSelect.value,
        quantity: quantityInput.value,
        comment: commentInput.value
    }

    return orderInfo
}