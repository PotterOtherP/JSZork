class Feature extends GameObject {

    constructor(name, loc)
    {
        super(name, loc);
        this.objectType = "FEATURE";
        this.presenceString = "";

        // Only for non-moveable objects
        this.altLocations.add(this.location);

    }

    breakObject()
    {
        switch (this.name)
        {
            case "broken mirror":
            {
                output(this.breakString);
            } break;

            case "mirror":
            {
                if (state.indirectObject.isWeapon)
                {
                    output(this.breakString);
                    this.location = Location.NULL_LOCATION;
                    this.altLocations.clear();

                    let brokeMirror = objectList.get("broken mirror");
                    brokeMirror.location = Location.MIRROR_ROOM_SOUTH;
                    brokeMirror.altLocations.add(Location.MIRROR_ROOM_NORTH);
                    state.mirrorBroken = true;
                }
            } break;

            default:
            {
                super.breakObject();
            }
        }
    }

    climb()
    {
        switch (this.name)
        {
            case "forest":
            {
                if (state.playerLocation === Location.FOREST_PATH)
                {
                    relocatePlayer(Location.UP_TREE);
                }

                else if (state.playerLocation === Location.UP_TREE)
                {
                    output("You cannot climb any higher.");
                }

                else
                {
                    output("There is no tree here suitable for climbing.");
                }
            } break;

            default:
            {
                super.climb();
            } break;
        }
    }

    close()
    {
        switch (this.name)
        {

            case "grating":
            {
                if (!state.gratingOpened)
                {
                    output(GameStrings.getHardSarcasm());
                }

                else
                {
                    output("Done.");
                    state.gratingOpened = false;
                }
            } break;

            case "kitchen window":
            {
                let r = worldMap.get(Location.BEHIND_HOUSE);
                let p = r.exits.get(Action.WEST);
                if (state.houseWindowOpened)
                {
                    output(GameStrings.WINDOW_CLOSES);
                    this.examineString = ObjectStrings.WINDOW_EXAMINE_CLOSED;
                    state.houseWindowOpened = false;
                    p.setClosed();
                }
                else
                    output("The window is already closed.");
            } break;

            case "trap door":
            {
                let r = worldMap.get(Location.LIVING_ROOM);
                let p = r.exits.get(Action.DOWN);
                if (state.trapDoorOpen)
                {
                    state.trapDoorOpen = false;
                    output("Done.");
                    p.setClosed();
                }
                else
                {
                    output(GameStrings.getHardSarcasm());
                }
            } break;

            default:
            {
                output(this.closeString);
            } break;
        }
    }

    dig()
    {
        switch (this.name)
        {
            case "sand":
            {
                if (state.indirectObject.name === "shovel")
                {
                    ++state.sandStage;

                    if (state.sandStage === 1)
                    {
                        output("You seem to be digging a hole here.");
                    }

                    else if (state.sandStage === 2)
                    {
                        output("The hole is getting deeper, but that's about it.");
                    }

                    else if (state.sandStage === 3)
                    {
                        output("You are surrounded by a wall of sand on all sides.");
                    }

                    else if (state.sandStage === 4)
                    {
                        if (!state.scarabFound)
                        {
                            let scarab = objectList.get("beautiful jeweled scarab");
                            scarab.location = Location.SANDY_CAVE;
                            output("You can see a scarab here in the sand.");
                            state.scarabFound = true;
                        }

                        else
                            output("There's no reason to be digging here!");
                    }

                    else if (state.sandStage === 5)
                    {
                        output("The hole collapses, smothering you.");
                        playerDies();
                        state.sandStage = 0;
                        let scarab = objectList.get("beautiful jeweled scarab");
                        if (scarab.location === Location.SANDY_CAVE)
                        {
                            scarab.location = Location.NULL_LOCATION;
                            state.scarabFound = false;
                        }

                    }
                } 

                else
                    output("Digging with " + state.indirectObject.articleName + " is silly.");
            } break;

            default:
            {
                super.dig();
            } break;
        }
    }

    drink()
    {
        switch (this.name)
        {
            case "quantity of water":
            {
                let bottle = objectList.get("glass bottle");
                if (bottle.location === Location.PLAYER_INVENTORY && bottle.isOpen())
                {
                    output(ObjectStrings.WATER_DRINK);
                    state.bottleFilled = false;
                }

                else if (bottle.location === Location.PLAYER_INVENTORY && !bottle.isOpen())
                {
                    output("The bottle is closed.");
                }

                else if (bottle.location !== Location.PLAYER_INVENTORY)
                {
                    output("It's in the bottle. Perhaps you should take that first.");
                }
            } break;

            default:
            {
                super.drink();
            } break;
        }
    }

    kick()
    {
        switch (this.name)
        {
            case "gate":
            {
                output(ObjectStrings.DEAD_GATE);
            } break;

            default:
            {
                super.kick();
            } break;
        }
    }

    lock()
    {
        switch (this.name)
        {
            case "grating":
            {
                if (state.indirectObject.name === "skeleton key")
                {
                    if (state.playerLocation === Location.GRATING_ROOM)
                    {
                        output("The grate is locked.");
                        state.gratingUnlocked = false;
                    }

                    else if (state.playerLocation === Location.CLEARING_NORTH)
                    {
                        output("You can't reach the lock from here.");
                    }
                }

                else
                {
                    output("Can you lock a grating with " + state.indirectObject.articleName + "?");
                }
            } break;

            default:
            {
                super.lock();
            } break;
        }
    }

    lookIn()
    {
        switch (this.name)
        {
            case "kitchen window":
            {
                if (state.playerLocation === Location.BEHIND_HOUSE)
                    output(ObjectStrings.WINDOW_LOOK_IN);
                else
                    output("You are inside.");
            } break;

            default: { super.lookIn(); } break;
        }
    }

    lookOut()
    {
         switch (this.name)
        {
            case "kitchen window":
            {
                if (state.playerLocation === Location.KITCHEN)
                    output(ObjectStrings.WINDOW_LOOK_OUT);
                else
                    output("You are outside.");
            } break;

            default: { super.lookOut(); } break;
        }
    }

    lower()
    {
        switch (this.name)
        {
            case "gate":
            {
                output(ObjectStrings.DEAD_GATE);
            } break;

            default:
            {
                super.lower();
            } break;
        }
    }

    move()
    {
        switch (this.name)
        {
            case "oriental rug":
            {
                if (!state.carpetMoved)
                {
                    state.carpetMoved = true;
                    this.boardString = ObjectStrings.CARPET_SIT_2;
                    this.lookUnderString = "There is nothing but dust there.";
                    let trap = objectList.get("trap door");
                    trap.location = Location.LIVING_ROOM;
                    trap.altLocations.add(Location.CELLAR);
                    output(GameStrings.MOVE_RUG);
                    let rm = worldMap.get(Location.LIVING_ROOM);
                    let p = rm.exits.get(Action.DOWN);
                    p.closedFail = "The trap door is closed.";
                }

                else
                {
                    output(GameStrings.RUG_ALREADY_MOVED);
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
        switch (this.name)
        {
            case "grating":
            {
                if (state.gratingOpened)
                {
                    output(GameStrings.getHardSarcasm());
                }

                else
                {
                    if (state.gratingUnlocked)
                    {
                        state.gratingOpened = true;

                        if (state.playerLocation === Location.GRATING_ROOM)
                        {
                            if (!state.leafPileMoved)
                            {
                                state.leafPileMoved = true;
                                output("A pile of leaves falls onto your head and to the ground.");
                            }

                            else
                            {
                                output("The grating opens to reveal trees above you.");
                            }
                        }

                        else if (state.playerLocation === Location.CLEARING_NORTH)
                        {
                            output("The grating opens to reveal darkness below.");
                        }

                        this.examineString = "The grating is open, but I can't tell what's beyond it.";
                    }

                    else
                    {
                        output("The grating is locked.");
                    }
                }

            } break;

            case "kitchen window":
            {
                let r = worldMap.get(Location.BEHIND_HOUSE);
                let p = r.exits.get(Action.WEST);
                if (!state.houseWindowOpened)
                {
                    output(GameStrings.WINDOW_OPENS);
                    this.examineString = ObjectStrings.WINDOW_EXAMINE_OPEN;
                    state.houseWindowOpened = true;
                    p.setOpen();
                }
                else
                    output(GameStrings.getHardSarcasm());
            } break;

            case "trap door":
            {
                if (state.playerLocation === Location.CELLAR)
                {
                    output("The door is locked from above.");
                }

                else if (state.playerLocation === Location.LIVING_ROOM)
                {
                    let r = worldMap.get(Location.LIVING_ROOM);
                    let p = r.exits.get(Action.DOWN);
                    if (!state.trapDoorOpen)
                    {
                        state.trapDoorOpen = true;
                        output(GameStrings.TRAP_DOOR_OPENS);
                        p.setOpen();
                    }
                    else
                    {
                        output(GameStrings.getHardSarcasm());
                    }
                }

            } break;


            default:
            {
                super.open();
            } break;
        }
    }

    pour()
    {
        switch (this.name)
        {
            case "quantity of water":
            {
                let bottle = objectList.get("glass bottle");

                if (bottle.location !== Location.PLAYER_INVENTORY)
                    output("It's in the bottle. Perhaps you should take that first.");

                else if (!bottle.isOpen())
                    output("The bottle is closed.");

                else
                {
                    switch (state.indirectObject.name)
                    {
                        case "red hot brass bell":
                        {
                            output("The water cools the bell and is evaporated.");
                            state.indirectObject.location = Location.NULL_LOCATION;
                            let bell = objectList.get("brass bell");
                            bell.location = state.playerLocation;
                            state.bottleFilled = false;

                        } break;

                        default:
                        {
                            output("The water spills onto the " + state.indirectObject.name + " and dissipates.");
                            state.bottleFilled = false;
                        } break;
                    } 
                }
                

            } break;

            default:
            {
                super.pour();
            } break;
        }
    }

    push()
    {
        switch (this.name)
        {
            case "blue button":
            {
                if (!state.blueButtonPushed)
                {
                    output(ObjectStrings.BLUE_BUTTON);
                    state.blueButtonPushed = true;
                }

                else
                    output(ObjectStrings.BLUE_BUTTON_JAMMED);

            } break;

            case "brown button":
            {
                output("Click.");
                state.yellowButtonPushed = false;
                let dam = worldMap.get(Location.DAM);
                dam.firstVisit = true;

            } break;

            case "red button":
            {
                let rm = worldMap.get(Location.MAINTENANCE_ROOM);

                if (!state.redButtonPushed)
                {
                    output("The lights within the room come on.");
                    rm.setLight();
                    state.darknessCheck();
                    state.redButtonPushed = true;
                }

                else
                {
                    output("The lights within the room shut off.");
                    rm.setDark();
                    state.darknessCheck();
                    state.redButtonPushed = false;

                }

            } break;

            case "yellow button":
            {
                output("Click.");
                state.yellowButtonPushed = true;
                let dam = worldMap.get(Location.DAM);
                dam.firstVisit = true;

            } break;


            default:
            {
                super.push();
            } break;
        }
    }

    put()
    {
        switch(this.name)
        {
            case "grating":
            {
                if (state.playerLocation === Location.CLEARING_NORTH)
                {
                    let it = state.indirectObject;
                    if (it.weight < 10)
                    {
                        output("The " + state.indirectObject.name + " goes through the grating into the darkness below.");
                        state.indirectObject.location = Location.GRATING_ROOM;
                    }
                    else
                        output("It won't fit through the grating.");
                }

                else if (state.playerLocation === Location.GRATING_ROOM)
                {
                    output("You can't get anything through the grating from here.");
                }

            } break;

            default:
            {
                super.put();
            } break;
        }
    }

    raise()
    {
        switch (this.name)
        {
            case "gate":
            {
                output(ObjectStrings.DEAD_GATE);
            } break;

            default:
            {
                super.raise();
            } break;
        }
    }

    take()
    {
        switch (this.name)
        {
            case "quantity of water":
            {
                let bottle = objectList.get("glass bottle");

                if (bottle.location !== Location.PLAYER_INVENTORY)
                    output("It's in the bottle. Perhaps you should take that first.");

                else if (!bottle.isOpen())
                    output("The bottle is closed.");

                else
                    output("The water slips through your fingers.");
                
            } break;

            default:
            {
                super.take();
            } break;
        }
    }

    tie()
    {
        switch (this.name)
        {
            case "wooden railing":
            {
                if (state.indirectObject.name === "rope")
                {
                    if (!state.ropeRailTied)
                    {
                        state.ropeRailTied = true;
                        output("The rope drops over the side and comes within ten feet of the floor.");
                    }

                    else
                    {
                        output("The rope is already tied to it.");
                    }
                }

                else
                {
                    output("You can't tie the " + state.indirectObject.name + " to that.");
                }
            } break;

            default:
            {
                super.tie();
            } break;
        }
    }

    touch()
    {
        switch (this.name)
        {
            case "gate":
            {
                output(ObjectStrings.DEAD_GATE);
            } break;

            case "mirror":
            {
                output(this.touchString);
                if (state.playerLocation === Location.MIRROR_ROOM_SOUTH)
                {
                    state.playerPreviousLocation = Location.MIRROR_ROOM_SOUTH;
                    state.playerLocation = Location.MIRROR_ROOM_NORTH;
                }
                else
                {
                    state.playerPreviousLocation = Location.MIRROR_ROOM_NORTH;
                    state.playerLocation = Location.MIRROR_ROOM_SOUTH;
                }

                for (let g of objectList.values())
                {
                    if (g.isItem() && g.location === state.playerPreviousLocation)
                        g.location = state.playerLocation;
                }
            } break;

            default:
            {
                super.touch();
            }
        }
    }

    turn()
    {
        switch (this.name)
        {
            case "bolt":
            {
                if (state.indirectObject.name === "wrench")
                {
                    if (!state.yellowButtonPushed)
                    {
                        output("The bolt won't turn with your best effort.");
                    }

                    else
                    {
                        if (state.damGatesOpen)
                        {
                            state.damGatesOpen = false;
                            output("The sluice gates close and water starts to collect behind the dam.");
                        }

                        else
                        {
                            state.damGatesOpen = true;
                            output("The sluice gates open and water pours through the dam.");
                        }
                    }
                }

                else
                {
                    output("The bolt won't turn using the " + state.indirectObject.name);
                }
            } break;

            case "switch":
            {
                switch (state.indirectObject.name)
                {
                    case "screwdriver":
                    {
                        if (!coalMachine.isOpen() && coalMachine.inventory.size > 0)
                        {
                            output(ObjectStrings.MACHINE_SUCCESS);

                            for (let subject of coalMachine.inventory)
                            {
                                coalMachine.inventory.clear();

                                if (subject.name === "small pile of coal")
                                {
                                    subject.location = Location.NULL_LOCATION;
                                    let diamond = objectList.get("huge diamond");
                                    diamond.location = Location.INSIDE_COAL_MACHINE;
                                    break;
                                }

                                else
                                {
                                    subject.location = Location.NULL_LOCATION;
                                    let slag = objectList.get("small piece of vitreous slag");
                                    slag.location = Location.INSIDE_COAL_MACHINE;
                                    break;
                                }
                            }

                            refreshInventories();
                        }

                        else
                            output("The machine doesn't seem to want to do anything.");
                    } break;

                    case "dummy_object":
                    {
                        output("You can't turn it with your bare hands...");
                    } break;

                    default:
                    {
                        output("It seems that " + state.indirectObject.articleName + " won't do.");
                    } break;
                }
            } break;

            default:
            {
                super.turn();
            } break;
        }
    }

    unlock()
    {
        switch (this.name)
        {
            case "grating":
            {
                if (state.indirectObject.name === "skeleton key")
                {
                    if (state.playerLocation === Location.GRATING_ROOM)
                    {
                        output("The grate is unlocked.");
                        state.gratingUnlocked = true;
                    }

                    else if (state.playerLocation === Location.CLEARING_NORTH)
                    {
                        output("You can't reach the lock from here.");
                    }
                }

                else
                {
                    output("Can you unlock a grating with " + state.indirectObject.articleName + "?");
                }
            } break;

            default:
            {
                super.unlock();
            } break;
        }
    }

    
}