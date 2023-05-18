import { useState,  useEffect } from "react";
import SideBar from "./components/SideBar";
import Tab from "./components/Tab";
import Portfolio from "./components/Portfolio";
import Tech from "./components/Tech";
import ContactForm from "./components/ContactForm";

async function getData(lang){
  const API_ENDPOINT = "https://api.lucien-jely.fr/read.php?lang=";
  let raw_data = await fetch(API_ENDPOINT+lang, {method: "GET"});
  let data = await raw_data.json();
  return data;
}

function Main() {
  const [lang, setLang] = useState("fr");
  const [data, setData] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(()=>{
   getData(lang).then((res)=>setData(res));
  },[]);

  useEffect(()=>{
    getData(lang).then((res)=>setData(res));
   },[lang]);

  function toggleContact(){
    contactOpen ? setContactOpen(false) : setContactOpen(true);
  }

  return (
    <>
      {data!=null && <>
          <SideBar setLang={setLang} info={data.info} toggleContact={toggleContact}/>
          <main>
            <ContactForm lang={lang} toggle={contactOpen} toggleOff={()=>setContactOpen(false)} />
            <Tab id="tech" content={<Tech content={data.tech.content} />} title="Tech"/>
            <Tab id="portfolio" content={
                          <Portfolio lang={lang} content={data.portfolio.content} taglist={data.portfolio.taglist} imgDir={data.portfolio.imgDir}/>} 
                  title="Portfolio"/>
            <Tab id="experience" content={<h3>experience</h3>} title="Experience"/>
            <Tab id="other" content={<h3>other</h3>} title={lang==="en"?"Links":"Liens"}/>
          </main>
        </>}
      {data===null && <></>}
    </>
  );
}

export default Main;
