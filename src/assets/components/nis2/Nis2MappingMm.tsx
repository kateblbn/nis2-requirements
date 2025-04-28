import React from 'react'
import './Nis2MappingMm.css'
import { Nis2ToMmSepAndBu } from '../maturity-model/Data';

type Nis2MappingMmProps = {
  nis2ToSepMmTable: Nis2ToMmSepAndBu[] | undefined;
}
export default function Nis2MappingMm({nis2ToSepMmTable}: Nis2MappingMmProps) {
  console.log(nis2ToSepMmTable);
  
  return (
    <div className='mm-header'>
      <h2>Maturity Model Control Mapping</h2>
    </div>
  )
}
