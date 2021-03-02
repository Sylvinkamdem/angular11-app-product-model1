export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR
}
export interface AppDataState<T>{
    dataState?: DataStateEnum,
    data?: T,
    errorMessage?:string
}

export enum ProductActionTypes{
    GET_ALL_PRODUCTS = '[Product] Get All products',
    GET_SELECTEC_PRODUCTS = '[Product] Get Selected products',
    GET_AVAILABLE_PRODUCTS = '[Product] Get Available products',
    SEARCH_PRODUCTS = '[Product] Searche products',
    NEW_PRODUCT = '[Product] New product',
    SELECT_PRODUCT = '[Product] Select product',
    EDIT_PRODUCT = '[Product] Edit product',
    DELETE_PRODUCT = '[Product] Delete product',
    PRODUCT_ADDED = '[Product] product Added',
    PRODUCT_UPDATED = '[Product] product Updated',
    PRODUCT_DELETED = '[Product] product Deleted',
}

export interface ActionEvent{
    type: ProductActionTypes,
    payload?:any
}