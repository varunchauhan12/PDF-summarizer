export const containerVariants = {
    hidden : { opacity : 0},
    visible : {
        opacity : 1,
        transition : {
            staggerChildren : 0.2,
            delayChildren : 0.2
        }
    }
}

export const itemVariants = {
    hidden : { opacity : 0, y : 20 },
    visible : {
        opacity : 1,
        transition : {
            type : "spring",
            damping : 20,
            stiffness : 50,
            duration : 0.8
        }
    }
}

export const buttonVariants = {
    scale : 1.05,
    transition : {
        type : "spring",
        stiffness : 300,
        damping : 10
    }
}


export const listvariants = {
    hidden : { opacity : 0, x : -20 },
    visible : {
        opacity : 1,
        x : 0,
        transition : {
            type : "spring",
            damping : 20,
            stiffness : 50,
            duration : 0.5
        }
    }
   
}