import React from "react";
import {Badge} from "@chakra-ui/react";
const Label = ({name})=>{
    return(
    <Badge borderRadius="full" px="2" colorScheme="teal">
            {name}
    </Badge>
    );
}
export default Label;