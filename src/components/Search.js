import React, { useState } from 'react'
import Query from './Query'
import { Form, Row, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'


export default function Search(props) {
    const [network, setNetwork] = useState('polkadot')
    const [utility, setUtility] = useState('blockchain')

    const onUtilityChange = (val) => {
        setUtility(val)
        console.log("new value for utility =", val)
    }

    const onNetworkChange = (val) => {
        setNetwork(val)
        console.log("new value for net =", val)
    }

    console.log("search", network, utility)
    // return (
    //     <>
    //     <Form>
    //         <Form.Group as={Row} className="justify-content-md-center">
    //         <Col md={3} xs={6}>
    //             <Form.Check
    //             type="radio"
    //             label="polkadot"
    //             name="network"
    //             value="polkadot"
    //             checked={network === 'polkadot'}
    //             onChange={onNetworkChange}
    //             />
    //             <Form.Check
    //             type="radio"
    //             label="kusama"
    //             name="network"
    //             value="kusama"
    //             checked={network === 'kusama'}
    //             onChange={onNetworkChange}
    //             />
    //             <Form.Check
    //             type="radio"
    //             label="substrate"
    //             name="network"
    //             value="substrate"
    //             checked={network === 'substrate'}
    //             onChange={onNetworkChange}
    //             />
    //         </Col>
    //         <Col md={3} xs={6}>
    //             <Form.Check
    //             type="radio"
    //             label="blockchain"
    //             name="formHorizontalRadios"
    //             value="blockchain"
    //             checked={utility === 'blockchain'}
    //             onChange={onUtilityChange}               
    //             />
    //             <Form.Check
    //             type="radio"
    //             label="wallet"
    //             name="formHorizontalRadios"
    //             value="wallet"
    //             checked={utility === 'wallet'}
    //             onChange={onUtilityChange}                
    //             />
    //             <Form.Check
    //             type="radio"
    //             label="defi"
    //             name="formHorizontalRadios"
    //             value="defi"
    //             checked={utility === 'defi'}
    //             onChange={onUtilityChange}                
    //             />
    //             <Form.Check
    //             type="radio"
    //             label="cryptocurrency"
    //             name="formHorizontalRadios"
    //             value="cryptocurrency"
    //             checked={utility === 'cryptocurrency'}
    //             onChange={onUtilityChange}                
    //             />
    //             <Form.Check
    //             type="radio"
    //             label="ethereum"
    //             name="formHorizontalRadios"
    //             value="ethereum"
    //             checked={utility === 'ethereum'}
    //             onChange={onUtilityChange}                
    //             />
    //             <Form.Check
    //             type="radio"
    //             label="none"
    //             name="formHorizontalRadios"
    //             value=""
    //             checked={utility === ''}
    //             onChange={onUtilityChange}                
    //             />
    //         </Col>
    //         <Col>
    //             <Form.Check 
    //                 type="switch"
    //                 id="custom-switch"
    //                 label="mini view"
    //                 />
    //         </Col>
    //         </Form.Group>
    // </Form>
    // <div>
    //     <Query network={network} utility={utility} mini={true}/>
    // </div>
    // </>
    // )
    return (
        <>
            <Form>
                <Form.Group as={Row} className="ml-1 justify-content-md-center">

                    <ToggleButtonGroup type="radio" name="networkRadios" value={network} onChange={onNetworkChange}>
                        <ToggleButton variant="info"
                            value='polkadot'
                            checked={network === 'polkadot'}
                            >Polkadot</ToggleButton>
                        <ToggleButton variant="info"
                            value='kusama'
                            checked={network === 'kusama'}
                            >Kusama</ToggleButton>
                        <ToggleButton variant="info"
                            value='substrate'
                            checked={network === 'substrate'}
                            >Substrate</ToggleButton>
                    </ToggleButtonGroup>
                </Form.Group>
    
                <Form.Group as={Row} className="ml-1 justify-content-md-center">

                    <ToggleButtonGroup type="radio" name="utilRadios" value={utility} onChange={onUtilityChange} size="sm">
                        <ToggleButton variant="secondary"
                            value='blockchain'
                            checked={utility === 'blockchain'}
                            onClick={onUtilityChange}>blockchain</ToggleButton>
                        <ToggleButton variant="secondary"
                            value='wallet'
                            checked={utility === 'wallet'}
                            onClick={onUtilityChange}>wallet</ToggleButton>
                        <ToggleButton variant="secondary"
                            value='defi'
                            checked={utility === 'defi'}
                            onClick={onUtilityChange}>defi</ToggleButton>
                        <ToggleButton variant="secondary"
                            value='cryptocurrency'
                            checked={utility === 'cryptocurrency'}
                            onClick={onUtilityChange}>cryptocurrency</ToggleButton>
                        <ToggleButton variant="secondary"
                            value='ethereum'
                            checked={utility === 'ethereum'}
                            onClick={onUtilityChange}>ethereum</ToggleButton>
                        <ToggleButton variant="secondary"
                            value=''
                            checked={utility === ''}
                            onClick={onUtilityChange}>-</ToggleButton>
                    </ToggleButtonGroup>
                </Form.Group>
            </Form>
            <div>
                <Query network={network} utility={utility} mini={true} />
            </div>
        </>
    )
}
