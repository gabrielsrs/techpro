import {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import particlesOptions from "../config/particles.json";


function Particle({ id }) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (init) return

        initParticlesEngine(async (engine) => await loadFull(engine))
        .then(() => setInit(true))
    }, [])

    return init && <Particles id={id} className="absolute top-0 left-0 w-full h-full" options={particlesOptions}/>

}

export { Particle }
