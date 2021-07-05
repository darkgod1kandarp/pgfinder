import {Verifier}  from "verifierjs/index";
console.log(Verifier)
export const Name = (value) => {
    
    return new Verifier(value).isUsername({username:/^[a-zA-Z]+$/}).isLengthen("gt1").details;
}

export const MobileNumber =(value)=>{

    return new Verifier(value).isUsername({username:/^[0-9]+$/}).isLengthen(10).details;
    
}

export const aadhar=(value)=>{

    return new Verifier(value).isUsername({username:/^[2-9]+[0-9]+$/}).isLengthen(12).details;
    
}
export const email =(value)=>{
    return new Verifier(value).isUsername({username:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/}).isLengthen("gt5").details
}

export const address=(value)=>{
    return new Verifier(value).isLengthen("gt10").details;
    
}

