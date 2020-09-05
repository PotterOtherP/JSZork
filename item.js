class Item extends GameObject {

    constructor(name, loc)
    {
        super(name, loc);
        this.objectType = "ITEM";

        this.acquired = false;
        this.acquireValue = 0;
        this.activated = false;
        this.capacity = 0;
        this.lifespan = 0;
        this.locked = false;
        this.itemOpen = false;
        this.trophyCaseValue = 0;
        this.weight = 0;
    }

    board()
    {
        switch (this.name)
        {
            case "magic boat":
            {
                let weapon1 = objectList.get("elvish sword");
                let weapon2 = objectList.get("nasty knife");
                let weapon3 = objectList.get("rusty knife");
                let weapon4 = objectList.get("stiletto");
                let weapon5 = objectList.get("sceptre");
                let weapon6 = objectList.get("bloody axe");

                let sharpies = [weapon1, weapon2, weapon3, weapon4, weapon5, weapon6];

                for (let i = 0; i < sharpies.length; ++i)
                {
                    if (sharpies[i].location === Location.PLAYER_INVENTORY)
                    {
                        output(ObjectStrings.BOAT_PUNCTURE);
                        this.location = Location.NULL_LOCATION;
                        let badBoat = objectList.get("punctured boat");
                        let label = objectList.get("tan label");
                        label.location = Location.NULL_LOCATION;
                        badBoat.location = state.playerLocation;
                        return;
                    }
                }


                if (!state.playerInBoat && this.location === state.playerLocation)
                {
                    output("You are now inside the boat.");
                    state.playerInBoat = true;
                }

                else if (!state.playerInBoat && this.location === Location.PLAYER_INVENTORY)
                    output("You should put the boat down first.");
                else if (state.playerInBoat)
                    output("You are already in the boat.");
            } break;

            default:
            {
                super.board();
            } break;
        }
    }

    close()
    {
        if (this.name ==="magic boat")
        {
            output("You cannot close the boat.");
            return;
        }

        if (!this.isContainer() && this.name !== "glass bottle")
        {
            output(this.closeString);
            return;
        } 

        if (this.itemOpen)
        {
            this.itemOpen = false; 
            output("Closed.");
        }
        else
        {
            output("It is already closed.");
        }
    }

    deflate()
    {
        switch (this.name)
        {
            case "magic boat":
            {
                if (state.playerInBoat)
                {
                    output("You can't deflate the boat while you're inside it!");
                }

                else
                {
                    let downBoat = objectList.get("pile of plastic");
                    downBoat.location = this.location;
                    this.location = Location.NULL_LOCATION;
                    output("The boat deflates.");

                }

            } break;

            case "pile of plastic":
            {
                output(GameStrings.getHardSarcasm());
            } break;

            case "punctured boat":
            {
                output("Too late. Some moron punctured it.");

            } break;

            default:
            {
                super.deflate();
            }
        }
    }

    drink()
    {
        if (this.name === "quantity of water")
        {
            let bottle = objectList.get("glass bottle");

            if (!bottle.itemOpen)
            {
                output("The bottle is closed.");
                return;
            }

            output("Thank you very much. I was rather thirsty (from all this talking, probably.)");
            this.location = Location.NULL_LOCATION;
            state.bottleFilled = false;
            return;
        }

        else
            super.drink();
    }

    drop()
    {
        if (state.playerLocation === Location.UP_TREE)
        {
            state.playerCarryWeight -= this.weight;

            if (this.name === "jewel-encrusted egg")
            {
                output("The egg falls to the ground and springs open, seriously damaged.");
                breakEgg();
                let badEgg = objectList.get("broken jewel-encrusted egg");
                badEgg.location = Location.FOREST_PATH;
            }

            else if (this.name === "bird's nest")
            {
                let goodEgg = objectList.get("jewel-encrusted egg");
                if (goodEgg.location == Location.INSIDE_BIRDS_NEST)
                {
                    output("The nest falls to the ground, and the egg spills out of it, seriously damaged.");
                    breakEgg();
                    let badEgg = objectList.get("broken jewel-encrusted egg");
                    badEgg.location = Location.FOREST_PATH;
                }

                else
                    output("The bird's nest falls to the ground.");

                this.location = Location.FOREST_PATH;
            }

            else
            {
                output("The " + this.name + " falls to the ground.");
                this.location = Location.FOREST_PATH;
            }
        }


        else
        {
            state.playerCarryWeight -= this.weight;
            this.location = state.playerLocation;
            output("Dropped.");
        }
    }

    eat()
    {
        switch (this.name)
        {
            case "clove of garlic":
            {
                this.location = Location.NULL_LOCATION;
                output(ObjectStrings.GARLIC_EAT);

                if (state.playerLocation === Location.BAT_ROOM)
                {
                    output("The bat, no longer deterred, swoops down at you!"
                    + "\n\nFweep!\nFweep!\nFweep!\n\n\n"
                    + "The bat grabs you by the scruff of your neck and lifts you away....\n\n");

                    let coalMineRooms = [Location.COAL_MINE_1, Location.COAL_MINE_2, Location.COAL_MINE_3, Location.COAL_MINE_4];
                    let dieRoll = Math.floor(Math.random() * coalMineRooms.length);
                    relocatePlayer(coalMineRooms[dieRoll]);
                }
                
            } break;

            case "lunch":
            {
                this.location = Location.NULL_LOCATION;
                output(ObjectStrings.LUNCH_EAT);
            } break;

            default:
            {
                super.eat();
            } break;
        }
    }

    examine()
    {
        if (!this.isContainer())
        {
            output(this.examineString);
            return;
        }

        if (this.itemOpen)
        {
            if (this.inventory.size == 0)
                output("The " + this.name + " is empty.");
            else
            {
                output("The " + this.name + " contains:");

                for (let it of this.inventory)
                {
                    output("  " + it.capArticleName);
                }
            }
        }

        else
        {
            output("The " + this.name + " is closed.");
        }

    
    }

    extinguish()
    {
        switch (this.name)
        {
            case "brass lantern":
            {
                if (this.activated)
                {
                    this.activated = false;
                    output("The brass lantern is now off.");
                    this.examineString = "The lamp is off.";

                    state.darknessCheck();
                    if (state.darkness)
                        output("It is now pitch black.");
                    
                }

                else
                {
                    output("It is already off.");
                }
            } break;

            default:
            {
                output(this.extinguishString);
            } break;
        }
    }

    fill()
    {
        switch (this.name)
        {
            case "glass bottle":
            {
                if (state.bottleFilled)
                {
                    output("It is already full of water.");
                }

                else if (state.indirectObject.name === "river water" ||
                         state.indirectObject.name === "reservoir water" ||
                         state.indirectObject.name === "stream water")
                {
                    if (this.itemOpen)
                    {
                        state.bottleFilled = true;
                        output("The bottle is now filled with water.");
                    }

                    else
                        output("The bottle is closed.");
                }

                else
                {
                    output("You can't put that in the glass bottle!");
                }
            } break;

            default:
            {
                super.fill();
            } break;
        }
    }

    inflate()
    {
        switch (this.name)
        {
            case "pile of plastic":
            {
                if (state.indirectObject.name === "hand-held air pump")
                {
                    output("The boat inflates and appears seaworthy. [A tan label is lying inside the boat.]");
                    this.location = Location.NULL_LOCATION;
                    let goodBoat = objectList.get("magic boat");
                    goodBoat.location = state.playerLocation;
                    let label = objectList.get("tan label");
                    label.location = Location.INSIDE_BOAT;
                }

                else
                    output("With " + state.indirectObject.articleName + "? Surely you jest!");
            } break;

            case "magic boat":
            {
                output("Inflating it further would probably burst it.");
            } break;

            case "punctured boat":
            {
                output("Too late. Some moron punctured it.");
            } break;

            default:
            {
                super.inflate();
            } break;
        }
    }

    launch()
    {
        switch (this.name)
        {
            case "magic boat":
            {
                if (state.playerInBoat)
                {
                    let room = worldMap.get(state.playerLocation);

                    if (room.exit(Action.LAUNCH))
                    {
                        let newRoom = worldMap.get(state.playerLocation);
                        newRoom.lookAround(); 
                    }

                }

                else
                    output("You have to be inside the boat before you can launch it.");
            } break;

            default:
            {
                super.launch();
            } break;
        }
    }

    light()
    {
        switch (this.name)
        {
            case "brass lantern":
            {
                if (!this.activated && this.lifespan > 0)
                {
                    this.activated = true;
                    state.lightActivated = true;
                    output("The brass lantern is now on.");
                    let rm = worldMap.get(state.playerLocation);
                    if (rm.isDark())
                    {
                        rm.lookAround();
                    }
                    
                    this.examineString = "The lamp is on.";
                }

                else if (!this.activated && this.lifespan <= 0)
                {
                    output("A burned-out lamp won't light.");
                }

                else
                {
                    output("It is already on.");
                }

            } break;


            case "matchbook":
            {
                if (!this.activated && state.matchCount > 0)
                {
                    if (state.playerLocation === Location.DRAFTY_ROOM)
                    {
                        output("This room is drafty, and the match goes out instantly.");
                        --state.matchCount;
                    }

                    else if (state.playerLocation === Location.GAS_ROOM)
                    {
                        output("How sad for an aspiring adventurer to light a match in a room "
                            + "which reeks of gas. Fortunately, there is justice in the world."
                            + "\n**BOOOOOOOOOOOM**\n");
                        playerDies();
                    }

                    else
                    {
                        output("One of the matches begins to burn.");
                        this.activated = true;
                        --state.matchCount;
                        this.lifespan = GameState.MATCH_LIFESPAN;
                    }
                }

                else if (state.matchCount <= 0)
                {
                    output("There are no matches left in the matchbook.");
                }

                else if (activated)
                {
                    output("You already have a lit match.");
                }

            } break;

            case "pair of candles":
            {
                if (state.indirectObject.name === "dummy_feature")
                {
                    output("You should say what to light them with.");
                    return;
                }

                if (state.indirectObject.name === "matchbook")
                {
                    let match = state.indirectObject;
                    if (match.activated)
                    {
                        if (!this.activated)
                        {
                            output("The candles are lit.");
                            this.activated = true;
                        }
                        else
                            output("The candles are already lit.");
                    }

                    else
                        output("With an unlit match??!?");
                }
            } break;

            default:
            {
                output(this.lightString);
            } break;
        }
    }

    move()
    {
        switch (this.name)
        {
            case "pile of leaves":
            {
                output("Done.");
                if (!state.leafPileMoved)
                {
                    revealGrating();
                }
                else
                {
                    output("Moving the pile of leaves reveals nothing.");
                }
            } break;

            default:
            {
                super.move();
            } break;
        }
    }

    open()
    {
        if (this.name ==="glass bottle")
        {
            if (this.itemOpen) output("The bottle is already open.");
            else
            {
                this.itemOpen = true;
                output("Opened.");
            }
        }

        else if (this.name == "jewel-encrusted egg" && !state.thiefOpenedEgg)
        {
            output("You have neither the tools nor the expertise.");
        }

        else if (!this.isContainer())
        {
            output(this.openString);
            return;
        }

        else if (this.itemOpen)
        {
            output("It is already open.");
        }

        else
        {
            this.itemOpen = true;
            if (this.inventory.size === 0)
                output("Opened.");
            else
            {
                let str = "Opening the " + this.name + " reveals ";

                let i = 0;

                for (let it of this.inventory)
                {
                    if (this.inventory.size > 1 && i === this.inventory.size - 1) str  += " and ";
                    str += it.articleName;
                    if (this.inventory.size > 2 && i < this.inventory.size - 1)
                        str += ", ";

                    ++i;
                }
                
                str += ".";

                output(str);
            }
        }
    }

    pour()
    {
        switch (this.name)
        {
            default:
            {
                super.pour();
            } break;
        }
    }

    put()
    {
        if (!this.isContainer())
        {
            output(this.putString);
            return;
        }

        if (this.open)
        {
            let currentWeight = 0;
            for (let it of this.inventory)
            {
                this.currentWeight += it.weight;
            }

            let obj = state.indirectObject;

            if (this.currentWeight + obj.weight <= this.capacity)
            {
                this.inventory.add(obj);
                obj.location = this.inventoryID;
                output("Done.");
            }

            else
                output("There's no more room.");
        
        }
        else
        {
            output("The " + this.name + " isn't open.");
        }
    }

    read()
    {
        switch (this.name)
        {
            case "black book":
            {
                if (state.playerLocation === Location.ENTRANCE_TO_HADES &&
                    !state.spiritsBanished &&
                    state.spiritsBellRung &&
                    state.spiritsCandlesLit)
                {
                    output(ObjectStrings.BLACK_BOOK_READ_SPIRITS);
                    state.spiritsBanished = true;
                    let hades = worldMap.get(Location.ENTRANCE_TO_HADES);
                    let psg = hades.exits.get(Action.SOUTH);
                    psg.setOpen();
                    let spirits = objectList.get("spirits");
                    spirits.location = Location.NULL_LOCATION;
                    spirits.alive = false;
                }

                else
                    output(GameStrings.BLACK_BOOK_TEXT);
            } break;

            default:
            {
                super.read();
            } break;
        }
    }

    remove()
    {
        let it = state.indirectObject;
        if (!this.isContainer())
        {
            output("You can't remove that from the " + this.name);
            return;
        }

        if (this.itemOpen)
        {
            if (this.inventory.has(it))
            {
                this.inventory.delete(it);
                it.location = Location.PLAYER_INVENTORY;
                output("Taken.");
            }

            else
            {
                output("There's no " + it.name + " in the " + this.name);
            }
        }

        else
        {
            output("The " + this.name + " is closed.");
        }
    }

    repair()
    {
        switch (this.name)
        {
            case "punctured boat":
            {
                if (state.indirectObject.name === "viscous material")
                {
                    let goodBoat = objectList.get("magic boat");
                    let gunk = state.indirectObject;
                    goodBoat.location = this.location;
                    this.location = Location.NULL_LOCATION;
                    gunk.location = Location.NULL_LOCATION;
                    output("Well done. The boat is repaired.");
                }

                else
                {
                    output("That isn't going to work.");
                }
            } break;

            default:
            {
                super.repair();
            } break;
        }
    }

    ring()
    {
        switch (this.name)
        {
            case "brass bell":
            {
                if (state.playerLocation === Location.ENTRANCE_TO_HADES &&
                    !state.spiritsBanished)
                {
                    output(ObjectStrings.BELL_RING_SPIRITS);
                    state.spiritsBellRung = true;
                    this.location = Location.NULL_LOCATION;

                    let hotbell = objectList.get("red hot brass bell");
                    hotbell.location = Location.ENTRANCE_TO_HADES;
                    state.spiritCeremonyCount = GameState.SPIRIT_CEREMONY_LENGTH;

                    let candles = objectList.get("pair of candles");

                    if (candles.location === Location.PLAYER_INVENTORY)
                    {
                        candles.activated = false;
                        candles.location = Location.ENTRANCE_TO_HADES;
                        output(ObjectStrings.CANDLES_FALL_SPIRITS);
                    }
                }

                else
                    output(ringString);
            } break;

            default:
            {
                super.ring(); 
            } break;
        }
    }

    take()
    {
        if (this.location === Location.PLAYER_INVENTORY)
        {
            output("You're already carrying the " + this.name + "!");
            return;
        }

        if (this.location === Location.INSIDE_BASKET &&
            state.playerLocation === Location.DRAFTY_ROOM &&
            !state.shaftBasketUsed)
        {
            state.shaftBasketUsed = true;
        }

        if (this.name === "pile of leaves" && !state.leafPileMoved)
        {
            revealGrating();       
        }

        if (this.name === "rope" && state.ropeRailTied)
        {
            this.untie();
            return;
        }

        if (this.name === "rusty knife")
        {
            let sword = objectList.get("elvish sword");

            if (sword.location === Location.PLAYER_INVENTORY)
                output(ObjectStrings.RUSTY_KNIFE_TAKE);
        }

        if (this.name === "small piece of vitreous slag")
        {
            output(ObjectStrings.SLAG_CRUMBLE);
            this.location = Location.NULL_LOCATION;
            return;
        } 

        if ((state.playerCarryWeight + this.weight) >= CARRY_WEIGHT_LIMIT)
        {
            output(GameStrings.OVERBURDENED);
            return;
        }

        state.playerCarryWeight += this.weight;
        this.location = Location.PLAYER_INVENTORY;
        this.acquired = true;
        this.movedFromStart = true;
        output("Taken.");
    }

    untie()
    {
        switch (this.name)
        {
            case "rope":
            {
                if (state.ropeRailTied)
                {
                    if (state.playerLocation === Location.TORCH_ROOM)
                        output("You cannot reach the rope.");
                    else if (state.playerLocation === Location.DOME_ROOM)
                    {
                        state.ropeRailTied = false;
                        output("The rope is now untied.");
                        let rope = objectList.get("rope");
                        rope.location = Location.PLAYER_INVENTORY;
                    }
                }

                else
                {
                    output("It is not tied to anything.");
                }
            } break;

            default:
            {
                super.untie();
            }
        }
    }

    wave()
    {
        if (this.name === "sceptre")
        {
            switch (state.playerLocation)
            {
                case "END_OF_RAINBOW":
                case "ARAGAIN_FALLS":
                case "ON_THE_RAINBOW":
                {
                    let onRainbow = worldMap.get(Location.ON_THE_RAINBOW);
                    let p1 = onRainbow.exits.get(Action.EAST);
                    let p2 = onRainbow.exits.get(Action.WEST);
                    let pot = objectList.get("pot of gold");

                    if (!state.rainbowSolid)
                    {
                        state.rainbowSolid = true;
                        output(ObjectStrings.SCEPTRE_RAINBOW);
                        p1.setOpen();
                        p2.setOpen();

                        if (!state.potOfGoldAppeared)
                        {
                            state.potOfGoldAppeared = true;
                            output("A shimmering pot of gold appears at the end of the rainbow.");
                            pot.location = Location.END_OF_RAINBOW;
                        }
                    }

                    else
                    {
                        state.rainbowSolid = false;
                        p1.setClosed();
                        p2.setClosed();

                        if (state.playerLocation === Location.ON_THE_RAINBOW)
                        {
                            output(ObjectStrings.SCEPTRE_RAINBOW_2);
                            playerDies();
                        }

                        else
                            output(ObjectStrings.SCEPTRE_RAINBOW_1);

                    }
                } break;

                default:
                {
                    output(this.waveString);
                } break;
            }

        }

        else
            super.wave();
    }

    wind()
    {
        switch(this.name)
        {
            case "golden clockwork canary":
            {
                let bird = objectList.get("song bird");
                let bauble = objectList.get("brass bauble");
                if (bird.altLocations.contains(state.playerLocation) && bauble.location === Location.NULL_LOCATION)
                {
                    output(ObjectStrings.CANARY_WIND_BAUBLE);
                    bauble.location = state.playerLocation;
                }

                else
                    Game.output(ObjectStrings.CANARY_WIND_GOOD);
            } break;

            case "broken clockwork canary":
            {
                Game.output(ObjectStrings.CANARY_WIND_BAD);
            } break;

            default:
            {
                super.wind();
            } break;
        }
    }


    getItemDescription()
    {
        if (this.movedFromStart || this.initialPresenceString === "")
        {
            return this.presenceString;
        }

        else
        {
            return this.initialPresenceString;
        }
    }

    isAlive() { return this.lifespan > 0; }
    isContainer() { return this.inventoryID !== Location.NULL_INVENTORY; }

    outputInventory()
    {
        if (this.name === "glass bottle" && state.bottleFilled)
        {
            output("The glass bottle contains:\n\t A quantity of water");
        }

        if (this.isContainer() && this.isOpen() && this.inventory.size > 0)
        {

            // If none of the items in the container have been moved, print their
            // initial presence strings.

            let initCheck = true;

            for (let item of this.inventory)
            {
                if (item.movedFromStart || item.initialPresenceString === "")
                    initCheck = false;
            }

            if (!initCheck)
                output("The " + this.name + " contains:");

            for (let item of this.inventory)
            {
                if (initCheck)
                {
                    output(item.initialPresenceString)
                }

                else
                {
                    output("\t" + item.capArticleName);

                }

                if (item.isContainer())
                    item.outputInventory();
            }
        }
    }

    isOpen() { return this.itemOpen; }
    tick() { --this.lifespan; }
}