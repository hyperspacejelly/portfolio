import { useEffect, useRef, useState } from "react";
import './css/contactForm.css';

function ContactForm({toggle, toggleOff, lang}){
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [subject, setSubject] = useState("");
    const [msg, setMsg] = useState("");

    const headerRef = useRef();

    const fnameRef = useRef();
    const lnameRef = useRef();
    const emailRef = useRef();
    const subjectRef = useRef();
    const msgRef = useRef();

    function clearForm(){
        setFname("");
        setLname("");
        setEmail("");
        setTel("");
        setSubject("");
        setMsg("");
    }

    function clearErrors(){
        fnameRef.current.className = "";
        lnameRef.current.className = "";
        emailRef.current.className = "";
        subjectRef.current.className = "";
        msgRef.current.className = "";
    }

    useEffect(()=>{
        if(toggle===false){
            clearErrors();
        }
    },[toggle]);

    function validateData(payload){
        //First we check if the required fields are empty. If they are we affect their display
        fnameRef.current.className = payload.fname==="" ? "input-error":"";
        lnameRef.current.className = payload.lname==="" ? "input-error":"";
        emailRef.current.className = payload.email==="" ? "input-error":"";
        subjectRef.current.className = payload.subject==="" ? "input-error":"";
        msgRef.current.className = payload.msg==="" ? "input-error":"";



        //then we check if the email seems like a real email
        const emailAtIndex = payload.email.indexOf("@"); 
        const emailDomainIndex = payload.email.lastIndexOf(".");

        //if no @ or no text before @ || last . before @ || no text after last .
        if(emailAtIndex < 1 || emailDomainIndex < emailAtIndex || emailDomainIndex > (payload.email.length - 3)){
            emailRef.current.className = "input-error";
            return false;
        }

       
        let validate = true;

        // if email is ok we still check if one of those fields is empty so we can return that validation failed
        for(const[elem, value] of Object.entries(payload)){
            if(elem !== "tel" && value === ""){
                validate=false;
                break;
            }
        }

        return validate;
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
        const payload={
            fname : fname.trim(),
            lname: lname.trim(),
            email: email.trim(),
            tel: tel.trim(),
            subject: subject.trim(),
            msg: msg.trim()
        }

        if(validateData(payload)){
            postFormData(payload).then(res=>{
                console.log(res.status);
                if(res.status==="200"){
                    document.getElementById("submitBtn").disabled = true;
                    clearForm();
                    headerRef.current.innerHTML = (lang==="fr")?"Message envoyé !" : "Message sent!";
                    setTimeout(()=>{
                        toggleOff();
                        headerRef.current.innerHTML= (lang==="fr")?"Formulaire de contact" :"Contact form";
                        document.getElementById("submitBtn").disabled = false;
                    }, 3000);
                }else{
                    headerRef.current.innerHTML = (lang==="fr")?"Erreur d'envoi" : "Sending error";
                    setTimeout(()=>{
                        headerRef.current.innerHTML= (lang==="fr")?"Formulaire de contact" :"Contact form"
                    }, 3000); 
                } 
            });
        }
    }
    return(
        <>
            <div  id="contactForm" 
                    className={toggle?"contactForm-opened":"contactForm-unopened"} 
                    onClick={()=>toggleOff()}>

                <div className="form-cont" onClick={(e)=>{e.stopPropagation();}}>
                    <h2 ref={headerRef}>{lang==="fr" ? "Formulaire de contact" : "Contact form"}</h2>
                    <button className="close-btn" onClick={()=>toggleOff()}>X</button>

                    <form autoComplete="off" className="contact-form">
                        <section className="form-row">
                            <div className="form-elem">
                                <label htmlFor="form-fname">{lang==="en"?"First name":"Prénom"}</label>
                                <input type="text" name="fname" id="form-fname" 
                                        ref={fnameRef}
                                        placeholder={lang==="en"?"Required":"Requis"}
                                        value={fname}
                                        onInput={(e)=>setFname(e.target.value)} />
                            </div>
                            <div className="form-elem">
                                <label htmlFor="form-lname">{lang==="en"?"Last name":"Nom"}</label>
                                <input type="text" name="lname" id="form-lname" 
                                    ref={lnameRef}
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
                                       ref={emailRef}
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
                                    ref={subjectRef}
                                    placeholder={lang==="en"?"Required":"Requis"}
                                    value={subject}
                                    onInput={(e)=>setSubject(e.target.value)} />
                            </div>
                        </section>
                        <section className="form-row row-label">
                            <label htmlFor="form-message">{lang==="en"?"Your message":"Votre message"}</label>
                        </section>
                        <section className="form-row form-msg">
                            <div className="form-elem">
                                <textarea id="form-message" 
                                        ref={msgRef}
                                        placeholder={lang==="en"?"Required":"Requis"}
                                        value={msg}
                                        onInput={(e)=>setMsg(e.target.value)}></textarea>
                            </div>
                       </section>
                       <section className="form-row">
                            <div className="form-elem form-submit">
                                <button type="submit" id="submitBtn" className='submit-button' onClick={handleSubmit}>
                                    {lang==="en"?"Send":"Envoyer"}
                                </button> 
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