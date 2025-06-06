import { Input } from "antd";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../Actions/searchSlice";

const {Search} = Input;


const Searchbar = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state)=>state.search.value)
    useEffect(()=>{
        console.log(searchValue);
    },[searchValue])
    return ( 
        <Search
            className="custom-searchbar"
            placeholder="Search..."
            allowClear
            value={searchValue}
            onChange={e=>dispatch(setSearch(e.target.value))}
            style={{ width: 500 }} />
    );
}
 
export default Searchbar;