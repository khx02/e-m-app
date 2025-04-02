export class Driver{
    driver_id: string;
    driver_name: string;
    driver_department: string;
    driver_licence: string;
    driver_isActive: boolean;
    driver_createdAt: string;
    _id: string; // mongodb id

    constructor() {
        this.driver_id = '';
        this.driver_name = '';
        this.driver_department = '';
        this.driver_licence = '';
        this.driver_isActive = false;
        this.driver_createdAt ='';
        this._id = ''; // mongodb id
    }
}