import './css/dropdown.css';

function DropdownSelect({customClass = "", optionList, defaultValueName, currValue, valueSetFct}){
    
    const renderOptionList = optionList.map((option)=>{
        return(
            <div className="dropdown-option" key={option} onClick={(e)=>{selectOption(e, option)}}>
                {option}
            </div>);
    });

    function dropdownClick(e){
        e.stopPropagation();
        e.target.parentElement.getElementsByClassName("dropdown-active-menu")[0].classList.toggle("dropdown-active-hidden");
    }

    function closeDropdown(e){
        e.stopPropagation();
        if(!document.getElementsByClassName("dropdown-active-menu")[0].classList.contains("dropdown-active-hidden")){
            document.getElementsByClassName("dropdown-active-menu")[0].classList.toggle("dropdown-active-hidden");
        }
    }

    function selectOption(e, value){
        const setValue = value === defaultValueName? "none" : value;

        e.stopPropagation();
        valueSetFct(setValue);
        closeDropdown(e);
    }


    return(
        <div className={"dropdown-select "+customClass} onMouseLeave={closeDropdown}>
            <div className="dropdown-base" onClick={dropdownClick}>
                {currValue==="none"? defaultValueName : currValue}
            </div>
            <div className="dropdown-active-menu dropdown-active-hidden">
                <div className="dropdown-option" onClick={(e)=>{selectOption(e, 'none')}}>
                    {defaultValueName}
                </div>
                {renderOptionList}
            </div>
        </div>
    );
}

export default DropdownSelect;