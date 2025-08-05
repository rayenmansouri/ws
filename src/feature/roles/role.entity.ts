
export type RoleInput = {
    name: string;
    permissions: string[];
    userTypes: string[];
    description: string;
    translation: {
        ar: string;
        en: string;
    }
}   

export type Role = RoleInput & {
    id: string;
}

export class RoleDto implements Role {
    id: string;
    name: string;
    permissions: string[];
    userTypes: string[];
    description: string;
    translation: {
        ar: string;
        en: string;
    }

    constructor(json: any) {
        this.id = json._id.toString();
        this.name = json.name;
        this.permissions = json.permissions;
        this.userTypes = json.userTypes;
        this.description = json.description;
        this.translation = json.translation;
    }
}