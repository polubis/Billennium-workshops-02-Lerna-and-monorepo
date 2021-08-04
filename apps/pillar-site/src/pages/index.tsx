import React from 'react'
import { Schema, minLength } from "@stackoff/schema";

export default () => {
    console.log(Schema('', [minLength(2)]))
    return (
        <div>Gatsby!!</div>
    )
}