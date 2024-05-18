/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import './styles.css'


const Componente = ({name, userName, formartUserName, isFollowingSet} ) => {

  const [isFollowing, setIsFollowing] = useState(isFollowingSet);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  }

  return (
   <article>
     <header>
     <img src={`https://unavatar.io/${userName}`} className="App-logo" alt="logo" />
      <div className='div1'>
        <strong>{name}</strong> <br></br>
        <span>{formartUserName(userName)}</span>
      </div> 
     </header>
     <aside>
        <button onClick={handleClick}>
          {isFollowing ? 'Seguiendo': 'Seguir'}
        </button>
     </aside>
   </article>
  )
}

function App() {
  const addUserName = (userName) => `@${userName}`
  const users= [
    {
      id: 1,
      name: "Sebastian Tovar",
      userName: "leoMessi",
      isFollowingSet: true,
    },
    {
      id: 2,
      name: "Juan Torres",
      userName: "cristiano",
      isFollowingSet: false,
    }
  ]
  
  return (
    <section className='app'>
      {
        users.map(user => {
          const {name, userName, isFollowingSet, id} = user;
          return (
            // eslint-disable-next-line react/jsx-key
            <Componente key={id} isFollowingSet={isFollowingSet} userName={userName} name={name} formartUserName={addUserName}/>
          )
        })
      }
    </section>
  )
}

export default App
