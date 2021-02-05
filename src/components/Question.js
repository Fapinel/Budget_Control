import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Question = ({saveBudget, saveRemaining, updateQuestion}) => {

    //Define the state
    const [ quantity, saveQuantity ] = useState(0);
    const [ error, saveError ] = useState(false);


    // Budget reading function - Función que lee el presupuesto
    const defineBudget = e => {
        //console.log(parseInt(e.target.value))
        saveQuantity( parseInt(e.target.value, 10))
    }


    // Submit para definir el presupuesto
    const addBudget = e => {
        e.preventDefault();

        // Validate
        if(quantity < 1 ||  isNaN( quantity ) ) {
            saveError(true);
            return;
        }

        // Si se pasa de la validación
        saveError(false);
        saveBudget(quantity);
        saveRemaining(quantity);
        updateQuestion(false);
    }

    return ( 
        <Fragment>
            <h2>put your budget</h2>

            { error ? <Error message="The budget is wrong" /> : null }

           

            <form
                onSubmit={addBudget}
            >
                <input
                type="number"
                className="u-full-width"
                placeholder="put your budget"
                onChange={defineBudget}
                />

                <input 
                    type="submit"
                    className="button-primary u-full-width"
                    value="Define Budget"
                />
            </form>
        </Fragment>
     );
}



Question.propTypes = {
    saveBudget: PropTypes.func.isRequired,
    saveRemaining: PropTypes.func.isRequired,
    updateQuestion: PropTypes.func.isRequired
}
 
export default Question;