import { useEffect, useRef, useState } from "react";
import { getAllCurruncy } from "../service/Services";
import Nav from "../components/Nav";

const Home = () => {
    document.title = "Home"

    const [responce, setResponce] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const searcBox = useRef(null);

    useEffect(() => { 
        const fetchData = async () => {
            setLoading(true);
            try {
                const resp = await getAllCurruncy();
                setResponce(resp.data.rates);
                setError(false);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
    };
        fetchData();
        searcBox.current.focus();
    }, [])
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            searcBox.current.focus();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            };
    }, []);
    
    return (
        <div>
            <Nav />
            <br />
            <div className="container">
                <h5 className="h3">Home</h5>
                <p>Live Curruncy rates....</p>
                <hr />
                <div className=" container input-group mb-3 p-3 text-white" >
                    <span className="input-group-text fs-6">Search Curruncy here...</span>
                    <input type="text" className="form-control" placeholder='Example "GBP"' ref={searcBox} />
                </div>
                <hr/>
            </div>
            {error ?
                <div className="container">
                    <h5 className="h5 text-danger">Error while getting the data</h5>
                </div>
                :
                <>
                    {loading ?
                            <img className="img-thumbnail m-5" src="https://media1.tenor.com/m/QWkK5z1NnbwAAAAC/no-brain-loading.gif" alt="Loading..." />
                        :
                <section className="container ">  
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Curruncy Name</th>
                                    <th scope="col">Per USD</th>
                                    <th scope="col">Rate</th>
                                </tr>
                                </thead>
                                <> 
                            {responce &&
                                <tbody>
                                    {Object.entries(responce).map(([currencyCode, exchangeRate]) => (
                                        <tr key={currencyCode}>
                                            <td>{currencyCode}</td>
                                            <td>1</td>
                                            <td>{exchangeRate.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                }
                            </> 
                        </table>
                        </section>
                    }
                </>
            }               
        </div>
    )
}
export default Home; 