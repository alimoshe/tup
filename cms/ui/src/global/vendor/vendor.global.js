import {atom, selector} from "recoil";

const vendorAtom = atom({
    key:'vendors',
    default:[]
});
const VendorGlobal = {
    vendorState : vendorAtom,
    vendorSelector : selector({
        key: 'getVendors',
        get: ({get}) => {
            return get(vendorAtom);
        }
    })
}

export default VendorGlobal;