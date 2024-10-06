/// <reference types= "../@types/jquery"/>
// ?=======================Globel++++++++++
const inputs= $('.formInput input')
let data=[]
 getMeal('s=');
const loding= document.querySelector('.loading')
// ==============================sild<<<<<<<<<
$('nav .open .iconeOpena').on('click', function(){
   
    $('.linkNav').animate({width:'toggle', },500,function(){
        $('.linkNav li ').animate({margin:'0'} ,300)
    })
    const textH3=document.getElementById('texth').innerHTML

   
// open
    if(textH3 === `<i class="fa-solid fa-bars slecat"></i>`){
        document.getElementById('texth').innerHTML=`<i class="fa-solid fa-x slecat"></i>`
        $('.linkNav li ').animate({marginTop:'80px'} ,100)
    }else{        
        // close
        document.getElementById('texth').innerHTML=`<i class="fa-solid fa-bars slecat"></i>`
    }
    
})
// !===============================Evants<<<<<<<<<<<<





$('.linkNav ul li a').not('#Search, #Contacts').on('click', function (e) {
    e.preventDefault();
    $('#searchInput, #formInput').hide();
});


$('a').on('click',function(e){
   
    let Data =e.target.getAttribute('data-category') 
    console.log(Data);
 
})
$('#Categories').on('click', function() {
    $('#rowData').removeClass('d-none')
    getCategory();
});
$('#area').on('click', function() {
    $('#rowData').removeClass('d-none')
    getArea()
    
});
$('#Ingredients').on('click', function() {
    $('#rowData').removeClass('d-none')
    getIngrediend()
});
// =====================SearchDisplay=========
$('#Search').on('click',function(e){
    e.preventDefault();
    $('#searchInput').toggle(500)
   $('#rowData').addClass('d-none')
    
})

$('.linkNav ul li a').not('#Search').on('click',function(e) {
    e.preventDefault(); 
    
    $('#searchInput').hide(); 
  });

$('#singleLetterInput').on('input',function(){
    let inputValue= $(this).val();
    if(inputValue.length>1){
        $(this).val(inputValue.slice(0, 1));

 $('#rowData').removeClass('d-none')
    }
    getMeal(`f=${inputValue}`)
})
$('#searchName').on('input',function(){
    $('#rowData').removeClass('d-none')
let inputvalue=$(this).val();
getMeal(`s=${inputvalue}`)

})

// =========================formDisplay===========
$("#showForm").on('click',function(e){
    e.preventDefault();
    $('#formInput').toggle(500);
    $('#rowData').addClass('d-none')

})

$('.linkNav ul li a').not('#showForm').on('click',function(e) {
    e.preventDefault(); 
    
    $('#formInput').hide(); 
  });




$('form').on('submit', function(e){
    e.preventDefault();
});

$('form').on('input',function(){
    if(validateName()&&
    validateEmail()&&
    validatePhone()&&
    validateAge()&&
    validatePassword()
    )
    // isValid
    { $('.btnForm').removeClass('disabled')

    // isNotvalid
    }else{
        $('.btnForm').addClass('disabled')

    } 
}
)

// !==========================Function============
async function getMeal(Name) {
    $('.loading').removeClass('d-none')
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${Name}`);
    let data = await api.json();
    // console.log(data);
    displayData(data.meals); 
    $('.loading').addClass('d-none')
}



function displayData(mealData) {
    let content = ``;
    
     

    for (let i = 0; i < mealData.length; i++) {
        let idMeal=mealData[i].idMeal

            
        content += `
       
                <div class="col-md-3 mealCont position-relative " onclick="showDetails(${mealData[i].idMeal})">
                    <img src="${mealData[i].strMealThumb}" class="w-100" alt="" />
                    <div class="categoriesMeal d-flex justify-content-center align-items-center">
                        <h3 class="h1 textImg">${mealData[i].strMeal}</h3>
                        <p></p>
                    </div>
                </div>
            `;
    }

    document.getElementById('rowData').innerHTML = content;
}
// ====================apiCategory+++++++++=======
async function getCategory(){
    $('.loading').removeClass('d-none')
    const api=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let data =await api.json();
    // console.log(data,1);
    displayCategory(data.categories)
    $('.loading').addClass('d-none')
} 

function displayCategory(category){
    let content = ``;

    
    
     

    for (let i = 0; i < category.length; i++) {
        let nameCatrgory = category[i].strCategory

            
        content += `

       
                <div class="col-md-3 mealCont position-relative " onclick=" getCategoryFilter('${nameCatrgory}')">
                    <img src="${category[i].strCategoryThumb}" class="w-100" alt="" />
                    <div class="categoriesMeal ">
                        <h3 class="h1 textImg">${category[i].strCategory}</h3>
                        <p  class="text-center ">"${category[i].strCategoryDescription}</p>
                    </div>
                </div>
            `;
    }

    document.getElementById('rowData').innerHTML = content;

}
function showDetails(id){
    location.href=`./details.html?id=${id}`
    
}
// ?=========================area==============
async function getArea(){
    $('.loading').removeClass('d-none')
   
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    // console.log(respone.meals);


    displayArea(respone.meals)
    $('.loading').addClass('d-none')
} 

function displayArea(area) {
    let cartoona = "";

    for (let i = 0; i < area.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getfiltarea('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                       
                </div>
        </div>
        `
    }

    document.getElementById('rowData').innerHTML = cartoona;
}
// !===============================ingrediend==================
async function getIngrediend(){
    $('.loading').removeClass('d-none')

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    // console.log(respone.meals,'66');
    displayingrediend(respone.meals)
    $('.loading').addClass('d-none')
}

function displayingrediend(ing){
    let content = ``;
    
     

    for (let i = 0; i < 25; i++) {
        let nameCatrgory=ing[i].strIngredient


            
        content += `

       
        <div class="col-md-3">
        <div onclick="getCategoryFilter('${nameCatrgory}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${ing[i].strIngredient}</h3>
                <p  class="text-center ">"${ing[i].strDescription.split(" ").slice(0, 10).join(" ")}</p>
        </div>
    </div>
            `;
    }

    document.getElementById('rowData').innerHTML = content;
    
}
// ?===================filteringrediend=========
async function getfiIngred(ingredients){
    $('.loading').removeClass('d-none')

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


   console.log( response.meals);
  
   
   $('.loading').addClass('d-none')
}
async function displayFiltIngrd(FilterIng){

    let content = ``;
    
     

    for (let i = 0; i < FilterIng.length; i++) {
        let idMeal=FilterIng[i].idMeal

            
        content += `
       
                <div class="col-md-3 mealCont position-relative " onclick="showDetails(${idMeal})">
                    <img src="${FilterIng[i].strMealThumb}" class="w-100" alt="" />
                    <div class="categoriesMeal d-flex justify-content-center align-items-center">
                        <h3 class="h1 textImg">${FilterIng[i].strMeal}</h3>
                        <p></p>
                    </div>
                </div>
            `;
    }

    document.getElementById('rowData').innerHTML = content;
}


// ===============================apifilterCategory===============
async function getCategoryFilter(category) {
    $('.loading').removeClass('d-none')
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    console.log(response ,22);
    displayFilter(response.meals)
    $('.loading').addClass('d-none')
}
function displayFilter(filter){
    let contentss = ``
    for (let i = 0; i < filter.length; i++) {
        let idMeal =filter[i].idMeal

            
        contentss += `
       
                <div class="col-md-3 mealCont position-relative " onclick="showDetails(${idMeal})">
                    <img src="${filter[i].strMealThumb}" class="w-100" alt="" />
                    <div class="categoriesMeal d-flex justify-content-center align-items-center">
                        <h3 class="h1 textImg">${filter[i].strMeal}</h3>
                        <p></p>
                    </div>
                </div>
            `;
    }
    document.getElementById('rowData').innerHTML = contentss;
}

// ====================filterarea==============
async function getfiltarea(area){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response=  await response.json()
    console.log(response);
    displayFilterArea(response.meals)
}
 function displayFilterArea(filterArea){
    let content = ``;
    for (let i = 0; i < filterArea.length; i++) {
        let idMeal=filterArea[i].idMeal
        content += `
                <div class="col-md-3 mealCont position-relative " onclick="showDetails(${filterArea[i].idMeal})">
                    <img src="${filterArea[i].strMealThumb}" class="w-100" alt="" />
                    <div class="categoriesMeal d-flex justify-content-center align-items-center">
                        <h3 class="h1 textImg">${filterArea[i].strMeal}</h3>
                        <p></p>
                    </div>
                </div>
            `;
    }
    document.getElementById('rowData').innerHTML = content;
 }
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>formValed<<<<<<<<<

function validateName() {
    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
    const input = $('#nameInput');
    console.log('Name input:', input.val());
    
    if (regexStyle.test(input.val())) {
        input.addClass('is-valid');
        input.removeClass('is-invalid');
        return true;
    } else {
        input.addClass('is-invalid');
        input.removeClass('is-valid');
        return false;
    }
}

function validateEmail() {
    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const input = $('#inputEmail');
    console.log('Email input:', input.val());
    
    if (regexStyle.test(input.val())) {
        input.addClass('is-valid');
        input.removeClass('is-invalid');
        return true;
    } else {
        input.addClass('is-invalid');
        input.removeClass('is-valid');
        return false;
    }
}

function validatePhone() {
    const regexStyle = /^01[0125][0-9]{8}$/
    const input = $('#inputPhone');
    console.log('Phone input:', input.val());
    
    if (regexStyle.test(input.val())) {
        input.addClass('is-valid');
        input.removeClass('is-invalid');
        return true;
    } else {
        input.addClass('is-invalid');
        input.removeClass('is-valid');
        return false;
    }
}

function validateAge() {
    const regexStyle = /^([1-7][0-9]|80)$/
    const input = $('#inputAge');
    console.log('Age input:', input.val());
    
    if (regexStyle.test(input.val())) {
        input.addClass('is-valid');
        input.removeClass('is-invalid');
        return true;
    } else {
        input.addClass('is-invalid');
        input.removeClass('is-valid');
        return false;
    }
}

function validatePassword() {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const password = $('#inputPassword');
    const repassword = $('#reinputPassword');
    console.log('Password input:', password.val());
    console.log('Repassword input:', repassword.val());
    let isValid = true;

    if (passwordRegex.test(password.val())) {
        password.addClass('is-valid');
        password.removeClass('is-invalid');
    } else {
        password.addClass('is-invalid');
        password.removeClass('is-valid');
        isValid = false;
    }

    if (password.val() === repassword.val()) {
        repassword.addClass('is-valid');
        repassword.removeClass('is-invalid');
    } else {
        repassword.addClass('is-invalid');
        repassword.removeClass('is-valid');
        isValid = false;
    }

    return isValid;
}

