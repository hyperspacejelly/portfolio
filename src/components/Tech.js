/* Tech Structure
title => name of the tech
desc => description of the tech
ex => project the tech was used in*/

function Tech({content}){
    let i = 0;
    const techListRender = content.map((el)=>{
        i++;
        return(
            <div key={el.title + i}>
                <h3>{el.title}</h3>
                <section>
                    <p>{el.desc}</p>
                    <p>{el.ex}</p>
                </section>
            </div>
        );
    });


    return(
        <>
            {techListRender}
        </>
    );    
}

export default Tech;