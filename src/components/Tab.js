import './css/tab.css';

function Tab({content, id}){

    function resetTabs(){
        const tabs = document.getElementsByClassName("tab");

        for(let tab of tabs){
            tab.className="tab tab-unopened";
        }
    }

    function openTab(e){
        const tabs = document.getElementsByClassName("tab");
        const currTab = e.target.classList;

        /* if tab is already opened */
        if(currTab.contains("tab-opened")){
            resetTabs();
            return;
        }

        /* check if current tab is minimized or on default position */
        currTab.contains("tab-minimized")? currTab.replace("tab-minimized", "tab-opened") : currTab.replace("tab-unopened", "tab-opened");

        for(let tab of tabs){
            if(!tab.classList.contains("tab-opened")){
                tab.className = "tab tab-minimized";
            } 
            if(tab.classList.contains("tab-opened") && tab.id != e.target.id){
                tab.className = "tab tab-minimized";
            }
        }
    }

    return(
        <div id={id} className="tab tab-unopened" onClick={(e)=>openTab(e)}>
            {content}
        </div>
    );
}

export default Tab;