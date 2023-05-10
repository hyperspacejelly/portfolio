import { useRef, useState } from "react";
import './css/contactForm.css';

function ContactForm({toggle, toggleOff, lang}){
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [subject, setSubject] = useState("");
    const [msg, setMsg] = useState("");

    function clearForm(){
        setFname("");
        setLname("");
        setEmail("");
        setTel("");
        setSubject("");
        setMsg("");
    }

    async function postFormData(payload){
        const url="https://api.lucien-jely.fr/contact/send.php";
        const raw_response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const response = raw_response.json();
        return response;
    }

    function handleSubmit(e){
        e.preventDefault();
        const payload = {
            fname : fname,
            lname: lname,
            email: email,
            tel: tel,
            subject: subject,
            msg: msg
        }
        postFormData(payload).then(res=>{
            console.log(res);
            if(res.status=="200"){
                clearForm();
            } 
        });
    }
    return(
        <>
            <div  id="contactForm" 
                    className={toggle?"contactForm-opened":"contactForm-unopened"} 
                    onClick={()=>toggleOff()}>

                <div className="form-cont" onClick={(e)=>{e.stopPropagation();}}>
                    <h2>{lang==="fr" ? "formulaire de contact" : "contact form"}</h2>
                    <button className="close-btn" onClick={()=>toggleOff()}>X</button>

                    <form autoComplete="off" className="contact-form">
                        <section className="form-row">
                            <div className="form-elem">
                                <label htmlFor="form-fname">{lang==="en"?"First name":"Prénom"}</label>
                                <input type="text" name="fname" id="form-fname" 
                                        placeholder={lang==="en"?"Required":"Requis"}
                                        value={fname}
                                        onInput={(e)=>setFname(e.target.value)} />
                            </div>
                            <div className="form-elem">
                                <label htmlFor="form-lname">{lang==="en"?"Last name":"Nom"}</label>
                                <input type="text" name="lname" id="form-lname" 
                                    placeholder={lang==="en"?"Required":"Requis"}
                                    value={lname}
                                    onInput={(e)=>setLname(e.target.value)} />
                            </div>
                        </section>

                        <section className="form-row">
                            <div className="form-elem">
                                <label htmlFor="form-tel">{lang==="en"?"Phone number":"N° de télephone"}</label>
                                <input type="tel" name="tel" id="form-tel"
                                    value={tel}
                                    onInput={(e)=>setTel(e.target.value)} />
                            </div>
                            <div className="form-elem">
                                <label htmlFor="form-email">{lang==="en"?"Email address":"Adresse email"}</label>
                                <input type="email" name="email" id="form-email"
                                       placeholder={lang==="en"?"Required":"Requis"} 
                                       value={email}
                                       onInput={(e)=>setEmail(e.target.value)} />
                            </div>
                        </section>
                        <section className="form-row row-label">
                            <label htmlFor="subject">{lang==="en"?"Message subject":"Sujet de votre message"}</label>
                        </section>
                        <section className="form-row">
                            <div className="form-elem form-subject">
                                <input id="subject" name="subject" type="text" 
                                    placeholder={lang==="en"?"Required":"Requis"}
                                    value={subject}
                                    onInput={(e)=>setSubject(e.target.value)} />
                            </div>
                        </section>
                        <section className="form-row row-label">
                            <label htmlFor="form-message">{lang==="en"?"Your message":"Votre message"}</label>
                        </section>
                        <section className="form-row">
                            <div className="form-elem form-msg">
                                <textarea id="form-message" placeholder={lang==="en"?"Required":"Requis"}
                                        value={msg}
                                        onInput={(e)=>setMsg(e.target.value)}></textarea>
                            </div>
                            <div className="form-elem form-submit">
                                <button type="submit" onClick={handleSubmit}>{lang==="en"?"Send": "Envoyer"}</button>
                            </div>
                       </section>
                    </form>
                </div>
            </div>
            <div id="contactFormBG" className={toggle?"contactForm-opened":"contactForm-unopened"}></div>
        </>
    );
}

export default ContactForm;