export default async function handler(req, res) {
    const { q, minCalories, maxCalories, health, recipeId } = req.query;
    let url
    if (recipeId) {
        url = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${process.env.EDMAM_APP_ID}&app_key=${process.env.EDMAM_APP_KEY}`
    }
    else {
        if (minCalories !== '' && maxCalories !== '') {
            url = `https://api.edamam.com/api/recipes/v2/?type=public&q=${q}&app_id=${process.env.EDMAM_APP_ID}&app_key=${process.env.EDMAM_APP_KEY}&calories=${minCalories}-${maxCalories}`;
        } else if (minCalories !== '') {
            url = `https://api.edamam.com/api/recipes/v2/?type=public&q=${q}&app_id=${process.env.EDMAM_APP_ID}&app_key=${process.env.EDMAM_APP_KEY}&calories=${minCalories}%2B`;
        } else if (maxCalories !== '') {
            url = `https://api.edamam.com/api/recipes/v2/?type=public&q=${q}&app_id=${process.env.EDMAM_APP_ID}&app_key=${process.env.EDMAM_APP_KEY}&calories=${maxCalories}`;
        } else {
            url = `https://api.edamam.com/api/recipes/v2/?type=public&q=${q}&app_id=${process.env.EDMAM_APP_ID}&app_key=${process.env.EDMAM_APP_KEY}`;
        }
        let healthArray = [];
        if (health !== '') {
            healthArray = health.split(',');
            healthArray.forEach((item, index) => {
                url = url + `&health=${item}`;
            });
        }
    }
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({
        recipes: data.recipe || data.hits,
        total: data.count || 0,
        next: data._links?.next?.href || null,
    });
}