/*PORTFOLIO Structure :
Taglist : array of tags found in each element

Content : title => name of project
            url => url of project (if applicable)
            thumbnail => url of thumbnail image
            desc => text description pf project
            tech => tech used in project*/


function Portfolio({taglist, content}){
    let i=0;
    const portfolioRender = content.map((el)=>{
        i++;
        return(
            <div key={el.title+i}>
               <h3>{el.title}</h3> 
               <section>
                <p>{el.desc}</p>
                <p>{el.tech}</p>
               </section>
            </div>
        );
    });

    return(
        <>
            {portfolioRender}
        </>
    );
}

export default Portfolio;