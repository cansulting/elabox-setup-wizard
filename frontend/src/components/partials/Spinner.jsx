import { SpinnerCircular,SpinnerDotted } from "spinners-react"

export default function Spinner ({marginTop = 50 , color = "rgb(0, 78, 152)",type = "circular"}) {
    switch (type) {
        case "dotted":
            return <SpinnerDotted color={"white"} style={{marginTop}}/>            
        default:
            return <SpinnerCircular color={color} secondaryColor="white" style={{marginTop}}/>            
    }
}

