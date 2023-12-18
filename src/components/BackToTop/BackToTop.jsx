import React,{useEffect,useState} from 'react';

export default function BackToTop() {

    const [backToTopBtn, setBackToTopBtn] = useState(false);

    useEffect(()=>{
         window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setBackToTopBtn(true);
            } else {
                setBackToTopBtn(false);
            }
         })
    },[])

    function scrollTop(){
        window.scrollTo({
          top:0,
           behavior:'smooth' 
        })
    }
  return <>

        {backToTopBtn && (
            <button  style={{
                position:"fixed",
                bottom:"40px",
                right:"20px",
                height:"40px",
                width:"40px",
                fontSize:"29px",
                background:"linear-gradient(45deg, #0b0020, #107f83)",
                border: "1px",
                borderStyle:"solid",
                borderColor:"#fff",
                borderRadius:"50%",
                textAlign:"center",
                color:"#fff"
            }}
            onClick={scrollTop}
            >^</button>
        )}

    </> 
}
