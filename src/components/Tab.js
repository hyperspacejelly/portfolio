import './css/tab.css';

/* the Tab component takes 3 props

 content => another component that'll be the content displayed when the tab is opened
 id => the ID that'll be applied to the tab container in order to style it independently of the others
 title => the displayed name of the tab 
 
*/

function Tab({content, id, title}){
    const tabs = document.getElementsByClassName("tab");

    function resetTabs(){
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
        <div id={id} className="tab tab-unopened" 
            onClick={(e)=> {
                    e.stopPropagation(); 
                    openTab(e);
                    }}>
            <h2 className='tab-title'><span>{title}</span></h2>
            <section className='tab-content tab-content-hidden'>
                {content}
            </section>
        </div>
    );
}

export default Tab;