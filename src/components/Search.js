import React, { useState }from 'react'
import Query from './Query'
import { Form, Row, Col} from 'react-bootstrap'


export default function Search(props) {
    const[network, setNetwork] = useState('polkadot')
    const[utility, setUtility] = useState('blockchain')
    
    const onUtilityChange = (e) => {
        setUtility(e.target.value)
        console.log("util ", utility)
      }

    const onNetworkChange = (e) => {
        setNetwork(e.target.value)
        console.log("net ", network)
      }

    console.log("search", network, utility)
    return (
        <>
        <Form>
            <Form.Group as={Row}>
            <Col sm={2}>
                <Form.Check
                type="radio"
                label="polkadot"
                name="network"
                value="polkadot"
                checked={network === 'polkadot'}
                onChange={onNetworkChange}
                />
                <Form.Check
                type="radio"
                label="kusama"
                name="network"
                value="kusama"
                checked={network === 'kusama'}
                onChange={onNetworkChange}
                />
                <Form.Check
                type="radio"
                label="substrate"
                name="network"
                value="substrate"
                checked={network === 'substrate'}
                onChange={onNetworkChange}
                />
            </Col>
            <Col sm={10}>
                <Form.Check
                type="radio"
                label="blockchain"
                name="formHorizontalRadios"
                value="blockchain"
                checked={utility === 'blockchain'}
                onChange={onUtilityChange}               
                />
                <Form.Check
                type="radio"
                label="wallet"
                name="formHorizontalRadios"
                value="wallet"
                checked={utility === 'wallet'}
                onChange={onUtilityChange}                
                />
                <Form.Check
                type="radio"
                label="defi"
                name="formHorizontalRadios"
                value="defi"
                checked={utility === 'defi'}
                onChange={onUtilityChange}                
                />
                <Form.Check
                type="radio"
                label="cryptocurrency"
                name="formHorizontalRadios"
                value="cryptocurrency"
                checked={utility === 'cryptocurrency'}
                onChange={onUtilityChange}                
                />
                <Form.Check
                type="radio"
                label="ethereum"
                name="formHorizontalRadios"
                value="ethereum"
                checked={utility === 'ethereum'}
                onChange={onUtilityChange}                
                />
                <Form.Check
                type="radio"
                label="none"
                name="formHorizontalRadios"
                value=""
                checked={utility === ''}
                onChange={onUtilityChange}                
                />
            </Col>
            </Form.Group>
    </Form>
    <div>
        <Query network={network} utility={utility}/>
    </div>
    </>
    )
}
