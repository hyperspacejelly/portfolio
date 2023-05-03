import './css/sidebar.css';


function SideBar({setLang, info, toggleContact}){
    return(
        <aside id="sidebar">
            <img src={info.portrait} alt="Portrait" />
            <section id="langSelect">
                <button onClick={()=>{setLang("fr")}}>FR</button>
                <button onClick={()=>{setLang("en")}}>EN</button>
            </section>
            <p>{info.desc}</p>
            <button onClick={toggleContact}>contact</button>
        </aside>
    );
}

export default SideBar;