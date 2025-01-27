function mobile_menu_open()
{
    document.getElementById("mobile-menu").style.display = "block";
}

function mobile_menu_close()
{
    document.getElementById("mobile-menu").style.display = "none";
}

function absVal(value)
{
    if (value >= 0)
        return value;
    else
        return (-1 * value);
}