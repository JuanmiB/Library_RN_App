import React from "react";
import LinearGradient from "react-native-linear-gradient";

const GradientBg = ({children}) => {
    return (
        <LinearGradient
            colors={["#DDD6CC", "#FEF9E0", "#FFFAF0"]}
            style={{height: "100%"}}

        > 
        {children}
        </LinearGradient>
    )
}

export default GradientBg;