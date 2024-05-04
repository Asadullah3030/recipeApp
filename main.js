const searchForm = document.querySelector('form')
const searchInput = document.querySelector('#searchInput')
const errorMsg = document.querySelector('.error-msg')
const Container = document.querySelector('.container')

const fetchRecipe = (query) =>{
    Container.innerHTML = '<h2>Fetching Recipe.....</h2>'
    try {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((data)=>{
        return data.json()
    }).then((res)=>{
        console.log(res);
        Container.innerHTML = ''
        for(const elem of res.meals){
            let box = document.createElement('div')
            box.classList.add('box')
            box.innerHTML = `
                <img src=${elem.strMealThumb}></img>
                <h4>${elem.strArea} <b>Dish</b></h4>
                <h5>${elem.strMeal}</h5>
                <h3>Belong to ${elem.strCategory} Category</h3>
            `
            let Button = document.createElement('button')
            Button.classList.add('Button')
            Button.innerHTML = 'Show More'

            let popup = document.createElement('div')
            popup.classList.add('Popup')
            popup.innerHTML = `<p>${elem.strInstructions}</p>`

            Button.addEventListener('click',()=>{
                popup.style.opacity = 1
            })

            let Cross = document.createElement('div')
            Cross.classList.add('Cross')
            Cross.innerHTML = 'Close'

            Cross.addEventListener('click',()=>{
                popup.style.display = 'none'
            })

            Container.appendChild(box)
            box.appendChild(Button)
            Button.appendChild(popup)
            popup.appendChild(Cross)
        }
    })
    } 
        catch (error) {
        Container.innerHTML = '<h2>Write Valid Name Please</h2>'
    }
}

searchForm.addEventListener('submit',(e)=>{
        errorMsg.innerHTML = ''
        e.preventDefault()
        let searchText = searchInput.value.trim()
        // console.log(searchText);
        if (searchText !== '') {
                fetchRecipe(searchText)
        }else{
            errorMsg.innerHTML = 'Search Something Please'
        }
})