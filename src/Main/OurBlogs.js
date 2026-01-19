import React, { useEffect } from 'react'
import {GetApi} from '../CallApi'
import Book from './Book.module.css'
import { Link } from 'react-router'
import { useState } from 'react';


const OurBlogs = () => {  
  const Blogs=GetApi("https://healquickbackend-1.onrender.com/blog")
  const [filteredBlogs, setFilteredBlogs] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [query, setQuery]=useState("")
   const finalData = filteredBlogs.length > 0 ? filteredBlogs : Blogs;
   const handleSearch=(e)=>{
    const filtered = Blogs.filter((item) =>
      item.blog_title.toLowerCase().includes(query.toLowerCase())
    );
     setFilteredBlogs(filtered);
  setCurrentPage(1);
     
   }
   const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
   const cardsPerPage = 3;

  // Calculate index range
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  // Slice cards for current page
  const currentCards = finalData.slice(firstCardIndex, lastCardIndex);

  // Total number of pages
  const totalPages = Math.ceil(finalData.length / cardsPerPage);

  // Handlers
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className={Book.head}>
    <div className={`${Book.BlogBanner}`}>
      <div  className={`${Book.title}`}>
        <h1>OUR BLOGS</h1>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Our Blog</li>
        </ol>
        </nav>
        </div>
    </div>
    <div className={Book.Blogs}>
    <div className="container ">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          padding: "10px",
          width: "200px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      
      <button onClick={handleSearch}><i class="bi bi-search"></i></button>
      <div className='row'>
        <div className='col-lg-8'>
              
          {currentCards.map((blog,index)=>{return (
                    <div className={`mb-3 ${Book.BlogMain}`}>
                <div key={index} className='row '>
                    <div className='col-lg-4 p-0'><img src={`https://healquickbackend-1.onrender.com/${blog.blog_image}`} alt='Blog_image' className={Book.blogImg} /></div>
                    <div className={`col-lg-8 ${Book.BlogContent}`}>
                        <h1>{blog.blog_title}</h1>
                        <p className='text-break'>{blog.blog_description}</p>
                    </div>
                </div>
                </div>
                )})
  }
                <div style={{ marginTop: "20px" }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
        </div>
        <div className={`col-lg-4 mb-5 ${Book.BlogSuggest}`}>
          <div>
            <h3><i class="bi bi-search"></i> Recent post</h3>
            <ul className='p-0'>
            {Blogs.slice(Blogs.length-6,Blogs.length).reverse().map((blog,index)=>{
              return(
                  <li><h3><i class="bi bi-caret-right-fill"></i> {blog.blog_title}</h3></li>
              )
            })}
            </ul>
          </div>
        </div>
      </div>
      </div>
            
                
            
    </div>
        </div>
        
  )
}

export default OurBlogs