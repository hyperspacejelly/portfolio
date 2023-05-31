import { useState,  useEffect } from "react";
import SideBar from "./components/SideBar";
import Tab from "./components/Tab";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import ContactForm from "./components/ContactForm";
import Experience from "./components/Experience";
import Links from "./components/Links";

async function getData(lang){
  const API_ENDPOINT = "https://api.lucien-jely.fr/read.php?lang=";
  let raw_data = await fetch(API_ENDPOINT+lang, {method: "GET"});
  let data = await raw_data.json();
  return data;
}

function Main({lang}) {
  const [data, setData] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(()=>{
    getData(lang).then((res)=>setData(res));
   },[lang]);

  function toggleContact(){
    contactOpen ? setContactOpen(false) : setContactOpen(true);
  }

  return (
    <>
      {data!=null && <>
          <SideBar info={data.info.content} toggleContact={toggleContact}/>
          <main>
            <ContactForm lang={lang} toggle={contactOpen} toggleOff={()=>setContactOpen(false)} />
            <Tab id="skills" 
                  content={<Skills content={data.skills.content} lang={lang} />} 
                  title={lang==="fr"?"Compétences":"Skills"}/>

            <Tab id="portfolio" 
                  content={
                        <Portfolio lang={lang} content={data.portfolio.content} taglist={data.portfolio.taglist} imgDir={data.portfolio.imgDir} />
                      } 
                  title="Portfolio"/>

            <Tab id="experience" 
                  content={<Experience content={data.experience} lang={lang} />} 
                  title="Experience"/>
            <Tab id="other" content={<Links content={data.other.content} />} title={lang==="en"?"Links":"Liens"}/>
          </main>
        </>}
      {data===null && <></>}
    </>
  );
}

export default Main;
