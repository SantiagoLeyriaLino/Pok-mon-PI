export const validate =(input,pokemonsAll)=>{
    let errors = {};
    if(input.name && pokemonsAll && pokemonsAll.length>0){
        let compare =pokemonsAll.filter((pokemon)=>pokemon.Name==input.name)
        if (compare.length>0){
            errors.name =  'Existing name'
        }
    }
    if(!input.name){
        errors.name = 'Name is required'
    }
    if(input.name && input.name.length < 3){
        errors.name = 'The name cannot be less than 3 characters'
    }
    if(!input.image || input.image.length==0){
        errors.image = 'Image is required'
    }
    if(input.image && !(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi).test(input.image)){
        errors.image = 'This url does not belong to an image' 
    }
    if(!input.hp || input.hp.length<1 || input.hp==0){
        errors.hp = 'Hp is required'
    }
    if(input.hp > 99){
        errors.hp = 'Hp values must be between 1 and 99'
    }
    if(!input.attack || input.attack.length<1 || input.attack==0){
        errors.attack = 'Attack is required'
    }
    if(input.attack > 999){
        errors.attack = 'Attack values must be between 1 and 999'
    }
    if(!input.defense || input.defense.length<1 || input.defense==0){
        errors.defense = 'Defense is required'
    }
    if(input.defense > 999){
        errors.defense = 'Defense values must be between 1 and 999'
    }
    if(!input.speed || input.speed.length<1 || input.speed==0){
        errors.speed = 'Speed is required'
    }
    if(input.speed > 399){
        errors.speed = 'Speed values must be between 1 and 399'
    }
    if(input.height > 399){
        errors.height = 'Height values must be between 1 and 399'
    }
    if(input.weight > 399){
        errors.weight = 'Weight values must be between 1 and 399'
    }
    // if(!input.types || input.types.length<1){
    //     errors.types = 'Select at least one type'
    // }
    return errors;
}

// export const validateErrors = async(arr1,arr2) =>{
//     var errors =  arr1
//     var pokemonData = arr2
//     return(
//         pokemonData.name !=="" &&
//         pokemonData.attack !=="" &&
//         pokemonData.defense !==""&&
//         pokemonData.hp !=="" &&
//         pokemonData.image !=="" &&
//         pokemonData.speed !=="" &&
//         errors.attack =="" &&
//         errors.defense == "" &&
//         errors.hp == "" &&
//         errors.image == "" &&
//         errors.name == "" &&
//         errors.speed == "" &&
//         errors.types == "" 
//     )
    
// }
