import { useEffect, useRef } from "react";
import './css/contactForm.css';

function ContactForm({toggle, toggleOff, lang}){
    const form = useRef(null);

    return(
        <div id="contactForm" className={toggle?"contactForm-opened":"contactForm-unopened"} ref={form}>
            <h2>{lang==="fr" ? "formulaire de contact" : "contact form"}</h2>
            <button onClick={()=>toggleOff()}>close</button>
        </div>
    );
}

export default ContactForm;