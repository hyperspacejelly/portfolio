import './css/links.css';
import React from 'react';


function Links({content}){
    let i=0;

    const renderLinks = content.map((link)=>{
        i++;
        return(
            <section key={i} className='link-element'>
                <a href={link.url} onClick={(e)=>e.stopPropagation()} target='blank_'>{link.title}</a>
                <p>{link.desc}</p>
            </section>
        );
    })

    return(
        <div className='link-cont'>
            {renderLinks}
        </div>
    );
}


export default Links;