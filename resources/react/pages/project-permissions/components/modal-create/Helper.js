//     index: true,
//     create: true,
//     edit: true,
//     show: true,
//     destroy: true,
//     active: true,
//     changeStatus: true,


export const processPublicName = (verb, group) => {
    switch (verb) {
        case 'index':
            return `Listar ${(group).toLowerCase()}`;
        case 'create':
            return `Crear ${(group).toLowerCase()}`;
        case 'edit':
            return `Editar ${(group).toLowerCase()}`;
        case 'show':
            return `Ver ${(group).toLowerCase()}`;
        case 'destroy':
            return `Eliminar ${(group).toLowerCase()}`;
        case 'active':
            return `Activar/Desactivar ${(group).toLowerCase()}`;
        case 'changeStatus':
            return `Cambiar estado de ${(group).toLowerCase()}`;
        default:
            return '';

    }
}

export const processPublicDescription = (verb, group) => {
    switch (verb) {
        case 'index':
            return `Permite ver la lista de ${(group).toLowerCase()}`;
        case 'create':
            return `Permite crear ${(group).toLowerCase()}`;
        case 'edit':
            return `Permite editar ${(group).toLowerCase()}`;
        case 'show':
            return `Permite ver ${(group).toLowerCase()}`;
        case 'destroy':
            return `Permite eliminar ${(group).toLowerCase()}`;
        case 'active':
            return `Permite activar/desactivar ${(group).toLowerCase()}`;
        case 'changeStatus':
            return `Permite cambiar estado de ${(group).toLowerCase()}`;
        default:
            return '';

    }
}
