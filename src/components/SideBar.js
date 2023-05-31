import './css/sidebar.css';
import { useNavigate } from 'react-router';

function SideBar({info, toggleContact}){
    const navigate = useNavigate();

    return(
        <aside id="sidebar">           
            <img id="portrait" src={info.portrait} alt="Portrait" />
            <section id="sidebarHeader">
                <h2 id="name">Lucien Jély</h2>
                <hr />
                <h3 id="nameSubhead">{info.title}</h3>
            </section>
            <p id="bio">{info.desc}</p>
           
            <div id="buttons">
                <button className="hover-button" id="contactButton" onClick={toggleContact}>
                    Contact 
                    <img id="mailIcon" src="https://www.lucien-jely.fr/img/mail.svg" alt="enveloppe" />
                </button>
                <section id="langSelect">
                    <button className="hover-button" onClick={()=>{navigate("/");}} tooltip="Français">
                        <img src="https://www.lucien-jely.fr/img/fr.svg" alt="French flag"/>
                    </button>
                    <button className="hover-button" onClick={()=>{navigate("/en");}} tooltip="English">
                        <img src="https://www.lucien-jely.fr/img/us.svg" alt="US flag"/>
                    </button>
                </section>
            </div>
        </aside>
    );
}

export default SideBar;