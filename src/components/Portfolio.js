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


function Portfolio({content, taglist, imgDir}){
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
        let tags = el.tags.map((tag)=>{return(tag+" ")}); 
        return(
            <div key={el.title+i} className='portfolio-element'>
               <h6 style={{visibility: 'collapse'}}>{tags}</h6>
               <h3>{el.title}</h3> 
               <img src={imgDir + el.thumbnail} alt={el.title}/>
               <section>
                <p>{el.desc}</p>
                <p>{el.tech}</p>
               </section>
            </div>
        );
    });

    useEffect(()=>{
        console.log(filter);

        const elements = document.getElementsByClassName('portfolio-element');

        for(let i=0; i<elements.length; i++){
            if(filter !== "none"){
                elements[i].style.visibility = elements[i].innerHTML.includes(filter)?'inherit':'collapse';
            }else{
                elements[i].style.visibility = 'inherit';
            }
        }

    },[filter]);

    return(
        <>
            <nav ref={refContent} onClick={(e)=>{e.stopPropagation();}}>
                <label>Filter: </label>
                <select value={filter} onChange={(e)=>{setFilter(e.target.value)}}> 
                    <option value="none">none</option>
                    {taglistRender}
                </select>
            </nav>
            {portfolioRender}
        </>
    );
}

export default Portfolio;