interface InputProps{
    placeholder:string;
    reference:any
}
export function Input({placeholder , reference}:InputProps){
    return <input ref={reference}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    placeholder={placeholder}
  />
}