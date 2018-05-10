export class City {
    cityId?: number;
    name?: string;
    country?: string | null;
    province?: string | null;
    cityInfo?: {
        cityInfoId: number,
        population: number,
        citySize: number
    } | null

    toString() {
        return this.name || "";
    }
}
