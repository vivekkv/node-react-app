import ConstantBuilder from 'reduxImplementations/reduxContantHelper';

export const MODULE = "ADMIN";
export const TYPE = "VIDEOS";
export const INITALIZE = "INITALIZE";


export const INIT_MODULE = ConstantBuilder(MODULE, TYPE, INITALIZE);
export const INPUT_CHANGE = ConstantBuilder(MODULE, TYPE, "INPUT_CHANGED");
export const SET_FORM = ConstantBuilder(MODULE, TYPE, "SET_FORM");
export const SUBMIT_ITEM = ConstantBuilder(MODULE, TYPE, "SUBMIT");
export const CLEAR_FORM = ConstantBuilder(MODULE, TYPE, "CLEAR_FORM");
export const EDIT_ITEM = ConstantBuilder(MODULE, TYPE, "EDIT_ITEM");
export const DELETE_ITEM = ConstantBuilder(MODULE, TYPE, "DELETE_ITEM");
export const LOAD_PRODUCT_VIDEOS = ConstantBuilder(MODULE, TYPE, "LOAD_PRODUCT_VIDEOS");