class Passage {

    constructor(locA, locB)
    {
        this.locationA = locA;
        this.locationB = locB;

        this.closedFail = "";
        this.message = "";
        this.open = true;
        this.weightFail = "";
        this.weightLimit = 1000;
    }


    setOpen() { this.open = true; }
    setClosed() { this.open = false; }
    isOpen() { return this.open; }
}

