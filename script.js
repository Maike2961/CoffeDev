let buttons = document.querySelectorAll(".add")
for(let i =0; i < buttons.length; i++){
    buttons[i].addEventListener('click', AdicionarCarrinho);
    buttons[i].addEventListener('click', () =>{
        if(!buttons[i].disabled){
            return buttons[i].setAttribute('disabled', true)
        }
    })
}

/* Carrinho */
function AdicionarCarrinho(event){
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
            <p>${coffeprice}</p>
        </div>

        <div class="quantidade">
            <button class="more">+</button>
            <p id="clicks">1</p>
            <button class="less">-</button>
        </div>
    </div>
    `

    const more = carrinho.querySelectorAll(".more")
    const less = carrinho.querySelectorAll(".less")
    more.forEach(moreButton=> moreButton.addEventListener("click", onMore))
    less.forEach(lessButton =>lessButton.addEventListener("click", onLess))
}
function onMore(event){
    const quantidade = event.target.nextElementSibling;
    let count = parseInt(quantidade.innerHTML);
    count += 1;
    quantidade.innerHTML = count
}

function onLess(event){
    const quantidade = event.target.previousElementSibling;
    let count = parseInt(quantidade.innerHTML);
    count -= 1;
    if(count > 0){
        quantidade.innerHTML = count;
    }else{
        const item = event.target.closest('.itens');
        item.style.display = "none";
        buttons.forEach(button =>{
            console.log(button)
            button.removeAttribute('disabled')
            })
    }
}



/* Open and Close Modal */
const modal = document.querySelector(".btn-compras")
const closes = document.querySelector(".close-button")

modal.addEventListener("click", function(){
    const openModal = document.querySelector(".modal")
    openModalContinue(openModal)
})

const openModalContinue = (modal) =>{
    return modal.classList.add("active")
}

closes.addEventListener("click", function(){
    const closeModal = document.querySelector(".modal")
    closeModalContinue(closeModal)
})

const closeModalContinue = (closemodal) => {
    return closemodal.classList.remove("active")
}