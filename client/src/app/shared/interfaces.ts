export interface User {
    email:string
    password:string
}
export interface Category {
    name: string
    user?:string
    _id:string
}
export interface Message {
    message:string
}

export interface Position {
    name: string
    cost: number
    user?: string
    category: string
    _id?: string
    quantity?: number
}

export interface MaterialInstance {
    open?() : void
    close?() :void
    destroy?() : void
}
export interface Order {
    date?: Date
    order?:number
    user?:string
    list: OrderPosition[]
    _id?: string
}
export interface OrderPosition {
    name: string
    cost: number
    quantity: number
    _id?: string
}
export interface Filter {
    start?: Date
    end?: Date
    order?: number
}
export interface OverviewPage {
    orders:OverviewPageItem
    gain:OverviewPageItem
}
export interface OverviewPageItem {
    percent:number
    compare:number
    yesterday:number
    isHigher:boolean
}

export interface AnalyticPage {
    average:number
    chart:AnalyticChartItem[]
}
export interface AnalyticChartItem {
    gain:number
    order:number
    label:string
}