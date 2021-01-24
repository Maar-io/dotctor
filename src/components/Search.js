import React, { useState } from 'react'
import Query from './Query'
import { Form, Row, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'


export default function Search(props) {
  const [network, setNetwork] = useState('polkadot')
  const [utility, setUtility] = useState('blockchain')
  const [mini, setMini] = useState(false)
  const [sort, setSort] = useState(false)

  const onUtilityChange = (val) => {
    setUtility(val)
    console.log("new value for utility =", val)
  }

  const onNetworkChange = (val) => {
    setNetwork(val)
    console.log("new value for net =", val)
  }

  const miniEnabled = () => {
    setMini(oldValue => !oldValue)
  }

  const sortCommit = () => {
    setSort(oldValue => !oldValue)
  }

  console.log("search", network, utility)

  return (
    <>
      <Form>
        <Form.Group as={Row} className="ml-1 mt-1 justify-content-md-center">

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
              value='bridge'
              checked={utility === 'bridge'}
              onClick={onUtilityChange}>bridge</ToggleButton>

          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group as={Row} className="ml-1 justify-content-md-center">

          <ToggleButtonGroup type="radio" name="utilRadios" value={utility} onChange={onUtilityChange} size="sm">
            <ToggleButton variant="secondary"
              value='parachain'
              checked={utility === 'parachain'}
              onClick={onUtilityChange}>parachain</ToggleButton>
            <ToggleButton variant="secondary"
              value='ethereum'
              checked={utility === 'ethereum'}
              onClick={onUtilityChange}>ethereum</ToggleButton>
            <ToggleButton variant="secondary"
              value='explorer'
              checked={utility === 'explorer'}
              onClick={onUtilityChange}>explorer</ToggleButton>
            <ToggleButton variant="secondary"
              value='nft'
              checked={utility === 'nft'}
              onClick={onUtilityChange}>nft</ToggleButton>
            <ToggleButton variant="secondary"
              value=''
              checked={utility === ''}
              onClick={onUtilityChange}>none</ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group as={Row} className="ml-1 justify-content-md-center">
          <Form.Check
            type="switch"
            id="mini"
            label="Mini "
            onChange={miniEnabled}
          />
          <Form.Check
            type="switch"
            id="sort"
            label="Sort star/commit"
            onChange={sortCommit}
          />
        </Form.Group>
      </Form>
      <hr style={{
        color: '#333',
        height: .5,
        borderColor: '#000000'
      }} />
      <Query network={network} utility={utility} mini={mini} sort={sort}/>
    </>
  )
}
