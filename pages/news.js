import React,{useState,useEffect} from 'react'
import Menu from '../components/News/Menu.js'
import NewsGrid from '../components/News/NewsGrid.js'
function news() {
    const [items,setItems]=useState([]);
    const [active,setActive]=useState(1);
    const [category,setCategory]=useState("general")

    useEffect(()=>{
        fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=cecd5d9595d8439fba58db7fc8e372ab`)
        .then(res=>res.json())
        .then(data=>setItems(data.articles))
    },[category])

  return (
    <div className='App'>
        <h1 className='title'>Просмотри наши новости</h1>
        <Menu active={active} setActive={setActive} setCategory={setCategory}/>
        <NewsGrid items={items}/>
    </div>
  )
}

export default news