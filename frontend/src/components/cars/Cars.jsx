import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function Cars() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/cars')
            .then(response => {
                setCars(response.data);
            })
    }, []);
    return (
        <div className="container mt-5 bg-body-secondary">
            <div className='row'>
                <div className="col-md-12" >
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center text-primary mb-4">Véhicules</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Marque</th>
                                        <th scope="col">Modele</th>
                                        <th scope="col">Prix</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars.map(car => (
                                        <tr key={car.id}>
                                            <td>{car.id}</td>
                                            <td>{car.marque}</td>
                                            <td>{car.modele}</td>
                                            <td>{car.prix}</td>
                                            <td>
                                                <NavLink to={`/carDetails/${car.id}`} className="btn btn-primary me-2">Voir</NavLink>
                                                <NavLink to={`/updateCar/${car.id}`} className="btn btn-success me-2">Modifier</NavLink>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )
}