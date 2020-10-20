// Declaring input in the global scope.
let input = "";

function processRawInput(rawInput)
{
    let hackRE = /<*>/g;
    if (rawInput.match(hackRE))
    {
        output("You're not trying to do something tricky, are you?");
        inputTextArea.value = "";
        return "";
    }

    if (rawInput.length > MAX_INPUT_LENGTH)
    {
        output("You don't need to say anything as long as that.");
        inputTextArea.value = "";
        return "";
    }

    let charRE = /[\w\s,]/g;
    rawInput = rawInput.match(charRE).join('');
    rawInput = rawInput.trim().toLowerCase();

    return rawInput;
}

function getMissingInput()
{
    document.getElementById("gameArea").innerText = "";
    console.clear();
    let missingInput = document.getElementById("inputTextArea").value;
    missingInput = missingInput.trim().toLowerCase();
    outputPreviousInput(missingInput);

    // check for an action (not using the parseAction() method)
    // If the missing input starts with an action, replace original input with it
    let actionCheck = false;

    for (let token of actionPhrases)
    {
        if (startsWith(token, missingInput) && token !== "pump")
        {
            state.completePlayerInput = missingInput;
            actionCheck = true;
        }
    }

    // Otherwise, append the missing input
    if (!actionCheck)
    {
        state.completePlayerInput += " " + missingInput;
    }

    
    // don't forget to swap this back!
    inputTextArea.removeEventListener("change", getMissingInput);
    inputTextArea.addEventListener("change", getPlayerInput);

    // Restart the input parser

    parsePlayerInput();
}


// Function called when the player submits input
function getPlayerInput()
{
    input = "";

    document.getElementById("gameArea").innerText = "";
    console.clear();

    state.resetInput();

    let rawInput = inputTextArea.value;
    console.log("Raw input: " + rawInput);
    
    let processedInput = processRawInput(rawInput);

    console.log("Processed input: " + processedInput);


    if (isEmpty(processedInput)) return;
    outputPreviousInput(rawInput);
    state.completePlayerInput = processedInput;
    parsePlayerInput();

}

function parsePlayerInput()
{
    input = state.completePlayerInput;

    if (!preprocessInput())
    {
        exitInput();
        return;
    }

    
    if (!parseAction())
    {
        output("I can't tell what you're trying to do.");
        exitInput();
        return;
    }

    fillCurrentObjectList();

    // If the player is trying to indicate multiple objects,
    // the getMultipleObjects() method is called. If the input
    // can't be parsed, we exit here. If the input CAN be parsed
    // but no objects are in the final list, 
    let multRE = /,|\sand\s|\sall\s|\sall$|^all$|everything|\sexcept\s|\sbut\s|treasure/i;
    if (multRE.test(input))
    {
        removeSomeExtraWords();

        input = input.trim();
        if (getMultipleObjects())
        {
            updateMultiple();
        }

        else
        {
            output("I can't understand that.");
        }

        exitInput();
        return;
    }


    removeExtraWords();

    switch (state.playerActionType)
    {
        case "DIRECT":
        {
            if (state.playerAction === Action.LAUNCH)
            {
                if (input === "" && state.playerInBoat)
                {
                    state.directObject = inflatedBoat;
                    break;
                }
            }

            if (!parseDirectObject())
            {
                exitInput();
                return;
            }

        } break;

        case "INDIRECT":
        case "INDIRECT_INVERSE":
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

        case "SWITCH":
        {
            if (!parseDirectObject())
            {
                exitInput();
                return;
            }

            if (!isEmpty(input) && !parseIndirectObject())
            {
                exitInput();
                return;
            }

        } break;

        case "SPEAK":
        {
            state.speakPhrase = input;
            input = "";
        } 
        case "REFLEXIVE":
        case "EXIT":
        {
            state.previousDirectObject = dummyObject;
        } break;

        default: {} break;
    }

    if (state.playerActionType == "INDIRECT_INVERSE")
    {
        let temp = state.directObject;
        state.directObject = state.indirectObject;
        state.indirectObject = temp;
    }

    if (!isEmpty(input))
    {
        output("I don't understand what that means.");
        exitInput();
        return;
    }

    
    if (validateAction())
    {
        updateGame();
        exitInput();
    }
    

}


function getMultipleObjects()
{
    createObjectNameMap();

    // In which we deal with ambiguous objects one by one.

    let condition = (hotBell.location === state.playerLocation);

    if (condition)
    {
        objectNameMap.set("bell", hotBell);
        objectNameMap.set("brass bell", hotBell);
    }

    condition = (currentObjectNames.includes("useless lantern") &&
                 !currentObjectNames.includes("brass lantern"));

    if (condition)
    {
        objectNameMap.set("lamp", uselessLantern);
        objectNameMap.set("lantern", uselessLantern);
    }

    condition = (currentObjectNames.includes("guidebook") &&
                 !currentObjectNames.includes("black book"));

    if (condition)
    {
        objectNameMap.set("book", guidebook);
    }


    
    console.log("Input in detectMultipleObjects(): " + input);

    let checkComma = input.match(/,/);
    let checkAnd = input.match(/\sand\s/);
    console.log("checkComma: " + checkComma);
    console.log("checkAnd: " + checkAnd);

    // Identify a container object here and remove it from input
    let cObj = null;
    if (state.playerAction === Action.PUT && input.match(/(in|on)\s\w+/))
    {
        let res = input.split(/in\s|on\s/)[1];

        console.log("Finding container: " + res);

        for (let [token, obj] of objectList)
        {
            if (startsWith(token, res))
                cObj = obj;

            for (let name of obj.altNames)
                if (startsWith(name, res))
                {
                    cObj = obj;
                }
        }

        if (cObj == null)
        {
            output("I can't tell what you want to put the objects in or on.");
            return false;
        }

        if (cObj.location !== Location.PLAYER_INVENTORY && cObj.location !== state.playerLocation)
        {
            output("There's no " + cObj.name + " here!");
            return false;
        }

        if (!cObj.isContainer())
        {
            output("You can't put things in that.");
            return false;
        }

        state.indirectObject = cObj;
        state.indirectObjectPhrase = cObj.name;
        
    }

    // Player is selecting "all", etc.
    if (input.match(/^all|everything/))
    {
        if (state.playerAction === Action.TAKE)
        {
            for (let obj of currentObjects.values())
            {
                if (obj.location !== Location.PLAYER_INVENTORY)
                    state.multipleObjectList.set(obj.name, obj);
            }

            state.multipleObjectList.delete("you");
        }
        
        else if (state.playerAction === Action.PUT || state.playerAction === Action.DROP)
        {
            state.multipleObjectList.clear();

            for (let item of objectList.values())
            {
                if (item.location === Location.PLAYER_INVENTORY)
                    state.multipleObjectList.set(item.name, item);
            }
        }

        if (input.match(/^all treasures?|treasures?/))
        {
            for (let [key, obj] of state.multipleObjectList)
            {
                if (!obj.isItem() || obj.trophyCaseValue === 0)
                    state.multipleObjectList.delete(key);
            }
        }

        if (input.match(/except|but/))
        {
            let spl = input.split(/\sexcept\s|\sbut\s/)[1];

            spl = spl.replace(/,\s?/g, " ");
            spl = spl.replace(/\sand\s/g, " ");
            spl = spl.replace(/\sor\s/g, " ");

            console.log("spl: " + spl);

            let foundObject = false;
            while (!isEmpty(spl))
            {

                foundObject = false;
                for (let [name, obj] of objectNameMap)
                {
                    if (startsWith(name, spl))
                    {
                        foundObject = true;
                        spl = spl.substring(name.length).trim();

                        for (let [mKey, mObj] of state.multipleObjectList)
                        {
                            if (mObj == obj)
                            {
                                state.multipleObjectList.delete(mKey);
                            }

                            else
                            {
                                output("There is no " + name + " here.");
                            }
                        }
                    }

                }

                if (!foundObject)
                    spl = spl.substring(spl.split(" ")[0].length).trim();
            }
           
        }
        
        removeUnwantedMultiples();
        return true;
    }

    // Player is listing objects

    else if (checkComma != null || checkAnd != null)
    {

        input = input.replace(/,\s?/g, " ");
        input = input.replace(/\sand\s/g, " ");

        let foundObject = false;
        while (!isEmpty(input))
        {
            foundObject = false;

            for (let [name, obj] of objectNameMap)
            {
                if (startsWith(name, input))
                {
                    foundObject = true;
                    input = input.substring(name.length).trim();

                    state.multipleObjectList.set(obj.name, obj);
                }

            }

            if (!foundObject)
                input = input.substring(input.split(" ")[0].length).trim();

        }

        state.multipleObjectList.delete(state.indirectObject.name);
    }

    return true;
}


// Returns true if an action phrase is successfully
// extracted from the input string.
function parseAction()
{
    console.log("parseAction phrase: " + input);

    for (let token of actionPhrases)
    {
        if (startsWith(token, input))
        {
            state.playerAction = actions.get(token).action;
            state.playerActionType = actions.get(token).type;
            state.actionPhrase = token;
            input = input.substring(token.length).trim();
            return true;
        }
    }

    return false;

}


function parseDirectObject()
{

    if (isEmpty(input))
    {
        output("What do you want to " + state.actionPhrase + "?");
        inputTextArea.removeEventListener("change", getPlayerInput);
        inputTextArea.addEventListener("change", getMissingInput);
        return false;
    }

    if (state.previousDirectObject !== null && state.previousDirectObject !== dummyObject)
    {
        input = " " + input + " ";

        if (!state.previousDirectObject.plural)
            input = input.replace(/ it /, " " + state.previousDirectObject.name +  " ");

        if (state.previousDirectObject.plural || state.previousDirectObject.name === "pile of leaves")
            input = input.replace(/ them /, " " + state.previousDirectObject.name +  " ");


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

            // check for ambiguity

            if (ambiguityCheck(token))
                return false;

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

    output("I can't tell what you are referring to.");

    return false;

}

function ambiguityCheck(token)
{
    let altTok = token + "_alt";
    if (currentObjectNames.includes(altTok))
    {
        state.ambiguousPhrase = token;
        let tokenRE = new RegExp('^' + token);
        for (let [key, obj] of currentObjects)
        {
            if (tokenRE.test(key))
            {
                ambiguousMap.set(key, obj);
            }
        }

        let ambigStr = "Which " + token + " do you mean: ";
        for (let amObj of ambiguousMap.values())
        {
            ambigStr += "the " + amObj.name + ", ";
        }

        ambigStr = ambigStr.replace(/,\s$/, "?");
        ambigStr = ambigStr.replace(/,(.*$)/, " or $1");

        output(ambigStr);

        inputTextArea.innerText = "";
        inputTextArea.removeEventListener("change", getPlayerInput);
        inputTextArea.addEventListener("change", ambiguityInterface);

        return true;
    }

    return false;
}

function ambiguityInterface()
{
    gameArea.innerText = "";
    let token = state.ambiguousPhrase;
    let newToken = document.getElementById("inputTextArea").value;
    newToken = newToken.trim().toLowerCase();
    outputPreviousInput(newToken);

    let tokenRE = new RegExp(token);

    state.completePlayerInput = state.completePlayerInput.replace(tokenRE, newToken);

    inputTextArea.removeEventListener("change", ambiguityInterface);
    inputTextArea.addEventListener("change", getPlayerInput);

    parsePlayerInput();
}


function parseIndirectObject()
{
    console.log("parseIndirectObject phrase: " + input);

    if (isEmpty(input))
    {
        output("What do you want to " + state.actionPhrase + " the "
            + state.directObjectPhrase + " " + prepositions.get(state.playerAction) + "?");
        inputTextArea.removeEventListener("change", getPlayerInput);
        inputTextArea.addEventListener("change", getMissingInput);
        return false;
    }


    for (let token of currentObjectNames)
    {
        if (startsWith(token, input))
        {
            state.indirectObject = currentObjects.get(token);
            state.indirectObjectPhrase = token;
            input = input.substring(token.length).trim();

            if (ambiguityCheck(token))
                return false;

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

    output("I can't tell what you are referring to.");

    return false;

}


// Prints debug info 
// Refreshes inventories 
// Updates game flags 
// Fills current object list 
// Clears player input text area 
function exitInput()
{
    printDebugInfo();

    updateEvents();
    refreshInventories();
    fillCurrentObjectList();

    document.getElementById("inputTextArea").value = "";

}


function preprocessInput()
{
    input = input.replace(/ +/g, " ");

    // Loud room check
    if (loudRoomCheck(input)) 
    {
        return false;
    }

    // Get previous input if player typed "again"
    if (input === "again" || input === "g")
    {
        input = state.playerPreviousInput;
        if (input === "")
        {
            output("Again what?");
            return false;
        }
    }

    if (specialInputCheck())
    {
        return false;
    }

    // Check for unknown words
    let inputWords = input.split(" ");

    if (!startsWith("say", input) && !startsWith("speak", input))
    {
        for (let i = 0; i < inputWords.length; ++i)
        {
            if (!isGameWord(inputWords[i]))
            {
                output("I don't know what \"" + inputWords[i] + "\" means.");
                return false;
            }
        }
    }

    return true;

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


// Updates the currentObjects map with all objects
// that the player can potentially interact with
// for the current turn.
function fillCurrentObjectList()
{
    currentObjects.clear();
    ambiguousMap.clear();

    // Self object should go here
    currentObjects.set("you", self);
    currentObjects.set("me", self);
    currentObjects.set("myself", self);
    currentObjects.set("self", self);

    for (let g of objectList.values())
    {
        // Objects in the player's location or inventory
        if (g.location === state.playerLocation ||
            g.altLocations.has(state.playerLocation) ||
            g.playerHasObject())
        {
            currentObjects.set(g.name, g);

            for (let str of g.altNames)
            {
                if (currentObjects.has(str))
                    currentObjects.set(str + "_alt", g);
                else
                    currentObjects.set(str, g);
            }

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
    {
        currentObjectNames.push(name);

        // for (let altName of obj.altNames)
        //     currentObjectNames.push(altName);
    }

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
    str = str.match(/\w/gi).join('');

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


function printDebugInfo()
{
    console.log("Action: " + state.playerAction);
    console.log("Action type: " + state.playerActionType);
    console.log("Direct object: " + state.directObject);
    console.log("Previous direct object: " + state.previousDirectObject);
    console.log("Indirect object: " + state.indirectObject);

}


function removeExtraWords()
{
    input = " " + input + " ";
    input = input.replace(/ back /g, " ");
    input = input.replace(/ from /g, " ");
    input = input.replace(/ of /g, " ");
    input = input.replace(/ the /g, " ");
    input = input.replace(/ to /g, " ");
    input = input.replace(/ with /g, " ");
    input = input.replace(/ at /g, " ");
    input = input.replace(/ in /g, " ");
    input = input.replace(/ on /g, " ");
    input = input.replace(/ out /g, " ");

    input = input.trim();

}

function removeSomeExtraWords()
{
    input = " " + input + " ";
    input = input.replace(/ back /g, " ");
    input = input.replace(/ from /g, " ");
    input = input.replace(/ of /g, " ");
    input = input.replace(/ the /g, " ");
    input = input.replace(/ to /g, " ");
    input = input.replace(/ with /g, " ");
    input = input.replace(/ at /g, " ");
    input = input.replace(/ out /g, " ");

    input = input.trim();

}

function removeUnwantedMultiples()
{
    let names = [ "altar", "attic table", "basket", "blue button", "boarded window", "broken mirror",
    "brown button", "current", "door", 
    "engravings", "flood", "flow", "forest", "gas", "glow", "grating", "green bubble", "kitchen table", 
    "kitchen window", "machine", "mirror", "mountains", "pedestal", "quantity of water", "rainbow", "red button", 
    "reservoir water", "river water", "sand", "song bird", "spirits", "stream water", "trap door",
    "white house", "wooden boards", "wooden door", "wooden railing", "yellow button", "you"];

    for (let name of names)
    {
        state.multipleObjectList.delete(name);
    }
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

    if (input === "author" || input === "about")
    {
        output(GameStrings.ABOUT_INFO);
        return true;
    }

    if (input === "bug")
    {
        output("Bug? Maybe in the original program, but not in a flawless remake like this! (Cough, cough.)");
        return true;
    }

    if (input === "hello")
    {
        let choice = getRandom(3);

        switch (choice)
        {
            case 0:
            {
                output("Hello.");
            } break;

            case 1:
            {
                output("Good day.");
            } break;

            case 2:
            {
                output("Nice weather we've been having lately.");
            } break;

            default: {} break;
        }

        return true;
    }

    input = " " + input + " ";

    if (/\sfuck\s|\sshit\s|\sdamn\s|\shell\s|\sass\s/.test(input))
    {
        output("Such language in a high-class establishment like this!");
        return true;
    }

    input = input.trim();

    if (input === "help")
    {
        output(GameStrings.HELP_INFO);
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
                    case "CLIMB":
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
                        exitInput();
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
                exitInput();
                return false;
            }
        } break;

        default: {} break;
    }

    return true;

}