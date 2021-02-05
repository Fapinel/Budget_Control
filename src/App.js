import React, {useState, useEffect} from 'react';
import Question from './components/Question';
import Form from './components/Form';
import List from './components/List';
import BudgetControl from './components/BudgetControl';

function App() {

  // Define the state
  const [ budget, saveBudget] = useState(0);
  const [ remaining, saveRemaining] = useState(0);
  const [showquestion, updateQuestion] = useState(true);
  const [spendings, saveSpendings] = useState([]);
  const [spending, saveSpending] = useState({});
  const [createExpense, saveCreateExpense] = useState(false);

  // UseEffect que actualiza el restante
  useEffect(() => {
    if(createExpense) {

      // agrega el nuevo presupuesto
      saveSpendings([
        ...spendings,
        spending
      ]);

      // resta del presupuesto actual
      const remainingBudget = remaining - spending.quantity;
      saveRemaining(remainingBudget);

      // Resetear a false
      saveCreateExpense(false);


    }
  }, [spending, createExpense, spendings, remaining]);



// * When we add a new spending
// const addNewSpending = spending => {
//console.log(spending);
//saveSpendings([
//  ...spendings,
//   spending
//  ])
// }

  return (
    <div className="container">
      <header>
          <h1>Weekly expense</h1>

          <div className="contenido-principal contenido">
            { showquestion ?
             (
                <Question
                saveBudget={saveBudget}
                saveRemaining={saveRemaining}
                updateQuestion={updateQuestion}
                />
              ) : 
              (
                <div className="row">
                    <div className="one-half column">
                      <Form 
                      saveSpending={saveSpending}
                      saveCreateExpense={saveCreateExpense}
                      />
                    </div>
      
                    <div className="one-half column">
                      <List
                        spendings={spendings}
                      />
                      <BudgetControl
                          budget={budget}
                          remaining={remaining}
                      />
                    </div>
              </div>
              ) 
            }
            
          </div>
      </header>
    </div>
  );
}

export default App;
