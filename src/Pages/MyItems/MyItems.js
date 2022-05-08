import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const MyItems = () => {
    let { updateId } = useParams();
    const [medicines, setMedicines] = useState([]);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/myitems`, {
            method: "GET",
            headers: {
                token: localStorage.getItem("token"),
            },
        })
            .then(res => res.json())
            .then(json => {
                setMedicines(json);
                console.log(setMedicines(json));
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure ???');
        if (proceed) {
            const url = `http://localhost:5000/medicine/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    const remaining = medicines.filter(service => service._id !== id);
                    setMedicines(remaining);
                })

        }
    }
    return (
        <div className='container my-5'>
            <div className="section-heading my-5">
                <h3 className='text-center'>My Items</h3>
                <div className='d-flex justify-content-center'>
                    <span className="animate-border border-black"></span>
                </div>
            </div>
            <div className='my-3'>
                <h5>You login with: {user.email}</h5>
            </div>
            <div className=''>
                <button onClick={() => navigate('/additems')} className='add-new-items'>ADD NEW ITEMS</button>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='myItems'>
                    <h1>{updateId}</h1>
                    {

                        medicines.map(medicine =>
                            <div key={medicine._id}>
                                <div className='manage-items-container'>
                                    <h5 className=''>
                                        <span className='supplier-myitems mx-2'>{medicine.supplier_name}: </span>
                                        <span>{medicine.medicine_name}</span>
                                    </h5>
                                    <div className='d-md-flex justify-content-center mb-3'>
                                        <img src={medicine.picture} alt="" className='img-fluid manage-pic me-3 p-2' />
                                        <p className='py-3'>
                                            {medicine.sort_description}
                                        </p>
                                    </div>

                                    <div className='p-2 text-center'>
                                        <p >Price: {medicine.price}</p>
                                        <p>Quantity: {medicine.quantity}</p>
                                    </div>
                                    <div>
                                        <span onClick={() => handleDelete(medicine._id)}> <MdDeleteForever className='delete-btn' /></span>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyItems;