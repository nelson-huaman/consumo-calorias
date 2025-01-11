import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
   dispatch: Dispatch<ActivityActions>
   state: ActivityState
}

const inicialState : Activity = {
   id: uuidv4(),
   category: 1,
   name: '',
   calories: 0
}

function Form({dispatch, state} : FormProps) {

   const [ activity, setActivity ] = useState<Activity>(inicialState)

   useEffect(() => {
      if(state.activeId) {
         const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
         setActivity(selectActivity)
      }
   }, [state.activeId])

   const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
      const isNumberField = ['category', 'calories'].includes(e.target.id)
      setActivity({
         ...activity,
         [e.target.id]: isNumberField ? +e.target.value : e.target.value
      })
   }

   const isValidActivity = () => {
      const { name, calories } = activity;
      return name.trim() !== '' && calories > 0;
   }

   const handleSubmit = (e:  FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({type: "save-activity", payload: { newActivity: activity }})
      setActivity({
         ...inicialState,
         id: uuidv4()
      })
   }

   return (
      <form className="space-y-5 bg-white shadow p-10 rounded-lg"
         onSubmit={handleSubmit}
      >
         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category">Categoría</label>
            <select id="category"
               className="border border-slate-400 p-2 rounded-lg w-full bg-white"
               value={activity.category}
               onChange={handleChange}
            >
               {categories.map( category => (
                  <option value={category.id} key={category.id}>
                     {category.name}
                  </option>
               ))}
            </select>
         </div>
         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name">Actividad</label>
            <input type="text" id="name"
               className="border border-slate-400 p-2 rounded-lg w-full bg-white"
               placeholder="Ej: Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
               value={activity.name}
               onChange={handleChange}
            />
         </div>
         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories">Calorias</label>
            <input type="number" id="calories"
               className="border border-slate-400 p-2 rounded-lg w-full bg-white"
               placeholder="Ej: 300 o 500"
               value={activity.calories}
               onChange={handleChange}
            />
         </div>

         <input type="submit"
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
         />
      </form>
   )
}

export default Form;