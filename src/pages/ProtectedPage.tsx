import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const ProtectedPage = () => {
  const [term, setTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          const response = await axios.get('http://localhost:1337/api/sessions');
          if (response.status === 200) {
            console.log(response.data);
            setTerm('authorized');
          } else {
            setTerm('not authorized');
          }
        } else {
          setTerm('not authorized');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setTerm('not authorized');
      }
    };
    fetchData();
  }, []);
  let list = [1, 2,3 , 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid items-center justify-center sm:grid-cols-1 md:grid-cols-5"> 
      {term}
      {
        list.map((item) => {
            return(
                <Card className="w-[300px]">
                <CardHeader>
                <CardTitle>Thumbnail</CardTitle>
                <CardDescription> <p>Here Lies the video Description</p> </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Title</p>
                </CardContent>
                </Card>
            )
        })
      }
    </div>
  );
};

export default ProtectedPage;
