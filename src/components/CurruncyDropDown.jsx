import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'

function CurruncyDropDown({ data , onSelect}) {
    const [selectedCurrency, setSelectedCurrency] = useState(null);

    const handleSelect = (item) => {
        setSelectedCurrency(item);
        onSelect(item);
    }

    return (
        <div className='container m-2'> 
            {data && 
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle>
                        {selectedCurrency || 'Select Currency'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {Object.entries(data).map(([currencyCode]) => (
                            <Dropdown.Item
                                key={currencyCode}
                                eventKey={currencyCode}>
                                {currencyCode}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            }
        </div>
    );
}


export default (CurruncyDropDown);