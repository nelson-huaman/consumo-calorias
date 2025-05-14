import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {

   const [ state, dispatch ] = useReducer(activityReducer, initialState)

   useEffect(() => {
      localStorage.setItem('activities', JSON.stringify(state.activities))
   }, [state.activities])

   const canRestaterApp = () => useMemo(() => state.activities.length, [state.activities])

   return (
      <>
         <header className="bg-lime-700 p-3">
            <div className="max-w-4xl mx-auto flex justify-between items-center gap-2">
               <h1 className="text-center text-lg font-bold text-white">Contador de Calorias</h1>
               <button
                  className="bg-gray-800 hover:bg-gray-900 py-2 px-5 font-bold text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
                  onClick={() => dispatch({type: 'restart-app'})}
                  disabled={!canRestaterApp()}
               >Reiniciar App</button>
            </div>
         </header>

         <section className="px-4 py-10 bg-lime-400">
            <div className="max-w-4xl mx-auto">
               <Form
                  dispatch={dispatch}
                  state={state}
               />
            </div>
         </section>

         <section className="bg-gray-800 py-10 px-4">
            <div className="max-w-4xl mx-auto">
               <CalorieTracker
                  activities={state.activities}
               />
            </div>
         </section>
         <section className="px-4 py-10 max-w-4xl mx-auto">
            <ActivityList
               activities={state.activities}
               dispatch={dispatch}
            />
         </section>
      </>
   )
}

export default App