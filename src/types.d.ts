
export interface IProduct {
    name: string,
    inStock: boolean,
    prices: ProductPrice[],
    gallery: string[],
    id: string,
    productTotal?: number,
    attributes: Attribute[],
    description: string,
    brand: string
}

export interface ICartProduct {
    name: string,
    inStock: boolean,
    id: string,
    src: string,
    amount: number ,
    currency: Currency,
    productTotal: number,
    quantity: number,
    option?: string,
}

interface ProductPrice {
    amount: number,
    currency: Currency
}

interface Currency {
    label: string,
    symbol: string
}

interface Attribute {
    name: string,
    id: string,
    items: AttributeItems[] 
}

interface AttributeItems {
    id: string,
    value: string,
    displayValue: string
}