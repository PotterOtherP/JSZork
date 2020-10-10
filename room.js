class Room {
    
    constructor(name, desc, loc)
    {
        this.name = name;
        this.description = desc;
        this.roomID = loc;

        this.bodyOfWater = false;
        this.dark = false;
        this.discoverValue = 0;
        this.firstVisit = true;
        this.height = false;
        this.jumpString = "";

        this.exits = new Map();
        this.failMessages = new Map();
        this.failMessages.set(Action.LAND, "Can you land if you are already on the land?");
        this.failMessages.set(Action.LAUNCH, GameStrings.LAUNCH_FAIL);


    }

    addExit(act, psg) { this.exits.set(act, psg); }
    addFailMessage(act, str) { this.failMessages.set(act, str); }
    removeFailMessage(act) { this.failMessages.delete(act); }
    setDark() { this.dark = true; }
    setLight() { this.dark = false; }
    isDark() { return this.dark; }

    exit()
    {
        // The room has an exit in the player's attempted direction
        if (this.exits.has(state.playerAction))
        {
            let psg = this.exits.get(state.playerAction);
            let dest = psg.locationA;

            if (this.roomID == psg.locationA)
            {
                dest = psg.locationB;
            }

            // Passage is open
            if (psg.isOpen())
            {
                // Baggage limit check
                if (state.playerCarryWeight > psg.weightLimit)
                {
                    output(psg.weightFail);
                    return false;
                }

                // Boat checks
                if (state.playerInBoat && !this.bodyOfWater)
                {
                    if (worldMap.get(dest).bodyOfWater && state.playerAction != Action.LAUNCH)
                    {
                        output("Refer to the boat label for instructions.");
                        return false;
                    }

                    else if (!worldMap.get(dest).bodyOfWater)
                    {
                        output("You can't go there in a magic boat.");
                        return false;
                    }
                }

                // If the room is in darkness, and the destination is not
                // the previous room, player dies by grue.
                if (state.playerInDarkness && !state.playerDead && (dest != state.playerPreviousLocation))
                {
                    output(GameStrings.GRUE_DEATH_1);
                    playerDies();
                    return false;
                }

                // success
                if (psg.message !== "")
                    output(psg.message + "\n");
                state.playerPreviousLocation = state.playerLocation;
                state.playerLocation = dest;
                    return true;
            }

            // Passage exists, but is closed
            else
            {
                output(psg.closedFail);
                return false;
            }
        }

        // There is no exit in the direction the player is trying to go.
        else
        {
            if (state.playerInDarkness && !state.playerDead)
            {
                output(GameStrings.GRUE_DEATH_1);
                playerDies();

            }

            else if (this.failMessages.has(state.playerAction))
            {
                output(this.failMessages.get(state.playerAction));
            }

            else
            {
                output("You can't go that way.");
            }
        }


        return false;
    }

    getDescription()
    {
        if (state.playerDead)
        {
            if (this.dark)
            {
                outputDescription(GameStrings.DEAD_LOOK);
                outputDescription("\n");
            }

            outputDescription(this.description);
            return;
        }

        if (state.playerInDarkness)
        {
            outputDescription(GameStrings.DARKNESS);
            return;
        }

        let result = this.description;

        switch(this.roomID)
        {
            case "ARAGAIN_FALLS":
            {
                if (state.rainbowSolid)
                    result += "\nA solid rainbow spans the falls.";
            } break;

            case "BEHIND_HOUSE":
            {
                if (state.houseWindowOpened)
                    result = MapStrings.DESC_BEHIND_HOUSE_WINDOW_OPEN;
            } break;

            case "CLEARING_NORTH":
            {
                if (state.leafPileMoved && !state.gratingOpened)
                    result += "\nThere is a grating securely fastened into the ground.";

                else if (state.leafPileMoved && state.gratingOpened)
                    result += "\nThere is an open grating, descending into darkness.";
            } break;

            case "CYCLOPS_ROOM":
            {
                if (state.cyclopsGone)
                    result += "[The east wall, previously solid, now has a cyclops-sized opening in it.]";
            } break;

            case "DAM":
            {
                if (state.damGatesOpen && state.damWaterHigh)
                    result += MapStrings.DAM_GATES_OPEN_HIGH;

                if (state.damGatesOpen && !state.damWaterHigh)
                    result += MapStrings.DAM_GATES_OPEN_LOW;

                if (!state.damGatesOpen && state.damWaterHigh)
                    result += MapStrings.DAM_GATES_CLOSED_HIGH;

                if (!state.damGatesOpen && !state.damWaterHigh)
                    result += MapStrings.DAM_GATES_CLOSED_LOW;

                if (state.yellowButtonPushed)
                    result += MapStrings.DAM_BUBBLE_ON;

                else
                    result += MapStrings.DAM_BUBBLE_OFF;
            } break;

            case "DEEP_CANYON":
            {
                if (state.waterFalling)
                    result = MapStrings.DESC_DEEP_CANYON_RUSH;

                else if (state.loudRoomSolved || state.damWaterLow)
                    result = MapStrings.DESC_DEEP_CANYON_QUIET;

                else
                    result = MapStrings.DESC_DEEP_CANYON_WATER;
            } break;

            case "KITCHEN":
            {
                if (state.houseWindowOpened)
                    result = MapStrings.DESC_KITCHEN_WINDOW_OPEN;
            } break;

            case "LIVING_ROOM":
            {
                if (state.cyclopsGone)
                    result += ". To the west is a cyclops-shaped opening in an old wooden door, "
                        + "above which is some strange gothic lettering, ";
                else
                    result += ", a wooden door with strange gothic lettering to the west, "
                        + "which appears to be nailed shut, ";

                result += "a trophy case, and ";

                if (!state.carpetMoved)
                    result += "a large oriental rug in the center of the room.";

                else if (state.carpetMoved && state.trapDoorOpen)
                    result += "a rug lying beside an open trap door.";

                else if (state.carpetMoved && !state.trapDoorOpen)
                    result += "a closed trap door at your feet.";
            } break;

            case "LOUD_ROOM":
            {
                if (state.waterFalling)
                    result = MapStrings.DESC_LOUD_ROOM_WATER;

                else if (state.loudRoomSolved || state.damWaterLow)
                    result = MapStrings.DESC_LOUD_ROOM_QUIET;

                else
                    result = MapStrings.DESC_LOUD_ROOM;
            } break;

            case "MACHINE_ROOM":
            {
                let machine = objectList.get("machine");
                if (machine.isOpen())
                    result += " On the front of the machine is a large lid, which is open.";
                else
                    result += " On the front of the machine is a large lid, which is closed.";
            } break;

            case "MIRROR_ROOM_NORTH":
            case "MIRROR_ROOM_SOUTH":
            {
                if (state.mirrorBroken)
                    result += "\nUnfortunately, the mirror has been destroyed by your recklessness.";
            } break;

            case "SHAFT_ROOM":
            case "DRAFTY_ROOM":
            {
                if (state.shaftBasketLowered)
                    result += "\nFrom the chain is suspended a basket.";
                else
                    result += "\nAt the end of the chain is a basket.";
            } break;

            default: {} break;
        }


        outputDescription(result);
    }

    getRoomObjects()
    {
        refreshInventories();

        if (state.playerInDarkness && !state.playerDead)
        {
            return;
        }

        for (let g of objectList.values())
        {
            if (g.location !== this.roomID)
            {
                continue;
            }

            if ( (g.isActor() || g.isFeature()) && g.presenceString !== "")
            {
                outputDescription(g.presenceString);
            }

            if (g.isItem())
            {
                outputDescription(g.getItemDescription());
            }

            g.outputInventory();

            
        }

    }


    lookAround()
    {
        descriptionArea.innerText = "";
        outputLocation(this.name);
        this.getDescription();
        this.getRoomObjects();
    }

}