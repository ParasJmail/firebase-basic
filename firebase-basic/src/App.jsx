import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Auth } from './component/auth'
import { db,auth } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc,updateDoc } from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = useState([]);

  //New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isOscar, setIsOscar] = useState(false);

  // Update title State
  const [updatedTitle,setUpdateTitle] = useState("");


  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    // Read data
    // set the movie list
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMovieList();
  }, [])

  const onSubmitMovie = async () => {

    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedOscar: isOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }

  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);

    getMovieList();

  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc,{title : updatedTitle});

    getMovieList();

  }


  return (
    <>
      <div>
        <Auth />

        <div>
          <input type="text" placeholder='movie title' onChange={(e) => setNewMovieTitle(e.target.value)} />
          <input type="number" placeholder='release Date' onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
          <input type="checkbox" checked={isOscar} onChange={(e) => setIsOscar(e.target.checked)} />
          <label htmlFor="">Received and oscar</label>
          <button onClick={onSubmitMovie} >Submit movie</button>
        </div>



        <div>
          {movieList.map((movie) => (
            <div>
              <h1 style={{ color: movie.receivedOscar ? "green" : "red" }}>{movie.title}</h1>
              <p>Date : {movie.releaseDate}</p>
              <button onClick={() => deleteMovie(movie.id)} >Delete Movie</button>
            
              <input type="text" placeholder='new title' onChange={(e) => setUpdateTitle(e.target.value)}/>
              <button onClick={() => updateMovieTitle(movie.id)}>update title</button>
            
            </div>

          ))}
        </div>
      </div>

    </>
  )
}

export default App
