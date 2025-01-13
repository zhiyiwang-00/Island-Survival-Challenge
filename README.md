# Island Survival Challenge Game
Welcome to the **Island Survival Challenge**, where your mission is to survive on a mysterious island by managing resources, crafting tools, and ultimately building a boat to escape.

## How to Run the Game

1. **Download the Game Files**: Download all the files included in the project package.
2. **Open the HTML File**: Locate the `index.html` file in the project folder and double-click it to open it in your default web browser.
3. **Optional - Use a Live Server**: For a smoother experience, especially during development:
   - Install the **Live Server** extension in Visual Studio Code.
   - Open the project folder in VS Code, right-click `index.html`, and select "Open with Live Server."

## How to Play

### Gameplay Features
1. **Resource Inventory**:
   - View your remaining energy, collected resources and crafted tools in the inventory panel.

2. **Survival Actions**:
   - **Gather**: Collect random amounts of wood, vines, food, and stone. There is a 10% chance to get obsidian during each GATHER action. Costs 10 energy per action. 
   - **Hunt**: Gather food with the possibility of large yields. There is a 10% chance to get rare fang during each HUNT action. Costs 20 energy per action.
   - **Rest**: Restore energy by consuming food. Costs 10 food to gain 1-20 energy.
   - **Sail Away**: Craft a boat and escape the island! Requires 40 energy and a crafted boat. _*PS: "Sail Away" button is disabled until a boat has been crafted._ 

3. **Tool Crafting**:
   - Craft tools such as axes and spears to increase gathering efficiency.
   - Tools require specific resources to craft (e.g., an axe requires 10 wood and 5 stone).
   - Crafted tools are displayed in the inventory and can be clicked to **select and use** during gameplay for enhanced action efficiency.

4. **Crafting a Boat**:
   - The ultimate goal is to craft a boat to escape.
   - Requires 100 wood, 50 vines, and 50 food. 

### Winning and Losing
- **Win**: Successfully craft a boat and sail away.
- **Lose**: Run out of energy with no food left to restore it.

## Development Details
- A RESTful API is used for crafting tool data. The endpoint is: `https://thoughtful-vagabond-fibre.glitch.me/tools`

Enjoy your survival adventure and good luck escaping the island!