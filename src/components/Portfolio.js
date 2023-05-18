import './css/portfolio.css';
import { useEffect, useRef, useState } from 'react';

/*PORTFOLIO Structure :
imgDir : remote dir containing all the images for this section

Taglist : array of tags found in each element

Content :   title => name of project
            url => url of project (if applicable)
            thumbnail => url of thumbnail image
            desc => text description of project
            tech => tech used in project*/


function Portfolio({content, taglist, imgDir, lang}){
    const [filter, setFilter] = useState("none");
    let i=0;

    const refContent = useRef(null);

    const taglistRender = taglist.map((tag)=>{
        return(
            <option key={tag} value={tag}>{tag}</option>
        );
    });
    const portfolioRender = content.map((el)=>{
        i++;
        let tags = el.tags.map((tag)=>{
                return(
                    <button key={el.title+"_"+tag+i} onClick={(e)=>{
                            e.stopPropagation();
                            e.preventDefault();
                            tagHandleClick(tag);}}>
                        #{tag}
                    </button>
                )
            }); 
        return(
            <div key={el.title+i} className='portfolio-element'>
                    <h3>{el.title}</h3> 
                    <img src={imgDir + el.thumbnail} alt={el.title}/>
                    <section className='portfolio-text'>
                        <p>{el.desc}</p>
                        <p>{el.tech}</p>
                    </section>
                    <section className='element-taglist'><span>Tags:</span> {tags}</section>
            </div>
        );
    });

    function clearFilter(){
        setFilter("none");
    }

    function tagHandleClick(tag){
        setFilter(tag);
    }

    useEffect(()=>{
        const elements = document.getElementsByClassName('portfolio-element');

        for(let i=0; i<elements.length; i++){
            if(filter !=="none" && !elements[i].getElementsByClassName('element-taglist')[0].innerHTML.includes(filter)){
                // if something is being filtered and the element is not part of it
                if(!elements[i].classList.contains("portfolio-hidden")){
                    elements[i].classList.toggle("portfolio-hidden");
                }
            }
            else{
                if(elements[i].classList.contains("portfolio-hidden")){
                    // if nothing is being filtered or if the element is part fo the filter
                    elements[i].classList.toggle("portfolio-hidden");
                }
            }
        }
       

    },[filter]);

    return(
        <>
            <nav ref={refContent} onClick={(e)=>{e.stopPropagation();}}>
                <label>{lang==="fr"? "Filtre : ": "Filter : " }</label>
                <select value={filter} onChange={(e)=>{setFilter(e.target.value)}}> 
                    <option value="none">none</option>
                    {taglistRender}
                </select>
                <button onClick={clearFilter}>{lang==="fr"?"Effacer":"Clear"}</button>
            </nav>
            {portfolioRender}
        </>
    );
}

export default Portfolio;