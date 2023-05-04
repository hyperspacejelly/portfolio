import { useRef } from "react";
import './css/contactForm.css';

function ContactForm({toggle, toggleOff, lang}){
    const form = useRef(null);

    return(
        <div id="contactForm" className={toggle?"contactForm-opened":"contactForm-unopened"} 
                ref={form} 
                onClick={()=>toggleOff()}>

            <div className="form-cont" onClick={(e)=>{e.stopPropagation();}}>
                <h2>{lang==="fr" ? "formulaire de contact" : "contact form"}</h2>
                <button onClick={()=>toggleOff()}>close</button>

                <form className="contact-form">
                    <section className="form-row">
                        <label htmlFor="form-fname">{lang==="en"?"First name":"Prénom"}</label>
                        <input type="text" name="fname" id="form-fname" placeholder={lang==="en"?"Required":"Requis"} />

                        <label htmlFor="form-lname">{lang==="en"?"Last name":"Nom"}</label>
                        <input type="text" name="lname" id="form-lname" placeholder={lang==="en"?"Required":"Requis"}/>
                    </section>


                    <section className="form-row">
                        <label htmlFor="form-tel">{lang==="en"?"Phone number":"N° de télephone"}</label>
                        <input type="tel" name="tel" id="form-tel"/>

                        <label htmlFor="form-email">{lang==="en"?"Email address":"Adresse email"}</label>
                        <input type="email" name="email" id="form-email"/>
                    </section>
        
                    <label htmlFor="form-message">{lang==="en"?"Your message":"Votre message"}</label>
                    <textarea id="form-message"></textarea>

                    <button type="submit">{lang==="en"?"Send message": "Envoyer le message"}</button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;