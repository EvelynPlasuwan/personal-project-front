
function FormInput({ register, name, type="text", errors }) {

    return (
      <div>
        <label 
        htmlFor={name}
       className="block text-sm font-medium text-gray-700 mb-1"> {name}
        

        <input
          // placeholder={name}
          type={type}
          {...register(name)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        {errors[name] && (
          <p className="text-sm text-red-500">{errors[name].message}</p>
        )}
        </label>
      </div>
    );
  }
  export default FormInput;
  