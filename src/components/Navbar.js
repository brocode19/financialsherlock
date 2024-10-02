import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import profile_pic from './avatars/norkias.jpeg'
import { IconContext } from 'react-icons';

function Navbar() {

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
      // 👇️ toggle
      setIsActive(current => !current);
  
      // 👇️ or set to true
      // setIsActive(true);
    };


  return (

    <>
                          <aside style={{
          display: isActive ? 'block' : '',
          
        }}>
              <div className='top'>
                <div  className='logo'>
                  <img className='profile-photo' src={profile_pic} alt='logo'/>
                  <h2 className='text_color'>Norkias</h2>
                </div>
                <IconContext.Provider
                value={{ color: 'white', size:'1.2em' }}>
                <div className='close' id='close-btn'>
                <AiIcons.AiOutlineClose onClick={handleClick}/>
                </div>
                </IconContext.Provider>

              </div>

              <div className='sidebar'> 

              <IconContext.Provider
                value={{ color: '' }}
                >

              {SidebarData.map((item, index) => {
              return (
                <div key={index} className={item.cName}>
                  <Link
                  style={{textDecoration:"none"}}
                   to={item.path} >
                    <div className='navigation-items '>
                    <span className='sidebar-item'>{item.icon}</span>
                    <h2 className='sidebar-item'>{item.title}</h2>
                    </div>
                    
                  </Link>
                </div>
              );
            })}

            </IconContext.Provider>

              </div>



            </aside>  

            <div className='nav-bar pages'>

            <IconContext.Provider
                value={{ color: 'black', size:'2em' }}
                
                >
                <div className='menu-bars'>                       
                    <Link to='#' className='menu-bars'><FaIcons.FaBars onClick={handleClick}/></Link>
                    </div>
                </IconContext.Provider>

                <div className='user-info me-4'>
            
                <div className='profile'>
                    {/* <div className='infor'>
                        <p>hey, <b>Jackie</b> </p>
    
                    </div> */}
                    <div className='profile-photo'>
                        <img className='profile-photo' src={profile_pic} alt='profile pic'/>
                    </div>
                </div>
                    


                </div>
               
            </div>

    </>






  )
}

export default Navbar