import { Link } from "react-router-dom"
import Button from "@mui/material/Button";
export default function Header(){
    return (
        <>
            <div 
            style={{width:'100%',background:'silver',display:'flex',flexWrap:'wrap',
            justifyContent:'center',gap:'80%',alignItems:'center'}}>
                <div style={{display:'flex',justifyContent:'center' ,alignItems:'center',gap:5}}>
                    <Link to='/'>
                        <Button  variant="outlined" color="success" >time praying </Button>
                    </Link>
                    <Link to='/quran'>
                        <Button variant="outlined" color="success" >quran </Button>
                    </Link>
                </div>
                <div>
                    <Link to='/'> 
                        <div >
                            <img style={{width:'40px',height:'40px',borderRadius:'20px'}} 
                            src="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2" alt=''/>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}
