export function get(callback, url='src/mock/settings.json') {fetch(url).then((res)=>res.json()).then((data)=>callback(data.result));}

export function goHot() { get((state)=>{
		store.dispatch({type:'update', state});
	}, 'src/mock/hot.json');
}