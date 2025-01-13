let energy = 70; //default energy
let energyMeter = document.getElementById("energy-meter");
energyMeter.setAttribute('value', energy);

function energyCheckRange(energy){
    if (energy > 100){
        energy = 100;
        //alert("Energy 100%!");
        console.log("Energy 100%");
    } else if (energy < 0){
        energy = 0;
        alert("OUT OF ENERGY");
        // console.log("OUT OF ENERGY");
    } else if (energy < 10 && food.value < 10){
        alert("YOU LOSE.☠️");
        location.reload();
        // document.getElementById("container").classList.add("disabled");
    }
    return energy;
}

let toolBox = [];
let currentChosenTool = null;
function toolChecker(tool, word){
    const regex = new RegExp(`^${word}\\d*(?=$|\\s)`, "i");  
    return regex.test(tool);
}


let wood = {
    value: 20,
    updateValue: (x) => {
        if(wood.value + x >= 0){
            wood.value += x;
        } else {
            alert("Not enough wood");
            //console.log("Not enough wood");
        }
        document.getElementById("wood").textContent = wood.value;
    }
};

let vine = {
    value: 10,
    updateValue: (x) => {
        if(vine.value + x >= 0){
            vine.value += x;
        } else {
            alert("Not enough vine");
            //console.log("Not enough vine");
        }
        document.getElementById("vine").textContent = vine.value;
    }
};

let food = {
    value: 30,
    updateValue: (x) => {
        if(food.value + x >= 0){
            food.value += x;
        } else {
            alert("Not enough food");
            //console.log("Not enough food");
        }
        document.getElementById("food").textContent = food.value;
    }
};

let stone = {
    value: 20,
    updateValue: (x) => {
        if(stone.value + x >= 0){
            stone.value += x;
        } else {
            alert("Not enough stone");
            //console.log("Not enough stone");
        }
        document.getElementById("stone").textContent = stone.value;
    }
};

let obsidian = {
    value: 0,
    updateValue: (x) => {
        if(obsidian.value + x >= 0){
            obsidian.value += x;
        } else {
            alert("Not enough stone");
            //console.log("Not enough stone");
        }
        document.getElementById("obsidian").textContent = obsidian.value;
    }
}

let rareFang = {
    value: 0,
    updateValue: (x) => {
        if(rareFang.value + x >= 0){
            rareFang.value += x;
        } else {
            alert("Not enough stone");
            //console.log("Not enough stone");
        }
        document.getElementById("rare-fang").textContent = rareFang.value;
    }
}

document.getElementById("wood").textContent = wood.value;
document.getElementById("vine").textContent = vine.value;
document.getElementById("food").textContent = food.value;
document.getElementById("stone").textContent = stone.value;
document.getElementById("obsidian").textContent = obsidian.value;
document.getElementById("rare-fang").textContent = rareFang.value;

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
        if(food.value < 10 && energy >= 10){
            alert("Not enough food, cannot rest :(");
        } else if (energy === 100){
            alert("Energy 100%! No need to rest :)");
        } else {
            console.log("Rest!");
            resting();
        }
    }

    if(action === "sailAway"){
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
    energyMeter.setAttribute('value', energy);
    console.log("energy now is: " + energy);
}


// Action GATHER
function gathering(){
    energy -= 10;

    let vineGet = Math.floor(Math.random() * 10 + 1);
    vine.updateValue(vineGet);

    let foodGet = Math.floor(Math.random() * 10 + 1);
    food.updateValue(foodGet);

    let woodGet = Math.floor(Math.random() * 10 + 1);
    if(toolBox['Super Axe'] > 0 && toolChecker(currentChosenTool, 'Super Axe')){
        console.log("You are using your Super Axe. Wood collection increases by 4x.");
        woodGet = woodGet * 4;
        toolBox['Super Axe']--;
        removeToolFromInventory(currentChosenTool);
    } else if (toolBox['Axe'] > 0 && toolChecker(currentChosenTool, 'Axe')){
        console.log("You are using your Axe. Wood collection increases by 2x.");
        woodGet = woodGet * 2;
        toolBox['Axe']--;
        //console.log(toolBox);
        removeToolFromInventory(currentChosenTool);
        //console.log(toolBox);
    };
    wood.updateValue(woodGet);

    let stoneGet = Math.floor(Math.random() * 5 + 1);
    stone.updateValue(stoneGet);

    console.log(`You get Vine x ${vineGet}, Food x ${foodGet}, Wood x ${woodGet}, Stone x ${stoneGet}`);

    let obsidianGet = 0;
    const chanceRandom = Math.random();
    //console.log(chanceRandom);
    if(chanceRandom <= 0.1){
        obsidianGet = 1;
        console.log(`You get OBSIDIAN x ${obsidianGet} 🤩🔮`);
        obsidian.updateValue(obsidianGet);
    } 
}

// Action HUNT
function hunting(){
    energy -= 20;
    let foodGet = Math.floor(Math.random() * 20 + 1);

    if(toolBox['Super Spear'] > 0 && toolChecker(currentChosenTool, 'Super Spear')){
        console.log("You are using your Super Spear. Food collection increases by 4x.");
        foodGet = foodGet * 4;
        toolBox['Super Spear']--;
        removeToolFromInventory(currentChosenTool);
    } else if (toolBox['Spear'] > 0 && toolChecker(currentChosenTool, 'Spear')){
        console.log("You are using your Spear. Food collection increases by 2x.");
        foodGet = foodGet * 2;
        toolBox['Spear']--;
        removeToolFromInventory(currentChosenTool);
    }
    food.updateValue(foodGet);

    console.log(`You get Food x ${foodGet}`);

    let rareFangGet = 0;
    const chanceRandom = Math.random();
    //console.log(chanceRandom);
    if(chanceRandom <= 0.1){
        rareFangGet = 1;
        console.log(`You get RARE FANG x ${rareFangGet} 🤩🪽`);
        rareFang.updateValue(rareFangGet);
    } 
}

// Action REST
function resting(){
    food.updateValue(-10);
    energyGet = Math.floor(Math.random() * 20 + 1);
    energy += energyGet;
    console.log(`10 FOOD used. Food now : ${food.value}`);
    console.log(`Get energy: ${energyGet}`);
}

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

// Function to update tool selecter menu with items avaliable in api
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

        if (selectedTool) {
            // Update the content in the HTML
            const toolTitle = document.getElementById("tool-title");
            const toolDescription = document.getElementById("tool-description");
            const toolImg = document.getElementById("tool-img");
            const toolRequirements = document.getElementById("required-resource");

            toolTitle.textContent = selectedTool.title;
            toolDescription.textContent = selectedTool.description;
            toolImg.src = selectedTool.img;
            toolImg.alt = selectedTool.title;

            document.getElementById("require-title").textContent = "Requirements:";

            toolRequirements.innerHTML = "";
            if (selectedTool.requirements && selectedTool.requirements.length > 0) {
                selectedTool.requirements.forEach(resource => {
                    const listItem = document.createElement("li");
                    listItem.textContent = resource; // Add resource text
                    toolRequirements.appendChild(listItem);
                });
            } else {
                // Add a message if no resource info are available in api
                const listItem = document.createElement("li");
                listItem.textContent = "No resources available.";
                toolRequirements.appendChild(listItem);
            }
        }
    });
}

document.getElementById("tool-select-list").addEventListener("change", (event) => {
    const selectedTool = event.target.value;
    if (selectedTool) {
        console.log(`Show info of ${selectedTool}`);
        updateToolInfo(selectedTool);
    } 
});

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

function craftTool(toolTitle){
    //when click on the craft button, this function should check on: 
    // 1) which resources the tool requires
    // 2) there is enough resource for crafting this tool
    // If true, craft tool by 1) adding the tool to tool box 2) deducting used resources from inventory 3) display tool in inventory 4) apply effect
    // If false, display error message
    //console.log(`You said you wanna craft ${toolTitle}?`);
    //console.log(toolBox);
    
    fetchToolData().then(toolList => {
        const requiredResource = toolList.find(tool => tool.title == toolTitle).requirements; //get an array of requirement e.g. ["10 wood", "5 stone"]

        //console.log(requiredResource);

        const requiredmentList = parseRequirementsToObject(requiredResource); //array parsed to object e.g. {wood:10, stone:5}
        const resourceMap = {
            wood: wood,
            stone: stone,
            vine: vine,
            food: food,
            obsidian: obsidian,
            rare: rareFang
        };

        const isEnoughResource = Object.entries(requiredmentList).every(([resource, requiredAmount]) => {
            if (!resourceMap[resource] || resourceMap[resource].value < requiredAmount) {
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
            resourceMap[resource].updateValue(-requiredAmount);
            console.log(`Used ${requiredAmount} ${resource}. Remaining: ${resourceMap[resource].value}`);
        });

        if (toolBox[toolTitle]) {
            toolBox[toolTitle]++;
        } else {
            toolBox[toolTitle] = 1;
        }
        //console.log(toolBox);
        console.log(`Successfully crafted ${toolTitle}!`);

        addToolToInventory(toolTitle);
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
//const toolEffect =
// toolContainer.innerHTML = ""; // Clear the container

function disableButton(buttonID){
    document.getElementById(buttonID).disabled = true;
}

function activateButton(buttonID){
    document.getElementById(buttonID).disabled = false;
}

function fixButton(){
    if(currentChosenTool === null){
        activateButton("hunt");
        activateButton("gather");
        activateButton("rest");
    } else if(currentChosenTool.includes("Axe")){
        activateButton("gather");
        disableButton("hunt");
        disableButton("rest");
    } else if(currentChosenTool.includes("Spear")){
        activateButton("hunt");
        disableButton("gather");
        disableButton("rest");
    } else if(currentChosenTool.includes("Boat")){
        disableButton("hunt");
        disableButton("gather");
        disableButton("rest");
        activateButton("sail-away");
    }
}



function addToolToInventory(craftedToolTitle) {
    if(craftedToolTitle === 'Boat'){
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

    function useMyCraftedTool(toolImg){
        //when click on the toolImg:
        // 1) if not selected, select it; if selected, deselect it
        // 2) if not selected but other img is selected, deselect other img
        const isSelected = toolImg.classList.contains("selected");
        // click activity the current chosen tool:" + currentChosenTool);

        // Deselect all images
        document.querySelectorAll(".crafted-tool-display img").forEach((img) => {
          img.classList.remove("selected");
          img.style.opacity = "0.7";
        });
    
        // If the clicked image was not selected, select it
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
}

function removeToolFromInventory(usedToolID){
    const usedToolimg = document.getElementById(usedToolID);
    usedToolimg.parentNode.removeChild(usedToolimg);
    currentChosenTool = null;
    fixButton();

    console.log(`Tool ${usedToolID} has been removed since it has been used`);
}






