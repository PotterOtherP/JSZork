// Declaring input in the global scope.
let input = "";
let missingDirectObject = false;
let missingIndirectObject = false;


// Function called when the player submits input
function parsePlayerInput()
{
    input = "";

    document.getElementById("gameArea").innerText = "";
    state.resetInput();
    console.clear();

    input = document.getElementById("inputTextArea").value;
    state.completePlayerInput = input;
    outputPreviousInput(input);

    // Loud room check
    if (loudRoomCheck(input)) 
    {
        exitInput();
        return;
    }

    input = input.trim().toLowerCase();

    // Get previous input if player typed "again"
    if (input === "again" || input === "g")
    {
        input = state.playerPreviousInput;
        if (input === "")
        {
            output("Again what?");
            exitInput();
            return;
        }
    }

    if (specialInputCheck())
    {
        exitInput();
        return;
    }


    input = " " + input + " ";
    input = input.replace(/ back /g, " ");
    input = input.replace(/ from /g, " ");
    input = input.replace(/ of /g, " ");
    input = input.replace(/ the /g, " ");
    input = input.replace(/ to /g, " ");
    input = input.replace(/ with /g, " ");
    input = input.replace(/  /g, " ");
    input = input.trim();


    // Check for unknown words
    let inputWords = input.split(" ");

    if (!startsWith("say", input) && !startsWith("speak", input))
    {
        for (let i = 0; i < inputWords.length; ++i)
        {
            if (!isGameWord(inputWords[i]))
            {
                output("I don't know what \"" + inputWords[i] + "\" means.");
                exitInput();
                return;
            }
        }
    }


    if (!parseAction()) return;

    input = " " + input + " ";
    input = input.replace(/ at /g, " ");
    input = input.replace(/ in /g, " ");
    input = input.replace(/ on /g, " ");
    input = input.replace(/ out /g, " ");
    input = input.trim();

    switch (state.playerActionType)
    {
        case "DIRECT":
        {
            if (state.playerAction === Action.LAUNCH)
            {
                if (input === "" && state.playerInBoat)
                {
                    state.directObject = inflatedBoat;
                    return;
                }
            }

            if (!parseDirectObject())
            {
                exitInput();
                return;
            }

        } break;

        case "INDIRECT":
        {
            if (!parseDirectObject())
            {
                exitInput();
                return;
            }

            if (!parseIndirectObject())
            {
                exitInput();
                return;
            }

        } break;

        case "INDIRECT_INVERSE":
        {
            if (!parseIndirectObject())
            {
                exitInput();
                return;
            }

            if (!parseDirectObject())
            {
                exitInput();
                return;
            }

        } break;

        case "SPEAK":
        {
            state.speakPhrase = input;
        } break;

        default: {} break;
    }

    
    if (validateAction())
    {
        updateGame();
        updateScore();
    }

    exitInput();

}

// If the bottle is filled, this will add the quantity of water
// to the current object list.
function bottleCheck(obj)
{
    if (obj.name === "glass bottle" && state.bottleFilled)
    {
        let water = objectList.get("quantity of water");
        currentObjects.set("water", water);
        currentObjects.set("quantity of water", water);

    }

}

// Prints debug info 
// Refreshes inventories 
// Updates game flags 
// Fills current object list 
// Clears player input text area 
function exitInput()
{
    printDebugInfo();
    refreshInventories();
    updateEvents();
    fillCurrentObjectList();
    document.getElementById("inputTextArea").value = "";

}

// Updates the currentObjects map with all objects
// that the player can potentially interact with
// for the current turn.
function fillCurrentObjectList()
{
    currentObjects.clear();

    // Self object should go here

    for (let g of objectList.values())
    {
        // Objects in the player's location or inventory
        if (g.location === state.playerLocation ||
            g.altLocations.has(state.playerLocation) ||
            g.playerHasObject())
        {
            currentObjects.set(g.name, g);

            for (let str of g.altNames)
                currentObjects.set(str, g);

            bottleCheck(g);
        }

        // Items in an open container that is present in the room
        if ( (g.location === state.playerLocation || g.playerHasObject())
             && g.isContainer() && g.isOpen() )
        {
            for (let it of g.inventory)
            {
                currentObjects.set(it.name, it);

                for (let str of it.altNames)
                    currentObjects.set(str, it);

                bottleCheck(it);
            }
        }

        // Items on a surface
        if (g.location === state.playerLocation && g.isSurface())
        {
            for (let it of g.inventory)
            {
                currentObjects.set(it.name, it);

                for (let str of it.altNames)
                    currentObjects.set(str, it);

                if (it.isContainer() && it.isOpen())
                {
                    for (let nestIt of it.inventory)
                    {
                        currentObjects.set(nestIt.name, nestIt);

                        for (let str of nestIt.altNames)
                            currentObjects.set(str, nestIt);
                    }
                }

                bottleCheck(it);
            }
        }

        if (g.intangible)
            currentObjects.delete(g.name);
    }

    // Special cases

    // The rope tied to the railing
    if (state.ropeRailTied && (state.playerLocation === "DOME_ROOM" || state.playerLocation === "TORCH_ROOM"))
        currentObjects.set("rope", objectList.get("rope"));

    // Items in the shaft basket
    if ( (state.playerLocation === "SHAFT_ROOM" && !state.shaftBasketLowered) ||
         (state.playerLocation === "DRAFTY_ROOM" && state.shaftBasketLowered) )
    {
        let basket = objectList.get("basket");
        for (let it of basket.inventory)
        {
            currentObjects.set(it.name, it);

            for (let str of it.altNames)
                currentObjects.set(str, it);

            bottleCheck(it);
        }
    }

    else
    {
        let basket = objectList.get("basket");
        for (let it of basket.inventory)
        {
            currentObjects.delete(it.name);

            for (let str of it.altNames)
                currentObjects.delete(str);
        }
    }


    // Create the list of current object names, which can be sorted

    currentObjectNames = [];
    for (let name of currentObjects.keys())
        currentObjectNames.push(name);

    // Bubble sort by length
    for (let x = 0; x < currentObjectNames.length - 1; ++x)
    {
        for (let y = x + 1; y < currentObjectNames.length; ++y)
        {
            if (currentObjectNames[x].length < currentObjectNames[y].length)
            {
                let temp = currentObjectNames[x];
                currentObjectNames[x] = currentObjectNames[y];
                currentObjectNames[y] = temp;
            }
        }
    }

}

// Returns true if the input string is empty
function isEmpty(input)
{
    if (input === null)
    {
        return true;
    }

    return (input === "" || input.length === 0);

}

// Returns true if str is known to the game
function isGameWord(str)
{
    return (dictionary.has(str));

}

// Process player input if the player is in the loud room
// and has not solved it yet.
function loudRoomCheck(input)
{
    if (state.playerLocation === "LOUD_ROOM" && !state.loudRoomSolved && !state.damWaterLow)
    {
        if (input === "echo")
        {
            output(MapStrings.LOUD_ROOM_CHANGE);
            state.loudRoomSolved = true;
            ++state.turns;
            return true;
        }

        console.log("Loud room input: " + input);

        let words = state.completePlayerInput.trim().split(" ");
        let lastWord = words[words.length - 1];

        parseAction(input);

        switch(state.playerAction)
        {
            case "EAST":
            case "WEST":
            case "UP":
            case "LOOK":
            {
                updateGame();
                updateScore();
                return true;
            }

            default:
            {
                output(lastWord + " " + lastWord + "...");
            } break;
        }

        return true;
    }

    return false;

}

// Returns true if an action phrase is successfully
// extracted from the input string.
function parseAction()
{
    console.log("parseAction phrase: " + input);

    let result = false;

    for (let token of actions.keys())
    {
        if (startsWith(token, input))
        {
            state.playerAction = actions.get(token).action;
            state.playerActionType = actions.get(token).type;
            state.actionPhrase = token;
            input = input.substring(token.length).trim();
            result = true;
        }
    }

    return result;

}


function parseDirectObject()
{

    if (isEmpty(input))
    {
        output("What do you want to " + state.actionPhrase + "?");
        return false;
    }

    if (state.previousDirectObject !== null)
    {
        input = " " + input + " ";
        input = input.replace(/ it /, " " + state.previousDirectObject.name +  " ");
        input = input.trim();
    }

    console.log("parseDirectObject phrase: " + input);

    for (let token of currentObjectNames)
    {
        if (startsWith(token, input))
        {
            state.directObject = currentObjects.get(token);
            state.directObjectPhrase = token;
            input = input.substring(token.length).trim();
            return true;
        }
    }

    // didn't find the object
    for (let token of gameNouns)
    {
        if (startsWith(token, input))
        {
            output("You can't see any " + token + " here!");
            return false;
        }
    }

    output("You used the phrase \"" + input + "\" in a way I don't understand.");

    return false;

}


function parseIndirectObject()
{
    console.log("parseIndirectObject phrase: " + input);

    for (let token of currentObjectNames)
    {
        if (startsWith(token, input))
        {
            state.indirectObject = currentObjects.get(token);
            state.indirectObjectPhrase = token;
            input = input.substring(token.length).trim();
            return true;
        }
    }

    // didn't find the object
    for (let token of gameNouns)
    {
        if (startsWith(token, input))
        {
            output("You can't see any " + token + " here!");
            return false;
        }
    }

    output("You used the phrase \"" + input + "\" in a way I don't understand.");

    return false;

}


function printDebugInfo()
{
    console.log("Action: " + state.playerAction);
    console.log("Action type: " + state.playerActionType);
    console.log("Direct object: " + state.directObject);
    console.log("Previous direct object: " + state.previousDirectObject);
    console.log("Indirect object: " + state.indirectObject);

}


function specialInputCheck()
{
    let result = false;
    let input = state.completePlayerInput;

    if (isEmpty(input))
    {
        output("I beg your pardon?");
        return true;
    }

    if (input === "author")
    {
        output(GameStrings.AUTHOR_INFO);
        return true;
    }

    if (input === "bug")
    {
        output("Bug? Maybe in the original program, but not in a flawless remake like this! (Cough, cough.)");
        return true;
    }

    if (input === "help")
    {
        output("Find the 19 lost treasures of Zork and return them to the trophy case.");
        output("");
        output("Try moving north, south, east, west, up, or down. Try to take objects and do things with them.");
        output("");
        output("Possible actions:");
        output("");
        output("activate  again  answer  attack  blow  board  break  brief  burn  " +
        "climb  close  count  cross  cut  defend  deflate  diagnose  dig  " +
        "down  drink  drop  east  eat  enter  examine  exit  extinguish  " +
        "fill  follow  give  go  in  inflate  inventory  jump  kick  knock  " +
        "launch  light  listen  lock  look  lower  move  north  northeast  " +
        "northwest  open  out  play  pour  pray  pull  push  put  quit  raise  " +
        "read  restore  restart  ring  save  say  search  shake  shout  slide  " +
        "smell  south  southeast  southwest  stay  strike  superbrief  swim  " +
        "take  talk  throw  tie  touch  turn  unlock  up  verbose  wait  " +
        "walk  wake  wave  wear  west  wind");
        return true;
    }

    // Old ZORK inside jokes
    if (input === "xyzzy" || input === "plugh")
    {
        output("A hollow voice says 'Fool.'");
        return true;
    }

    if (input === "hello sailor"   ||
        input === "hello, sailor!" ||
        input === "hello sailor!"  ||
        input === "hello, sailor" )
    {
        output("Nothing happens here.");
        return true;
    }

    if (input === "zork")
    {
        output("At your service!");
        return true;
    }


    return result;

}


function startsWith(token, input)
{
    let check = true;

    let tokenWords = token.split(" ");
    let inputWords = input.split(" ");

    if (inputWords.length < tokenWords.length)
        check = false;

    else
    {
        for (let i = 0; i < tokenWords.length; ++i)
        {
            if (tokenWords[i] !== inputWords[i])
                check = false;
        }
    }

    return check;

}


function validateAction()
{
    let dirObj = state.directObject;
    let indObj = state.indirectObject;
    let act = state.playerAction;

    if (act === Action.ENTER && dirObj.name === "magic boat" && dirObj.location === state.playerLocation)
        return true;

    switch (state.playerActionType)
    {
        case "DIRECT":
        {
            if (dirObj.isItem() && dirObj.location !== Location.PLAYER_INVENTORY)
            {
                switch (act)
                {
                    // Here is the list of actions that can be performed on items
                    // which are present but not in the player's inventory.
                    case "ATTACK":
                    case "BOARD":
                    case "CLOSE":
                    case "CUT":
                    case "DEFLATE":
                    case "INFLATE":
                    case "KICK":
                    case "LAUNCH":
                    case "MOVE_OBJECT":
                    case "OPEN":
                    case "REPAIR":
                    case "TAKE":
                    case "UNTIE":
                    {

                    } break;

                    default:
                    {
                        output("You're not carrying the " + dirObj.name + ".");
                        return false;
                    } break;
                }
            }

        } break;

        case "INDIRECT":
        case "INDIRECT_INVERSE":
        {
            if (indObj.isItem() && indObj.location !== Location.PLAYER_INVENTORY)
            {
                output("You're not carrying the " + indObj.name + ".");
                return false;
            }
        } break;

        default: {} break;
    }

    return true;

}