// Buliding Type Form display Based on which Radio Button is Selected.
// START

// returns a NodeList representing a list of the document's 
// elements that match the specified group of selectors
const buildingMatches = document.querySelectorAll('.buildingInput');

// callback function that passes the event 
// use event.target.value to get the 
// value of the radio that has changed
const getSelectedValue = (event) => {
    //console.log(event.target.value); // Error testing
    if (event.target.value === 'residential') {
        document.getElementById('inputResFields').style.display = 'block';
        document.getElementById('inputComFields').style.display = 'none';
        document.getElementById('inputIndFields').style.display = 'none';
    } else if (event.target.value === 'commercial') {
        document.getElementById('inputResFields').style.display = 'none';
        document.getElementById('inputComFields').style.display = 'block';
        document.getElementById('inputIndFields').style.display = 'none';
    } else if (event.target.value === 'industrial') {
        document.getElementById('inputResFields').style.display = 'none';
        document.getElementById('inputComFields').style.display = 'none';
        document.getElementById('inputIndFields').style.display = 'block';
    }
    document.getElementById('inputProdTierField').style.display = 'block'
}

// iterate through the nodeList using .forEach() method
// attach an eventListener with a callback function
buildingMatches.forEach(buildingMatch => {
    buildingMatch.addEventListener('change', getSelectedValue);
})
// Building Type Form END

// Buliding Type Form display Based on which Radio Button is Selected.
// START

// returns a NodeList representing a list of the document's 
// elements that match the specified group of selectors
const productTierMatches = document.querySelectorAll('.productTierInput');

// callback function that passes the event 
// use event.target.value to get the 
// value of the radio that has changed
const getSelectedProductTier = (event) => {
    //console.log(event.target.value); // Error testing
    if (event.target.value === 'standard'){
        console.log(event.target.value);
        //document.getElementById('inputResFields').style.display = 'block';
        //document.getElementById('inputComFields').style.display = 'none';
        //document.getElementById('inputIndFields').style.display = 'none';
    } else if (event.target.value === 'premium'){
        console.log(event.target.value);
        //document.getElementById('inputResFields').style.display = 'none';
        //document.getElementById('inputComFields').style.display = 'block';
        //document.getElementById('inputIndFields').style.display = 'none';
    } else if (event.target.value === 'excelium'){
        console.log(event.target.value);
        //document.getElementById('inputResFields').style.display = 'none';
        //document.getElementById('inputComFields').style.display = 'none';
        //document.getElementById('inputIndFields').style.display = 'block';
    } 
}

// iterate through the nodeList using .forEach() method
// attach an eventListener with a callback function
productTierMatches.forEach(productTierMatch => {
    productTierMatch.addEventListener('change', getSelectedProductTier);
})
// Building Type Form END

