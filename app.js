let energy = 70; 
let energyMeter = document.getElementById("energy-meter");
energyMeter.setAttribute("value", energy);

const resources = {
    wood: 20,
    vine: 10,
    food: 30,
    stone: 20,
    obsidian: 0,
    rareFang: 0
};

//Update resource value with changes made
function updateResource(resourceName, change) {
    if (resources[resourceName] + change >= 0) {
        resources[resourceName] += change;
    } else {
        alert(`Not enough ${resourceName}`);
    }
    document.getElementById(resourceName).textContent = resources[resourceName];
}

// Initialize resource display
Object.keys(resources).forEach(resourceName => {
    document.getElementById(resourceName).textContent = resources[resourceName];
});

//Ensures the energy value stays within the valid range (0-100). If food is less than 10 and energy less than 10, game lose
function energyCheckRange(energy){
    if (energy > 100){
        energy = 100;
        console.log("Energy 100%");
    } else if (energy < 0){
        energy = 0;
        alert("OUT OF ENERGY");
    } else if (energy < 10 && resources["food"] < 10){
        alert("YOU LOSE.☠️");
        location.reload();
    }
    return energy;
}

let toolBox = [];
let currentChosenTool = null; // The tool currently selected by the player for possible use

const actions = ["gather", "hunt", "rest", "sail-away"];

actions.forEach(action => 
    document.getElementById(action).addEventListener("click", () => doAction(action))
);

function doAction(action){
    if(action === "gather"){
        if (energy < 10){
            alert(`Low energy (${energy}). No more gathering.`);
        } else{
            console.log("Gather!");
            gathering();
        }
    }

    if(action === "hunt"){
        if (energy < 20) {
            alert(`Low energy (${energy}). No more hunting.`);
        } else {
            console.log("Hunt!");
            hunting();
        }
    }

    if(action === "rest"){
        if(resources.food< 10 && energy >= 10){
            alert("Not enough food, cannot rest :(");
        } else if (energy === 100){
            alert("Energy 100%! No need to rest :)");
        } else {
            console.log("Rest!");
            resting();
        }
    }

    if(action === "sail-away"){
        if (energy < 40) {
            alert(`Low energy (${energy}). Cannot sail away.`);
        } else {
            //energy -= 40;
            alert("YOU WIN!!!✨\nLet's play again :)");
            location.reload();
            return;
        }
    }

    energy = energyCheckRange(energy);
    energyMeter.setAttribute("value", energy);
    console.log("energy now is: " + energy);
}

// Verifies if the chosen tool ID matches the specified tool title.
// Uses a case-insensitive regex to check for a match at the start of the ID.
function toolChecker(chosenToolID, toolTitle){
    const regex = new RegExp(`^${toolTitle}\\d*(?=$|\\s)`, "i");  
    return regex.test(chosenToolID);
}

// Action GATHER
function gathering(){
    energy -= 10;

    let vineGet = Math.floor(Math.random() * 10 + 1);
    updateResource("vine", vineGet);

    let foodGet = Math.floor(Math.random() * 10 + 1);
    updateResource("food", foodGet);

    let woodGet = Math.floor(Math.random() * 10 + 1);
    //console.log(woodGet);
    if(currentChosenTool){
        if(toolBox["Super Axe"] > 0 && currentChosenTool.includes("Super Axe")){
            console.log("You are using your Super Axe. Wood collection increases by 4x.");
            woodGet = woodGet * 4;
            toolBox["Super Axe"]--;
            removeToolFromInventory(currentChosenTool);
        } else if (toolBox["Axe"] > 0 && currentChosenTool.includes("Axe")){
            console.log("You are using your Axe. Wood collection increases by 2x.");
            woodGet = woodGet * 2;
            toolBox["Axe"]--;
            removeToolFromInventory(currentChosenTool);
        };
    }
    updateResource("wood", woodGet);

    let stoneGet = Math.floor(Math.random() * 5 + 1);
    updateResource("stone", stoneGet);

    console.log(`You get Vine x ${vineGet}, Food x ${foodGet}, Wood x ${woodGet}, Stone x ${stoneGet}`);

    const chanceRandom = Math.random();
    //console.log(chanceRandom);
    if(chanceRandom <= 0.1){
        console.log(`You get OBSIDIAN x 1 🤩🔮`);
        updateResource("obsidian", 1);
    } 
}

// Action HUNT
function hunting(){
    energy -= 20;
    let foodGet = Math.floor(Math.random() * 20 + 1);

    if(currentChosenTool){
        if(toolBox["Super Spear"] > 0 && currentChosenTool.includes("Super Spear")){
            console.log("You are using your Super Spear. Food collection increases by 4x.");
            foodGet = foodGet * 4;
            toolBox["Super Spear"]--;
            removeToolFromInventory(currentChosenTool);
        } else if (toolBox["Spear"] > 0 && currentChosenTool.includes("Spear")){
            console.log("You are using your Spear. Food collection increases by 2x.");
            foodGet = foodGet * 2;
            toolBox["Spear"]--;
            removeToolFromInventory(currentChosenTool);
        };
    }
    updateResource("food", foodGet);

    console.log(`You get Food x ${foodGet}`);

    const chanceRandom = Math.random();
    //console.log(chanceRandom);
    if(chanceRandom <= 0.1){
        console.log(`You get RARE FANG x 1 🤩🦷`);
        updateResource("rareFang", 1);
    } 
}

// Action REST
function resting(){
    updateResource("food", -10);
    energyGet = Math.floor(Math.random() * 20 + 1);
    energy += energyGet;
    console.log(`10 FOOD used. Food now : ${resources.food}`);
    console.log(`Get energy: ${energyGet}`);
}

// Fetches tool data from API and processes it into a structured list

async function fetchToolData() {
    try {
        const response = await fetch("https://thoughtful-vagabond-fibre.glitch.me/tools");
        const data = await response.json();
        //console.log("Data fetched:", data);
        const toolList = data.map(tool => ({
            id: tool.id,
            title: tool.title,
            requirements: tool.requirements,
            effect: tool.effect,
            description: tool.description,
            img: tool["img-url"]
        }));
        return toolList;
        // console.log(toolList);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetches tool data and dynamically adds each tool as an option in the dropdown menu.
async function populateSelectMenu() {
    const toolList = await fetchToolData();

    if (toolList && toolList.length > 0) {
        const selectMenu = document.getElementById("tool-select-list");
        toolList.forEach(tool => {
            const option = document.createElement("option");
            option.value = tool.title; 
            option.textContent = tool.title; 
            selectMenu.appendChild(option);
        });
    }
}
populateSelectMenu();

// Function to update the displayed tool information
async function updateToolInfo(toolTitle) {
    fetchToolData().then(toolList => {
        const selectedTool = toolList.find(tool => tool.title === toolTitle);
        //console.log(selectedTool);

        if (!selectedTool) return; 

        document.getElementById("tool-title").textContent = selectedTool.title;
        document.getElementById("tool-description").textContent = selectedTool.description;
        const toolImg = document.getElementById("tool-img");
        toolImg.src = selectedTool.img;
        toolImg.alt = selectedTool.title;

        const toolRequirements = document.getElementById("required-resource");
        toolRequirements.innerHTML = "";

        if (selectedTool.requirements && selectedTool.requirements.length > 0) {
            selectedTool.requirements.forEach(resource => {
                const listItem = document.createElement("li");
                listItem.textContent = resource;
                toolRequirements.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement("li");
            listItem.textContent = "No resources available.";
            toolRequirements.appendChild(listItem);
        }
    });
}

// Update the tool info section based on the selected tool from dropdown menu
document.getElementById("tool-select-list").addEventListener("change", (event) => {
    const selectedTool = event.target.value;
    if (selectedTool) {
        console.log(`Show info of ${selectedTool}`);
        updateToolInfo(selectedTool);
    } 
});

//Listen for clicks on the "Submit" button
document.getElementById("submit-selected-tool").addEventListener("click", () => {
    const selectedTool = document.getElementById("tool-select-list").value;
    if (selectedTool) {
        console.log(`Want to craft ${selectedTool}`);
        craftTool(selectedTool);
    } else {
        // If no tool is selected, display an error message or reset the tool info
        console.log("Nothing selected");
        alert("Please select a tool!");
    }
});


// Crafts a tool by:
//  1) Fetching tool data to get its resource requirements
//  2) Checking if the player has enough resources to craft the tool
//  3) Deducting the required resources from the player's inventory if sufficient
//  4) Adding the crafted tool to the toolbox and updating the inventory display.
function craftTool(toolTitle){
    fetchToolData().then(toolList => {
        const requiredResource = toolList.find(tool => tool.title == toolTitle).requirements; //get an array of requirement e.g. ["10 wood", "5 stone"]

        //console.log(requiredResource);

        const requiredmentList = parseRequirementsToObject(requiredResource); //array parsed to object e.g. {wood:10, stone:5, rare:1}

        console.log(requiredmentList)

        const resourceMap = {
            wood: "wood",
            stone: "stone",
            vine: "vine",
            food: "food",
            obsidian: "obsidian",
            rare: "rareFang" // Map "rare" from the API to "rareFang"
        };

        const isEnoughResource = Object.entries(requiredmentList).every(([resource, requiredAmount]) => {
            console.log(resource + requiredAmount)
            if (!resourceMap[resource] || resources[resourceMap[resource]] < requiredAmount) {
                alert(`Not enough ${resource}`);
                return false;
            }
            return true;
        });

        if (!isEnoughResource) {
            return; // Exit if resources are insufficient
        }

        // Deduct resources and craft the tool
        Object.entries(requiredmentList).forEach(([resource, requiredAmount]) => {
            updateResource(resourceMap[resource], -requiredAmount);
            console.log(`Used ${requiredAmount} ${resourceMap[resource]}. Remaining: ${resources[resourceMap[resource]]}`);
        });

        // Add the crafted tool to the toolbox
        if (toolBox[toolTitle]) {
            toolBox[toolTitle]++;
        } else {
            toolBox[toolTitle] = 1;
        }

        console.log(`Successfully crafted ${toolTitle}!`);

        addToolToInventory(toolTitle); // Add the tool to the inventory display

    }).catch(err => {
        console.error("Error fetching tool data:", err);
    });
}

function parseRequirementsToObject(requirementsArray) {
    const resourceObject = {};

    requirementsArray.forEach(item => {
        const [amount, resource] = item.split(" ");
        resourceObject[resource] = parseInt(amount, 10);
    });

    return resourceObject;
}

const toolContainer = document.getElementById("crafted-tool-display");

function disableButton(buttonID){
    document.getElementById(buttonID).disabled = true;
}

function activateButton(buttonID){
    document.getElementById(buttonID).disabled = false;
}

// Disable/enable multiple buttons at once
function toggleButton(state, ...buttonIDs) {
    buttonIDs.forEach(buttonID => {
        document.getElementById(buttonID).disabled = !state;
    });
}

function fixButton(){
    if(currentChosenTool === null){
        toggleButton(true, "hunt", "gather", "rest");
    } else if(currentChosenTool.includes("Axe")){
        toggleButton(true, "gather");//activate gather button
        toggleButton(false, "hunt", "rest");//disable hunt and rest button
    } else if(currentChosenTool.includes("Spear")){
        toggleButton(true, "hunt");
        toggleButton(false, "gather", "rest");
    } else if(currentChosenTool.includes("Boat")){
        toggleButton(false, "hunt", "gather", "rest");
        toggleButton(true, "sail-away");
    }
}

//Adds a crafted tool to the player's inventory display and enables interaction with it
function addToolToInventory(craftedToolTitle) {
    // Unlocks the "Sail Away" button if the crafted tool is a "Boat" (that a boat is now avaliable in toolBox)
    if(craftedToolTitle === "Boat"){
        console.log("Ready to sail!")
        document.getElementById("sail-away").disabled = false;
    }

    const toolImg = document.createElement("img");
    fetchToolData().then(toolList => {
        const craftedTool = toolList.find(tool => tool.title === craftedToolTitle);
        toolImg.src = craftedTool.img;
        toolImg.alt = craftedToolTitle;
        toolImg.title = `${craftedToolTitle}`;
        toolImg.id = craftedToolTitle + toolBox[craftedToolTitle];
        toolImg.style.cursor = "pointer";
        toolImg.onclick = () => useMyCraftedTool(toolImg);
        toolContainer.appendChild(toolImg);
        toolImg.style.opacity = 0.7;
        //console.log(toolImg.id);
    });
}

//Set up click behavior: 
// 1) Click to select/deselect the tool
// 2) Deselect any other selected tool when a new tool is selected
// Updates `currentChosenTool` with the selected tool's ID
function useMyCraftedTool(toolImg){
    const isSelected = toolImg.classList.contains("selected");

    document.querySelectorAll(".crafted-tool-display img").forEach((img) => {
        img.classList.remove("selected");
        img.style.opacity = "0.7";
    });

    if (!isSelected) {
        toolImg.classList.add("selected");
        toolImg.style.opacity = "1";
        //console.log(`You selected ${toolImg.id}`);
        currentChosenTool = toolImg.id;
        console.log("current chosen tool:" + currentChosenTool);

    } else {
        toolImg.style.opacity = "0.7";
        currentChosenTool = null;
        //console.log(`You unselected ${toolImg.id}`);
        console.log("current chosen tool:" + currentChosenTool);
    }
    fixButton();
}

function removeToolFromInventory(usedToolID){
    const usedToolimg = document.getElementById(usedToolID);
    usedToolimg.parentNode.removeChild(usedToolimg);
    currentChosenTool = null;
    fixButton();
    console.log(`Tool ${usedToolID} has been removed since it has been used`);
}






