
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() })
    .then( states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    } )
}

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const ufSelected = event.target.value;
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`)
    .then( (res) => { return res.json() })
    .then( cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;
    } );

}

function handleSelectItem (event) { 
    const itemLi = event.target;
    
    itemLi.classList.toggle("selected");
    
    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex( item => item === itemId);
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;
}


populateUFs();

document.querySelector("select[name=uf]").addEventListener("change", getCities);

const collectedItems = document.querySelector("input[name=items]");
const itemsToCollect = document.querySelectorAll(".items-grid li");
for(let item of itemsToCollect){
    item.addEventListener("click", handleSelectItem)
}
let selectedItems = [];


