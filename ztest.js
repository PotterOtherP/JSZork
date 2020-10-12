function testAllDirect()
{
    for (let obj of objectList.values())
    {
        state.directObject = obj;

        for (let actSet of actions.values())
        {
            if (actSet.type === "DIRECT")
                state.playerAction = actSet.action;
            
            updateGame();
        }

    }
}