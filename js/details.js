const sreachPromes = location.search;
const params = new URLSearchParams(sreachPromes);
const id = params.get('id');

async function gatapi() {
    $('.loading').removeClass('d-none')
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const responsData = await api.json();
    console.log(responsData);
    desplauData(responsData.meals[0]);
    $('.loading').addClass('d-none')
}

gatapi();

function desplauData(coneterRespons) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        if (coneterRespons[`strIngredient${i}`]) {
            ingredients += `
                <span class="elrtDatels">${coneterRespons[`strIngredient${i}`]} - ${coneterRespons[`strMeasure${i}`]}</span>
            `;
        }
    }

    const detailsBox = `
        <div class="row detalesCard mt-3">
            <div class="col-md-4">
                <img src="${coneterRespons.strMealThumb}" class="w-100" alt="" />
                <h5 class="h3">${coneterRespons.strMeal}</h5>
            </div>
            <div class="col-md-8">
                <div>
                    <h4>Instructions</h4>
                    <p class="lead">
                        ${coneterRespons.strInstructions}
                    </p>
                </div>

                <p><span class="h2">Area: ${coneterRespons.strArea}</span></p>
                <p><span class="h2">Category: ${coneterRespons.strCategory}</span></p>
                <p><span class="h2">Recipes:</span></p>

                <div class="alerrrt">
                    ${ingredients}
                </div>
                <div>
                    <h3>Tags:</h3>
                    <p><span class="alertTags">Soup</span></p>
                    <a href="${coneterRespons.strSource}" target="_blank" class="btn btn-success">Source</a>
                    <a href="${coneterRespons.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                </div>
            </div>
        </div>
    `;
    document.getElementById('databage').innerHTML = detailsBox;
}
