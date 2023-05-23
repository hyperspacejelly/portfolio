import './css/experience.css';

function Experience({content, lang}){
    let i=0;
    const renderExpPro = content["experience-pro"].map((job)=>{
        let j=0;
        const compList = job.competences.map((comp)=>{
                    j++;
                    return(<li key={comp+i+j}>{comp}</li>);
                }
            );
        i++;
        return(
            <div key={"exp-pro-"+i} className="exp-element">
                 <h4 className="exp-period">
                    {job.periode}
                </h4>
                <h3 className="exp-title">
                    {job.desc}
                </h3>
                <ul className="exp-list">
                    {compList}
                </ul>
            </div>
        );
    });

    const renderFormations = content["formations"].map((elem)=>{
        i++;
        return(
            <div key={"formations-"+i} className="exp-element">
                <h4 className="exp-period">
                    {elem.periode}
                </h4>
                <h3 className="exp-title">
                    {elem.desc}
                </h3>
            </div>
        )
    })

    return(
        <>
            <section id="expPro">  
                <h2 className='exp-section-title'>{lang==="fr"?"Experience professionnelle":"Professional experience"}</h2>
                <div className="exp-section">
                    {renderExpPro}
                </div>
            </section>  
            <section id="expFormations">
                <h2 className='exp-section-title'>{lang==="fr"?"Formations":"Education"}</h2>
                <div className="exp-section">
                    {renderFormations}
                </div>
            </section>
        </>
    );
}

export default Experience;