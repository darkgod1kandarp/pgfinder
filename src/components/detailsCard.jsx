import React from 'react'
import { useParams } from 'react-router';
const DetailedCard = () => {
    const {name,pgid}=useParams()
    console.log(name,pgid)
    return (
    <div className="">{name}{pgid}</div>
    );
}
 
export default DetailedCard;