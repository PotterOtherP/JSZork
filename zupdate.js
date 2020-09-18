function updateGame()
{
    saveGame("undoSave");

    let currentRoom = worldMap.get(state.playerLocation);

    if (state.playerDead)
    {
        updateDeath();
        return;
    }

    darknessCheck();

    if (state.playerInDarkness)
    {
        updateDarkness();
        return;
    }

    // Special cases: being in the boat and messing with the shaft basket

    if (state.playerInBoat && !boatCheck())
    {
        output("You need to get out of the boat first.");
        return;
    }

    if (state.directObject.name === "basket")
    {
        if (state.playerAction === "RAISE" || state.playerAction === "LOWER")
        {
            // don't do anything
        }

        else if ( (state.playerLocation === "SHAFT_ROOM" && state.shaftBasketLowered) ||
                  (state.playerLocation === "DRAFTY_ROOM" && !state.shaftBasketLowered) )
        {
            output("The basket is at the other end of the chain.");
            
            /* Do we want to take a turn here?
            updateActors();
            updateItems();
            updateScore();
            ++state.turns;
            */
            return;
        }

    }

    executePlayerAction();
    switch(state.playerAction)
    {

        // Actions on an object
        case "ANSWER": { state.directObject.answer(); } break;
        case "ATTACK": { state.directObject.attack(); } break;
        case "BLOW": { state.directObject.blow(); } break;
        case "BOARD": { state.directObject.board(); } break;
        case "BREAK": { state.directObject.breakObject(); } break;
        case "BRUSH": { state.directObject.brush(); } break;
        case "CLIMB": {state.directObject.climb(); } break;
        case "CLOSE": {state.directObject.close(); } break;
        case "COUNT": { state.directObject.count(); } break;
        case "CROSS": { state.directObject.cross(); } break;
        case "CUT": { state.directObject.cut(); } break;
        case "DEFLATE": { state.directObject.deflate(); } break;
        case "DIG": { state.directObject.dig(); } break;
        case "DRINK": { state.directObject.drink(); } break;
        case "DROP": {state.directObject.drop(); } break;
        case "EAT": { state.directObject.eat(); } break;
        case "ENTER": { state.directObject.enter(); } break;
        case "EXAMINE": { state.directObject.examine(); } break;
        case "EXTINGUISH": { state.directObject.extinguish(); } break;
        case "FILL": { state.directObject.fill(); } break;
        case "FOLLOW": { state.directObject.follow(); } break;
        case "GIVE": { state.directObject.give(); } break;
        case "GREET": { state.directObject.greet(); } break;
        case "INFLATE": { state.directObject.inflate(); } break;
        case "KICK": { state.directObject.kick(); } break;
        case "KNOCK": { state.directObject.knock(); } break;
        case "LAUNCH": { state.directObject.launch(); } break;
        case "LIGHT": { state.directObject.light(); } break;
        case "LISTEN": { state.directObject.listen(); } break;
        case "LOCK": {state.directObject.lock(); } break;
        case "LOOK_IN": {state.directObject.lookIn(); } break;
        case "LOOK_OUT": {state.directObject.lookOut(); } break;
        case "LOOK_UNDER": {state.directObject.lookUnder(); } break;
        case "MOVE_OBJECT": { state.directObject.move(); } break;
        case "LOWER": { state.directObject.lower(); } break;
        case "OPEN": {state.directObject.open(); } break;
        case "POUR": { state.directObject.pour(); } break;
        case "PULL": { state.directObject.pull(); } break;
        case "PUT": { state.directObject.put(); } break;
        case "PUSH": { state.directObject.push(); } break;
        case "RAISE": { state.directObject.raise(); } break;
        case "READ": { state.directObject.read(); } break;
        case "REMOVE": { state.directObject.remove(); } break;
        case "REPAIR": { state.directObject.repair(); } break;
        case "RING": { state.directObject.ring(); } break;
        case "SEARCH": { state.directObject.search(); } break;
        case "SHAKE": { state.directObject.shake(); } break;
        case "SMELL": { state.directObject.smell(); } break;
        case "TAKE": {state.directObject.take(); } break;
        case "TALK_TO": { state.directObject.talk(); } break;
        case "TIE": {state.directObject.tie(); } break;
        case "TOUCH": { state.directObject.touch(); } break;
        case "TURN": { state.directObject.turn(); } break;
        case "UNLOCK": {state.directObject.unlock(); } break;
        case "UNTIE": {state.directObject.untie(); } break;
        case "WAKE": { state.directObject.wake(); } break;
        case "WAVE": { state.directObject.wave(); } break;
        case "WEAR": { state.directObject.wear(); } break;
        case "WIND": { state.directObject.wind(); } break;

        // Exit actions
        case "NORTH":
        case "SOUTH":
        case "EAST":
        case "WEST":
        case "NORTHEAST":
        case "NORTHWEST":
        case "SOUTHEAST":
        case "SOUTHWEST":
        case "UP":
        case "DOWN":
        case "IN":
        case "OUT":
        {
            if (currentRoom.exit())
            {
                let nextRoom = worldMap.get(state.playerLocation);

                if (state.playerInBoat)
                    outputLocation(nextRoom.name + ", in the magic boat");
                else
                    outputLocation(nextRoom.name);

                darknessCheck();

                if (nextRoom.isDark() && !state.lightActivated)
                    output(GameStrings.ENTER_DARKNESS);

                if (nextRoom.roomID === "LOUD_ROOM" && state.waterFalling)
                {
                    let rand = getRandom(3);

                    output("\n");
                    nextRoom.getRoomObjects();
                    output(MapStrings.DESC_LOUD_ROOM_WATER + "\n");

                    if (rand === 0) relocatePlayer(Location.DAMP_CAVE);
                    if (rand === 1) relocatePlayer(Location.ROUND_ROOM);
                    if (rand === 2) relocatePlayer(Location.DEEP_CANYON);

                    updateActors();
                    updateItems();
                    updateScore();
                    updateEvents();
                    ++state.turns;
                    return;
                }

                nextRoom.lookAround();

                if (nextRoom.firstVisit)
                    nextRoom.firstVisit = false;

                if (nextRoom.roomID === "GAS_ROOM")
                {
                    let flameCheck = false;

                    if (torch.location === Location.PLAYER_INVENTORY && torch.activated)
                        flameCheck = true;
                    if (candles.location === Location.PLAYER_INVENTORY && candles.activated)
                        flameCheck = true;
                    if (matchbook.location === Location.PLAYER_INVENTORY && matchbook.activated)
                        flameCheck = true;

                    if (flameCheck)
                    {
                        output("\n" + GameStrings.GAS_EXPLOSION);
                        playerDies();
                    }
                }
                
            }
        } break;

        // Reflexive actions
        case "DEBOARD":
            {

                if (state.playerInBoat)
                {
                    if (currentRoom.bodyOfWater)
                        output("You realize that getting out here would be fatal.");
                    else
                    {
                        output("You are on your own feet again.");
                        state.playerInBoat = false;
                            
                    }
                }

                else if (boat.location === Location.PLAYER_INVENTORY || boat.location === state.playerLocation)
                {
                    output("You're already not in the boat.");
                }

                else
                    output("There is nothing to get out of.");

            } break;

            case "INVENTORY":
            {
                let count = 0;
                for (let item of objectList.values())
                {
                    
                    if (item.location === Location.PLAYER_INVENTORY)
                    {
                        ++count;
                        if (count === 1)
                            output("You are carrying: \n");
                        output(item.capArticleName);
                    }

                    if (item.location === Location.PLAYER_INVENTORY && item.name === "glass bottle" && state.bottleFilled)
                        output("The glass bottle contains:\n  A quantity of water");

                    if (item.location === Location.PLAYER_INVENTORY && item.isContainer()
                        && item.isOpen())
                    {
                        if (item.inventory.size > 0)
                        {
                            let check = false;

                            for (let it of item.inventory)
                            {
                                if (it.initialPresenceString !== "" && !it.movedFromStart)
                                {
                                    output(it.initialPresenceString);
                                    check = true;
                                }
                            }

                            if (!check)
                            {
                                output("The " + item.name + " contains:");
                                for (let it of item.inventory)
                                    output("  " + it.capArticleName);
                            }
                        }
                    }
                }

                if (count === 0)
                    output("You are empty-handed.");

            } break;

            case "JUMP":
            {
                if (currentRoom.height)
                {
                    output(currentRoom.jumpString);
                    playerDies();
                }

                else
                    output(GameStrings.getJumpSarcasm());
            } break;

            case "LOOK":
            {
                currentRoom.lookAround();
            } break;

            case "PRAY":
            {
                if (state.playerLocation === Location.ALTAR)
                {
                    relocatePlayer(Location.FOREST_WEST);
                }

                else
                {
                    output("If you pray enough, your prayers may be answered.");
                }
            } break;

            case "SAY":
            {
                let clops = objectList.get("cyclops");

                if (state.speakPhrase === "ulysses" || state.speakPhrase === "odysseus")
                {
                    if (state.playerLocation === Location.CYCLOPS_ROOM &&
                        clops.location === Location.CYCLOPS_ROOM)
                    {
                        output(ObjectStrings.CYCLOPS_FLEES);
                        clops.alive = false;
                        state.cyclopsGone = true;                        
                    }

                    else
                        output("Wasn't he a sailor?");
                }

                else
                    output("\"" + state.speakPhrase + "\" yourself.");

            } break;

            case "SHOUT": { output("Yaaaaarrrrggghhh!"); } break;

            case "SWIM":
            {
                output("You need to wait an hour after eating first.");
            } break;

            case "WAIT":
            {
                if (state.playerHitPoints < MAX_HIT_POINTS) ++state.playerHitPoints;
                output("Time passes...");
            } break;


            // Game actions

            case "DIAGNOSE":
            {
                output("You have " + state.playerHitPoints + "/" + MAX_HIT_POINTS + " hit points.");
            } break;

            case "QUIT":
            {
                output("To quit, simply leave the page. To restart, enter \"restart\" or click the Restart button.");
            } break;

            case "RESTART":
            {
                restart();            
                return;

            } // break;

            case "RESTORE":
            {
                output("Enter save file name: ")
                inputTextArea.removeEventListener("change", parsePlayerInput);
                inputTextArea.addEventListener("change", restoreInterface);
                return;

            } // break;

            case "SAVE":
            {
                output("Enter save file name: ")
                inputTextArea.removeEventListener("change", parsePlayerInput);
                inputTextArea.addEventListener("change", saveInterface);
                return

            } // break;

            case "SCORE":
            {
                updateScore();
                output("Your score is " + state.playerScore + ".");
                output("This gives you the rank of " + state.playerScoreRank + ".");

            } break;

            case "NULL_ACTION": {} break;
            default: {} break;
    }

    updateActors();
    updateItems();
    ++state.turns;

}


// Determines if the player's action can be performed while in the boat
function boatCheck()
{
    let result = true;

    switch(state.playerAction)
    {
        case "ATTACK":
        case "CLIMB":
        case "DEFLATE":
        case "TIE":
        case "KICK":
        case "DIG":
        {
            result = false;
        } break;

        case "TAKE":
        {
            if (state.directObject.name === "magic boat")
            {
                output("You can't take the boat while you're inside it!");
                result = false;
            }
        } break;

        default: {} break;
    }

    if ((state.playerActionType === "DIRECT" || state.playerActionType === "INDIRECT")
        && state.directObject.location === state.playerLocation)
    {
        result = true;
    }

    if (worldMap.get(state.playerLocation).bodyOfWater)
    {
        result = true;
    }

    return result;

}


function updateDarkness()
{
    let currentRoom = worldMap.get(state.playerLocation);

    if (state.darknessTurns > MAX_DARKNESS_TURNS)
    {
        output(GameStrings.GRUE_DEATH_2);
        playerDies();
        return;
    }

    switch (state.playerAction)
    {
        case "DROP":
        {
            state.directObject.drop();
            ++state.darknessTurns;
        } break;

        case "INVENTORY":
        {
            let count = 0;
            for (let item of objectList.values())
            {
                
                if (item.location === Location.PLAYER_INVENTORY)
                {
                    ++count;
                    if (count === 1)
                        output("You are carrying: \n");
                    output(item.capArticleName);
                }

                if (item.location === Location.PLAYER_INVENTORY && item.isContainer()
                    && (item.isOpen() || item.name === "glass bottle")) 
                {
                    if (item.inventory.size() > 0)
                    {
                        let check = false;

                        for (let it of item.inventory)
                        {
                            if (it.initialPresenceString !== "" && !it.movedFromStart)
                            {
                                output(it.initialPresenceString);
                                check = true;
                            }
                        }

                        if (!check)
                        {
                            output("The " + item.name + " contains:");
                            for (let it of item.inventory)
                                output(it.capArticleName);
                        }
                    }
                }
            }
            if (count === 0)
                output("You are empty-handed.");
        } break;

        case "JUMP":
        {
            output(GameStrings.getJumpSarcasm());
            ++state.darknessTurns;
        } break;

        case "LIGHT":
        {
            state.directObject.light();
            ++state.darknessTurns;
        } break;

        case "LISTEN":
        {
            output(GameStrings.DARKNESS_LISTEN);
            ++state.darknessTurns;
        } break;

        case "LOOK":
        {
            output(GameStrings.DARKNESS);
            ++state.darknessTurns;
        } break;

        case "SHOUT":
        {
            output("Yaaaaarrrrggghhh!");
            ++state.darknessTurns;
        } break;

        case "WAIT":
        {
            output("Time passes...");
            ++state.darknessTurns;
        } break;

        case "NORTH":
        case "SOUTH":
        case "EAST":
        case "WEST":
        case "NORTHEAST":
        case "NORTHWEST":
        case "SOUTHEAST":
        case "SOUTHWEST":
        case "UP":
        case "DOWN":
        case "IN":
        case "OUT":
        {
            if (currentRoom.exit(state.playerAction))
            {
                let nextRoom = worldMap.get(state.playerLocation);
                output(nextRoom.name);

                darknessCheck();

                if (state.playerInDarkness)
                {
                    output(GameStrings.ENTER_DARKNESS);
                    // return;
                }

                nextRoom.lookAround();

                if (nextRoom.firstVisit)
                    nextRoom.firstVisit = false;

            }


        } break;

        case "DIAGNOSE":
        {

        } break;

        case "QUIT":
        {
            output("To quit, simply leave the page. To restart, enter \"restart\" or click the Restart button.");
        } break;

        case "RESTART":
        {
            restart();            
            return;

        } // break;

        case "RESTORE":
        {
            output("Enter save file name: ")
            inputTextArea.removeEventListener("change", parsePlayerInput);
            inputTextArea.addEventListener("change", restoreInterface);
            return;

        } // break;

        case "SAVE":
        {
            output("Enter save file name: ")
            inputTextArea.removeEventListener("change", parsePlayerInput);
            inputTextArea.addEventListener("change", saveInterface);
            return

        } // break;

        case "SCORE":
        {
            updateScore();
            output("Your score is " + state.playerScore + ".");
            output("This gives you the rank of " + state.playerScoreRank + ".");
        } break;

        case "NULL_ACTION": {} break;

        default:
        {
            output("It's too dark to see!");
            ++state.darknessTurns;
        } break;

    }

    updateActors();
    updateItems();
    updateEvents();
    saveGame("undoSave");
    ++state.turns;

}


function updateDeath()
{
    let currentRoom = worldMap.get(state.playerLocation);

    switch (state.playerAction)
    {
        case "ATTACK":
        {
            output("All such attacks are vain in your condition.");
        } break;

        case "GREET":
        {
            output("The dead may not greet the living.");
        } break;

        case "INVENTORY":
        {
            output(GameStrings.DEAD_INVENTORY);
        } break;

        case "LIGHT":
        {
            output("You need no light to guide you.");
        } break;

        case "LOOK":
        {
            currentRoom.lookAround();

        } break;

        case "PRAY":
        {
            if (state.playerLocation === Location.ALTAR)
            {
                output(GameStrings.DEAD_PRAY_ALTAR);
                state.playerPreviousLocation = state.playerLocation;
                state.playerLocation = Location.FOREST_WEST;
                state.playerDead = false;
                state.playerHitPoints = 1;
            }

            else
                output(GameStrings.DEAD_PRAY_FAIL);
        } break;

        case "TAKE":
        {
            output(GameStrings.DEAD_TAKE_OBJECT);
        } break;

        case "TOUCH":
        {
            output(GameStrings.DEAD_TOUCH);
        } break;

        case "WAIT":
        {
            output(GameStrings.DEAD_WAIT);
        } break;

        case "DIAGNOSE":
        {
            output(GameStrings.DEAD_DIAGNOSE);
        } break;

        case "QUIT":
        {
            output("You cannot quit being dead that easily.");
        } break;

        case "RESTART":
        {
            restart();            
            return;

        } // break;

        case "RESTORE":
        {
            output("Enter save file name: ")
            inputTextArea.removeEventListener("change", parsePlayerInput);
            inputTextArea.addEventListener("change", restoreInterface);
            return;

        } // break;

        case "SAVE":
        {
            output("Enter save file name: ")
            inputTextArea.removeEventListener("change", parsePlayerInput);
            inputTextArea.addEventListener("change", saveInterface);
            return

        } // break;

        case "SCORE":
        {
            output(GameStrings.DEAD_SCORE);
        } break;

        case "NORTH":
        case "SOUTH":
        case "EAST":
        case "WEST":
        case "NORTHEAST":
        case "NORTHWEST":
        case "SOUTHEAST":
        case "SOUTHWEST":
        case "UP":
        case "DOWN":
        case "IN":
        case "OUT":
        {
            if (state.playerLocation === Location.TIMBER_ROOM && state.playerAction === Action.WEST)
            {
                output(GameStrings.DEAD_CANNOT_ENTER);
                return;
            }

            if (state.playerLocation === Location.STUDIO && state.playerAction === Action.UP)
            {
                output(GameStrings.DEAD_CANNOT_ENTER);
                return;
            }

            if (state.playerLocation === Location.SLIDE_ROOM && state.playerAction === Action.DOWN)
            {
                output(GameStrings.DEAD_CANNOT_ENTER);
                return;
            }
            
            if (currentRoom.exit(state.playerAction))
            {
                let nextRoom = worldMap.get(state.playerLocation);
                outputLocation(nextRoom.name);

                if (state.playerLocation === Location.DOME_ROOM)
                {
                    output(GameStrings.DEAD_DOME_PASSAGE);
                    state.playerLocation = Location.TORCH_ROOM;
                    output("\n");
                    torchRoom.lookAround();
                    return;
                }

                nextRoom.lookAround();

                if (nextRoom.firstVisit)
                    nextRoom.firstVisit = false;

            }

        } break; 


        case "NULL_ACTION": {} break;
        default:
        {
            output(GameStrings.DEAD_ACTION_FAIL);
        }
    }

    saveGame("undoSave");
    ++state.turns;

}


function updateEvents()
{
    if (state.carpetMoved)
    {
        let rug = objectList.get("oriental rug");
        rug.boardString = ObjectStrings.CARPET_SIT_2;
        rug.lookUnderString = "There is nothing but dust there.";

        let trap = objectList.get("trap door");
        trap.location = Location.LIVING_ROOM;
        if (!trap.altLocations.has(Location.CELLAR))
            trap.altLocations.add(Location.CELLAR);

        let rm = worldMap.get(Location.LIVING_ROOM);
        let p = rm.exits.get(Action.DOWN);
        p.closedFail = "The trap door is closed.";
    }

    else
    {
        let rug = objectList.get("oriental rug");
        rug.boardString = ObjectStrings.CARPET_SIT_1;
        rug.lookUnderString = ObjectStrings.CARPET_LOOK_UNDER;

        let trap = objectList.get("trap door");
        trap.location = Location.NULL_LOCATION;
        trap.altLocations.clear();

        let rm = worldMap.get(Location.LIVING_ROOM);
        let p = rm.exits.get(Action.DOWN);
        p.closedFail = "You can't go that way.";
    }

    if (state.cyclopsGone)
    {
        cyclops.location = Location.NULL_LOCATION;
        cyclops_strange.setOpen();
        cyclops_treasure.setOpen();
        strange_living_room.setOpen();
        cellar_livingroom.setOpen();
        cellar_livingroom.message = "";
    }

    if (state.gratingOpened)
    {
        let grate = objectList.get("grating");
        if (!grate.altLocations.has(Location.CLEARING_NORTH))
            grate.altLocations.add(Location.CLEARING_NORTH);


        let rm1 = worldMap.get(Location.GRATING_ROOM);
        rm1.setLight();
        let p = rm1.exits.get(Action.UP);
        p.setOpen();

        let rm2 = worldMap.get(Location.CLEARING_NORTH);
        rm2.addExit(Action.DOWN, psg);

        if (!state.leafPileMoved)
        {
            state.leafPileMoved = true;

            let leaves = objectList.get("pile of leaves");
            leaves.location = Location.GRATING_ROOM;
        }
    }

    else
    {
        let r = worldMap.get(Location.GRATING_ROOM);
        let p = r.exits.get(Action.UP);
        p.setClosed();
        this.examineString = "The grating is closed.";
    }

    if (state.ropeRailTied)
    {
        let rope = objectList.get("rope");
        rope.location = Location.ON_RAILING;

        let rm1 = worldMap.get(Location.DOME_ROOM);
        let rm2 = worldMap.get(Location.TORCH_ROOM);
        rm1.description = MapStrings.DESC_DOME_ROOM_ROPE;
        rm2.description = MapStrings.DESC_TORCH_ROOM_ROPE;
        rm2.addFailMessage(Action.UP, "You cannot reach the rope.");
        let psg = rm1.exits.get(Action.DOWN);
        psg.setOpen();
    }

    else
    {
        let rm1 = worldMap.get(Location.DOME_ROOM);
        let rm2 = worldMap.get(Location.TORCH_ROOM);
        rm1.description = MapStrings.DESC_DOME_ROOM;
        rm2.description = MapStrings.DESC_TORCH_ROOM;
        rm2.removeFailMessage(Action.UP);
        let psg = rm1.exits.get(Action.DOWN);
        psg.setClosed();
    }

    if (state.trapDoorOpen)
    {
        let r = worldMap.get(Location.LIVING_ROOM);
        let p = r.exits.get(Action.DOWN);
        p.setOpen();
    }

    else
    {
        let r = worldMap.get(Location.LIVING_ROOM);
        let p = r.exits.get(Action.DOWN);
        p.setClosed();
    }

}


function updateScore()
{
    let score = 0;

    for (let g of objectList.values())
    {
        if (g.isItem())
        {
            if (g.location === Location.INSIDE_TROPHY_CASE)
                score += g.trophyCaseValue;

            if (g.acquired)
                score += g.acquireValue;
        }
    }

    for (let r of worldMap.values())
    {
        if (r.firstVisit === false)
            score += r.discoverValue;
    }

    if (state.shaftBasketUsed)
        score += SHAFT_BASKET_POINTS;

    score -= state.playerDeaths * DEATH_POINTS;

    if (score >= 350) state.playerScoreRank = "Master Adventurer";
    else if (score >= 330) state.playerScoreRank = "Wizard";
    else if (score >= 300) state.playerScoreRank = "Master";
    else if (score >= 200) state.playerScoreRank = "Adventurer";
    else if (score >= 100) state.playerScoreRank = "Junior Adventurer";
    else if (score >= 50)  state.playerScoreRank = "Novice Adventurer";
    else if (score >= 25) state.playerScoreRank = "Amateur Adventurer";
    else state.playerScoreRank = "Beginner";

    if (score >= WINNING_SCORE)
    {
        state.gameWon = true;
        if (!state.winMessageDisplayed)
        {
            output(GameStrings.ALL_TREASURES_IN_CASE);
            state.winMessageDisplayed = true;

            let map = objectList.get("ancient map");
            map.location = Location.INSIDE_TROPHY_CASE;

            let rm = worldMap.get(Location.WEST_OF_HOUSE);
            let p = rm.exits.get(Action.SOUTHWEST);
            p.setOpen();
        }
    }

    state.playerScore = score;

    outputScore(state.playerScore);
    outputTurns(state.turns);

}


function breakEgg()
{
    egg.location = Location.NULL_LOCATION;
    brokenCanary.location = Location.INSIDE_BROKEN_EGG;
    brokenEgg.location = state.playerLocation;
    brokenEgg.itemOpen = true;

    output(ObjectStrings.INIT_BROKEN_CANARY);
    
}


function darknessCheck()
{
    state.lightActivated = false;

    let lightSource1 = objectList.get("brass lantern");
    let lightSource2 = objectList.get("torch");
    let lightSource3 = objectList.get("pair of candles");
    let lightSource4 = objectList.get("matchbook");

    let lightSources = [lightSource1, lightSource2, lightSource3, lightSource4];

    for (let i = 0; i < lightSources.length; ++i)
    {
        let source = lightSources[i];

        if ((source.location === Location.PLAYER_INVENTORY || source.location === state.playerLocation) && source.activated)
            state.lightActivated = true;

        // If the light source is in an open container in the same room
        for (let g of objectList.values())
        {
            if (g.isContainer() && g.isOpen() && source.location === g.inventoryID && source.activated)
                state.lightActivated = true;
        }
    }

    let currentRoom = worldMap.get(state.playerLocation);

    state.playerInDarkness = (currentRoom.isDark() && !state.lightActivated);

    if (!state.playerInDarkness)
        state.darknessTurns = 0;

}


function executePlayerAction()
{
    switch (state.playerActionType)
    {
        case "REFLEXIVE":
        case "EXIT":
        {
            console.log("Executing player action: " + state.playerAction);
        } break;

        case "DIRECT":
        {
            console.log("Executing player action: " + state.playerAction + " on the " + state.directObject.name);

        } break;

        case "INDIRECT":
        case "INDIRECT_INVERSE":
        case "SWITCH":
        {
            console.log("Executing player action: " + state.playerAction + " on the " + state.directObject.name
             + " with the " + state.indirectObject.name);

        } break;

        case "MULTIPLE":
        {

        } break;

        default: {} break;
    }
}


function playerDies()
{
    console.log("You are so dead!");

    ++state.playerDeaths;

    for (let g of objectList.values())
    {
        if (g.location === Location.PLAYER_INVENTORY)
            g.location = OVERWORLD[getRandom(OVERWORLD.length)];

        if (g.name === "brass lantern")
            g.location = Location.LIVING_ROOM;
    }

    if (state.playerDeaths % MAX_PLAYER_DEATHS === 0 && !altarRoom.firstVisit)
        playerDiesForReal();

    else
    {
        output(GameStrings.PLAYER_DIES);
        output("\n");

        state.playerPreviousLocation = state.playerLocation;
        state.playerLocation = FOREST[getRandom(FOREST.length)];
        state.playerHitPoints = MAX_HIT_POINTS;
        darknessCheck();
        worldMap.get(state.playerLocation).lookAround();
        outputLocation(worldMap.get(state.playerLocation).name);
    }

}


function playerDiesForReal()
{
    console.log("You really died for real this time!");

    state.playerDead = true;

    outputLocation(entranceToHades.name);
    output(GameStrings.PLAYER_DIES_FOR_REAL);
    output(GameStrings.DEAD_LOOK);
    output(entranceToHades.description);

}


function refreshInventories()
{

    for (let cont of objectList.values())
    {
    
        if (cont.inventoryID !== Location.NULL_INVENTORY)
        {
            cont.inventory.clear();

            for (let item of objectList.values())
            {
                if (item.location === cont.inventoryID)
                    cont.inventory.add(item);
            }
        }
    }

    state.playerCarryWeight = 0;

    for (let item of objectList.values())
    {
        if (item.isItem() && item.location === Location.PLAYER_INVENTORY)
        {
            state.playerCarryWeight += item.weight;
        }
    }

    let coffin = objectList.get("gold coffin");
    let altar = worldMap.get(Location.ALTAR);
    let psg = altar.exits.get(Action.DOWN);
    if (coffin.location === Location.PLAYER_INVENTORY)
        psg.weightFail = "You haven't a prayer of getting the coffin down there.";
    else
        psg.weightFail = "You can't get down there with what you're carrying.";

}


function relocatePlayer(loc)
{
    clearOutput();
    state.playerPreviousLocation = state.playerLocation;
    state.playerLocation = loc;
    let room = worldMap.get(loc);
    darknessCheck();
    room.lookAround();
    outputLocation(room.name);
    room.firstVisit = false;

}

function restart()
{
    console.log("Restarting");
    state = savedGames.get("startSave").savedState;
    objectList = savedGames.get("startSave").savedObjects;

    state.resetInput();
    updateEvents();
    refreshInventories();
    fillCurrentObjectList();

    
    outputLocation(westOfHouse.name);
    outputTurns(state.turns);
    westOfHouse.lookAround();


}

function restore(filename)
{
    if (!savedGames.has(filename))
    {
        output("Save file not found.");
        return;
    }

    console.log("Loading...");

    let restoreState = savedGames.get(filename).savedState;
    let restoreObjects = savedGames.get(filename).savedObjects;

    state = Object.assign(state, restoreState);

    objectList.clear();
    
    for (let key of restoreObjects.keys())
    {
        let sourceObject = restoreObjects.get(key);
        let targetObject = null;

        switch (sourceObject.objectType)
        {
            case "ACTOR":
            {
                targetObject = new Actor(sourceObject.name, sourceObject.location);
                targetObject = Object.assign(targetObject, sourceObject);
            } break;

            case "CONTAINER":
            {
                targetObject = new Container(sourceObject.name, sourceObject.location);
                targetObject = Object.assign(targetObject, sourceObject);
            } break;

            case "FEATURE":
            {
                targetObject = new Feature(sourceObject.name, sourceObject.location);
                targetObject = Object.assign(targetObject, sourceObject);
            } break;

            case "ITEM":
            {
                targetObject = new Item(sourceObject.name, sourceObject.location);
                targetObject = Object.assign(targetObject, sourceObject);
            } break;

            case "SURFACE":
            {
                targetObject = new Surface(sourceObject.name, sourceObject.location);
                targetObject = Object.assign(targetObject, sourceObject);
            } break;
        }

        objectList.set(key, targetObject);
    }


    output("Game restored.\n");

    state.resetInput();
    updateEvents();
    refreshInventories();
    fillCurrentObjectList();

    let curRoom = worldMap.get(state.playerLocation);
    outputLocation(curRoom.name);
    outputTurns(state.turns);
    curRoom.lookAround();


}


function restoreInterface()
{
    console.log("Restore interface function");
    gameArea.innerText = "";

    let filename = document.getElementById("inputTextArea").value;

    restore(filename);


    inputTextArea.value = "";

    inputTextArea.removeEventListener("change", restoreInterface);
    inputTextArea.addEventListener("change", parsePlayerInput);
}


function revealGrating()
{
    state.leafPileMoved = true;
    grating.altLocations.add(Location.CLEARING_NORTH);
    output("In disturbing the pile of leaves, a grating is revealed.");

    clearingNorth.addExit(Action.DOWN, grating_clearing);

    gratingRoom.darkness = false;

}

function saveGame(filename)
{
    console.log("Saving...");

    
    if (savedGames.has(filename))
    {
        savedGames.delete(filename);
    }

    let savedState = new GameState();
    let savedObjects = new Map();

    savedState = Object.assign(savedState, state);
    for (let key of objectList.keys())
    {
        let sourceObject = objectList.get(key);
        let savedObject = null;

        switch (sourceObject.objectType)
        {
            case "ACTOR":
            {
                savedObject = new Actor(sourceObject.name, sourceObject.location);
                savedObject = Object.assign(savedObject, sourceObject);
            } break;

            case "CONTAINER":
            {
                savedObject = new Container(sourceObject.name, sourceObject.location);
                savedObject = Object.assign(savedObject, sourceObject);
            } break;

            case "FEATURE":
            {
                savedObject = new Feature(sourceObject.name, sourceObject.location);
                savedObject = Object.assign(savedObject, sourceObject);
            } break;

            case "ITEM":
            {
                savedObject = new Item(sourceObject.name, sourceObject.location);
                savedObject = Object.assign(savedObject, sourceObject);
            } break;

            case "SURFACE":
            {
                savedObject = new Surface(sourceObject.name, sourceObject.location);
                savedObject = Object.assign(savedObject, sourceObject);
            } break;
        }

        savedObjects.set(key, savedObject);
    }

    savedGames.set( filename, {savedState, savedObjects} );
    return true;
}


function saveInterface()
{
    console.log("Save interface function");
    gameArea.innerText = "";

    let filename = document.getElementById("inputTextArea").value;

    if (filename === "undoSave" ||
        filename === "autoSave" ||
        filename === "autoSave1" ||
        filename === "autoSave2" ||
        filename === "autoSave3" ||
        filename === "startSave")
    {
        output("Filename reserved by system, choose something else.");
    }

    else
    {
        saveGame(filename);
        output("Game saved as \"" + filename + "\".");
    }
    

    inputTextArea.value = "";

    inputTextArea.removeEventListener("change", saveInterface);
    inputTextArea.addEventListener("change", parsePlayerInput);
}

function updateActors()
{
    cyclops.cyclopsTurn();
    flood.floodTurn();
    damFlow.damFlowTurn();
    gustOfWind.gustOfWindTurn();
    riverCurrent.riverCurrentTurn();
    songbird.songbirdTurn();
    spirits.spiritsTurn();
    swordGlow.swordGlowTurn();
    thief.thiefTurn();
    troll.trollTurn();
    vampireBat.vampireBatTurn();

    if (state.playerHitPoints <= 0)
        playerDies();

}

function updateItems()
{
    for (let g of objectList.values())
    {
        if (g.isItem() && g.activated && g.lifespan > 0)
        {
            g.tick();
            if (g.lifespan <= 0)
                g.activated = false;
        }
    }

    if (state.playerInBoat)
    {
        inflatedBoat.location = state.playerLocation;
        inflatedBoat.presenceString = "";
        let str = "Refer to the boat label for instructions.";
        damBase.addFailMessage(Action.EAST, str);
        whiteCliffsBeachNorth.addFailMessage(Action.EAST, str);
        whiteCliffsBeachSouth.addFailMessage(Action.EAST, str);
        sandyBeach.addFailMessage(Action.WEST, str);
        shore.addFailMessage(Action.WEST, str);
        reservoirSouth.removeFailMessage(Action.NORTH);
        reservoirNorth.removeFailMessage(Action.SOUTH);
        reservoirSouth.addFailMessage(Action.NORTH, str);
        reservoirNorth.addFailMessage(Action.SOUTH, str);
        streamView.addFailMessage(Action.NORTH, str);
    }

    else
    {
        inflatedBoat.presenceString = "There is a magic boat here.";
        damBase.removeFailMessage(Action.EAST);
        whiteCliffsBeachNorth.removeFailMessage(Action.EAST);
        whiteCliffsBeachSouth.removeFailMessage(Action.EAST);
        sandyBeach.removeFailMessage(Action.WEST);
        shore.removeFailMessage(Action.WEST);
        reservoirSouth.removeFailMessage(Action.NORTH);
        reservoirNorth.removeFailMessage(Action.SOUTH);
        reservoirSouth.addFailMessage(Action.NORTH, "You would drown.");
        reservoirNorth.addFailMessage(Action.SOUTH, "You would drown.");
        streamView.removeFailMessage(Action.NORTH);
    }
}