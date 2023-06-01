import './css/portfolio.css';
import { useEffect, useState } from 'react';
import DropdownSelect from './DropdownSelect';

/*PORTFOLIO Structure :
imgDir : remote dir containing all the images for this section

Taglist : array of tags found in each element

Content :   title => name of project
            year => project date
            url => url of project (if applicable)
            thumbnail => url of thumbnail image
            desc => text description of project
            tech => tech used in project*/


function Portfolio({ content, taglist, imgDir, lang }) {
    const [filter, setFilter] = useState("none");
    let i = 0;

    const portfolioRender = content.map((el) => {
        i++;

        const title = el.url ? <a onClick={(e)=>e.stopPropagation()} target='blank_' href={el.url}>{el.title}</a> : el.title;

        let tags = el.tags.map((tag) => {
            return (
                <button key={el.title + "_" + tag + i} onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    tagHandleClick(tag);
                }}>
                    #{tag}
                </button>
            )
        });
        return (
            <div key={el.title + i} className='portfolio-element'>
                <h3 className='portfolio-title'>
                    {title} <span className='portfolio-year'>{el.year}</span></h3>
                <img src={imgDir + el.thumbnail} alt={el.title} />
                <section className='portfolio-text'>
                    <p>
                        <span className='portfolio-subheader'>Description</span>
                        {el.desc}
                    </p>
                    <p>
                        <span className='portfolio-subheader'>Tech</span>
                        {el.tech}
                    </p>
                </section>
                <section className='element-taglist'><span>Tags:</span> {tags}</section>
            </div>
        );
    });

    function scrollTop() {
        document.getElementById("portfolio").getElementsByClassName("tab-content")[0].scroll({ top: 0, behavior: 'smooth' })
    }

    function clearFilter(e) {
        e.stopPropagation();
        setFilter("none");
    }

    function tagHandleClick(tag) {
        scrollTop();
        setFilter(tag);
    }

    useEffect(() => {
        const elements = document.getElementsByClassName('portfolio-element');

        for (let i = 0; i < elements.length; i++) {
            if (filter !== "none" && !elements[i].getElementsByClassName('element-taglist')[0].innerHTML.includes(filter)) {
                // if something is being filtered and the element is not part of it
                if (!elements[i].classList.contains("portfolio-hidden")) {
                    elements[i].classList.toggle("portfolio-hidden");
                }
            }
            else {
                if (elements[i].classList.contains("portfolio-hidden")) {
                    // if nothing is being filtered or if the element is part fo the filter
                    elements[i].classList.toggle("portfolio-hidden");
                }
            }
        }


    }, [filter]);

    return (
        <>
            <nav className='portfolio-nav'>
                <DropdownSelect customClass='portfolio-select' optionList={taglist}
                    defaultValueName={lang === "fr" ? "Aucun filtre" : "No filter"} currValue={filter} valueSetFct={setFilter} />

                <button onClick={clearFilter}>{lang === "fr" ? "Effacer" : "Clear"}</button>
            </nav>
            {portfolioRender}
        </>
    );
}

export default Portfolio;