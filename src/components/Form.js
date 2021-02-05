import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';



const Form = ({saveSpending, saveCreateExpense}) => {

    const [name, saveName] = useState('');
    const [quantity, saveQuantity] = useState(0);
    const [error, saveError] = useState(false);

    // when user add a expense / cuando el usuario agrega un gastos
    const addExpense = e => {
        e.preventDefault();

        // Validate / Validar
        if(quantity < 1  || isNaN(quantity) || name.trim() === ''){
            saveError(true);
            return;
        }
        saveError(false);
        //build the spending / construir el gasto
        const spending = {
            name,
            quantity, 
            id: shortid.generate()
        }

        

        // Pass the expense to the main component /pasar el gasto al componente pricipal 
        saveSpending(spending);
        saveCreateExpense(true);

        // reset the form  /  resetear el form 
        saveName('');
        saveQuantity(0);
    }

    return (  
        <form
            onSubmit={addExpense}
        
        >
            <h2>Add your expenses here</h2>

            { error ? <Error message="Both fields are required or
             Wrong budget" /> : null }

        <div className="campo">
            <label>Name Expense</label>
            <input
            type="text"
            className="u-full-width"
            placeholder="Food"
            value={name}
            onChange={e => saveName(e.target.value)} //lo que el usuario escriba se va  agregar al state
            />
        </div>

        <div className="campo">
            <label>Amount Expense</label>
            <input
            type="number"
            className="u-full-width"
            placeholder="5000"
            value={quantity}
            onChange={e => saveQuantity(e.target.value)}
            />
        </div>

        <input
            type="submit"
            className="button-primary u-full-width"
            value="Add Expense"
        />

        </form>

    );
}


Form.propTypes = {
    saveSpending: PropTypes.func.isRequired,
    saveCreateExpense: PropTypes.func.isRequired,
}
 
export default Form;