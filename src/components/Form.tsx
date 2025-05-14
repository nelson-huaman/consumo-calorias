import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent } from "react"
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/cotegories"
import type { Activity } from "../types"
import type { ActivityAction, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
   dispatch: Dispatch<ActivityAction>,
   state: ActivityState
}

const initialState : Activity = {
   id: uuidv4(),
   category: 1,
   name: "",
   calories: 0
}

function Form({state, dispatch} : FormProps) {

   const [ activity, setActivity ] = useState<Activity>(initialState)

   useEffect(() => {
      if(state.activeId) {
         const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
         setActivity(selectedActivity)
      }
   }, [state.activeId])

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const isNumberField = ['category', 'calories'].includes(e.target.id)
      setActivity({
         ...activity,
         [e.target.id] : isNumberField ? +e.target.value : e.target.value
      })
   }

   const isValidActivity = () => {
      const { name, calories } = activity
      return name.trim() !== "" && calories > 0
   }

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch({ type: 'save-activity', payload: { newActivity: activity } })
      setActivity({
         ...initialState,
         id: uuidv4()
      })
   }

   return (
      <form
         className="bg-white p-5 rounded-lg shadow space-y-5"
         onSubmit={handleSubmit}
      >
         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoría</label>
            <select
               name="category"
               id="category"
               className="border border-slate-400 p-2 rounded-lg w-full bg-white"
               value={activity.category}
               onChange={handleChange}
            >
               {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                     {category.name}
                  </option>
               ))}
            </select>
         </div>
         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad</label>
            <input
               type="text"
               name="name"
               id="name"
               className="border border-slate-400 p-2 rounded-lg w-full bg-white"
               placeholder="Ej: Correr, Jugar, Estudiar"
               value={activity.name}
               onChange={handleChange}
            />
         </div>
         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias</label>
            <input
               type="number"
               name="calories"
               id="calories"
               className="border border-slate-400 p-2 rounded-lg w-full bg-white"
               placeholder="Ej: 200, 500, 1000"
               value={activity.calories}
               onChange={handleChange}
            />
         </div>
         <input
            type="submit"
            value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold p-2 w-full rounded-lg cursor-pointer disabled:opacity-10"
            disabled={!isValidActivity()}
         />
      </form>
   )
}

export default Form