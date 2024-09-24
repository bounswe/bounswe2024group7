import React from "react";
import { Badge } from "@chakra-ui/react";

const Label = ({
    title,
    value
}) => {
    return (
        <Badge colorScheme="purple" p={1}>
            {title}: {value}
        </Badge>
    );
}
export default Label;