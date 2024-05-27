import { useEffect, useState } from "react";
import { getAllCurruncy } from "../service/Services";
import Nav from "../components/Nav";

const Home = () => {
    document.title = "Home"

    const [responce, setResponce] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

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
            await setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (<img className="img-thumbnail m-5" src="https://media1.tenor.com/m/QWkK5z1NnbwAAAAC/no-brain-loading.gif" alt="Loading..." />)
    }
    
    if (error) {
        return(<h5 className="h5 text-danger">Error while getting the data</h5>)
    }

    return (
        <div>
            <Nav />
            <br />
            <div className="container">
                <h5 className="h3">Home</h5>
                <p>Live curruncy rates....</p>
                <hr />
            </div>                    
            <section className="container ">  
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Curruncy name</th>
                            <th scope="col">Per USD</th>
                            <th scope="col">Rate</th>
                        </tr>
                    </thead>            
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
                </table>
            </section>              
        </div>
    )
}
export default Home; 