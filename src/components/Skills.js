/* Skills Structure
title => name of the skill
desc => description of the skill
ex => (title, url) project the skill was used in*/

import "./css/skills.css";

function Skills({content, lang}){
    let i = 0;
    const skillListRender = content.map((el)=>{
        let j = 0;
        const subSkillRender = el.desc.map((skill)=>{
            j++;
            return(
                <li key={"skills"+i+j} className="skills-example">
                    {skill}
                </li>);
        })

        i++;
        return(
            <div key={el.title + i} className="skills-element">
                <h3>{el.title}</h3>
                <section className="skills-content">
                    <ul>
                        {subSkillRender}
                    </ul>
                </section>
            </div>
        );
    });


    return(
        <div className="skills-cont">
            {skillListRender}
        </div>
    );    
}

export default Skills;