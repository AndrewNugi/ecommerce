import './CategoryForm.css'

const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = 'Submit',
    handleDelete,
}) => {
  return (
    <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
            <input 
            type="text" 
            className="input-style" 
            placeholder="Write category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />

            <div className="flex justfy-between">
                <button className="btn-style btn-pink">{buttonText}
                </button>

                {handleDelete && (
                    <button onClick={handleDelete} className="btn-style btn-red">
                        Delete
                    </button>
                )}
            </div>
        </form>
      
    </div>
  )
}

export default CategoryForm
