class Surface extends GameObject {

    constructor(name, loc)
    {
        super(name, loc);
        this.objectType = "SURFACE";
        this.capacity = 0;

        // Only for non-moveable objects
        this.altLocations.add(this.location);

    }

    examine()
    {
        if (this.inventory.size === 0)
        output("There's nothing on the " + this.name);
        else
        {
            output("On the " + this.name + " is:");

            for (let it of this.inventory)
            {
                output("  " + it.capArticleName);
            }
        }
    }

    outputInventory()
    {
        
        if (this.inventory.size > 0)
        {

            // If none of the items in the container have been moved, print their
            // initial presence strings.

            let initCheck = true;

            for (let item of this.inventory)
            {
                if (item.movedFromStart)
                    initCheck = false;
            }

            if (!initCheck)
                outputDescription("Sitting on the " + this.name + " is:");

            for (let item of this.inventory)
            {
                if (initCheck)
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

    put()
    {
        let it = state.indirectObject;
        if (this.inventory.size < this.capacity)
        {
            output("Done.");
            it.location = this.inventoryID;
        }

        else
        {
            output("There's no more room.");
        }
    }

    remove()
    {
        let it = state.indirectObject;
        if (this.inventory.has(it))
        {
            this.inventory.delete(it);
            it.location = Location.PLAYER_INVENTORY;
            output("Taken.");
        }

        else
        {
            output("There's no " + it.name + " on the " + this.name);
        }
    }
}