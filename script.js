let buttons = document.querySelectorAll(".add")
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', AdicionarCarrinho);
    buttons[i].addEventListener('click', () => {
        if (!buttons[i].disabled) {
            return buttons[i].setAttribute('disabled', true)
        }
    })
}

let buttonsProdutos = document.querySelectorAll(".add2")
buttonsProdutos.forEach(element => {
    element.addEventListener('click', CarrinhoProdutos)
    element.addEventListener('click', () => {
        if (!element.disabled) {
            return element.setAttribute('disabled', true)
        }
    })
})

/* Carrinho */
function CarrinhoProdutos(event) {
    const botao = event.target
    const produtoInfo = botao.parentElement.parentElement
    const produtoName = produtoInfo.getElementsByTagName("h3")[0].innerText
    const produtoImage = produtoInfo.getElementsByTagName("img")[0].src
    const produtoPrice = produtoInfo.getElementsByTagName("p")[0].innerText

    alert("Adicionado ao carrinho")
    const carrinho = document.querySelector(".modal-body")
    carrinho.innerHTML += `
    <div class="itens">
        <div class="pedido-itens">
            <p>${produtoName}</p>
            <img src="${produtoImage}" atl="${produtoName}">
            <p class="price">${produtoPrice}</p>
        </div>

        <div class="quantidade">
            <button class="more">+</button>
            <p id="clicks" class="qtds">1</p>
            <button class="less">-</button>
        </div>
    </div>
    `
    const more = carrinho.querySelectorAll(".more")
    const less = carrinho.querySelectorAll(".less")
    more.forEach(moreButton => moreButton.addEventListener("click", onMore))
    less.forEach(lessButton => lessButton.addEventListener("click", onLess))
    calcular()
}

function AdicionarCarrinho(event) {
    const botao = event.target
    const cafeInfo = botao.parentElement.parentElement
    const coffeimage = cafeInfo.getElementsByClassName("cafe-image")[0].src
    const coffename = cafeInfo.getElementsByTagName("h3")[0].innerText
    const coffeprice = cafeInfo.getElementsByTagName("p")[0].innerText
    alert("Adicionado ao carrinho")
    const carrinho = document.querySelector(".modal-body")
    carrinho.innerHTML += `
    <div class="itens">
        <div class="pedido-itens">
            <p>${coffename}</p>
            <img src="${coffeimage}" atl="${coffename}">
            <p class="price">${coffeprice}</p>
        </div>

        <div class="quantidade">
            <button class="more">+</button>
            <p id="clicks" class="qtds">1</p>
            <button class="less">-</button>
        </div>
    </div>
    `

    const more = carrinho.querySelectorAll(".more")
    const less = carrinho.querySelectorAll(".less")
    more.forEach(moreButton => moreButton.addEventListener("click", onMore))
    less.forEach(lessButton => lessButton.addEventListener("click", onLess))
    calcular()

}
function onMore(event) {
    const quantidade = event.target.nextElementSibling;
    let count = parseInt(quantidade.innerHTML);
    count += 1;
    quantidade.innerHTML = count
    calcular()
}

function onLess(event) {
    const quantidade = event.target.previousElementSibling;
    let count = parseInt(quantidade.innerHTML);
    count -= 1;
    if (count > 0) {
        quantidade.innerHTML = count;
        calcular()
    } else {
        const item = event.target.closest('.itens');
        item.remove()
        calcular()
        buttons.forEach(button => {
            button.removeAttribute('disabled')
        })

        buttonsProdutos.forEach(buttonsProduto => {
            buttonsProduto.removeAttribute('disabled')
        })
    }
}

function calcular() {
    const itens = document.querySelectorAll(".itens")
    let soma = 0
    itens.forEach(element => {
        let quantidade = element.querySelector(".qtds").innerText
        let preco = element.querySelector(".price").innerText
        let precoslip = preco.split(" ")[1]

        if (quantidade && precoslip != null) {
            let precoValor = parseFloat(precoslip)
            let quantidadeValor = parseInt(quantidade)
            let subtotal = quantidadeValor * precoValor
            soma += subtotal

        }
    })
    document.getElementById("total").innerHTML = `Total R$: ${soma.toFixed(2)}`
    finalizarPedido()
}

const finalizarPedido = () => {
    const finaliza = document.querySelector(".button")
    const modalbody = document.querySelector(".modal-body")

    finaliza.addEventListener("click", () => {
        const modalItens = document.querySelectorAll(".itens")
        console.log(modalItens.length)
        if (modalItens.length > 0) {
            document.getElementById("total").innerHTML = ""
            modalItens.forEach(element => {
                element.remove();
            })
            buttons.forEach(button => {
                button.removeAttribute('disabled');
            })
            buttonsProdutos.forEach(buttonsProduto => {
                buttonsProduto.removeAttribute('disabled');
            })
            modalbody.innerHTML = "Pedido finalizado"
            setTimeout(function () {
                modalbody.innerHTML = "";
            }, 1000)
        }
    })
}




/* Open and Close Modal */
const modal = document.querySelector(".btn-compras")
const closes = document.querySelector(".close-button")

modal.addEventListener("click", function () {
    const openModal = document.querySelector(".modal")
    openModalContinue(openModal)
})

const openModalContinue = (modal) => {
    return modal.classList.add("active")
}

closes.addEventListener("click", function () {
    const closeModal = document.querySelector(".modal")
    closeModalContinue(closeModal)
})

const closeModalContinue = (closemodal) => {
    return closemodal.classList.remove("active")
}