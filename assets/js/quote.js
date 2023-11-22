// Summary variables
let buildingType = '';
let intNumElevatorsNeeded = 0; // The number of elevators needed
let unitPricePerElevator = 0; // The unit price per elevator
let installFees = 0; // The calculated installation fees (intNumElevatorsNeeded * selectedUnitPrice * selectedInstallFee)
let finCostEst = 0; // The final cost estimate is equal to (Price per elevator)*(number of elevators) + Installation fee.
const unitPricePerElevatorStd = 8000; // Standard teir $8,000 each
const unitPricePerElevatorPre = 12000; // Premium teir $12,000 each
const unitPricePerElevatorExcelium = 15000; // Excelium teir $15,000 each
let selectedUnitPrice = 0;  // The unit price per eleveator as selected by product tier
const installFeesStd = 0.1; // Standard teir installation fees 10%
const installFeesPre = 0.15; // Premium teir installation fees 15%
const installFeesExcelium = 0.2; // Excelium teir installation fees 20%
let selectedInstallFee = 0;  // The installation fee as selected by the product tier

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
        buildingType = 'residential';
    } else if (event.target.value === 'commercial') {
        document.getElementById('inputResFields').style.display = 'none';
        document.getElementById('inputComFields').style.display = 'block';
        document.getElementById('inputIndFields').style.display = 'none';
        buildingType = 'commercial';
    } else if (event.target.value === 'industrial') {
        document.getElementById('inputResFields').style.display = 'none';
        document.getElementById('inputComFields').style.display = 'none';
        document.getElementById('inputIndFields').style.display = 'block';
        buildingType = 'industrial';
    }
    document.getElementById('inputProdTierField').style.display = 'block'
}

// iterate through the nodeList using .forEach() method
// attach an eventListener with a callback function
buildingMatches.forEach(buildingMatch => {
    buildingMatch.addEventListener('change', getSelectedValue);
})
// Building Type Form END


// Product Tier Selection based on which Radio Button is Selected.
// START

// returns a NodeList representing a list of the document's 
// elements that match the specified group of selectors
const productTierMatches = document.querySelectorAll('.productTierInput');

// callback function that passes the event 
// use event.target.value to get the 
// value of the radio that has changed
const getSelectedProductTier = (event) => {
    //console.log(event.target.value); // Error testing
    if (event.target.value === 'standard') {
        console.log(event.target.value);
        selectedUnitPrice = unitPricePerElevatorStd;
        document.getElementById('textareaSummaryPricePerElevators').value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedUnitPrice);
        selectedInstallFee = installFeesStd;
        update();
        //document.getElementById('inputIndFields').style.display = 'none';
    } else if (event.target.value === 'premium') {
        console.log(event.target.value);
        selectedUnitPrice = unitPricePerElevatorPre;
        document.getElementById('textareaSummaryPricePerElevators').value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedUnitPrice);
        selectedInstallFee = installFeesPre;
        update();
    } else if (event.target.value === 'excelium') {
        console.log(event.target.value);
        selectedUnitPrice = unitPricePerElevatorExcelium;
        document.getElementById('textareaSummaryPricePerElevators').value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedUnitPrice);
        selectedInstallFee = installFeesExcelium;
        update();
    }
}

// iterate through the nodeList using .forEach() method
// attach an eventListener with a callback function
productTierMatches.forEach(productTierMatch => {
    productTierMatch.addEventListener('change', getSelectedProductTier);
})
// Product Tier Selection END

// Residential building type calculations
/* If the type of building is Residential, divide the number of apartments by the
number of floors to obtain an average of apartments per floor and require an
elevator for every 6 apartments per floor. If the building has more than 20 stories,
it is necessary to provide an additional elevator bank and thus double the number
of elevators. A new elevator bank is therefore added to each new group of 20
stories. */
function residentialBuildingTypeElevatorCalc() {
    let avgAptPerFloor = 0;
    let numGrps20Stories = 0;
    let aptPerFloorElevatorReq = 0;
    let resNumFloors = Number(document.getElementById('inputResNumFloors').value);
    let resNumApts = Number(document.getElementById('inputResNumApts').value);


    if ((resNumFloors > 1) && (resNumApts > 0)) {
        avgAptPerFloor = Math.ceil(resNumApts / resNumFloors);
        if (avgAptPerFloor > 6) {
            aptPerFloorElevatorReq = Math.ceil(avgAptPerFloor / 6);
        } else {
            aptPerFloorElevatorReq = 1;
        }
        if (document.getElementById('inputResNumFloors').value > 20) {
            numGrps20Stories = Math.ceil(document.getElementById('inputResNumFloors').value / 20);
        } else {
            numGrps20Stories = 1;
        }
    } else {
        return 0;  // returns 0 if 1 or less floors AND 0 or less appartments.  Need at least 1 appartment
        // in the building and at least 2 floors for any elevators in residential.
    }
    intNumElevatorsNeeded = aptPerFloorElevatorReq * numGrps20Stories;
    return intNumElevatorsNeeded;
} // /residentialBuildingTypeElevatorCalc

// Commercial building type calculations
/*  If the type of building is Commercial, multiply the maximum occupancy per floor
by the number of floors to obtain the total number of occupants. The number of
elevators required per elevator bank is determined by dividing the total number of
occupants by 200. The number of elevator banks required is determined by
dividing the number of floors by 10, as opposed to 20 for residential buildings. In
addition, for commercial buildings, each elevator bank must have an additional
elevator for freight.*/
function commercialBuildingTypeElevatorCalc() {
    let totalNumOccupants = Number(document.getElementById('inputComMaxOccupancyPerFloor').value) * Number(document.getElementById('inputComNumFloors').value);
    let elevatorsPerBank = Math.ceil(totalNumOccupants / 200);
    let elevatorBanks = Math.ceil(Number(document.getElementById('inputComNumFloors').value) / 10);
    if (elevatorsPerBank > 0) {
        elevatorsPerBank += elevatorBanks; // Add 1 elevator per bank for freight
    }
    intNumElevatorsNeeded = elevatorBanks * elevatorsPerBank;
    return intNumElevatorsNeeded; // Return the total number of elevators required
} // /commercialBuildingTypeElevatorCalc

// Industrial building type calculations
/*  If the type of building is Industrial, the number of elevators required is equal to
the number entered as the input. */

function industrialBuildingTypeElevatorCalc() {
    intNumElevatorsNeeded = Number(document.getElementById('inputIndNumElevators').value);
    return intNumElevatorsNeeded;
}// /industrialBuildingTypeElevatorCalc

function update() {
    NumElevatorsNeeded();
    updateSummary();
}

// The NumElevatorsNeeded() function is responsible for updating the textareaSummaryNumElevators field 
// in the summary section
function NumElevatorsNeeded() {
    if (buildingType === 'residential') {
        document.getElementById('textareaSummaryNumElevators').value = residentialBuildingTypeElevatorCalc();
    } else if (buildingType === 'commercial') {
        document.getElementById('textareaSummaryNumElevators').value = commercialBuildingTypeElevatorCalc();
    } else if (buildingType === 'industrial') {
        document.getElementById('textareaSummaryNumElevators').value = industrialBuildingTypeElevatorCalc();
    }
    return;
}// /NumElevatorsNeeded

// 
function updateSummary() {
    if (intNumElevatorsNeeded > 0 && selectedUnitPrice > 0 && selectedInstallFee > 0 ){
        installFees = (intNumElevatorsNeeded * selectedUnitPrice) * selectedInstallFee;
        finCostEst = (intNumElevatorsNeeded * selectedUnitPrice) + installFees;
    } else {
        return;
    }
    document.getElementById('textareaSummaryInstallFees').value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(installFees);
    document.getElementById('textareaSummaryFinCostEst').value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(finCostEst);
    
    return;
}// /updateSummary

