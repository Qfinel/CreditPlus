import { useState, useEffect } from 'react'

const useApiOptions = (url: string, type: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { method: 'GET' });
        const result = await response.json();

        result.unshift(type)

        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return data;
}

export default useApiOptions
