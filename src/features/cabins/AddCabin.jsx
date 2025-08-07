import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import { getCabins } from '../../services/apiCabins'
import Modal from '../../ui/Modal'

function AddCabin() {
    const [isopenModal, setIsopenModal] = useState(false)
    useEffect(() => { getCabins().then((data) => console.log(data)) }, [])
    return (
        <div>
            <Button variation="primary" onClick={() => { setIsopenModal(show => !show) }}> Add new Cabin</Button>

            {isopenModal && <Modal onClose={() => { setIsopenModal(false) }} ><CreateCabinForm /></Modal>}
        </div>
    )
}

export default AddCabin
