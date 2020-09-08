


import {filter} from "ramda"

export const clean = (data)=>{
	return filter(x => x !== "",data)
}
