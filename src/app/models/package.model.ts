export class Package {
    package_id: string;
    package_title: string;
    package_weight: string;
    package_destination: string;
    description: string;
    isAllocated: boolean;
    driver_id: string;
    createdAt: string;
    _id: string; // mongo db id

    constructor() {
        this.package_id = '';
        this.package_title = '';
        this.package_weight = '';
        this.package_destination = '';
        this.description = '';
        this.isAllocated = false;
        this.driver_id = '';
        this.createdAt = '';
        this._id = '';
    }
}