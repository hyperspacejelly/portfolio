import { useState, useRef, useEffect } from "react";
import SideBar from "./components/SideBar";
import Tab from "./components/Tab";

async function getData(lang){
  const API_ENDPOINT = "https://api.lucien-jely.fr/read.php?lang=";
  let raw_data = await fetch(API_ENDPOINT+lang, {method: "GET"});
  let data = await raw_data.json();
  return data;
}

function Main() {
  const [lang, setLang] = useState("fr");
  const [data, setData] = useState(null);

  useEffect(()=>{
   getData(lang).then((res)=>setData(res));
  },[]);

  useEffect(()=>{
    getData(lang).then((res)=>setData(res));
   },[lang]);

  return (
    <>
      {data!=null && <>
          <SideBar setLang={setLang} info={data.info} />
          <main>
            <Tab id="tech" content={<h3>tech</h3>}/>
            <Tab id="portfolio" content={<h3>portfolio</h3>}/>
            <Tab id="experience" content={<h3>experience</h3>}/>
            <Tab id="other" content={<h3>other</h3>}/>
          </main>
        </>}
      {data===null && <></>}
    </>
  );
}

export default Main;
