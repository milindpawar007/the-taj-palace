import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import { getCabins } from '../../services/apiCabins'
import Modal from '../../ui/Modal'
import CabinTable from './CabinTable'


function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens='cabin-form'>
                    <Button variation="primary"> Add new Cabin</Button>
                </Modal.Open>
                <Modal.Window name='cabin-form'>
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>

    )
}




export default AddCabin
