import React, {useState, useEffect } from 'react'
import axios from 'axios';

const useStarWars = () => {
    const [swChars, setSwChars] = useState([]);

    useEffect(() => {
        
        const init = async() => {
          const response = await axios("https://akabab.github.io/starwars-api/api/all.json")
          setSwChars(response.data)
        }

        init()
      }, []);
    
    return {
        swChars
    }
}

export default useStarWars;

/*
* Notes:



*/