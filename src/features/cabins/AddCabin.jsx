import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import { getCabins } from '../../services/apiCabins'
import Modal from '../../ui/Modal'
import CabinTable from './CabinTable'


function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens='cabin-form'>
                <Button variation="primary"> Add new Cabin</Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateCabinForm />
            </Modal.Window>

            <Modal.Open opens='table'>
                <Button variation="primary"> Show Table</Button>
            </Modal.Open>
            <Modal.Window name='table'>
                <CabinTable />
            </Modal.Window>
        </Modal>


    )
}



// function AddCabin() {
//     const [isopenModal, setIsopenModal] = useState(false)
//     useEffect(() => { getCabins().then((data) => console.log(data)) }, [])
//     return (
//         <div>
//             <Button variation="primary" onClick={() => { setIsopenModal(show => !show) }}> Add new Cabin</Button>

//             {isopenModal && <Modal onClose={() => { setIsopenModal(false) }} ><CreateCabinForm onCloseModal={() => { setIsopenModal(false) }} /></Modal>}
//         </div>
//     )
// }

export default AddCabin
