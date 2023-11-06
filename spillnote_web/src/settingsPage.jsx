function SettingsPage()
{
    return (
        <div className="settings">
            <form id="darkmode">
                <label htmlFor="dmselect">Theme</label>
                <select name="dmselect" id="dmselect">
                    <option value={0}>Dark</option>
                    <option value={1}>Light</option>
                </select>
            </form>
            <form id="font" >
                <label htmlFor="fontselect">Font</label>
                <select name="fontselect" id="fontselect">
                    <option value={0}>Times New Roman</option>
                    <option value={1}>Cursive</option>
                </select>
            </form>
        </div>
    );
}

export default SettingsPage;