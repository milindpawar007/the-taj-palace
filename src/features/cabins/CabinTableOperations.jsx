import React from 'react'

import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

function CabinTableOperations() {
    return (
        <TableOperations >
            <Filter fliterField={"discount"}
                options={
                    [
                        { value: 'all', label: "All" },
                        { value: 'no-discount', label: "No Discount" },
                        { value: 'with-discount', label: "With Discount" }
                    ]
                } />
            <SortBy options={[
                { value: 'name-asc', label: 'Name (A–Z)' },
                { value: 'name-desc', label: 'Name (Z–A)' },
                { value: 'regularPrice-asc', label: 'Price (Low → High)' },
                { value: 'regularPrice-desc', label: 'Price (High → Low)' },
                { value: 'maxCapacity-asc', label: 'Capacity (Low → High)' },
                { value: 'maxCapacity-desc', label: 'Capacity (High → Low)' }
            ]}>
            </SortBy>
        </TableOperations>
    )
}

export default CabinTableOperations
