class Container extends GameObject {

    constructor(name, loc)
    {
        super(name, loc);

        this.capacity = 0;
        this.containerOpen = false;
        this.locked = false;
        this.objectType = "CONTAINER";

        // Only for non-moveable objects
        this.altLocations.add(this.location);

    }

    isContainer() { return true; }
    isOpen() { return this.containerOpen; }

    outputInventory()
    {
        
        if (this.isOpen() && this.inventory.size > 0)
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
                outputDescription("The " + this.name + " contains:");

            for (let item of this.inventory)
            {
                if (initCheck && item.initialPresenceString !== "")
                {
                    outputDescription(item.initialPresenceString)
                }

                else
                {
                    outputDescription("\t" + item.capArticleName);
                    
                }

                if (item.isContainer())
                    item.outputInventory();
            }
        }
    }

    close()
    {
        switch (this.name)
        {
            case "basket":
            {
                output("There is no way to close the basket.");

            } break;

            case "machine":
            {
                if (this.containerOpen)
                {
                    this.containerOpen = false;
                    output("The lid closes.");
                }

                else
                    output("The lid is already closed.");
            } break;

            default:
            {
                if (this.containerOpen)
                {
                    this.containerOpen = false; 
                    output("Closed.");
                }
                else
                {
                    output("It is already closed.");
                }
            } break;
        }
    }

    examine()
    {
        if (this.containerOpen)
        {
            if (this.inventory.size === 0)
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

    lower()
    {
        switch (this.name)
        {
            case "basket":
            {
                if (!state.shaftBasketLowered)
                {
                    state.shaftBasketLowered = true;
                    this.location = Location.DRAFTY_ROOM;
                    this.altLocations.clear();
                    this.altLocations.add(Location.SHAFT_ROOM);
                    output("The basket is lowered to the bottom of the shaft.");
                }

                else
                    output(GameStrings.getHardSarcasm());

            } break;

            default:
            {
                super.lower();
            } break;
        }
    }

    open()
    {
        switch (this.name)
        {
            case "machine":
            {
                if (!this.containerOpen)
                {
                    this.containerOpen = true;

                    if (this.inventory.size === 1)
                    {
                        for (let item of this.inventory)
                            output("The lid opens, revealing " + item.articleName + ".");
                    }
                    
                    else
                        output("The lid opens.");
                }

                else
                    output("The lid is already open.");
            } break;

            default:
            {
                if (this.containerOpen)
                {
                    output("It is already open.");
                }

                else
                {
                    this.containerOpen = true;
                    if (this.inventory.size === 0)
                        output("Opened.");
                    else
                    {
                        let str = "Opening the " + this.name + " reveals";

                        let i = 0;

                        for (let it of this.inventory)
                        {

                            let word = it.vowelStart() ? " an " : " a ";
                            if (this.inventory.size > 1 && i == this.inventory.size - 1) word = " and" + word;
                            str += word;
                            str += it.name;
                            if (this.inventory.size > 2 && i < this.inventory.size - 1)
                                str += ",";
                            ++i;
                        }
                        
                        str += ".";

                        output(str);
                    }
                }

            } break;

        }
    }

    put()
    {
        if (this.name === "machine" && this.inventory.size > 0)
        {
            output("There's no more room.");
            return;
        }

        if (this.containerOpen)
        {
            let currentWeight = 0;
            for (let it of this.inventory)
            {
                currentWeight += it.weight;
            }

            let obj = state.indirectObject;

            if (currentWeight + obj.weight <= this.capacity)
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

    raise()
    {
        switch (this.name)
        {
            case "basket":
            {
                if (state.shaftBasketLowered)
                {
                    state.shaftBasketLowered = false;
                    this.location = Location.SHAFT_ROOM;
                    this.altLocations.clear();
                    this.altLocations.add(Location.DRAFTY_ROOM);
                    output("The basket is raised to the top of the shaft.");
                }

                else
                    output(GameStrings.getHardSarcasm());

            } break;

            default:
            {
                super.raise();
            } break;
        }
    }

    remove()
    {
        let it = state.indirectObject;
        if (this.containerOpen)
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
}