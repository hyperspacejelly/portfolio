import './css/sidebar.css';


function SideBar({setLang, info}){
    return(
        <aside id="sidebar">
            <img src={info.portrait} alt="Portrait" />
            <button onClick={()=>{setLang("fr")}}>FR</button>
            <button onClick={()=>{setLang("en")}}>EN</button>
            <p>{info.desc}</p>
        </aside>
    );
}

export default SideBar;