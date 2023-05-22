import React from 'react'

function Menu({active, setActive, setCategory}) {
    const links = [
        { id: 1, name: "Главные", value: "general" },
        { id: 2, name: "Бизнес", value: "business" },
        { id: 3, name: "Развлечение", value: "entertainment" },
        { id: 4, name: "Здоровье", value: "health" },
        { id: 5, name: "Наука", value: "science" },
        { id: 6, name: "Спорт", value: "sports" },
        { id: 7, name: "Технологии", value: "technology" },
    ]

    function onClick(id,value){
        setActive(id)
        setCategory(value)
    }

    return(
        <nav className="menu">
            <ul>
                {links.map(link=>(
                    <li
                        key={link.id}
                        className={active===link.id ? "active" :"inactive"}
                        onClick={()=>onClick(link.id,link.value)}
                    >
                        {link.name}
                    </li>
                ))}
            </ul>
        </nav>
    )
    
}
export default Menu