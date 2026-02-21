import Reactotron from "reactotron-react-js"

Reactotron
    .configure({ name: "Zsyio Frontend" }) // controls connection & communication settings
    .connect() // let's connect!

// Clear Reactotron console on every reload
Reactotron.clear()

export default Reactotron
